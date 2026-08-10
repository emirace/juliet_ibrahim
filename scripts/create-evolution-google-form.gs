/**
 * Creates the Google Form that /api/evolution-waitlist mirrors into, and prints
 * the values needed to wire it up.
 *
 * Google Forms cannot import questions from a file — its "Import questions"
 * button only copies from another Google Form. This Apps Script is the
 * supported way to build a form from a spec.
 *
 * HOW TO RUN
 *   1. Go to https://script.google.com and create a new project.
 *   2. Replace the contents of Code.gs with this file, then Save.
 *   3. Run `createEvolutionWaitlistForm`. Approve the permissions prompt the
 *      first time (it needs to create a Form and a Sheet on your Drive).
 *   4. Open View > Logs. Copy the two things it prints:
 *        - EVOLUTION_GOOGLE_FORM_ID  -> into .env.local and Vercel
 *        - the ENTRY_IDS block       -> over the placeholders in
 *                                       src/utils/googleForm.ts
 *   5. Open the form's edit URL (also logged) and check the questions look
 *      right. Nothing else needs configuring — the script sets it up.
 *
 * Running this twice creates a SECOND form with different entry IDs. Run it
 * once; to change a question later, edit the form by hand and re-read the IDs
 * with `logEntryIdsForExistingForm` below.
 */

/**
 * Question order matches ENTRY_IDS in src/utils/googleForm.ts, which in turn
 * matches the tab-delimited line in src/utils/evolutionWaitlist.ts. Keep all
 * three in the same order so a pasted row and a mirrored row line up.
 *
 * `key` is the property name in the generated ENTRY_IDS object.
 * `title` is what a human sees in the form and as the sheet column header.
 */
var QUESTIONS = [
  { key: "receivedAt", title: "Received at (UTC)" },
  { key: "firstName", title: "First name" },
  { key: "lastName", title: "Last name" },
  { key: "email", title: "Email" },
  { key: "phone", title: "Phone" },
  { key: "country", title: "Country" },
  { key: "city", title: "City" },
  { key: "ageRange", title: "Age range" },
  { key: "occupation", title: "Occupation" },
  { key: "organisation", title: "School / Organisation" },
  { key: "preferredCity", title: "Preferred workshop city" },
  { key: "source", title: "Heard about us via" },
  { key: "interests", title: "Interests" },
  { key: "consent", title: "Marketing consent" },
];

var FORM_TITLE = "The Evolution Workshop — waitlist registrations";

var FORM_DESCRIPTION =
  "Automatically filled by the website. Do not share this form publicly and " +
  "do not submit it by hand — every response here is a copy of a registration " +
  "already stored in the database. Read the responses in the linked sheet.";

function createEvolutionWaitlistForm() {
  var form = FormApp.create(FORM_TITLE);
  form.setDescription(FORM_DESCRIPTION);

  // Every question is free text and optional, on purpose. Google rejects a
  // submitted value that isn't in a dropdown or checkbox question's option
  // list, and the option lists for occupation, source and interests live in
  // src/utils/evolutionWaitlist.ts — a multiple-choice form would start
  // rejecting registrations the first time that list is edited.
  var items = QUESTIONS.map(function (question) {
    return {
      key: question.key,
      item: form.addTextItem().setTitle(question.title).setRequired(false),
    };
  });

  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);
  form.setPublishingSummary(false);

  // Only available on Google Workspace accounts; throws on personal accounts,
  // where forms are public by default anyway.
  try {
    form.setRequireLogin(false);
  } catch (error) {
    Logger.log("Note: could not call setRequireLogin (personal account). Fine.");
  }

  var spreadsheet = SpreadsheetApp.create(FORM_TITLE + " (responses)");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());

  // Logged before logWiring_, not after: if extracting the entry IDs fails, the
  // form and sheet still exist on Drive and you need these URLs to reach them.
  Logger.log("Responses sheet: " + spreadsheet.getUrl());
  Logger.log("Edit the form:   " + form.getEditUrl());

  logWiring_(form, items);
}

/**
 * Re-reads the entry IDs of a form that already exists — use this after adding
 * or deleting a question by hand, since Google issues a new entry ID whenever a
 * question is re-created.
 *
 * Paste the form's EDIT url (the one ending in /edit) between the quotes.
 */
function logEntryIdsForExistingForm() {
  var EDIT_URL = "PASTE_THE_FORM_EDIT_URL_HERE";

  var form = FormApp.openByUrl(EDIT_URL);
  var textItems = form.getItems(FormApp.ItemType.TEXT);

  if (textItems.length !== QUESTIONS.length) {
    Logger.log(
      "Warning: form has " + textItems.length + " text questions but " +
      QUESTIONS.length + " are expected. Mapping by position anyway — check " +
      "the titles in the output below before trusting it."
    );
  }

  // getItems returns generic Items, which have to be cast before they expose
  // createResponse. (addTextItem, by contrast, already returns a TextItem —
  // logWiring_ therefore expects TextItems from both callers.)
  var items = textItems.map(function (item, index) {
    return {
      key: QUESTIONS[index] ? QUESTIONS[index].key : "UNKNOWN_" + index,
      item: item.asTextItem(),
    };
  });

  logWiring_(form, items);
}

/**
 * Entry IDs aren't exposed by the Apps Script API directly. The documented way
 * to get them is to build a response containing a unique sentinel per question,
 * ask Google for the prefilled URL, and read which entry.* each sentinel landed
 * in. Nothing is submitted — a prefilled URL is just a link.
 */
function logWiring_(form, items) {
  var response = form.createResponse();

  items.forEach(function (entry) {
    // FormResponse is immutable; withItemResponse returns a new one.
    response = response.withItemResponse(
      entry.item.createResponse("__" + entry.key + "__")
    );
  });

  var prefilledUrl = response.toPrefilledUrl();

  var formId = (prefilledUrl.match(/\/forms\/d\/e\/([^/]+)\//) || [])[1];
  Logger.log("");
  Logger.log("EVOLUTION_GOOGLE_FORM_ID=" + (formId || "NOT FOUND — see note below"));
  if (!formId) {
    Logger.log(
      "The published URL had no /d/e/<id>/ segment. Open the form, press Send " +
      "(or Publish) once to publish it, then run logEntryIdsForExistingForm."
    );
  }

  var byKey = {};
  prefilledUrl
    .split("?")[1]
    .split("&")
    .forEach(function (pair) {
      var parts = pair.split("=");
      var name = decodeURIComponent(parts[0]);
      var value = decodeURIComponent(parts[1] || "");
      var match = value.match(/^__(.+)__$/);
      if (name.indexOf("entry.") === 0 && match) byKey[match[1]] = name;
    });

  var lines = QUESTIONS.map(function (question) {
    return "  " + question.key + ': "' + (byKey[question.key] || "MISSING") + '",';
  });

  Logger.log("");
  Logger.log("Paste over ENTRY_IDS in src/utils/googleForm.ts:");
  Logger.log("");
  Logger.log("const ENTRY_IDS = {\n" + lines.join("\n") + "\n};");
  Logger.log("");
}
