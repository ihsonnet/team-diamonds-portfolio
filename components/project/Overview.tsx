"use client";

import {
  Star, Palette, Gamepad2, Lightbulb, Award,
} from "lucide-react";

export default function Overview() {
  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-24 animate-float">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-6">
          Project <span className="text-cyan-400">Overview</span>
        </h2>
        <p className="text-white/70 text-base md:text-lg leading-relaxed">
          Diamond In The Sky is more than a game — it's a learning tool that helps children understand
          how stars change over time. By exploring the stars' brightness, color, and motion, kids gain
          insight into the science behind stellar behavior.
        </p>
      </div>

      {/* Image + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-20 items-center mb-24">

        {/* Left: image with badge */}
        <div className="relative w-full max-w-[500px] mr-auto lg:ml-0 flex items-center justify-center animate-float">
          <div className="absolute -top-8 -left-4 md:-left-8 z-20 flex items-center gap-4 p-4 glass-panel rounded-2xl border-cyan-500/30 bg-[#02040A]/90 shadow-[0_10px_30px_rgba(34,211,238,0.2)] hover:scale-110 hover:-translate-y-1 transition-transform duration-300 cursor-default">
            <div className="bg-cyan-500/10 p-2 rounded-full">
              <Award className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            </div>
            <div>
              <h4 className="font-bold text-cyan-300 text-sm md:text-base leading-tight">Most Inspirational</h4>
              <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wider font-semibold mt-0.5">Award Winner</p>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/10 rounded-full blur-[80px]" />

          <img
            src="/images/game.png"
            alt="Game Interface"
            className="relative z-10 w-full h-auto rounded-[2.5rem] border-[4px] border-[#1a1a1a] shadow-[0_0_60px_rgba(34,211,238,0.15)] object-cover hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        {/* Right: description + stat chips */}
        <div className="space-y-8 animate-float-delayed lg:pl-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">The Educational Engine</h3>
            <p className="text-[15px] text-white/60 leading-relaxed">
              We bridge the gap between complex space science and accessible play. Users are guided through
              learning modules about stars, constellations, and stellar variability before manipulating
              these elements in an interactive environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {[
              { label: "Target Age", value: "8-14 Yrs", hover: "cyan" },
              { label: "Core Focus", value: "Stars",    hover: "blue" },
              { label: "Platform",   value: "Cross-Gen",hover: "purple" },
            ].map(({ label, value, hover }) => (
              <div
                key={label}
                className={`bg-[#0B101A] border border-white/5 p-4 rounded-xl transition-all duration-300 cursor-default
                  hover:-translate-y-1.5
                  hover:border-${hover}-500/40
                  hover:shadow-[0_10px_20px_-5px_rgba(34,211,238,0.2)]
                  hover:bg-${hover}-900/10`}
              >
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-semibold">{label}</div>
                <div className="font-bold text-lg text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Star,
            color: "cyan",
            title: "Recognize Patterns",
            body: "Learn to identify star constellations, understand celestial mapping, and recognize underlying brightness variations.",
          },
          {
            icon: Palette,
            color: "blue",
            title: "Understand Color",
            body: "Discover why stars twinkle and change color, linking visual phenomena to actual star temperatures and lifecycles.",
          },
          {
            icon: Gamepad2,
            color: "purple",
            title: "Interactive Play",
            body: "Explore the night sky in a truly interactive way, manipulating star properties and observing the cosmic results.",
          },
          {
            icon: Lightbulb,
            color: "cyan",
            title: "Inspire Curiosity",
            body: "Make astronomy fun and educational, sparking a lifelong passion for space science and exploration in young learners.",
          },
        ].map(({ icon: Icon, color, title, body }) => (
          <div
            key={title}
            className={`relative overflow-hidden bg-[#0B101A] border border-white/5 p-6 rounded-2xl transition-all duration-300 group cursor-default
              hover:-translate-y-2
              hover:border-${color}-400/50
              hover:shadow-[0_15px_30px_-10px_rgba(34,211,238,0.25)]`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <Icon className={`relative z-10 w-7 h-7 text-${color}-400 mb-5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300`} />
            <h4 className="relative z-10 font-bold text-[17px] text-white mb-3">{title}</h4>
            <p className="relative z-10 text-[13px] text-white/50 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}