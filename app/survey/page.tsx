"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Shield, Sparkles, ChevronRight, Check } from "lucide-react";
import { SURVEY_META, SURVEY_STEPS } from "@/lib/surveyData";

type Answers = Record<string, string | string[]>;

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function pill(active: boolean) {
  return cx(
    "rounded-2xl border px-4 py-2 text-sm font-semibold transition select-none",
    "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]",
    active
      ? "bg-cyan-500/15 border-cyan-500/45 text-cyan-100 shadow-[0_0_26px_rgba(0,212,255,0.12)]"
      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/15"
  );
}

export default function SurveyPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const total = SURVEY_STEPS.length;
  const current = SURVEY_STEPS[step];

  const progress = useMemo(() => {
    const pct = Math.round(((step + 1) / total) * 100);
    return { pct, label: `${step + 1} / ${total}` };
  }, [step, total]);

  function setSingle(id: string, value: string) {
    setAnswers((a) => ({ ...a, [id]: value }));
  }

  function toggleMulti(id: string, value: string, max?: number) {
    setAnswers((a) => {
      const prev = (a[id] as string[]) || [];
      const exists = prev.includes(value);
      let next = exists ? prev.filter((x) => x !== value) : [...prev, value];
      if (!exists && max && next.length > max) next = next.slice(next.length - max);
      return { ...a, [id]: next };
    });
  }

  function v(id: string) {
    return answers[id];
  }

  function canGoNext() {
    for (const q of current.questions as any[]) {
      if (q.required) {
        const val = answers[q.id];
        if (!val || (Array.isArray(val) && val.length === 0)) return false;
      }
    }
    return true;
  }

  async function submitAll() {
    setMsg(null);
    try {
      setSubmitting(true);

      const payload = {
        ...answers,
        created_at: new Date().toISOString(),
        step_count: total
      };

      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Submission failed.");
      setMsg("✅ Submitted! Thank you for helping Team Diamonds.");
    } catch (e: any) {
      setMsg(e?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  function emoji(key: string) {
    if (key === "about") return "👋";
    if (key === "interest") return "✨";
    if (key === "learning") return "🎮";
    if (key === "dreams") return "🚀";
    return "✨";
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-navy-950 text-slate-100">
      {/* Night sky background + glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(0,212,255,0.10)_0%,rgba(11,16,32,0.10)_22%,rgba(5,7,10,1)_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,212,255,0.12)_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.10)_0%,transparent_45%)]" />

        {/* Stars */}
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/70 opacity-30 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        {/* Cyan sparkles */}
        {[...Array(18)].map((_, i) => (
          <div
            key={`c-${i}`}
            className="absolute rounded-full bg-cyan-500/80"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: "2px",
              height: "2px",
              opacity: 0.25
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => (step === 0 ? history.back() : setStep((s) => Math.max(0, s - 1)))}
              className="flex items-center gap-2 text-white/70 hover:text-white transition text-sm"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div className="flex items-center gap-2 text-white/90 font-semibold">
              <span className="w-4 h-4 rounded bg-cyan-500/90 rotate-45 shadow-[0_0_24px_rgba(0,212,255,0.25)]" />
              {SURVEY_META.brand}
            </div>

            <div className="w-[60px]" />
          </div>

          {/* Heading */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-100 text-sm font-semibold backdrop-blur">
              <Sparkles size={16} className="text-cyan-300" />
              {SURVEY_META.agesLabel}
            </div>

            <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              {SURVEY_META.headline}
            </h1>

            <div className="mt-6 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4 flex items-center gap-3 text-sm text-white/70 backdrop-blur">
              <Shield className="text-cyan-300" size={18} />
              <span>
                <span className="font-semibold text-white/90">For Parents:</span>{" "}
                {SURVEY_META.parentNote.replace("For Parents: ", "")}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <span className="text-cyan-300">{emoji(current.key)}</span>
              <span>{current.title}</span>
            </div>
            <div className="text-white/50 text-sm">{progress.label}</div>
          </div>

          <div className="mt-3 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500/90" style={{ width: `${progress.pct}%` }} />
          </div>

          {/* Card */}
          <div
            className={cx(
              "mt-8 mx-auto max-w-2xl rounded-3xl border border-white/10",
              "bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl",
              "shadow-[0_0_90px_rgba(0,0,0,0.55)]"
            )}
          >
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 text-white">
                <div className="text-lg text-cyan-300">{emoji(current.key)}</div>
                <h2 className="text-xl md:text-2xl font-bold">{current.title}</h2>
              </div>

              <div className="mt-8 space-y-8">
                {(current.questions as any[]).map((q) => (
                  <div key={q.id} className="space-y-3">
                    <div className="text-white/90 font-semibold">{q.label}</div>

                    {q.type === "single" ? (
                      <div className="flex flex-wrap gap-3">
                        {q.options.map((opt: any) => {
                          const active = v(q.id) === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setSingle(q.id, opt.value)}
                              className={pill(active)}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}

                    {q.type === "multi" ? (
                      <div className="flex flex-wrap gap-3">
                        {q.options.map((opt: any) => {
                          const arr = (v(q.id) as string[]) || [];
                          const active = arr.includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => toggleMulti(q.id, opt.value, q.max)}
                              className={pill(active)}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                        {q.max ? (
                          <div className="text-xs text-white/45 w-full pt-1">
                            Selected: {(((v(q.id) as string[]) || []).length)} / {q.max}
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {q.type === "text" ? (
                      <input
                        value={(v(q.id) as string) || ""}
                        onChange={(e) => setSingle(q.id, e.target.value)}
                        placeholder={q.placeholder || ""}
                        className={cx(
                          "w-full rounded-2xl border border-white/10",
                          "bg-navy-900/70 px-4 py-4 text-sm text-white/90 shadow-inner",
                          "placeholder:text-white/35",
                          "focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20",
                          "transition"
                        )}
                      />
                    ) : null}
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="mt-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition text-sm disabled:opacity-40"
                  disabled={step === 0 || submitting}
                >
                  <ChevronRight className="rotate-180" size={16} />
                  Previous
                </button>

                {step < total - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
                    disabled={!canGoNext() || submitting}
                    className={cx(
                      "inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold",
                      "bg-cyan-500 text-black hover:brightness-110",
                      "disabled:opacity-60 transition shadow-[0_0_30px_rgba(0,212,255,0.12)]"
                    )}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitAll}
                    disabled={submitting || !canGoNext()}
                    className={cx(
                      "inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold",
                      "bg-cyan-500 text-black hover:brightness-110",
                      "disabled:opacity-60 transition shadow-[0_0_30px_rgba(0,212,255,0.12)]"
                    )}
                  >
                    {submitting ? "Submitting..." : "Submit"} <Check size={16} />
                  </button>
                )}
              </div>

              {msg ? (
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
                  {msg}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-10 text-center text-xs text-white/45">
            We do not collect name, email, phone, address, or school name. Responses are used only to improve the game.
          </div>
        </div>
      </div>
    </main>
  );
}