"use client";

import { useState } from "react";
import { SURVEY_META, SURVEY_FIELDS } from "@/lib/surveyData";

export default function SurveyPage() {
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("prefer_not_say");
  const [interest, setInterest] = useState("normal");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setMsg(null);
    if (!age || !grade) {
      setMsg("Please select Age and Grade.");
      return;
    }

    const payload = {
      age,
      grade,
      gender,
      interest_level: interest,
      created_at: new Date().toISOString()
    };

    try {
      setLoading(true);
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Submission failed.");
      setMsg("✅ Submitted! Thank you.");
    } catch (e: any) {
      setMsg(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#05070a] text-slate-100 px-6 py-12">
      <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold">{SURVEY_META.title}</h1>
        <p className="mt-3 text-slate-300">{SURVEY_META.description}</p>

        <div className="mt-10 grid gap-6">
          <div>
            <label className="text-sm text-slate-300 font-semibold">Age</label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b0f15] px-3 py-3 text-sm outline-none"
            >
              <option value="">Select age</option>
              {SURVEY_FIELDS.ages.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-300 font-semibold">Grade / Class</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b0f15] px-3 py-3 text-sm outline-none"
            >
              <option value="">Select grade</option>
              {SURVEY_FIELDS.grades.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-300 font-semibold">Gender</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {SURVEY_FIELDS.genders.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGender(g.value)}
                  className={[
                    "px-4 py-2 rounded-xl border text-sm font-semibold transition",
                    gender === g.value
                      ? "bg-white text-black border-white"
                      : "bg-white/5 border-white/15 text-white/85 hover:bg-white/10"
                  ].join(" ")}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-300 font-semibold">Space Interest Level</label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b0f15] px-3 py-3 text-sm outline-none"
            >
              {SURVEY_FIELDS.interestLevels.map((x) => (
                <option key={x.value} value={x.value}>{x.label}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="rounded-xl bg-white text-black px-6 py-3 text-sm font-bold hover:opacity-90 disabled:opacity-60 transition"
          >
            {loading ? "Submitting..." : "Submit Survey"}
          </button>

          {msg ? <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">{msg}</div> : null}

          <div className="text-xs text-slate-300/80">
            We do not collect name, email, phone, address, or school name. Responses are used only to improve the game.
          </div>
        </div>
      </div>
    </main>
  );
}
