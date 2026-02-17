"use client";

import React from "react";
import {
  Rocket,
  Star,
  Palette,
  Moon,
  Smile,
  BookOpen,
  ChevronRight,
  Code,
  Globe,
  PenTool,
  Cloud,
  CheckCircle2,
  UserCircle2,
  PlayCircle,
  Telescope
} from "lucide-react";

import { HERO_IMAGE, TEAM_MEMBERS } from "@/lib/siteData";
import { DIAMOND_CONTENT } from "@/lib/diamondData";

export default function DiamondInTheSky() {
  return (
    <main className="min-h-screen bg-[#05070a] text-slate-100 selection:bg-blue-500/30 overflow-x-hidden">
      {/* Dynamic CSS-Based Starfield Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1e2e_0%,#05070a_100%)]" />
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse opacity-40"
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
      </div>

      <div className="relative z-10">
        {/* 16:9 Aspect Ratio Hero Section */}
        <section className="relative w-full aspect-[16/9] flex items-center justify-center overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070a]/20 to-[#05070a] z-10" />
            <img
              src={HERO_IMAGE}
              alt="Space Scene"
              className="w-full h-full object-cover opacity-80 scale-105 transition-transform duration-1000 hover:scale-100"
            />
          </div>

          <div className="relative z-20 text-center px-6 max-w-5xl space-y-4 md:space-y-8">
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              {DIAMOND_CONTENT.title}
            </h1>
            <p className="text-lg md:text-3xl font-medium text-blue-100/90 leading-tight">
              {DIAMOND_CONTENT.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-4">
              <button className="px-8 py-3 md:px-10 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl font-bold text-base md:text-lg transition-all hover:-translate-y-1 shadow-2xl">
                Play the Game
              </button>
              <button className="px-8 py-3 md:px-10 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl font-bold text-base md:text-lg transition-all hover:-translate-y-1 shadow-2xl">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
          {/* Mission Overview */}
          <section className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">{DIAMOND_CONTENT.whatIsTitle}</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {DIAMOND_CONTENT.whatIsText}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
              {[
                { icon: <BookOpen className="text-blue-400" />, title: "Learn" },
                { icon: <Rocket className="text-rose-400" />, title: "Play" },
                { icon: <Telescope className="text-indigo-400" />, title: "Explore" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group cursor-default"
                >
                  <div className="mb-6 inline-block p-5 rounded-2xl bg-slate-900 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Project Goals Grid */}
          <section className="space-y-12">
            <div className="flex items-center justify-center gap-6">
              <span className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <h2 className="text-3xl font-bold whitespace-nowrap px-4">{DIAMOND_CONTENT.goalsTitle}</h2>
              <span className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            </div>
            <p className="text-center text-blue-200/60 font-medium -mt-6">{DIAMOND_CONTENT.goalsSubtitle}</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Star size={32} />, text: DIAMOND_CONTENT.goals[0] },
                { icon: <Palette size={32} />, text: DIAMOND_CONTENT.goals[1] },
                { icon: <Moon size={32} />, text: DIAMOND_CONTENT.goals[2] },
                { icon: <Smile size={32} />, text: DIAMOND_CONTENT.goals[3] }
              ].map((goal, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl border border-white/5 bg-slate-900/40 text-center space-y-4 hover:border-blue-500/40 hover:bg-slate-900/60 transition-all shadow-lg"
                >
                  <div className="text-blue-500 flex justify-center drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    {goal.icon}
                  </div>
                  <p className="font-bold text-sm md:text-base leading-tight uppercase tracking-wide">{goal.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology & Process Flow */}
          <section className="space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold">{DIAMOND_CONTENT.techTitle}</h2>
              <div className="flex flex-wrap justify-center gap-8 text-xl font-bold text-slate-200">
                <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-xl border border-white/5">
                  <Code className="text-blue-400" /> {DIAMOND_CONTENT.techBadges[0]}
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-xl border border-white/5">
                  <Globe className="text-sky-400" /> {DIAMOND_CONTENT.techBadges[1]}
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-xl border border-white/5">
                  <PenTool className="text-pink-500" /> {DIAMOND_CONTENT.techBadges[2]}
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-xl border border-white/5">
                  <Cloud className="text-blue-600" /> {DIAMOND_CONTENT.techBadges[3]}
                </div>
              </div>
            </div>

            {/* Workflow Progress Bar */}
            <div className="relative flex flex-wrap lg:flex-nowrap justify-between items-center gap-4 p-6 rounded-full bg-white/5 border border-white/10 max-w-5xl mx-auto backdrop-blur-md shadow-inner">
              {DIAMOND_CONTENT.workflowSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-slate-400 text-xs md:text-sm font-bold uppercase tracking-widest"
                >
                  <div className="w-3 h-3 rounded-full bg-blue-500/30 border border-blue-500" />
                  <span>{step}</span>
                  <ChevronRight size={16} className="opacity-30" />
                </div>
              ))}
              <div className="flex items-center gap-2 text-blue-400 font-black text-sm uppercase tracking-widest bg-blue-500/10 px-6 py-2 rounded-full border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <CheckCircle2 size={18} /> {DIAMOND_CONTENT.workflowEnd}
              </div>
            </div>
          </section>

          {/* Team Members */}
          <section className="space-y-16">
            <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10">
              {TEAM_MEMBERS.map((member, idx) => (
                <a key={idx} href={member.website} className="text-center group space-y-4">
                  <div className="aspect-square rounded-[2rem] bg-slate-900 border border-white/5 flex items-center justify-center group-hover:border-blue-500/50 transition-all duration-500 overflow-hidden relative shadow-xl">
                    <UserCircle2 size={80} className="text-slate-800 group-hover:text-slate-700 transition-colors" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm md:text-base leading-tight group-hover:text-blue-400 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">
                      {member.role}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="relative p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-blue-700 via-indigo-900 to-[#05070a] text-center space-y-8 shadow-2xl overflow-hidden border border-white/10 group">
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-1000 rotate-12">
              <Rocket size={320} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-xl">
              {DIAMOND_CONTENT.ctaTitle}
            </h2>
            <div className="flex flex-wrap justify-center gap-6 relative z-10 pt-4">
              <button className="px-10 py-4 bg-white text-slate-950 rounded-[1.5rem] font-bold text-lg hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all shadow-2xl">
                {DIAMOND_CONTENT.ctaButtons[0]}
              </button>
              <button className="px-10 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-[1.5rem] font-bold text-lg hover:bg-white/20 hover:scale-105 active:scale-95 transition-all shadow-2xl">
                {DIAMOND_CONTENT.ctaButtons[1]}
              </button>
              <button className="px-10 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-[1.5rem] font-bold text-lg hover:bg-white/20 hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-2">
                <PlayCircle size={20} /> {DIAMOND_CONTENT.ctaButtons[2]}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
