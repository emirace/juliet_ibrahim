import { NextRequest } from "next/server";
import { sendEmail2 } from "@/utils/sendEmail";
import { getWaitlistCollection } from "@/utils/mongodb";
import { submitToGoogleForm } from "@/utils/googleForm";
import {
  confirmationTemplate,
  notificationTemplate,
  validateRegistration,
} from "@/utils/evolutionWaitlist";

/**
 * Waitlist registrations for The Evolution Workshop.
 *
 * Posted to by `src/components/evolutionWaitlist.tsx` in `emirace/her_steam`.
 * That client only inspects `response.ok` — on any non-2xx it keeps the user's
 * entered data and shows a retry message. So a few "failures" deliberately
 * return 200; see the comments below.
 *
 * CORS headers come from the global `/api/:path*` rule in next.config.ts.
 */

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/* ------------------------------------------------------------- rate limit */

// Deliberately generous. This form recruits from school computer labs where a
// whole class shares one NAT'd IP — a typical "5 per hour" would lock out
// everyone after the fifth girl. A per-minute burst cap still stops bots.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;

// Per-instance and best-effort: serverless cold starts reset it. The unique
// index on email is what actually guarantees no duplicate registrations.
const hits = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((at) => now - at >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
};

const clientIp = (req: NextRequest): string =>
  req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
  req.headers.get("x-real-ip") ||
  "unknown";

/* ------------------------------------------------------------------ route */

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);

    if (isRateLimited(ip)) {
      return json({ error: "Too many requests. Please try again shortly." }, 429);
    }

    const body = await req.json().catch(() => null);

    // Honeypot. Real browsers always send this empty — the field is hidden.
    // Return 200 without persisting: an error response only tells the bot
    // which field to stop filling in.
    if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
      return json({ message: "Thank you for registering." }, 200);
    }

    const result = validateRegistration(body);
    if (!result.ok) {
      return json({ error: result.error }, 400);
    }

    const registration = result.data;
    const now = new Date();

    const collection = await getWaitlistCollection();
    const write = await collection.updateOne(
      { email: registration.email },
      {
        $set: {
          ...registration,
          updatedAt: now,
          // Untrusted — the visitor's own clock. Kept as metadata only;
          // createdAt is the authoritative timestamp.
          clientSubmittedAt:
            typeof (body as Record<string, unknown>).submittedAt === "string"
              ? ((body as Record<string, unknown>).submittedAt as string)
              : undefined,
          ip,
          userAgent: req.headers.get("user-agent") || undefined,
        },
        $setOnInsert: { createdAt: now, status: "new" },
      },
      { upsert: true }
    );

    const isNewRegistration = write.upsertedCount > 0;

    // Past this point the registration is safely stored. Mail and mirroring
    // problems are logged but must not fail the request — the user would be
    // told to retry something that already succeeded.

    // Unconditional, unlike the team notification below: the sheet is an
    // append-only log, so a registrant revising their preferences is meant to
    // show up as a second row.
    try {
      await submitToGoogleForm(registration, now);
    } catch (error) {
      console.error("Evolution waitlist: Google Form mirror failed", error);
    }

    try {
      await sendEmail2({
        from: `"The Evolution" <${process.env.STEAM_EMAIL_USER}>`,
        to: registration.email,
        subject: isNewRegistration
          ? "You're on The Evolution waitlist"
          : "Your Evolution waitlist details have been updated",
        html: confirmationTemplate(registration),
        // Addressed to a member of the public — don't copy the team inbox.
        multiple: false,
      });
    } catch (error) {
      console.error("Evolution waitlist: confirmation email failed", error);
    }

    // Only on first registration, so someone revising their preferences
    // doesn't re-notify the team.
    if (isNewRegistration) {
      try {
        await sendEmail2({
          from: `"The Evolution" <${process.env.STEAM_EMAIL_USER}>`,
          to: process.env.STEAM_EMAIL_USER!,
          replyTo: registration.email,
          subject: `New Evolution waitlist registration - ${registration.firstName} ${registration.lastName}, ${registration.preferredCity}`,
          html: notificationTemplate(registration, now),
        });
      } catch (error) {
        console.error("Evolution waitlist: team notification failed", error);
      }
    }

    return json({ message: "You're on the waitlist." }, 200);
  } catch (error) {
    // Deliberately not logging the request body — it carries personal data,
    // including that of registrants in the 13-17 age band.
    console.error("Evolution waitlist: registration failed", error);
    return json({ error: "Internal Server Error" }, 500);
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204 });
}
