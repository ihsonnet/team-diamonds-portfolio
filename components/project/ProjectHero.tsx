"use client";

import Link from "next/link";
import { Play, Gamepad2, Star } from "lucide-react";
import { DEMO_VIDEO_URL } from "@/lib/externalLinks";

export default function ProjectHero() {
  const HERO_BG = "/images/home-hero.jpeg";

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-12">

      {/* Animated backdrop logo + glows - Adjusted positioning to align with content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="relative w-full h-full max-w-[1200px] max-h-[1200px] animate-float opacity-30 md:opacity-40 -translate-y-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-indigo-500/20 blur-[120px] rounded-full mix-blend-screen" />
          <img
            src="/images/Diamond_Logo.png"
            alt="Diamond In The Sky Logo backdrop"
            className="w-full h-full object-contain drop-shadow-[0_0_80px_rgba(99,102,241,0.5)]"
          />
          <Star className="absolute top-[15%] left-[20%] w-6 h-6 text-white/50 animate-pulse" />
          <Star className="absolute bottom-[25%] right-[15%] w-4 h-4 text-indigo-400/80 animate-pulse delay-300" />
        </div>
      </div>

      {/* Main content - Margin adjusted to move up */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 w-full max-w-7xl mx-auto -mt-16 md:-mt-24">

        <h1 className="text-[55px] md:text-8xl lg:text-[110px] xl:text-[130px] font-black tracking-tighter leading-[0.95] mb-8 uppercase drop-shadow-2xl">
          <span className="text-white block mb-2 md:mb-4">Diamond</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 block mb-2 md:mb-4">In The</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 block">Sky</span>
        </h1>

        <p className="text-lg md:text-2xl lg:text-3xl font-bold uppercase tracking-[0.25em] text-white/95 mb-4 drop-shadow-lg leading-tight">
          A new eye to see the unseen
        </p>
        <p className="text-sm md:text-base lg:text-lg text-blue-300/90 font-medium tracking-wide mb-12 max-w-2xl drop-shadow-md">
          — Learn, Play, and Explore the Unseen Night Sky! —
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center">
          <Link href="/play" className="group relative px-10 py-4 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 overflow-hidden font-bold transition-all uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(96,165,250,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:-translate-y-1 w-full sm:w-auto">
            <div className="absolute inset-0 -left-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
            <span className="relative flex items-center justify-center gap-3 text-white drop-shadow-md">
              <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Play The Game
            </span>
          </Link>

          <a
            href={DEMO_VIDEO_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative px-10 py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden font-bold transition-all uppercase tracking-widest text-sm hover:border-indigo-400/60 hover:bg-indigo-900/20 hover:-translate-y-1 w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-3 text-white">
              <Play className="w-4 h-4 text-blue-400 group-hover:scale-125 transition-transform duration-300" />
              Watch Demo
            </span>
          </a>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
