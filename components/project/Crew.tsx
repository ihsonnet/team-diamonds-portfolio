"use client";

import React from "react";
import { Crown } from "lucide-react";

// ── Helper: Single Crew Card ──────────────────────────────────────
function CrewCard({ name, role, img, isLeader }: { name: string; role: string; img: string; isLeader?: boolean }) {
  return (
    <div 
      className={`group relative flex flex-col items-center justify-center p-6 md:p-8 w-full md:w-[320px] lg:w-[360px] rounded-[2rem] bg-gradient-to-b from-blue-950/40 via-indigo-950/20 to-[#02040A]/90 backdrop-blur-md border border-blue-500/20 hover:border-indigo-500/50 transition-all duration-500 cursor-pointer hover:-translate-y-2
      ${isLeader 
        ? 'shadow-[0_8px_32px_rgba(250,204,21,0.15)] hover:shadow-[0_15px_40px_rgba(250,204,21,0.25)] scale-[1.02] md:scale-105 z-10' 
        : 'shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.25)]'
      }`}
    >
      
      {/* Unique Leader Badge */}
      {isLeader && (
        <div className="absolute -top-5 bg-[#050A15] border border-[#FACC15]/50 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(250,204,21,0.4)] z-20 transition-transform group-hover:-translate-y-1">
          <Crown className="w-4 h-4 text-[#FACC15]" />
          <span className="text-[#FACC15] text-[10px] font-bold tracking-[0.2em] uppercase">Project Lead</span>
        </div>
      )}

      {/* Avatar Container (Yellow border removed) */}
      <div 
        className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-6 rounded-[1.5rem] overflow-hidden border border-white/5 group-hover:border-indigo-400/50 transition-colors duration-500 shadow-inner"
      >
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
        />
      </div>

      {/* Text Details */}
      <h4 className="text-white text-lg md:text-xl font-bold tracking-wide text-center drop-shadow-md">
        {name}
      </h4>
      <p 
        className={`text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mt-2 text-center transition-colors duration-500
        ${isLeader ? 'text-[#FACC15] drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]' : 'text-indigo-400 drop-shadow-[0_0_5px_rgba(99,102,241,0.4)]'}`}
      >
        {role}
      </p>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────
export default function Crew() {
  const topRow = [
    { name: "Injamamul Haque Sonet", role: "Product Architect",     img: "/images/team/sonet.jpg" },
    { name: "Tisha Khandokar",       role: "Product Lead", img: "/images/team/tisha.jpg", isLeader: true },
    { name: "Md Munim Ahmed",        role: "Product Engineer", img: "/images/team/munim.jpg" },
  ];

  const bottomRow = [
    { name: "Abu Niaz",              role: "MVP Developer",    img: "/images/team/niaz.jpg" },
    { name: "Zarin Chowdhury",       role: "Product Researcher",   img: "/images/team/zarin.jpg" },
  ];

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto z-10 font-sans">
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .force-font, .force-font * {
          font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif !important;
        }
      `}} />

      <div className="force-font">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tight uppercase text-white drop-shadow-md">
            Crew <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Roster</span>
          </h2>
        </div>

        {/* Card Grid Layout */}
        <div className="flex flex-col items-center gap-8 md:gap-12 w-full">
          
          {/* Top Row (3 items) */}
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 md:gap-6 lg:gap-8 w-full">
            {topRow.map((m) => (
              <CrewCard key={m.name} {...m} />
            ))}
          </div>

          {/* Bottom Row (2 items centered) */}
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 md:gap-6 lg:gap-8 w-full">
            {bottomRow.map((m) => (
              <CrewCard key={m.name} {...m} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}