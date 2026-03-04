"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Rocket, Trophy, PlaneTakeoff } from "lucide-react";
import { cx } from "../../lib/utils";

const DIAMOND_LOGO = "/images/Diamond_Logo.png";

type Bubble = { name: string; role: string; img: string };

// Confetti
const confettiParticles = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 1.2}s`,
  animationDuration: `${2.5 + Math.random() * 3}s`,
  color: Math.random() > 0.6 ? "bg-amber-200/70" : "bg-cyan-200/50",
  size: Math.random() > 0.5 ? "h-1.5 w-1.5" : "h-1 w-1",
}));

type PlanetProps = {
  b: Bubble;
  ringSize: string; // e.g., "60%" or "100%"
  startAngle: number; // 0 to 360
  speed: string; // e.g., "40s"
  direction?: "normal" | "reverse";
};

// PlanetNode: Powered entirely by CSS
function PlanetNode({ b, ringSize, startAngle, speed, direction = "normal" }: PlanetProps) {
  const orbitAnim = direction === "reverse" ? "orbit-reverse" : "orbit-forward";
  const counterAnim = direction === "reverse" ? "orbit-forward" : "orbit-reverse";

  return (
    <div
      className="absolute top-1/2 left-1/2 pointer-events-none group/planet z-10 hover:z-[999]"
      style={{
        width: ringSize,
        height: ringSize,
        transform: `translate(-50%, -50%) rotate(${startAngle}deg)`,
      }}
    >
      {/* Orbit Animation - Does not pause on hover */}
      <div
        className="w-full h-full pointer-events-none"
        style={{
          animationName: orbitAnim,
          animationDuration: speed,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          {/* Counter Rotation to keep the star upright relative to the screen */}
          <div
            style={{
              animationName: counterAnim,
              animationDuration: speed,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          >
            <div style={{ transform: `rotate(-${startAngle}deg)` }}>
              <div className="planet-core group/core cursor-pointer relative flex flex-col items-center justify-center">
                
                {/* Drop shadow wrapper creates the silver glow */}
                <div 
                  className="relative h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-center group-hover/core:scale-[2.2] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover/core:drop-shadow-[0_0_30px_rgba(255,255,255,0.7)]"
                >
                  {/* Container morphs from Star to Circle on Hover. */}
                  <div 
                    className={cx(
                      "h-full w-full overflow-hidden relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                      "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-600 via-slate-800 to-slate-950",
                      "[clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]",
                      "group-hover/core:[clip-path:polygon(50%_0%,79%_10%,98%_35%,98%_66%,79%_90%,50%_100%,21%_90%,2%_66%,2%_35%,21%_10%)]"
                    )}
                  >
                    {/* Hover State: The actual image fades in */}
                    <img
                      src={b.img}
                      alt={b.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover/core:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </div>

                {/* Tooltip Nameplate */}
                <div className="absolute top-[120%] opacity-0 transform translate-y-4 transition-all duration-500 ease-out group-hover/core:opacity-100 group-hover/core:translate-y-0 flex flex-col items-center pointer-events-none z-50">
                  <div className="px-3 py-1.5 rounded-full bg-[#02040A]/80 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] flex flex-col items-center whitespace-nowrap">
                    <span className="text-xs lg:text-sm font-medium tracking-[0.15em] text-white">{b.name}</span>
                    <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 mt-0.5">
                      {b.role}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Your full team array
const team: Bubble[] = [
  { name: "Tisha", role: "Leader", img: "/images/team/tisha.jpg" },
  { name: "Sonet", role: "Architect", img: "/images/team/sonet.jpg" },
  { name: "Zarin", role: "Research", img: "/images/team/zarin.jpg" },
  { name: "Niaz", role: "Dev", img: "/images/team/niaz.jpg" },
  { name: "Munim", role: "UI/UX", img: "/images/team/munim.jpg" },
];

export default function Hero() {
  const router = useRouter();
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isWarping, setIsWarping] = useState(false);

  const [projectLaunch, setProjectLaunch] = useState<{
    active: boolean;
    text: string;
    phase: "idle" | "counting" | "liftoff";
  }>({
    active: false,
    text: "",
    phase: "idle",
  });

  const handleSurveyLaunch = () => {
    setIsWarping(true);
    setTimeout(() => {
      router.push("/survey");
    }, 1500);
  };

  const handleProjectLaunch = () => {
    setProjectLaunch({ active: true, text: "3", phase: "counting" });
    setTimeout(() => setProjectLaunch((prev) => ({ ...prev, text: "2" })), 1000);
    setTimeout(() => setProjectLaunch((prev) => ({ ...prev, text: "1" })), 2000);
    setTimeout(() => setProjectLaunch({ active: true, text: "EXPLORE", phase: "liftoff" }), 3000);
    setTimeout(() => router.push("/diamond-in-the-sky"), 4500);
  };

  // Automatically split team into inner and outer rings
  const innerRingTeam = team.slice(0, 2); 
  const outerRingTeam = team.slice(2);    

  return (
    <div
      className={cx(
        "force-trebuchet relative bg-transparent w-full transition-transform z-50",
        projectLaunch.phase === "counting" && "animate-[rumble_0.1s_infinite]"
      )}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Force Trebuchet MS on all child elements */
        .force-trebuchet, .force-trebuchet * {
          font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif !important;
        }

        @keyframes orbit-forward { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes void-pulse { 0% { opacity: 0; background-color: transparent; } 20% { opacity: 0.8; background-color: #000000; } 100% { opacity: 0; background-color: transparent; } }
        @keyframes confetti-fall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
        @keyframes ship-takeoff { 0% { transform: translateY(0) scale(1); opacity: 1; } 30% { transform: translateY(20px) scale(0.95); opacity: 1; } 100% { transform: translateY(-200vh) scale(0.8); opacity: 0; } }
        @keyframes wormhole { 0% { transform: scale(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: scale(30); opacity: 0; } }
        @keyframes rumble { 0% { transform: translate(0, 0); } 50% { transform: translate(0px, 1px); } 100% { transform: translate(0, 0); } }
        @keyframes slipstream-enter { 0% { opacity: 0; background: transparent; transform: scale(1); } 100% { opacity: 1; background: linear-gradient(to bottom, transparent, #0c4a6e); transform: scale(1.1); } }
        @keyframes plasma-pulse { 0%, 100% { opacity: 0.5; filter: blur(8px); transform: scaleY(1); } 50% { opacity: 0.8; filter: blur(12px); transform: scaleY(1.1); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .clip-diamond-ship { clip-path: polygon(50% 0%, 100% 85%, 50% 100%, 0% 85%); }
      `,
      }}
      />

      {/* OVERLAY 1: HYPERSPACE JUMP */}
      {isWarping && (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden">
          <div className="absolute w-[200px] h-[200px] border-[5px] border-purple-500/30 rounded-full animate-[wormhole_1.5s_ease-in_forwards]" />
          <div className="absolute w-[200px] h-[200px] border-[2px] border-cyan-400/50 rounded-full animate-[wormhole_1.5s_ease-in_0.3s_forwards]" />
          <span className="relative z-10 text-white text-xl md:text-3xl font-bold tracking-[0.5em] animate-pulse drop-shadow-[0_0_10px_#a855f7]">
            Express Your Thoughts...
          </span>
        </div>
      )}

      {/* OVERLAY 2: SMOOTH COUNTDOWN */}
      {projectLaunch.active && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden pointer-events-none">
          <div className={cx("absolute inset-0 bg-[#02040A]/90 transition-opacity duration-[2s]", projectLaunch.phase === "liftoff" && "opacity-0")} />
          {projectLaunch.phase === "liftoff" && <div className="absolute inset-0 animate-[slipstream-enter_1.5s_ease-in_forwards] z-[-1] bg-cyan-950" />}
          <div className={cx("relative z-10 font-black tracking-tighter text-transparent bg-clip-text transition-all duration-300", projectLaunch.phase === "counting" ? "text-[10rem] md:text-[15rem] bg-gradient-to-b from-cyan-200 to-blue-600 animate-pulse drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]" : "text-5xl md:text-7xl bg-gradient-to-b from-cyan-100 to-white drop-shadow-[0_0_50px_rgba(34,211,238,0.8)] tracking-[0.1em]")}>
            {projectLaunch.text}
          </div>
        </div>
      )}

      {/* Void Pulse Effect */}
      {isLogoHovered && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 animate-[void-pulse_0.8s_ease-out_forwards] bg-black" />
          {confettiParticles.map((particle) => (
            <div key={particle.id} className={cx("absolute top-0 rounded-full animate-[confetti-fall_linear_forwards] delay-300", particle.color, particle.size)} style={{ left: particle.left, animationDelay: particle.animationDelay, animationDuration: particle.animationDuration }} />
          ))}
        </div>
      )}

      {/* MAIN HERO: SINGLE SCREEN LAYOUT */}
      <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center z-50">
        
        <div className="absolute top-8 sm:top-12 w-full text-center px-4 z-50">
          {/* <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-thin tracking-tighter text-white drop-shadow-2xl">
            Team{" "}
            <span className="font-normal relative inline-block">
              <span className="absolute -inset-2 bg-cyan-500/20 blur-2xl rounded-full" />
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-400">
                Diamonds
              </span>
            </span>
          </h1> */}
        </div>

        {/* ORBITAL CONTAINER */}
        <div className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] flex items-center justify-center mt-8 sm:mt-12 lg:mt-16 z-50">
            
            <div
              className="absolute z-40 w-[45%] h-[45%] flex items-center justify-center group cursor-pointer pointer-events-auto"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <div className="absolute inset-0 bg-cyan-500/20 blur-[50px] rounded-full transition-all duration-700 group-hover:opacity-0 group-hover:scale-50" />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 to-indigo-500/30 blur-[70px] rounded-full opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.5]" />
              <div className="absolute inset-[-10%] rounded-full border border-yellow-500/30 border-dashed opacity-0 scale-50 transition-all duration-1000 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:animate-[spin_12s_linear_infinite]" />

              <img
                src={DIAMOND_LOGO}
                alt="Team Diamonds Logo"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.4)] animate-float transition-all duration-700 group-hover:scale-0 group-hover:opacity-0 group-hover:-rotate-90"
              />

              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center scale-0 opacity-0 rotate-90 transition-all duration-700 delay-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-100 group-hover:opacity-100 group-hover:rotate-0">
                <Trophy className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-yellow-300 drop-shadow-[0_0_50px_rgba(253,224,71,1)] mb-4" />
                <div className="flex flex-col items-center bg-[#02040A]/95 border-2 border-yellow-500/60 rounded-full px-5 py-2 sm:px-8 sm:py-3 backdrop-blur-xl shadow-[0_0_40px_rgba(234,179,8,0.6)] whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,1)] animate-pulse" />
                    <span className="text-sm sm:text-base lg:text-xl font-bold uppercase tracking-[0.3em] text-yellow-400 drop-shadow-lg">
                      Global Champions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ORBITAL PATHS */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-cyan-400/20 rounded-full border-dashed" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border border-indigo-400/20 rounded-full border-dashed" />
              <div className="absolute inset-0 border border-indigo-400/10 rounded-full shadow-[inset_0_0_40px_rgba(99,102,241,0.05)]" />
            </div>

            {/* Inner Ring (Automatically mapped) */}
            {innerRingTeam.map((member, index) => {
              const angle = (360 / innerRingTeam.length) * index;
              return (
                <PlanetNode key={member.name} b={member} ringSize="60%" startAngle={angle} speed="35s" />
              );
            })}

            {/* Outer Ring (Automatically mapped) */}
            {outerRingTeam.map((member, index) => {
              const angle = (360 / outerRingTeam.length) * index;
              return (
                <PlanetNode key={member.name} b={member} ringSize="100%" startAngle={angle} speed="45s" direction="reverse" />
              );
            })}

        </div>

        {/* BOTTOM DECK: SHIPS */}
        <div className="absolute bottom-12 lg:bottom-16 w-full max-w-[90rem] mx-auto px-6 sm:px-12 flex flex-row items-end justify-between z-50 pointer-events-none">
          
          <div className="flex justify-start pointer-events-auto">
            <button
              onClick={handleProjectLaunch}
              className={cx(
                "group relative flex flex-col items-center justify-center p-2 transition-all duration-500 hover:scale-105 hover:-translate-y-2",
                projectLaunch.active && "animate-[ship-takeoff_1.2s_ease-in_forwards]"
              )}
            >
              <div className="relative w-14 h-20 sm:w-16 sm:h-24 lg:w-20 lg:h-28 clip-diamond-ship bg-gradient-to-b from-cyan-400 via-blue-600 to-[#02040A] flex items-center justify-center z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50 pointer-events-none" />
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-cyan-100 -mt-2 lg:-mt-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <div className="absolute top-6 sm:top-8 w-2 h-2 sm:w-3 sm:h-3 rotate-45 bg-cyan-200 shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
              </div>

              <div className="relative w-8 h-6 sm:w-10 sm:h-8 lg:w-12 lg:h-10 -mt-2 lg:-mt-3 bg-cyan-500/40 blur-[12px] opacity-0 group-hover:opacity-100 animate-[plasma-pulse_1.5s_infinite] origin-top z-0 rounded-b-full" />
              <div className="w-16 sm:w-20 lg:w-24 h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-transparent via-cyan-900 to-transparent mt-1" />

              <span className="mt-2 sm:mt-4 text-[9px] sm:text-[10px] lg:text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase group-hover:text-cyan-200 transition-colors drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">
                Explore Project
              </span>
            </button>
          </div>

          <div className="flex justify-end pointer-events-auto">
            <button
              onClick={handleSurveyLaunch}
              className={cx(
                "group relative flex flex-col items-center justify-center p-2 transition-all duration-500 hover:scale-105 hover:-translate-y-2",
                isWarping && "animate-[ship-takeoff_1.2s_ease-in_forwards]"
              )}
            >
              <div className="relative w-14 h-20 sm:w-16 sm:h-24 lg:w-20 lg:h-28 clip-diamond-ship bg-gradient-to-b from-purple-400 via-fuchsia-700 to-[#02040A] flex items-center justify-center z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tl from-white/20 to-transparent opacity-50 pointer-events-none" />
                <PlaneTakeoff className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-100 -mt-2 lg:-mt-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                <div className="absolute top-6 sm:top-8 w-2 h-2 sm:w-3 sm:h-3 rotate-45 bg-purple-200 shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
              </div>

              <div className="relative w-8 h-6 sm:w-10 sm:h-8 lg:w-12 lg:h-10 -mt-2 lg:-mt-3 bg-purple-500/40 blur-[12px] opacity-0 group-hover:opacity-100 animate-[plasma-pulse_1.5s_infinite_reverse] origin-top z-0 rounded-b-full" />
              <div className="w-16 sm:w-20 lg:w-24 h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-transparent via-purple-900 to-transparent mt-1" />

              <span className="mt-2 sm:mt-4 text-[9px] sm:text-[10px] lg:text-xs font-bold tracking-[0.2em] text-purple-400 uppercase group-hover:text-purple-200 transition-colors drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
                Launch Survey
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}