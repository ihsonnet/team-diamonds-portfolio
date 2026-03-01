"use client";

import { Star, Telescope, Lightbulb } from "lucide-react";

export default function Join() {
  return (
    <section className="relative py-40 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#02040A]">
      <div className="max-w-4xl mx-auto text-center space-y-12 animate-float">

        <h2 className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-2xl">
          Join the Journey <br /> of Discovery
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-8 text-lg font-medium text-white/80">
          <div className="flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-cyan-400" /> Play & Learn
          </div>
          <div className="flex items-center justify-center gap-2">
            <Telescope className="w-5 h-5 text-blue-400" /> Explore Stars
          </div>
          <div className="flex items-center justify-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-400" /> Be Inspired
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <button className="px-10 py-4 rounded-xl bg-cyan-500 text-[#02040A] font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Start Learning
          </button>
          <button className="px-10 py-4 rounded-xl border border-cyan-500/50 hover:bg-cyan-500/10 text-white font-bold transition-all uppercase tracking-widest text-sm backdrop-blur-sm">
            Try the Game
          </button>
        </div>

      </div>
    </section>
  );
}