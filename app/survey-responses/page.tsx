import { cookies } from "next/headers";
import SurveyResponsesDashboard from "@/components/admin/SurveyResponsesDashboard";
import { MISSION_PHASES, SURVEY_FIELD_ORDER } from "@/lib/missionSurvey";
import {
  BACKEND_METADATA_COLUMNS,
  formatSurveyValue,
  getSurveyAdminPassword,
  isSurveyAdminSessionValid,
  listSurveyResponses,
  SURVEY_ADMIN_COOKIE_NAME,
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

function getSearchParamValue(
  searchParams: Record<string, string | string[] | undefined>,
  key: string
) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

function buildDisplayField(field: string, rawValue: string | null) {
  return {
    key: field,
    label: SURVEY_RESPONSE_LABELS[field] ?? field,
    rawValue,
    value: formatSurveyValue(field, rawValue)
  };
}

function buildResponseViewModel(row: SurveyResponseRow, index: number) {
  const responseId = row.id ?? `response-${index + 1}`;
  const answeredCount = SURVEY_FIELD_ORDER.filter((field) => Boolean(row[field])).length;
  const totalQuestions = SURVEY_FIELD_ORDER.length;
  const completionPercent = totalQuestions
    ? Math.round((answeredCount / totalQuestions) * 100)
    : 0;

  const sections = MISSION_PHASES.map((phase) => {
    const items = phase.questions
      .map((question) => buildDisplayField(question.id, row[question.id]))
      .filter((item) => item.rawValue);

    return {
      key: phase.key,
      title: phase.title,
      subtitle: phase.subtitle,
      answeredCount: items.length,
      unansweredCount: phase.questions.length - items.length,
      items
    };
  }).filter((section) => section.items.length > 0);

  const metadataItems = [
    buildDisplayField("id", responseId),
    ...BACKEND_METADATA_COLUMNS.map((field) => buildDisplayField(field, row[field]))
  ].filter((item) => item.rawValue);

  const overviewItems = [
    buildDisplayField("age", row.age),
    buildDisplayField("grade", row.grade),
    buildDisplayField("interest_level", row.interest_level),
    buildDisplayField("try_diamond", row.try_diamond),
    buildDisplayField("device_type", row.device_type),
    buildDisplayField("geo_country", row.geo_country)
  ].filter((item) => item.rawValue);

  const facets = {
    age: buildDisplayField("age", row.age),
    grade: buildDisplayField("grade", row.grade),
    interest: buildDisplayField("interest_level", row.interest_level),
    device: buildDisplayField("device_type", row.device_type),
    country: buildDisplayField("geo_country", row.geo_country),
    tryDiamond: buildDisplayField("try_diamond", row.try_diamond),
    browser: buildDisplayField("browser_family", row.browser_family)
  };

  const searchText = [
    responseId,
    row.submitted_at,
    ...SURVEY_FIELD_ORDER.map((field) => row[field]),
    ...BACKEND_METADATA_COLUMNS.map((field) => row[field]),
    ...overviewItems.map((item) => item.value)
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return {
    id: responseId,
    responseLabel: `Response ${String(index + 1).padStart(2, "0")}`,
    submittedAtLabel: formatSurveyValue("submitted_at", row.submitted_at),
    submittedAtRaw: row.submitted_at,
    responseId,
    answeredCount,
    totalQuestions,
    completionPercent,
    searchText,
    facets,
    overviewItems,
    sections,
    metadataItems
  };
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

  if (loadError) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-[32px] border border-rose-400/25 bg-slate-950/80 p-8 shadow-2xl shadow-rose-500/10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-rose-200">
                Data Load Error
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-white">
                Survey responses could not be loaded
              </h1>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {loadError}
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
        </div>
      </section>
    );
  }

  const dashboardResponses = responses.map(buildResponseViewModel);

  return (
    <SurveyResponsesDashboard
      endpointPath="/api/survey-responses"
      responses={dashboardResponses}
      lockAction={logoutOfSurveyResponses}
    />
  );
}
