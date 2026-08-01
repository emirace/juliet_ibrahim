/**
 * The Evolution Workshop waitlist — validation, storage shape and email copy.
 *
 * The client that posts to this is `src/components/evolutionWaitlist.tsx` in
 * the `emirace/her_steam` repo. If the field list changes there, change it here.
 */

/* ------------------------------------------------------------------- types */

export type WaitlistRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  ageRange: string;
  occupation: string;
  organisation: string;
  preferredCity: string;
  source: string;
  consent: boolean;
  interests: string[];
};

export type WaitlistDocument = WaitlistRegistration & {
  createdAt: Date;
  updatedAt: Date;
  /** Team workflow column — who has been contacted about a confirmed city. */
  status: string;
  /** Untrusted metadata. The visitor's clock, kept for reference only. */
  clientSubmittedAt?: string;
  ip?: string;
  userAgent?: string;
};

/* -------------------------------------------------------------- value sets */

/** Stable lists — safe to validate strictly against. */
const AGE_RANGES = ["13-17", "18-24", "25-34", "35-44", "45+"];

const OCCUPATIONS = [
  "Secondary school student",
  "University student",
  "Young professional",
  "Entrepreneur / business owner",
  "Educator",
  "Job seeking",
  "Other",
];

const SOURCES = [
  "Instagram",
  "Facebook",
  "X / Twitter",
  "LinkedIn",
  "TikTok",
  "WhatsApp",
  "Friend or family",
  "School or university",
  "Employer or organisation",
  "Radio or TV",
  "Newsletter or email",
  "Google search",
  "Event or conference",
  "Other",
];

const INTERESTS = [
  "Leadership",
  "Entrepreneurship",
  "AI & Technology",
  "Financial Literacy",
  "Career Development",
  "Personal Branding",
  "Public Speaking",
  "Mentorship",
  "Innovation",
  "Wellness",
  "Networking",
];

// Country and city are deliberately NOT validated against a fixed list. New
// workshop cities are announced continuously, and a stale enum here would
// reject a legitimate registration on announcement day.
const MAX = {
  name: 100,
  email: 254,
  phone: 40,
  place: 120,
  organisation: 200,
};

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/* -------------------------------------------------------------- validation */

type ValidationResult =
  | { ok: true; data: WaitlistRegistration }
  | { ok: false; error: string };

const asString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

export const validateRegistration = (body: unknown): ValidationResult => {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const raw = body as Record<string, unknown>;

  const firstName = asString(raw.firstName);
  const lastName = asString(raw.lastName);
  const email = asString(raw.email).toLowerCase();
  const phone = asString(raw.phone);
  const country = asString(raw.country);
  const city = asString(raw.city);
  const ageRange = asString(raw.ageRange);
  const occupation = asString(raw.occupation);
  const organisation = asString(raw.organisation);
  const preferredCity = asString(raw.preferredCity);
  const source = asString(raw.source);

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !country ||
    !city ||
    !ageRange ||
    !occupation ||
    !preferredCity ||
    !source
  ) {
    return { ok: false, error: "All required fields must be provided" };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Invalid email address" };
  }

  if (
    firstName.length > MAX.name ||
    lastName.length > MAX.name ||
    email.length > MAX.email ||
    phone.length > MAX.phone ||
    country.length > MAX.place ||
    city.length > MAX.place ||
    preferredCity.length > MAX.place ||
    organisation.length > MAX.organisation
  ) {
    return { ok: false, error: "One or more fields exceed the maximum length" };
  }

  if (!AGE_RANGES.includes(ageRange)) {
    return { ok: false, error: "Invalid age range" };
  }

  if (!OCCUPATIONS.includes(occupation)) {
    return { ok: false, error: "Invalid occupation" };
  }

  if (!SOURCES.includes(source)) {
    return { ok: false, error: "Invalid source" };
  }

  if (!Array.isArray(raw.interests) || raw.interests.length === 0) {
    return { ok: false, error: "Choose at least one area of interest" };
  }

  const interests = raw.interests.map(asString);
  if (interests.some((interest) => !INTERESTS.includes(interest))) {
    return { ok: false, error: "Invalid area of interest" };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      ageRange,
      occupation,
      organisation,
      preferredCity,
      source,
      // Anything other than an explicit true is treated as no consent.
      consent: raw.consent === true,
      interests: [...new Set(interests)],
    },
  };
};

