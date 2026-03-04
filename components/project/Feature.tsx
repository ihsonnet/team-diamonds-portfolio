"use client";

import {
  BookOpen, Wand2, Lightbulb, ArrowRight,
  Star, Sun, Palette, Activity,
  Gamepad2, MonitorPlay, Rocket, Telescope,
} from "lucide-react";

export default function Feature() {
  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">

      {/* Heading */}
      <div className="text-center mb-16 animate-float">
        <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-wider">
          Immersive{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Learning
          </span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full opacity-70" />
      </div>

      {/* Important note banner */}
      <div className="max-w-3xl mx-auto mb-16 p-5 glass-panel rounded-2xl border-cyan-500/40 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors duration-500" />
        <p className="relative z-10 font-bold text-cyan-50 flex items-center justify-center gap-3 text-sm md:text-base">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex-shrink-0 animate-pulse">
            <Lightbulb className="w-4 h-4" />
          </span>
          <span>
            <span className="text-cyan-400 uppercase tracking-widest mr-2">Mandatory Phase:</span>
            The learning module must be completed prior to gameplay to ensure full comprehension of stellar patterns.
          </span>
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(320px,auto)]">

        {/* How It Works — 2/3 width */}
        <div className="lg:col-span-2 glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)] transition-all duration-500">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] group-hover:bg-cyan-500/20 transition-all duration-700" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold text-white">How It Works</h3>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 mt-auto">
              <div className="flex-1 bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-cyan-500/30 transition-colors">
                <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-lg mb-4 tracking-widest uppercase">Phase 1</span>
                <h4 className="text-xl font-bold mb-2">Learn The Stars</h4>
                <p className="text-white/60 text-sm leading-relaxed">Users are visually guided to learn about different star types, constellations, and the mechanics of stellar variability.</p>
              </div>

              <ArrowRight className="hidden md:block w-8 h-8 text-cyan-500/50 flex-shrink-0 animate-pulse" />

              <div className="flex-1 bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-purple-500/30 transition-colors">
                <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-lg mb-4 tracking-widest uppercase">Phase 2</span>
                <h4 className="text-xl font-bold mb-2">Play & Create</h4>
                <p className="text-white/60 text-sm leading-relaxed">Apply knowledge by manipulating the cosmos. Create constellations, and adjust brightness, color, and mass dynamically.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features list — 1/3 width, spans 2 rows */}
        <div className="lg:col-span-1 lg:row-span-2 glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all duration-500 flex flex-col">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-all duration-700 pointer-events-none" />

          <div className="relative z-10 flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Wand2 className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold text-white">Features</h3>
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center space-y-4">
            {[
              { icon: Star,    label: "Match star patterns",  rotation: "group-hover/item:rotate-180" },
              { icon: Sun,     label: "Brighten or dim stars", rotation: "group-hover/item:scale-125" },
              { icon: Palette, label: "Change star colors",    rotation: "group-hover/item:-rotate-12" },
              { icon: Activity,label: "Adjust star mass",      rotation: "group-hover/item:scale-125" },
            ].map(({ icon: Icon, label, rotation }) => (
              <div key={label} className="group/item flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all cursor-default">
                <Icon className={`w-5 h-5 text-blue-400 transition-transform duration-500 ${rotation}`} />
                <span className="font-semibold text-white/90">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits for Kids — 2/3 width */}
        <div className="lg:col-span-2 glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group hover:border-purple-400/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] transition-all duration-500">
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/20 transition-all duration-700" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold text-white">Benefits for Kids</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
              {[
                { icon: Gamepad2,    title: "Hands-on Learning",    body: "Absorb complex concepts naturally through engaging gameplay." },
                { icon: MonitorPlay, title: "Stellar Variability",   body: "Gain a true understanding of how and why stars change over time." },
                { icon: Rocket,      title: "Dynamic Exploration",   body: "Freely explore the night sky in a safe, simulated environment." },
                { icon: Telescope,   title: "Spark Curiosity",       body: "Ignite a long-term passion for real-world space science and astronomy." },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="p-5 rounded-2xl bg-[#02040A]/50 border border-white/5 hover:border-purple-500/30 transition-colors">
                  <Icon className="w-6 h-6 text-purple-400 mb-3" />
                  <h5 className="font-bold text-sm text-white mb-1">{title}</h5>
                  <p className="text-xs text-white/50">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}