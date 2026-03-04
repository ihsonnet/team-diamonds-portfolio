"use client";

import {
  Terminal, Code2, Smartphone, Palette, Server,
  Github, Play, Layers, Network, Telescope,
  Sun, Activity, Database,
} from "lucide-react";

// ── Helper: single terminal line ──────────────────────────────────
function TerminalLine({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
      <span className="flex items-center gap-2 text-white/40 font-mono text-sm">
        <Icon className="w-4 h-4" /> {label}
      </span>
      <span className="text-cyan-300 font-semibold font-mono text-sm">{value}</span>
    </div>
  );
}

// ── Helper: agile pipeline node ────────────────────────────────────
function AgileNode({ num, title, desc, delay }: { num: string; title: string; desc: string; delay: string }) {
  return (
    <div className="min-w-[140px] flex-shrink-0 snap-center animate-pulse" style={{ animationDelay: delay, animationDuration: "3s" }}>
      <div className="w-12 h-12 rounded-full bg-[#02040A] border-2 border-blue-500/50 flex items-center justify-center text-blue-400 font-bold mb-4 relative shadow-[0_0_15px_rgba(59,130,246,0.3)]">
        {num}
        <div className="absolute w-2 h-2 rounded-full bg-white animate-ping" />
      </div>
      <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
      <p className="text-xs text-white/50">{desc}</p>
    </div>
  );
}

// ── Helper: science data card ──────────────────────────────────────
function ScienceDataNode({ title, desc, icon: Icon }: { title: string; desc: string; icon: React.ElementType }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-900/10 border border-purple-500/10 hover:border-purple-500/40 hover:bg-purple-900/20 transition-all group">
      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 text-purple-400" />
      </div>
      <div>
        <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
        <p className="text-xs text-white/50 leading-tight">{desc}</p>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────
export default function System() {
  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">

      {/* Heading */}
      <div className="text-center mb-20 animate-float">
        <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-wider">
          System{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Architecture
          </span>
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Built on a robust monolithic framework merging real NASA telemetry with an engaging game engine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── Dev Environment Terminal ── */}
        <div className="lg:col-span-5 glass-panel rounded-[2rem] p-8 border border-cyan-500/20 flex flex-col group hover:border-cyan-500/50 transition-colors">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold font-mono tracking-tight text-cyan-50">DEV_ENVIRONMENT</h3>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <TerminalLine label="LANG"       value="Dart"                      icon={Code2} />
            <TerminalLine label="FRAMEWORK"  value="Flutter (Mobile/Desktop)"  icon={Smartphone} />
            <TerminalLine label="DESIGN_SYS" value="Canva Prototypes"          icon={Palette} />
            <TerminalLine label="CLOUD_INFRA" value="Microsoft Azure"          icon={Server} />
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
            <a href="#" className="flex-1 py-2 px-3 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold text-center flex justify-center items-center gap-2 transition-colors">
              <Github className="w-4 h-4" /> REPOSITORY
            </a>
            <a href="#" className="flex-1 py-2 px-3 rounded bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold text-center flex justify-center items-center gap-2 transition-colors">
              <Play className="w-4 h-4" /> DEMO
            </a>
          </div>
        </div>

        {/* ── Agile Pipeline ── */}
        <div className="lg:col-span-7 glass-panel rounded-[2rem] p-8 border border-blue-500/20 overflow-hidden relative group hover:border-blue-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Network className="w-32 h-32 text-blue-400" />
          </div>

          <h3 className="text-xl font-bold mb-2 flex items-center gap-3 relative z-10">
            <Layers className="text-blue-400" /> Agile Deployment Pipeline
          </h3>
          <p className="text-sm text-white/50 mb-10 relative z-10">
            Monolithic architecture executed through iterative sprints.
          </p>

          <div className="relative z-10 flex gap-8 overflow-x-auto pb-6 no-scrollbar snap-x">
            {/* Horizontal connector line */}
            <div className="absolute top-6 left-0 w-[800px] h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-400/40 to-transparent -z-10" />

            <AgileNode num="01" title="Requirement" desc="Define parameters"   delay="0ms" />
            <AgileNode num="02" title="Design"       desc="Monolithic structure" delay="100ms" />
            <AgileNode num="03" title="Dev"          desc="Engine & Logic"       delay="200ms" />
            <AgileNode num="04" title="Testing"      desc="QA & Simulation"      delay="300ms" />
            <AgileNode num="05" title="Deploy"       desc="Azure Cloud"          delay="400ms" />
            <AgileNode num="06" title="Review"       desc="Sprint retro"         delay="500ms" />
          </div>
        </div>

        {/* ── Science Integration ── */}
        <div className="lg:col-span-12 glass-panel rounded-[2rem] p-8 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Telescope className="text-purple-400" /> Space Science Integration
              </h3>
              <p className="text-sm text-white/50 mt-1">
                Real-world astrophysics parameters translated into gameplay mechanics.
              </p>
            </div>
            <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
              Powered by NASA Data
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScienceDataNode title="Cepheid Variables"     desc="Stellar lifetimes"    icon={Sun} />
            <ScienceDataNode title="Cataclysmic Variables" desc="Binary motions"       icon={Activity} />
            <ScienceDataNode title="Light Curves"          desc="Brightness tracking"  icon={Database} />
            <ScienceDataNode title="Spectroscopy"          desc="Temperature / Color"  icon={Palette} />
          </div>
        </div>

      </div>
    </section>
  );
}