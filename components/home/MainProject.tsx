import React from "react";
import Link from "next/link";
import { Play, Rocket, Gamepad2, ArrowRight, Crosshair, Wifi } from "lucide-react";

export default function MainProjects() {
  return (
    <section className="force-trebuchet relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-16 py-16 sm:py-24 overflow-hidden bg-transparent">
      
      {/* ========================================== */}
      {/* THE COMPONENT CARD WRAPPER                 */}
      {/* Gradient applied directly here             */}
      {/* ========================================== */}
      <div className="relative w-full rounded-[2.5rem] lg:rounded-[3rem] border border-white/5 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#15325b] via-[#060d1b] to-[#02050a] backdrop-blur-2xl group/maincard transition-all duration-700 hover:border-blue-500/30 hover:shadow-[0_0_60px_rgba(21,50,91,0.6)] p-6 py-12 sm:p-12 lg:p-16 animate-[fade-in-up_1s_ease-out] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Subtle inner top highlight for the glass effect */}
        <div className="absolute inset-x-0 top-0 h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-blue-400/20 to-transparent opacity-50" />

        {/* 3-Column Ultra-Wide Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4">
          
          {/* ========================================== */}
          {/* LEFT: ENHANCED LOGO                        */}
          {/* ========================================== */}
          <div className="order-2 lg:order-1 relative flex flex-1 justify-start items-center group">
            
            {/* Ambient Nebula (Deep Blue) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,rgba(30,58,138,0.05)_40%,transparent_70%)] opacity-70 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none animate-pulse-slow" />
            
            {/* Active Orbital Rings */}
            <div className="absolute h-[240px] w-[240px] sm:h-[320px] sm:w-[320px] rounded-full border border-white/5 animate-[spin_15s_linear_infinite] opacity-60 pointer-events-none animate-pulse-slow" />
            <div className="absolute h-[180px] w-[180px] sm:h-[260px] sm:w-[260px] rounded-full border border-blue-400/20 border-dashed animate-[spin_10s_linear_infinite_reverse] group-hover:border-blue-400/40 transition-colors duration-700 pointer-events-none animate-pulse-slow" />
            
            {/* Logo */}
            <div className="relative z-10 w-56 sm:w-80 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105">
              <img
                src="/images/Diamond_Logo.png"
                alt="Diamond In The Sky Logo"
                className="w-full h-auto mix-blend-screen drop-shadow-[0_0_25px_rgba(96,165,250,0.3)]"
              />
            </div>
          </div>

          {/* ========================================== */}
          {/* CENTER: FLOATING COMMAND TEXT              */}
          {/* ========================================== */}
          <div className="order-1 lg:order-2 flex-[1.5] flex flex-col items-center text-center px-4">
            <div className="mb-8 flex items-center gap-2 text-blue-400">
              <Gamepad2 className="h-6 w-6" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold">
                Mission
              </span>
            </div>

            <h3 className="mb-6 text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] drop-shadow-[0_10px_40px_rgba(0,0,0,1)]">
              Diamond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 bg-[length:200%_auto] animate-gradient-flow">
                In The <br /> Sky
              </span>
            </h3>
            
            <p className="mb-12 max-w-lg text-lg sm:text-2xl text-gray-400 font-light leading-relaxed">
              A new eye to see the unseen
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Link
                href="/details"
                className="group/btn w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold text-white/70 transition-all hover:text-white hover:bg-white/5 rounded-2xl border border-white/5 hover:border-blue-400/30 backdrop-blur-sm"
              >
                <span>Explore</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
              </Link>

              <Link
                href="/play"
                className="group/play w-full sm:w-auto relative flex items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-800 px-12 py-5 text-lg font-black text-white transition-all hover:scale-105 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
              >
                <Play className="h-6 w-6 fill-white" />
                <span>Play</span>
              </Link>
            </div>
          </div>

          {/* ========================================== */}
          {/* RIGHT: FLOATING MOBILE PHONE WITH HUD      */}
          {/* ========================================== */}
          <div className="order-3 lg:order-3 relative flex-1 flex justify-end group">
            
            {/* Right Nebula */}
            <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,rgba(30,58,138,0.1)_40%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none animate-pulse-slow" />
            
            {/* Video Container (The Floating Phone) */}
            <div className="relative overflow-hidden w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-[2.5rem] border border-blue-500/30 bg-[#02050a] shadow-[0_20px_60px_-15px_rgba(37,99,235,0.4)] transition-all duration-700 group-hover:border-blue-400/60 group-hover:shadow-[0_20px_80px_-10px_rgba(59,130,246,0.5)] group-hover:scale-105 group-hover:-rotate-2 mx-auto lg:mx-0">
              
              <div className="absolute inset-0 z-30 pointer-events-none border-[6px] border-[#0A1220] rounded-[2.5rem]" />
              <div className="absolute inset-0 z-30 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] rounded-[2.5rem]" />
              
              {/* --- TOP HUD --- */}
              <div className="absolute top-0 left-0 right-0 h-[25%] px-5 py-4 z-20 flex flex-col justify-between pointer-events-none bg-gradient-to-b from-[#02050a] to-transparent">
                <div className="flex justify-between items-center text-[9px] text-blue-400 font-bold tracking-widest font-mono">
                  <div className="flex items-center gap-1.5"><Wifi className="w-3 h-3" /> ONLINE</div>
                  <div>SYS.100%</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full border border-blue-500/50 flex items-center justify-center bg-blue-500/10">
                    <Crosshair className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">Target Acquired</p>
                    <p className="text-xs text-white font-bold tracking-wide">NGC 224 (Andromeda)</p>
                  </div>
                </div>
              </div>

              {/* Embedded YouTube Video */}
              <iframe 
                src="https://www.youtube.com/embed/ygN0_QALPdg?autoplay=1&mute=1&loop=1&playlist=ygN0_QALPdg&controls=0&playsinline=1" 
                title="Diamond in the Sky Mockup"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full scale-[1.02] pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity mix-blend-screen z-10"
                style={{ border: 'none' }}
              />

              {/* --- BOTTOM HUD --- */}
              <div className="absolute bottom-0 left-0 right-0 h-[25%] px-5 py-6 z-20 flex flex-col justify-end pointer-events-none bg-gradient-to-t from-[#02050a] via-[#02050a]/90 to-transparent">
                <div className="flex justify-between items-end">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] text-blue-400/80 uppercase tracking-[0.2em]">Data Link</span>
                      <span className="text-[9px] text-blue-400 font-mono animate-pulse">SYNCING...</span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[70%] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                    </div>
                  </div>
                  
                  {/* Faux interactive button */}
                  <div className="h-10 w-10 shrink-0 rounded-full bg-blue-500/10 border border-blue-400/30 flex items-center justify-center animate-pulse-slow backdrop-blur-sm">
                    <Rocket className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .force-trebuchet, .force-trebuchet * {
          font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif !important;
        }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-flow {
          animation: gradient-flow 3s ease infinite;
        }
      `}</style>
    </section>
  );
}