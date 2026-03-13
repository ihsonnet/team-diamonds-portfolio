"use client";

import { Star, Telescope, Lightbulb } from "lucide-react";

export default function Join() {
  return (
    <section className="relative py-40 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#02040A]">
      <div className="max-w-4xl mx-auto text-center space-y-12 animate-float">

        <h2 className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-2xl text-white">
          Join the Journey <br /> of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Discovery
          </span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-8 text-lg font-medium text-white/80">
          <div className="flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-blue-400" /> Play & Learn
          </div>
          <div className="flex items-center justify-center gap-2">
            <Telescope className="w-5 h-5 text-indigo-400" /> Explore Stars
          </div>
          <div className="flex items-center justify-center gap-2">
            <Lightbulb className="w-5 h-5 text-indigo-500" /> Be Inspired
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            Start Learning
          </button>
          <button className="px-10 py-4 rounded-xl border border-indigo-400/50 hover:bg-indigo-500/20 text-white font-bold transition-all uppercase tracking-widest text-sm backdrop-blur-sm">
            Try the Game
          </button>
        </div>

      </div>
    </section>
  );
}