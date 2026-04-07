import { NextRequest, NextResponse } from "next/server";
import {
  buildSurveyDashboardSummary,
  isSurveyAdminSessionValid,
  listSurveyResponses,
  matchesSurveyAdminPassword
} from "@/lib/surveyResponses";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getBearerToken(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice("Bearer ".length).trim();
}

function isAuthorized(req: NextRequest) {
  const passwordHeader = req.headers.get("x-survey-admin-password");
  const bearerToken = getBearerToken(req);
  const sessionCookie = req.cookies.get("survey_admin_session")?.value;

  return (
    matchesSurveyAdminPassword(passwordHeader) ||
    matchesSurveyAdminPassword(bearerToken) ||
    isSurveyAdminSessionValid(sessionCookie)
  );
}

function getRequestedLimit(req: NextRequest) {
  const rawLimit = Number(req.nextUrl.searchParams.get("limit") ?? "250");
  if (!Number.isFinite(rawLimit) || rawLimit <= 0) return 250;
  return Math.min(Math.floor(rawLimit), 1000);
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unauthorized"
      },
      { status: 401 }
    );
  }

  try {
    const responses = await listSurveyResponses(getRequestedLimit(req));
    const summary = buildSurveyDashboardSummary(responses);

    return NextResponse.json({
      ok: true,
      summary,
      responses
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unable to load survey responses."
      },
      { status: 500 }
    );
  }
}
