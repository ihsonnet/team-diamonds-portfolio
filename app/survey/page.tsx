"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Shield,
  Sparkles,
  ChevronRight,
  Check,
  Stars,
  Telescope,
  Orbit,
} from "lucide-react";
import { SURVEY_META, SURVEY_STEPS } from "@/lib/surveyData";

type Answers = Record<string, string | string[]>;

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Glass styles aligned with Diamond In The Sky dark UI */
const glass =
  "bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-[0_22px_80px_rgba(0,0,0,0.55)]";
const card =
  "bg-white/[0.055] backdrop-blur-md border border-white/10 shadow-[0_14px_50px_rgba(0,0,0,0.45)]";

function pill(active: boolean) {
  return cx(
    "relative rounded-2xl border px-4 py-2 text-sm font-semibold transition select-none",
    "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/30 focus-visible:ring-offset-0",
    active
      ? "bg-cyan-500/15 border-cyan-500/45 text-cyan-100 shadow-[0_0_26px_rgba(0,212,255,0.12)]"
      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/15"
  );
}

/** Top arc connector “cap” (same motif as your section-2 arc) */
function ArcCap() {
  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 h-24 w-full sm:h-28"
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,0 H1200 V60
           C920,120 740,150 600,150
           C460,150 280,120 0,60
           Z"
        fill="rgba(2,6,23,0.72)"
      />
      <path
        d="M0,58
           C280,118 460,145 600,145
           C740,145 920,118 1200,58"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="2"
      />
    </svg>
  );
}

/** Small “section kicker” pill (like your SectionKicker but local to this file) */
function Kicker({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="mx-auto mb-2 flex w-fit items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
      <Icon className="h-4 w-4 text-indigo-200" />
      {label}
    </div>
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
        step_count: total,
      };

      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    <main className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      {/* Background: night sky (no image), star field, glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* base glows */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(99,102,241,0.22),transparent_60%),radial-gradient(900px_600px_at_80%_20%,rgba(14,165,233,0.18),transparent_55%),radial-gradient(1000px_700px_at_20%_40%,rgba(16,185,129,0.12),transparent_60%),radial-gradient(1200px_800px_at_50%_100%,rgba(245,158,11,0.08),transparent_60%)]" />
        {/* stars layers */}
        <div className="absolute inset-0 opacity-55 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:46px_46px]" />
        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/60" />
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

          {/* Hero / Intro */}
          <div className="mt-10 text-center">
            <Kicker icon={Stars} label="Kids Survey" />

            <div className="mx-auto mt-3 w-fit rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-100 text-sm font-semibold backdrop-blur">
              <span className="inline-flex items-center gap-2">
                <Sparkles size={16} className="text-cyan-300" />
                {SURVEY_META.agesLabel}
              </span>
            </div>

            <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              {SURVEY_META.headline}
            </h1>

            <div className="mt-6 mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 px-5 py-4 flex items-center gap-3 text-sm text-white/75 backdrop-blur">
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
              <span className="text-cyan-200">{emoji(current.key)}</span>
              <span>{current.title}</span>
            </div>
            <div className="text-white/50 text-sm">{progress.label}</div>
          </div>

          <div className="mt-3 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500/90" style={{ width: `${progress.pct}%` }} />
          </div>

          {/* Main framed panel with arc connector */}
          <div className="relative mt-8 mx-auto max-w-3xl">
            <div
              className={cx(
                "relative overflow-hidden rounded-[44px]",
                "bg-slate-950/50 backdrop-blur-xl border border-white/10",
                "shadow-[0_28px_90px_rgba(0,0,0,0.65)]"
              )}
            >
              {/* arc cap */}
              <ArcCap />

              {/* inner glow */}
              <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_520px_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/25" />

              <div className="relative px-6 pb-6 pt-24 md:px-10 md:pb-10 md:pt-28">
                {/* Step header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-lg text-cyan-200">{emoji(current.key)}</div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-extrabold text-white">
                        {current.title}
                      </h2>
                      <p className="mt-1 text-sm text-white/60">
                        Answer a few quick questions — it helps us improve the game.
                      </p>
                    </div>
                  </div>

                  {/* small “step pill” */}
                  <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/75">
                    <Orbit className="h-4 w-4 text-indigo-200" />
                    Step {progress.label}
                  </div>
                </div>

                {/* Questions */}
                <div className="mt-8 space-y-8">
                  {(current.questions as any[]).map((q) => (
                    <div key={q.id} className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-white/90 font-semibold">{q.label}</div>
                        {q.required ? (
                          <span className="text-[11px] font-semibold text-white/45">
                            Required
                          </span>
                        ) : null}
                      </div>

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
                                {active ? (
                                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-500/40 align-middle">
                                    <Check className="h-3.5 w-3.5 text-cyan-200" />
                                  </span>
                                ) : (
                                  <span className="mr-2 inline-flex h-5 w-5 rounded-full bg-white/5 border border-white/10 align-middle" />
                                )}
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
                                {active ? (
                                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-500/40 align-middle">
                                    <Check className="h-3.5 w-3.5 text-cyan-200" />
                                  </span>
                                ) : (
                                  <span className="mr-2 inline-flex h-5 w-5 rounded-full bg-white/5 border border-white/10 align-middle" />
                                )}
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
                        <div className="relative">
                          <input
                            value={(v(q.id) as string) || ""}
                            onChange={(e) => setSingle(q.id, e.target.value)}
                            placeholder={q.placeholder || ""}
                            className={cx(
                              "w-full rounded-2xl border border-white/10",
                              "bg-slate-950/40 px-4 py-4 text-sm text-white/90 shadow-inner",
                              "placeholder:text-white/35",
                              "focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20",
                              "transition outline-none"
                            )}
                          />
                          <div className="pointer-events-none absolute inset-x-3 bottom-2 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.18),transparent)]" />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                {/* Controls */}
                <div className="mt-10 flex items-center justify-between gap-4">
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

                {/* privacy note inside frame */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs text-white/60">
                  <div className="flex items-start gap-3">
                    <Telescope className="h-4 w-4 text-cyan-200 mt-0.5" />
                    <p>
                      We do not collect name, email, phone, address, or school name. Responses are
                      used only to improve the game.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* subtle separator below */}
            <div className="mt-10 flex items-center justify-center">
              <div className="h-[3px] w-[min(720px,90%)] rounded-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.14),transparent)]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}