/* ------------------------------------------------------------------ emails */

/**
 * Registrants control every value below, and these land in the team's inbox —
 * escape before interpolating so nobody can post markup into it.
 */
export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const confirmationTemplate = (registration: WaitlistRegistration) => {
  const firstName = escapeHtml(registration.firstName);
  const preferredCity = escapeHtml(registration.preferredCity);
  const interests = escapeHtml(registration.interests.join(", "));

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f8f8fb; padding: 24px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 16px; overflow: hidden;">
        <div style="background-image: linear-gradient(to right, #60a5fa, #c084fc); padding: 32px 28px;">
          <h1 style="margin: 0; color: #ffffff; font-size: 24px;">You're on the waitlist</h1>
          <p style="margin: 8px 0 0; color: #ffffff; font-size: 15px;">The Evolution Workshop &middot; A Her STEAM Initiative Flagship Platform</p>
        </div>
        <div style="padding: 32px 28px; color: #4b5563; line-height: 1.7;">
          <p style="margin: 0 0 16px;">Hi ${firstName},</p>
          <p style="margin: 0 0 16px;">
            Thank you for registering your interest in The Evolution Workshop &mdash; our
            year-round programme of workshops, masterclasses and certification
            programmes for African women and emerging leaders.
          </p>
          <p style="margin: 0 0 16px;">
            You are on the waitlist for <strong style="color: #111827;">${preferredCity}</strong>.
            As soon as dates are confirmed for your city you will hear from us first,
            ahead of any public announcement. We will also let you know about virtual
            masterclasses, mentorship openings and scholarship places.
          </p>
          <p style="margin: 0 0 24px;">
            Areas you told us you are interested in: <strong style="color: #111827;">${interests}</strong>
          </p>
          <p style="margin: 0 0 24px;">
            If anything above is wrong, just reply to this email and we will fix it.
          </p>
          <p style="margin: 0; color: #111827;"> The Her STEAM Initiative team</p>
        </div>
        <div style="padding: 20px 28px; background-color: #080b33; color: #000000; font-size: 13px;">
          foundation@hersteaminitiative.org
        </div>
      </div>
    </div>
  `;
};

export const notificationTemplate = (
  registration: WaitlistRegistration,
  receivedAt: Date,
) => {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280; white-space: nowrap;">${label}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">${escapeHtml(value) || "&mdash;"}</td>
    </tr>
  `;

  // Tab-delimited so the team can paste a registration straight into a
  // spreadsheet without going near the database.
  const spreadsheetLine = escapeHtml(
    [
      receivedAt.toISOString(),
      registration.firstName,
      registration.lastName,
      registration.email,
      registration.phone,
      registration.country,
      registration.city,
      registration.ageRange,
      registration.occupation,
      registration.organisation,
      registration.preferredCity,
      registration.source,
      registration.interests.join("; "),
      registration.consent ? "yes" : "no",
    ].join("\t"),
  );

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111827;">
      <h2 style="font-size: 18px; margin: 0 0 4px;">New Evolution waitlist registration</h2>
      <p style="margin: 0 0 16px; color: #6b7280; font-size: 14px;">Received ${receivedAt.toUTCString()}</p>
      <table style="border-collapse: collapse; font-size: 14px; width: 100%; max-width: 640px;">
        ${row("Name", `${registration.firstName} ${registration.lastName}`)}
        ${row("Email", registration.email)}
        ${row("Phone", registration.phone)}
        ${row("Country", registration.country)}
        ${row("City", registration.city)}
        ${row("Age range", registration.ageRange)}
        ${row("Occupation", registration.occupation)}
        ${row("School / Organisation", registration.organisation)}
        ${row("Preferred workshop city", registration.preferredCity)}
        ${row("Heard about us via", registration.source)}
        ${row("Interests", registration.interests.join(", "))}
        ${row("Marketing consent", registration.consent ? "Yes" : "No")}
      </table>
      <p style="margin: 24px 0 4px; color: #6b7280; font-size: 13px;">Paste into a spreadsheet:</p>
      <pre style="font-size: 12px; background: #f8f8fb; padding: 12px; border-radius: 8px; white-space: pre-wrap; word-break: break-word;">${spreadsheetLine}</pre>
    </div>
  `;
};
