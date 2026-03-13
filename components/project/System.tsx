"use client";

import React from "react";
import {
  Code2, Smartphone, Palette, Server,
  Github, Play, Layers, Telescope,
  Sun, Activity, Database,
  ClipboardList, PenTool, TestTube, Cloud, RefreshCw,
  ArrowRight, ArrowLeft
} from "lucide-react";

// ── Helper: Single Terminal Line ──────────────────────────────────
function TerminalLine({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="flex items-center gap-4 text-white/40 font-mono text-[13px] tracking-wide">
        <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} /> {label}
      </span>
      <span className="text-indigo-400 font-mono text-[13px] tracking-wide">{value}</span>
    </div>
  );
}

// ── Helper: Sprint Card ────────────────────────────────────────────
function SprintCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col p-5 rounded-2xl bg-[#030712] border border-white/5 shadow-inner hover:border-blue-500/20 transition-colors">
      <span className="text-blue-400 font-black text-[10px] tracking-[0.2em] uppercase mb-2">
        Sprint {num}
      </span>
      <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
      <p className="text-[11px] text-white/40">{desc}</p>
    </div>
  );
}

// ── Helper: Science Data Card ──────────────────────────────────────
function ScienceDataNode({ title, desc, icon: Icon }: { title: string; desc: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/10 hover:border-indigo-500/40 transition-colors cursor-pointer group shadow-[0_0_15px_rgba(99,102,241,0.05)] hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]">
      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors group-hover:scale-110">
        <Icon className="w-5 h-5 text-indigo-400" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col">
        <h4 className="font-bold text-white text-sm mb-0.5">{title}</h4>
        <p className="text-[11px] text-white/50">{desc}</p>
      </div>
    </div>
  );
}

