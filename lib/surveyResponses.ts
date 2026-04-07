import { createHash, timingSafeEqual } from "node:crypto";
import { MISSION_PHASES, SURVEY_FIELD_ORDER } from "@/lib/missionSurvey";

export const BACKEND_METADATA_COLUMNS = [
  "referer_origin",
  "referer_path",
  "preferred_language",
  "browser_family",
  "os_family",
  "device_type",
  "geo_country",
  "request_id"
] as const;

const SYSTEM_COLUMNS = ["id", "submitted_at"] as const;

export const SURVEY_ADMIN_COOKIE_NAME = "survey_admin_session";

export const SURVEY_RESPONSE_COLUMNS = [
  ...SYSTEM_COLUMNS,
  ...SURVEY_FIELD_ORDER,
  ...BACKEND_METADATA_COLUMNS
] as const;

export type SurveyResponseRow = Record<string, string | null>;
export type SurveyBreakdownItem = {
  value: string;
  label: string;
  count: number;
};

export type SurveyDashboardSummary = {
  totalResponses: number;
  countriesSeen: number;
  latestSubmission: string | null;
  deviceTypes: SurveyBreakdownItem[];
  countries: SurveyBreakdownItem[];
  interestLevels: SurveyBreakdownItem[];
  tryDiamond: SurveyBreakdownItem[];
};

export const SURVEY_RESPONSE_LABELS = Object.fromEntries([
  ["id", "Response ID"],
  ["submitted_at", "Submitted At"],
  ["referer_origin", "Referer Origin"],
  ["referer_path", "Referer Path"],
  ["preferred_language", "Preferred Language"],
  ["browser_family", "Browser"],
  ["os_family", "Operating System"],
  ["device_type", "Device Type"],
  ["geo_country", "Country"],
  ["request_id", "Request ID"],
  ...MISSION_PHASES.flatMap((phase) =>
    phase.questions.map((question) => [question.id, question.label] as const)
  )
]) as Record<string, string>;

export const SURVEY_OPTION_LABELS = Object.fromEntries(
  MISSION_PHASES.flatMap((phase) =>
    phase.questions.map((question) => [
      question.id,
      Object.fromEntries(
        question.options.map((option) => [option.value, option.label] as const)
      )
    ])
  )
) as Record<string, Record<string, string>>;

function getEnv(name: string) {
  const value = process.env[name];
  return value?.trim() || null;
}

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function getSurveyAdminPassword() {
  return getEnv("SURVEY_RESPONSES_PASSWORD");
}

export function createSurveyAdminSessionValue(password: string) {
  return hashValue(`survey-admin-session:${password}`);
}

export function matchesSurveyAdminPassword(candidate: string | null | undefined) {
  const password = getSurveyAdminPassword();

  if (!password || typeof candidate !== "string") return false;

  const passwordBuffer = Buffer.from(password);
  const candidateBuffer = Buffer.from(candidate);

  if (passwordBuffer.length !== candidateBuffer.length) return false;
  return timingSafeEqual(passwordBuffer, candidateBuffer);
}

export function isSurveyAdminSessionValid(sessionValue: string | undefined | null) {
  const password = getSurveyAdminPassword();

  if (!password || !sessionValue) return false;
  return sessionValue === createSurveyAdminSessionValue(password);
}

export function getSurveyOptionLabel(field: string, value: string | null) {
  if (!value) return null;
  return SURVEY_OPTION_LABELS[field]?.[value] ?? null;
}

export function formatSurveyValue(field: string, value: string | null) {
  if (!value) return "Not provided";

  if (field === "submitted_at") {
    try {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(value));
    } catch {
      return value;
    }
  }

  return getSurveyOptionLabel(field, value) ?? value;
}

function buildFieldBreakdown(
  rows: SurveyResponseRow[],
  field: string,
  limit = 5
) {
  const counts = new Map<string, number>();

  for (const row of rows) {
    const value = row[field];
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([value, count]) => ({
      value,
      count,
      label: formatSurveyValue(field, value)
    }));
}

export function buildSurveyDashboardSummary(
  rows: SurveyResponseRow[]
): SurveyDashboardSummary {
  const countriesSeen = new Set(
    rows.map((row) => row.geo_country).filter(Boolean)
  ).size;

  return {
    totalResponses: rows.length,
    countriesSeen,
    latestSubmission: rows[0]?.submitted_at ?? null,
    deviceTypes: buildFieldBreakdown(rows, "device_type", 4),
    countries: buildFieldBreakdown(rows, "geo_country", 6),
    interestLevels: buildFieldBreakdown(rows, "interest_level", 5),
    tryDiamond: buildFieldBreakdown(rows, "try_diamond", 4)
  };
}

function getSupabaseSurveyConfig() {
  const url = getEnv("SUPABASE_URL");
  const key = getEnv("SUPABASE_SECRET_KEY") || getEnv("SUPABASE_SERVICE_ROLE_KEY");
  const table = getEnv("SUPABASE_SURVEY_TABLE") || "survey_responses";

  if (!url || !key) return null;

  return { url, key, table };
}

export async function listSurveyResponses(limit = 100) {
  const config = getSupabaseSurveyConfig();

  if (!config) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY."
    );
  }

  const endpoint = new URL(
    `/rest/v1/${encodeURIComponent(config.table)}`,
    config.url
  );

  endpoint.searchParams.set("select", SURVEY_RESPONSE_COLUMNS.join(","));
  endpoint.searchParams.set("order", "submitted_at.desc");
  endpoint.searchParams.set("limit", String(limit));

  const response = await fetch(endpoint.toString(), {
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to load survey responses.");
  }

  return (await response.json()) as SurveyResponseRow[];
}
