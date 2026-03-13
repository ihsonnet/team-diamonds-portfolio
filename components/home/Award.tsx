"use client";

import React, { useRef, useState } from "react";
import { Award as AwardIcon, BadgeCheck, Sparkles } from "lucide-react";
import { cx } from "../../lib/utils";

export default function Award() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="force-trebuchet mx-auto max-w-4xl z-10 relative mt-[-80px] sm:mt-[-100px] px-4">
      
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Force Trebuchet MS everywhere inside this component */
        .force-trebuchet, .force-trebuchet * {
          font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif !important;
        }
      `}} />

      {/* === MAIN CARD === */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cx(
          "group relative overflow-hidden rounded-[2.5rem] px-6 py-10 sm:px-12 sm:py-14",
          "border border-white/10 bg-[#02040A]/60 backdrop-blur-2xl",
          "transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          "hover:-translate-y-3 hover:shadow-[0_20px_80px_-20px_rgba(99,102,241,0.2)] hover:border-indigo-500/30"
        )}
      >
        {/* === INTERACTIVE BACKGROUND (Cursor tracking stays the same) === */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34,211,238,0.12), transparent 40%)`,
          }}
        />
        
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-[2.5rem] transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168,85,247,0.15), transparent 40%)`,
            maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />

        {/* === AMBIENT BACKGROUND GLOWS (Updated to Blue/Indigo/Purple) === */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-50 group-hover:opacity-100 group-hover:w-full group-hover:via-blue-300 transition-all duration-700 z-0" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-60 group-hover:opacity-100 group-hover:w-3/4 group-hover:via-indigo-400 transition-all duration-700 z-0 shadow-[0_-5px_15px_rgba(99,102,241,0.3)]" />
        
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none z-0" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 blur-[60px] rounded-full group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none z-0" />

        {/* === MAIN CONTENT === */}
        <div className="relative flex flex-col items-center text-center gap-6 sm:gap-8 z-10 pointer-events-none">
          
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full scale-50 opacity-0 group-hover:scale-150 group-hover:opacity-100 transition-all duration-700 ease-out" />
            <span className="relative inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-amber-500/40 group-hover:-rotate-3 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]">
              <AwardIcon className="h-8 w-8 sm:h-10 sm:w-10 text-amber-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)] transition-transform duration-500 group-hover:scale-110" />
              <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-yellow-200 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-100" />
            </span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 group-hover:from-white group-hover:to-cyan-100 transition-all duration-500 drop-shadow-md">
              "Most Inspirational"
            </h3>
            
            <div className="flex items-center justify-center gap-3 text-sm sm:text-base lg:text-lg text-white/70 group-hover:text-white transition-colors duration-300">
              <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 group-hover:border-indigo-400/50 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300 shrink-0">
                <BadgeCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
              </span>
              <p className="max-w-2xl font-light tracking-wide">
                The solution that captures hearts
              </p>
            </div>
          </div>

          <div className="mt-2 sm:mt-4 pt-6 border-t border-white/5 w-full max-w-2xl flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-[9px] sm:text-[11px] uppercase tracking-[0.2em] transition-colors duration-500">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400/70 to-indigo-500/70 group-hover:from-blue-400 group-hover:to-indigo-500 transition-all duration-500">Team Diamonds</span>
            
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400/70 to-indigo-500/70 group-hover:from-blue-400 group-hover:to-indigo-500 transition-all duration-500">NASA Space Apps Challenge 2022</span>
            
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <span className="text-indigo-300/50 group-hover:text-indigo-300/90 drop-shadow-[0_0_8px_rgba(99,102,241,0)] group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all duration-500">
              Diamond in the Sky
            </span>
          </div>
        </div>
      </div>

      {/* === BOTTOM COMPONENT DIVIDER === */}
      <div className="mt-24 sm:mt-32 mb-12 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
    </div>
  );
}