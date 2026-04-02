import { cookies } from "next/headers";
import {
  formatSurveyValue,
  getSurveyAdminPassword,
  isSurveyAdminSessionValid,
  listSurveyResponses,
  SURVEY_ADMIN_COOKIE_NAME,
  SURVEY_RESPONSE_COLUMNS,
  SURVEY_RESPONSE_LABELS,
  type SurveyResponseRow
} from "@/lib/surveyResponses";
import { loginToSurveyResponses, logoutOfSurveyResponses } from "./actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Survey Responses | Team Diamonds",
  robots: {
    index: false,
    follow: false
  }
};

type SurveyResponsesPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const SUMMARY_FIELDS = [
  "age",
  "grade",
  "gender",
  "interest_level",
  "device_type",
  "geo_country"
] as const;

function getSearchParamValue(
  searchParams: Record<string, string | string[] | undefined>,
  key: string
) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

function countDistinctValues(rows: SurveyResponseRow[], field: string) {
  return new Set(rows.map((row) => row[field]).filter(Boolean)).size;
}

function renderLoginState(errorCode?: string) {
  const errorMessage =
    errorCode === "invalid"
      ? "That password did not match."
      : errorCode === "config"
        ? "Admin password is not configured yet."
        : "";

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16">
      <div className="w-full rounded-[28px] border border-white/15 bg-slate-950/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
          Internal Access
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Survey responses
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Enter the shared admin password to review Supabase submissions.
        </p>

        {errorMessage ? (
          <div className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {errorMessage}
          </div>
        ) : null}

        <form action={loginToSurveyResponses} className="mt-6 space-y-4">
          <label className="block text-sm text-slate-200" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30"
            placeholder="Enter admin password"
          />
          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Unlock responses
          </button>
        </form>
      </div>
    </section>
  );
}

function renderMissingPasswordState() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-6 py-16">
      <div className="w-full rounded-[32px] border border-amber-300/25 bg-slate-950/80 p-8 shadow-2xl shadow-amber-500/10 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.28em] text-amber-200">
          Setup Needed
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Survey response page is locked
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          Add <code className="rounded bg-white/10 px-2 py-1">SURVEY_RESPONSES_PASSWORD</code>{" "}
          to your local env file and Netlify environment variables, then reload
          this page.
        </p>
      </div>
    </section>
  );
}

function ResponseCard({
  row,
  index
}: {
  row: SurveyResponseRow;
  index: number;
}) {
  return (
    <details
      open={index === 0}
      className="rounded-[28px] border border-white/12 bg-slate-950/70 shadow-lg shadow-slate-950/40"
    >
      <summary className="cursor-pointer list-none px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
              Response {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              {formatSurveyValue("submitted_at", row.submitted_at)}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {row.geo_country || "Country unknown"} | {row.device_type || "Device unknown"} |{" "}
              {row.browser_family || "Browser unknown"}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {SUMMARY_FIELDS.map((field) => (
              <div
                key={field}
                className="min-w-[120px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                  {SURVEY_RESPONSE_LABELS[field]}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-100">
                  {formatSurveyValue(field, row[field])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </summary>

      <div className="border-t border-white/10 px-6 py-6">
        <div className="grid gap-4 md:grid-cols-2">
          {SURVEY_RESPONSE_COLUMNS.map((field) => (
            <div
              key={field}
              className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                {SURVEY_RESPONSE_LABELS[field] ?? field}
              </p>
              <p className="mt-2 break-words text-sm leading-6 text-slate-100">
                {formatSurveyValue(field, row[field])}
              </p>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}

export default async function SurveyResponsesPage({
  searchParams
}: SurveyResponsesPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const errorCode = getSearchParamValue(resolvedSearchParams, "error");
  const configuredPassword = getSurveyAdminPassword();

  if (!configuredPassword) {
    return renderMissingPasswordState();
  }

  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(SURVEY_ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = isSurveyAdminSessionValid(sessionValue);

  if (!isAuthenticated) {
    return renderLoginState(errorCode);
  }

  let responses: SurveyResponseRow[] = [];
  let loadError = "";

  try {
    responses = await listSurveyResponses(250);
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Unable to load survey responses.";
  }

  const latestSubmission = responses[0]?.submitted_at
    ? formatSurveyValue("submitted_at", responses[0].submitted_at)
    : "No submissions yet";

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-[32px] border border-white/12 bg-slate-950/75 p-8 shadow-2xl shadow-cyan-500/5 backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
              Private Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Survey responses
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Live responses from Supabase, sorted by newest submission first.
            </p>
          </div>

          <form action={logoutOfSurveyResponses}>
            <button
              type="submit"
              className="rounded-2xl border border-white/15 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Lock page
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
              Total Responses
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {responses.length}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
              Countries Seen
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {countDistinctValues(responses, "geo_country")}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
              Latest Submission
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              {latestSubmission}
            </p>
          </div>
        </div>

        {loadError ? (
          <div className="mt-8 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-100">
            {loadError}
          </div>
        ) : null}

        {!loadError && responses.length === 0 ? (
          <div className="mt-8 rounded-[28px] border border-dashed border-white/15 bg-white/[0.03] px-6 py-12 text-center text-slate-300">
            No survey responses have been stored yet.
          </div>
        ) : null}

        {!loadError && responses.length > 0 ? (
          <div className="mt-8 space-y-5">
            {responses.map((row, index) => (
              <ResponseCard key={row.id ?? `${row.submitted_at}-${index}`} row={row} index={index} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
