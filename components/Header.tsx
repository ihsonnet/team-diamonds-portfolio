// app/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Diamond, Sparkles } from "lucide-react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const SECTION2_BG = "/images/section-2-bg.jpg";

export default function Header() {
  const pathname = usePathname();

  const navLink = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={cx(
          "relative text-sm font-semibold transition",
          active ? "text-cyan-200" : "text-white/70 hover:text-white"
        )}
      >
        {label}
        {active ? (
          <span className="pointer-events-none absolute -bottom-4 left-1/2 h-[2px] w-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-300 opacity-90" />
        ) : null}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Background image + overlays (same vibe as Section 2) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${SECTION2_BG}")` }}
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-slate-950/60 to-slate-950/85" />
        <div className="absolute inset-0 [background:radial-gradient(900px_220px_at_50%_0%,rgba(255,255,255,0.09),transparent_60%)]" />
        <div className="absolute inset-0 opacity-80 [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:220px_220px]" />
        <div className="absolute inset-0 backdrop-blur-xl" />
      </div>

      {/* Subtle bottom arc hint (ties to the Section-2 “arc connector”) */}


      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <span className="pointer-events-none absolute -inset-2 rounded-3xl bg-[radial-gradient(14px_14px_at_40%_35%,rgba(34,211,238,0.28),transparent_60%),radial-gradient(14px_14px_at_70%_65%,rgba(99,102,241,0.22),transparent_60%)] opacity-0 transition group-hover:opacity-100" />
            <Diamond className="text-cyan-300" size={18} />
          </span>
          <div className="leading-tight">
            <div className="text-base font-bold tracking-tight text-white">
              Team Diamonds
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLink("/", "Home")}
          {navLink("/diamond-in-the-sky", "Diamond In The Sky")}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">

          <Link
            href="/survey"
            className={cx(
              "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold",
              "bg-cyan-500 text-black hover:brightness-110 transition",
              "shadow-[0_0_30px_rgba(0,212,255,0.15)]"
            )}
          >
            <ClipboardList size={16} />
            Take Survey
          </Link>
        </div>
      </div>

      {/* Mobile nav (simple, still same vibe) */}
      <div className="border-t border-white/10 bg-black/10 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-3">
          {navLink("/", "Home")}
          {navLink("/diamond-in-the-sky", "Diamond In The Sky")}
        </div>
      </div>
    </header>
  );
}