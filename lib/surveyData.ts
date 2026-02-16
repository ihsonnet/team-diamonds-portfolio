export const SURVEY_META = {
  title: "Kids Space Learning Survey",
  description:
    "Help us improve Diamond In The Sky. We do not collect name, email, phone, address, or school name."
} as const;

export const SURVEY_FIELDS = {
  ages: ["8","9","10","11","12","13","14","15"],
  grades: ["Class 3","Class 4","Class 5","Class 6","Class 7","Other"],
  genders: [
    { value: "boy", label: "Boy" },
    { value: "girl", label: "Girl" },
    { value: "prefer_not_say", label: "Prefer not to say" }
  ],
  interestLevels: [
    { value: "very_high", label: "Very High" },
    { value: "some", label: "Some" },
    { value: "normal", label: "Normal" },
    { value: "low", label: "Low" },
    { value: "none", label: "None" }
  ]
} as const;
