import { NextResponse } from "next/server";
import { google } from "googleapis";

function getEnv(name: string) {
  const v = process.env[name];
  if (!v) return null;
  return v;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const spreadsheetId = getEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
    const clientEmail = getEnv("GOOGLE_SHEETS_CLIENT_EMAIL");
    const privateKeyRaw = getEnv("GOOGLE_SHEETS_PRIVATE_KEY");
    const tabName = getEnv("GOOGLE_SHEETS_TAB_NAME") || "Responses";

    // If env is missing, still allow local dev without breaking UI
    if (!spreadsheetId || !clientEmail || !privateKeyRaw) {
      return NextResponse.json({ ok: true, stored: "local-dev", received: body });
    }

    const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const sheets = google.sheets({ version: "v4", auth });

    const values = [
      [
        new Date().toISOString(),
        body.age ?? "",
        body.grade ?? "",
        body.gender ?? "",
        body.interest_level ?? "",
        body.locale ?? "",
        body.user_agent ?? ""
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A:G`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values }
    });

    return NextResponse.json({ ok: true, stored: "google-sheets" });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 });
  }
}
