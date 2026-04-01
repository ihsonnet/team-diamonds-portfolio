import { NextResponse } from "next/server";
import { google } from "googleapis";
import { SURVEY_FIELD_ORDER } from "@/lib/missionSurvey";

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

const SURVEY_SHEET_COLUMNS = [
  "submitted_at",
  ...SURVEY_FIELD_ORDER,
  ...BACKEND_METADATA_COLUMNS
] as const;

function getEnv(name: string) {
  const v = process.env[name];
  if (!v) return null;
  return v;
}

function normalizeCellValue(value: unknown) {
  if (value == null) return "";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function firstNonEmpty(...values: Array<string | null>) {
  return values.find((value) => Boolean(value)) ?? "";
}

function normalizeHeaderValue(value: string | null) {
  return value?.replace(/^"+|"+$/g, "").trim() ?? "";
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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const backendMetadata = collectBackendMetadata(req);

    const spreadsheetId = getEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
    const clientEmail = getEnv("GOOGLE_SHEETS_CLIENT_EMAIL");
    const privateKeyRaw = getEnv("GOOGLE_SHEETS_PRIVATE_KEY");
    const tabName = getEnv("GOOGLE_SHEETS_TAB_NAME") || "Responses";

    // If env is missing, still allow local dev without breaking UI
    if (!spreadsheetId || !clientEmail || !privateKeyRaw) {
      return NextResponse.json({
        ok: true,
        stored: "local-dev",
        received: {
          ...body,
          ...backendMetadata
        },
        columns: SURVEY_SHEET_COLUMNS
      });
    }

    const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const sheets = google.sheets({ version: "v4", auth });
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tabName}!1:1`
    });
    const currentHeaderRow = headerResponse.data.values?.[0] ?? [];
    const expectedHeaderRow = Array.from(SURVEY_SHEET_COLUMNS);
    const headerMatches =
      currentHeaderRow.length === expectedHeaderRow.length &&
      currentHeaderRow.every((value, index) => value === expectedHeaderRow[index]);

    if (!headerMatches) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${tabName}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [expectedHeaderRow]
        }
      });
    }

    const submittedAt = new Date().toISOString();
    const rowData: Record<string, unknown> = {
      ...body,
      ...backendMetadata
    };
    const values = [
      SURVEY_SHEET_COLUMNS.map((column) =>
        column === "submitted_at"
          ? submittedAt
          : normalizeCellValue(rowData[column])
      )
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A2`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values }
    });

    return NextResponse.json({
      ok: true,
      stored: "google-sheets",
      columns: SURVEY_SHEET_COLUMNS
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 });
  }
}
