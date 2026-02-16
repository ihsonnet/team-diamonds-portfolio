"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Diamond, ClipboardList } from "lucide-react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function Header() {
  const pathname = usePathname();

  const navLink = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={cx(
          "text-sm font-semibold transition",
          active ? "text-cyan-200" : "text-white/70 hover:text-white"
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-white/5 border border-white/10">
            <Diamond className="text-cyan-300" size={18} />
          </span>
          <span className="text-base font-bold tracking-tight text-white">
            Team Diamonds
          </span>
        </Link>

        {/* Center: Nav (always single row) */}
        <nav className="flex items-center gap-8">
          {navLink("/", "Home")}
          {navLink("/diamond-in-the-sky", "Diamond In The Sky")}
        </nav>

        {/* Right: CTA */}
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
    </header>
  );
}