import { NextResponse } from "next/server";
import { SURVEY_FIELD_ORDER } from "@/lib/missionSurvey";

export const runtime = "nodejs";

const BACKEND_METADATA_COLUMNS = [
  "referer_origin",
  "referer_path",
  "preferred_language",
  "browser_family",
  "os_family",
  "device_type",
  "geo_country",
  "request_id"
] as const;

function getEnv(name: string) {
  const value = process.env[name];
  return value?.trim() || null;
}

function firstNonEmpty(...values: Array<string | null>) {
  return values.find((value) => Boolean(value)) ?? "";
}

function normalizeHeaderValue(value: string | null) {
  return value?.replace(/^"+|"+$/g, "").trim() ?? "";
}

function normalizeDatabaseText(value: unknown) {
  if (value == null) return null;

  const normalized =
    typeof value === "string"
      ? value.trim()
      : Array.isArray(value)
        ? value.join(", ").trim()
        : String(value).trim();

  return normalized ? normalized : null;
}

function extractPreferredLanguage(req: Request) {
  const header = req.headers.get("accept-language");
  if (!header) return "";

  const [primaryLanguage] = header.split(",");
  return primaryLanguage?.split(";")[0]?.trim() ?? "";
}

function extractBrowserFamily(userAgent: string) {
  const ua = userAgent.toLowerCase();

  if (!ua) return "";
  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("opr/") || ua.includes("opera")) return "Opera";
  if (ua.includes("firefox/")) return "Firefox";
  if (ua.includes("chrome/") || ua.includes("crios/")) return "Chrome";
  if (ua.includes("safari/")) return "Safari";

  return "Other";
}

function extractOsFamily(req: Request, userAgent: string) {
  const platformHint = normalizeHeaderValue(req.headers.get("sec-ch-ua-platform"));
  if (platformHint) return platformHint;

  const ua = userAgent.toLowerCase();
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ios")) return "iOS";
  if (ua.includes("android")) return "Android";
  if (ua.includes("windows")) return "Windows";
  if (ua.includes("mac os") || ua.includes("macintosh")) return "macOS";
  if (ua.includes("cros")) return "ChromeOS";
  if (ua.includes("linux")) return "Linux";

  return "";
}

function extractDeviceType(req: Request, userAgent: string) {
  const mobileHint = normalizeHeaderValue(req.headers.get("sec-ch-ua-mobile"));
  const ua = userAgent.toLowerCase();

  if (ua.includes("ipad") || ua.includes("tablet")) return "tablet";
  if (mobileHint === "?1") return "mobile";
  if (ua.includes("mobi") || ua.includes("iphone") || ua.includes("android")) return "mobile";

  return "desktop";
}

function extractRefererMetadata(req: Request) {
  const referer = req.headers.get("referer");
  if (!referer) {
    return {
      referer_origin: "",
      referer_path: ""
    };
  }

  try {
    const url = new URL(referer);
    return {
      referer_origin: url.origin,
      referer_path: url.pathname
    };
  } catch {
    return {
      referer_origin: "",
      referer_path: ""
    };
  }
}

function collectBackendMetadata(req: Request) {
  const userAgent = req.headers.get("user-agent") ?? "";
  const refererMetadata = extractRefererMetadata(req);

  return {
    ...refererMetadata,
    preferred_language: extractPreferredLanguage(req),
    browser_family: extractBrowserFamily(userAgent),
    os_family: extractOsFamily(req, userAgent),
    device_type: extractDeviceType(req, userAgent),
    geo_country: firstNonEmpty(
      req.headers.get("x-vercel-ip-country"),
      req.headers.get("cf-ipcountry")
    ),
    request_id: firstNonEmpty(
      req.headers.get("x-vercel-id"),
      req.headers.get("cf-ray")
    )
  };
}

function buildSurveyResponse(body: Record<string, unknown>, req: Request) {
  const metadata = collectBackendMetadata(req);
  const response: Record<string, string | null> = {
    submitted_at: new Date().toISOString()
  };

  for (const field of SURVEY_FIELD_ORDER) {
    response[field] = normalizeDatabaseText(body[field]);
  }

  for (const field of BACKEND_METADATA_COLUMNS) {
    response[field] = normalizeDatabaseText(metadata[field]);
  }

  return response;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const surveyResponse = buildSurveyResponse(body, req);
    const isProduction = process.env.NODE_ENV === "production";

    const supabaseUrl = getEnv("SUPABASE_URL");
    const supabaseKey =
      getEnv("SUPABASE_SECRET_KEY") || getEnv("SUPABASE_SERVICE_ROLE_KEY");
    const tableName = getEnv("SUPABASE_SURVEY_TABLE") || "survey_responses";

    if (!supabaseUrl || !supabaseKey) {
      if (isProduction) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY."
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        stored: "local-dev",
        received: surveyResponse
      });
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify(surveyResponse),
        cache: "no-store"
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to insert survey response.");
    }

    return NextResponse.json({
      ok: true,
      stored: "supabase",
      table: tableName
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
