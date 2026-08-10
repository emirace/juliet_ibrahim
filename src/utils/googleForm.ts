import type { WaitlistRegistration } from "@/utils/evolutionWaitlist";

/**
 * Mirrors Evolution waitlist registrations into a Google Form, so the team can
 * read them in the form's linked response sheet without touching the database.
 *
 * MongoDB stays the source of truth. This is a one-way, append-only copy: an
 * existing registrant who edits their details produces a second row here while
 * their MongoDB document is updated in place.
 */

// The form ID from the live URL: /forms/d/e/<FORM_ID>/viewform. Unset disables
// the mirror entirely, which is what local development runs with.
const FORM_ID = process.env.EVOLUTION_GOOGLE_FORM_ID;

// Google's per-question field names. Generate the form and these IDs by running
// `scripts/create-evolution-google-form.gs` in Apps Script — it prints a block
// to paste over the placeholders below. They change whenever a question is
// deleted and re-added, so if rows start arriving with blank columns, re-read
// them (`logEntryIdsForExistingForm` in that script) before suspecting the code.
//
// Every question must be a free-text ("Short answer") question. Google rejects
// a submitted value that isn't in a dropdown or checkbox question's own option
// list, and the option lists for occupation, source and interests live in
// `evolutionWaitlist.ts` — a form left as multiple-choice would start failing
// silently the first time that list is edited.
const ENTRY_IDS = {
  receivedAt: "entry.801286238",
  firstName: "entry.1799432335",
  lastName: "entry.1867018656",
  email: "entry.1497526078",
  phone: "entry.675126756",
  country: "entry.145341908",
  city: "entry.1420871424",
  ageRange: "entry.1126190271",
  occupation: "entry.761145238",
  organisation: "entry.1219116084",
  preferredCity: "entry.764721198",
  source: "entry.226658260",
  interests: "entry.1907475438",
  consent: "entry.1549421306",
};

// Google is a secondary destination; the caller has already responded to the
// user in every practical sense. Don't let a hanging request hold the route
// open behind it.
const TIMEOUT_MS = 5_000;

export const submitToGoogleForm = async (
  registration: WaitlistRegistration,
  receivedAt: Date,
): Promise<void> => {
  if (!FORM_ID) return;

  // Same value formatting as the tab-delimited line in `notificationTemplate`,
  // so a pasted row and a mirrored row look identical in the sheet.
  const body = new URLSearchParams({
    [ENTRY_IDS.receivedAt]: receivedAt.toISOString(),
    [ENTRY_IDS.firstName]: registration.firstName,
    [ENTRY_IDS.lastName]: registration.lastName,
    [ENTRY_IDS.email]: registration.email,
    [ENTRY_IDS.phone]: registration.phone,
    [ENTRY_IDS.country]: registration.country,
    [ENTRY_IDS.city]: registration.city,
    [ENTRY_IDS.ageRange]: registration.ageRange,
    [ENTRY_IDS.occupation]: registration.occupation,
    [ENTRY_IDS.organisation]: registration.organisation,
    [ENTRY_IDS.preferredCity]: registration.preferredCity,
    [ENTRY_IDS.source]: registration.source,
    [ENTRY_IDS.interests]: registration.interests.join("; "),
    [ENTRY_IDS.consent]: registration.consent ? "yes" : "no",
  });

  // `ip` and `userAgent` are deliberately not sent. They stay in the database.

  const response = await fetch(
    `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  );

  // Status only. The response body echoes the submitted answers back inside the
  // confirmation page, and this data includes registrants in the 13-17 age band
  // — it must never reach the logs.
  if (!response.ok) {
    throw new Error(`Google Form responded ${response.status}`);
  }
};
