"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#05070a]/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-extrabold tracking-tight text-white">
          Team Diamonds
        </Link>

        <nav className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="text-sm font-semibold text-white/80 hover:text-white transition">
            Home
          </Link>
          <Link href="/diamond-in-the-sky" className="text-sm font-semibold text-white/80 hover:text-white transition">
            Diamond in the Sky
          </Link>

          <Link
            href="/survey"
            className="ml-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-bold hover:opacity-90 transition"
          >
            Survey
          </Link>
        </nav>
      </div>
    </header>
  );
}
