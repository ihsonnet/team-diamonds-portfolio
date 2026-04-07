"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SURVEY_ADMIN_COOKIE_NAME,
  createSurveyAdminSessionValue,
  getSurveyAdminPassword,
  matchesSurveyAdminPassword
} from "@/lib/surveyResponses";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production"
  };
}

export async function loginToSurveyResponses(formData: FormData) {
  const submittedPassword = formData.get("password");
  const configuredPassword = getSurveyAdminPassword();

  if (!configuredPassword) {
    redirect("/survey-responses?error=config");
  }

  if (
    typeof submittedPassword !== "string" ||
    !matchesSurveyAdminPassword(submittedPassword)
  ) {
    redirect("/survey-responses?error=invalid");
  }

  const cookieStore = await cookies();
  cookieStore.set(
    SURVEY_ADMIN_COOKIE_NAME,
    createSurveyAdminSessionValue(configuredPassword),
    getCookieOptions(SESSION_MAX_AGE_SECONDS)
  );

  redirect("/survey-responses");
}

export async function logoutOfSurveyResponses() {
  const cookieStore = await cookies();
  cookieStore.set(SURVEY_ADMIN_COOKIE_NAME, "", {
    ...getCookieOptions(0),
    expires: new Date(0)
  });

  redirect("/survey-responses");
}