// ── Helper: Agile Diagram Circuit ──────────────────────────────────
function AgileDiagram() {
  const topNodes = [
    { num: "01", label: "Requirement", icon: ClipboardList, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", delay: "0s" },
    { num: "02", label: "Design", icon: PenTool, color: "text-blue-500", bg: "bg-blue-600/10", border: "border-blue-600/30", delay: "1s" },
    { num: "03", label: "Dev", icon: Code2, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30", delay: "2s" },
  ];

  // Reversed for the bottom row so it flows backwards (Right to Left) completing the loop
  const bottomNodes = [
    { num: "06", label: "Review", icon: RefreshCw, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", delay: "5s" },
    { num: "05", label: "Deploy", icon: Cloud, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30", delay: "4s" },
    { num: "04", label: "Testing", icon: TestTube, color: "text-indigo-500", bg: "bg-indigo-600/10", border: "border-indigo-600/30", delay: "3s" },
  ];

  return (
    <div className="relative w-full h-[240px] md:h-[260px] bg-[#02040A] rounded-2xl border border-white/5 flex flex-col justify-between py-6 px-4 md:px-10 shadow-inner overflow-hidden mb-6">
      
      {/* Background Track / Loop */}
      <div className="absolute top-[3.5rem] bottom-[3.5rem] left-[10%] right-[10%] md:left-[15%] md:right-[15%] border-2 border-dashed border-white/5 rounded-[2rem] z-0" />
      
      {/* Top Row: Left to Right */}
      <div className="relative z-10 flex justify-between items-center w-full">
        {topNodes.map((node, index) => (
          <div key={node.num} className="flex flex-col items-center gap-2 bg-[#02040A] p-1 rounded-xl">
            <div 
              className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center animate-pulse ${node.bg} ${node.border} ${node.color}`}
              style={{ animationDuration: "3s", animationDelay: node.delay }}
            >
              <node.icon className="w-5 h-5" strokeWidth={2} />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#050A15] border border-white/10 rounded-full text-[9px] font-black flex items-center justify-center text-white">
                {node.num}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">
              {node.label}
            </span>
            
            {/* Directional Arrows (Except for the last item in the row) */}
            {index < topNodes.length - 1 && (
              <ArrowRight className="absolute top-6 w-4 h-4 text-white/20 translate-x-[4.5rem] md:translate-x-[6.5rem] lg:translate-x-[7.5rem] xl:translate-x-[8.5rem]" />
            )}
          </div>
        ))}
      </div>

      {/* Bottom Row: Right to Left (Flows back to the start) */}
      <div className="relative z-10 flex justify-between items-center w-full">
        {bottomNodes.map((node, index) => (
          <div key={node.num} className="flex flex-col items-center gap-2 bg-[#02040A] p-1 rounded-xl">
            <div 
              className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center animate-pulse ${node.bg} ${node.border} ${node.color}`}
              style={{ animationDuration: "3s", animationDelay: node.delay }}
            >
              <node.icon className="w-5 h-5" strokeWidth={2} />
              <span className="absolute -bottom-2 -right-2 w-5 h-5 bg-[#050A15] border border-white/10 rounded-full text-[9px] font-black flex items-center justify-center text-white">
                {node.num}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">
              {node.label}
            </span>

            {/* Directional Arrows (Flowing Left this time) */}
            {index < bottomNodes.length - 1 && (
              <ArrowLeft className="absolute top-6 w-4 h-4 text-white/20 translate-x-[4.5rem] md:translate-x-[6.5rem] lg:translate-x-[7.5rem] xl:translate-x-[8.5rem]" />
            )}
          </div>
        ))}
      </div>

      {/* Vertical Connectors indicating the loop at the ends */}
      <div className="absolute left-[10%] md:left-[15%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 text-white/10 z-0">
        <ArrowLeft className="w-full h-full -rotate-90" />
      </div>
      <div className="absolute right-[10%] md:right-[15%] top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-white/10 z-0">
        <ArrowRight className="w-full h-full rotate-90" />
      </div>

    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────
export default function System() {
  const sprints = [
    { num: "01", title: "Requirement", desc: "Define parameters" },
    { num: "02", title: "Design", desc: "Monolithic structure" },
    { num: "03", title: "Dev", desc: "Engine & Logic" },
    { num: "04", title: "Testing", desc: "QA & Simulation" },
    { num: "05", title: "Deploy", desc: "Azure Cloud" },
    { num: "06", title: "Review", desc: "Sprint retro" },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto font-sans z-10">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-[2.75rem] font-black mb-4 tracking-wider text-white uppercase">
          System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Architecture</span>
        </h2>
        <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto font-medium">
          Built on a robust monolithic framework merging real NASA telemetry with an engaging game engine.
        </p>
      </div>

      <div className="flex flex-col gap-6">

        {/* ── TOP ROW: Agile & Terminal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

          {/* LEFT: Agile Methodology */}
          <div className="lg:col-span-7 bg-[#050A15]/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 shadow-2xl flex flex-col hover:border-blue-500/20 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-white tracking-wide">Agile Methodology</h3>
            </div>

            {/* Replaced Placeholder with the fully coded Agile Diagram */}
            <AgileDiagram />

            <p className="text-[13px] text-white/50 mb-6">
              Monolithic architecture executed through iterative sprints.
            </p>

            {/* Sprint Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sprints.map((s) => (
                <SprintCard key={s.num} {...s} />
              ))}
            </div>
          </div>

          {/* RIGHT: Dev Environment */}
          <div className="lg:col-span-5 bg-[#050A15]/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 shadow-2xl flex flex-col hover:border-indigo-500/20 transition-colors">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-[15px] font-bold font-mono tracking-wide text-white flex items-center gap-2">
                <span className="text-blue-400">{'>_'}</span> DEV_ENVIRONMENT
              </h3>
              <div className="flex gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <div className="w-3 h-3 rounded-full bg-[#eab308]" />
                <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
              </div>
            </div>

            {/* Terminal Lines */}
            <div className="flex-1 space-y-7 pl-2">
              <TerminalLine label="LANG" value="Dart" icon={Code2} />
              <TerminalLine label="FRAMEWORK" value="Flutter (Mobile/Desktop)" icon={Smartphone} />
              <TerminalLine label="DESIGN_SYS" value="Canva Prototypes" icon={Palette} />
              <TerminalLine label="CLOUD_INFRA" value="Microsoft Azure" icon={Server} />
            </div>

            {/* Terminal Buttons */}
            <div className="mt-12 pt-8 border-t border-white/5 flex gap-4">
              <button className="flex-1 py-3 px-4 rounded-xl bg-transparent border border-blue-500/50 text-blue-400 text-xs font-bold tracking-widest flex justify-center items-center gap-2 hover:bg-blue-500/10 hover:border-blue-400 transition-colors">
                <Github className="w-4 h-4" /> REPOSITORY
              </button>
              <button className="flex-1 py-3 px-4 rounded-xl bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] text-xs font-bold tracking-widest flex justify-center items-center gap-2 hover:bg-[#1e293b] hover:text-white transition-colors">
                <Play className="w-4 h-4" fill="currentColor" /> DEMO
              </button>
            </div>
          </div>

        </div>

        {/* ── BOTTOM ROW: Space Science Integration ── */}
        <div className="w-full bg-[#050A15]/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 shadow-2xl hover:border-indigo-500/20 transition-colors">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-start md:items-center gap-4">
              <Telescope className="w-7 h-7 text-indigo-400 flex-shrink-0 mt-1 md:mt-0" strokeWidth={1.5} />
              <div>
                <h3 className="text-[1.1rem] font-bold text-white tracking-wide mb-1">
                  Space Science Integration
                </h3>
                <p className="text-[13px] text-white/50">
                  Real-world astrophysics parameters translated into gameplay mechanics.
                </p>
              </div>
            </div>
            
            <div className="px-4 py-2 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-[10px] font-black tracking-[0.15em] uppercase whitespace-nowrap shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              Powered by NASA Data
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ScienceDataNode title="Cepheid Variables" desc="Stellar lifetimes" icon={Sun} />
            <ScienceDataNode title="Cataclysmic Variables" desc="Binary motions" icon={Activity} />
            <ScienceDataNode title="Light Curves" desc="Brightness tracking" icon={Database} />
            <ScienceDataNode title="Spectroscopy" desc="Temperature/Color" icon={Palette} />
          </div>

        </div>

      </div>
    </section>
  );
}