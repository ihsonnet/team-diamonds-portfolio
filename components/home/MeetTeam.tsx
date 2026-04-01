// components/sections/MeetTeam.tsx
"use client";

import React, { useState } from "react";
import { Users, Sparkles, Fingerprint, ExternalLink } from "lucide-react"; 
import { cx } from "../../lib/utils";

type TeamBio = {
  name: string;
  role: string;
  img: string;
  desc: string;
  highlights: string[];
  website?: string; 
};

const bios: TeamBio[] = [
  {
    name: "Zarin Chowdhury",
    role: "Researcher",
    img: "/images/team/zarin.jpg",
    desc: "Gathers insights and validates educational game mechanics.",
    highlights: ["Data Analysis", "User Testing", "Strategy"],
  },
  {
    name: "Md Munim Ahmed",
    role: "Product Engineer",
    img: "/images/team/munim.jpg",
    desc: "Invents features, designs user flows, and engineers the visual experience.",
    highlights: ["Feature Strategy", "UI/UX Design", "User-flow Development"],
  },
  {
    name: "Tisha Khandokar",
    role: "Product Lead",
    img: "/images/team/tisha.jpg",
    desc: "Directs high-impact product vision and delivers internationally recognized milestones.",
    highlights: ["Strategic Innovation", "Principal Authority", "International Influence"],
  },
  {
    name: "Injamamul Haque Sonet",
    role: "Product Architect",
    img: "/images/team/sonet.jpg",
    desc: "Architects product foundations and drives the technical vision for complex development.",
    highlights: ["Database Design", "Technical Authority", "System Security"],
  },
  {
    name: "Abu Niaz",
    role: "Developer",
    img: "/images/team/niaz.jpg",
    desc: "Transforms designs into clean, highly optimized interactive code.",
    highlights: ["Frontend", "Animation", "Integration"],
  },
];

export default function MeetTeam() {
  const [activeIdx, setActiveIdx] = useState(2);

  const handleCardClick = (idx: number, website?: string) => {
    if (activeIdx === idx && website) {
      window.open(website, "_blank", "noopener,noreferrer");
    } else {
      setActiveIdx(idx);
    }
  };

  return (
    <section className="force-trebuchet relative py-20 sm:py-32 z-10 flex justify-center w-full overflow-hidden bg-transparent">
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .force-trebuchet, .force-trebuchet * {
          font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif !important;
        }
      `}} />

      <div className="relative w-full max-w-6xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 sm:mb-16 opacity-90 text-center">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-5 w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
            <h2 className="text-sm font-semibold tracking-[0.25em] uppercase text-white/70">
              The <span className="text-white">Crew</span>
            </h2>
          </div>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-thin tracking-tight text-white max-w-xl">
            Minds behind the <span className="font-normal bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Constellations</span>
          </p>
        </div>

        {/* The Interactive Accordion Container */}
        <div className="flex flex-col md:flex-row h-[750px] md:h-[500px] w-full gap-2 sm:gap-4">
          {bios.map((item, idx) => {
            const isActive = activeIdx === idx;

            return (
              <div
                key={item.name}
                onClick={() => handleCardClick(idx, item.website)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={cx(
                  "group relative overflow-hidden rounded-[2rem] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end border backdrop-blur-md",
                  isActive 
                    ? "md:flex- flex- border-blue-500/40 shadow-[0_0_40px_-10px_rgba(37,99,235,0.3)] bg-[#060d1b]" 
                    : "md:flex- flex-1 border-white/5 shadow-none hover:border-blue-500/30 hover:bg-[#060d1b]/80 bg-[#060d1b]/40"
                )}
                title={
                  isActive && item.website
                    ? `Visit ${item.name}'s website`
                    : `View ${item.name}`
                }
              >
                {/* Background Image Setup */}
                <img
                  src={item.img}
                  alt={item.name}
                  className={cx(
                    "absolute inset-0 h-full w-full object-cover transition-all duration-1000",
                    // Removed grayscale entirely so it's always colorful!
                    isActive ? "opacity-100 scale-100" : "opacity-50 scale-110"
                  )}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />

                {/* Ambient Glows & Gradients */}
                <div className={cx(
                  "absolute inset-0 transition-opacity duration-700",
                  isActive 
                    ? "bg-gradient-to-t from-[#060d1b] via-[#060d1b]/60 to-transparent opacity-100" 
                    : "bg-[#060d1b]/70 opacity-100"
                )} />

                {/* Subtle active sweep line */}
                {isActive && (
                  <div className="absolute inset-0 z-0 w-[200%] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-[sweep_4s_cubic-bezier(0.4,0,0.2,1)_infinite] pointer-events-none" />
                )}

                {/* --- CONTENT AREA --- */}
                <div className="relative z-10 w-full h-full flex flex-col justify-end p-6 overflow-hidden">
                  
                  {/* INACTIVE STATE CONTENT */}
                  <div className={cx(
                    "absolute bottom-6 left-0 right-0 flex items-center justify-center transition-all duration-500",
                    isActive ? "opacity-0 translate-y-8 pointer-events-none" : "opacity-100 translate-y-0"
                  )}>
                    <div className="flex md:flex-col items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                        <Fingerprint className="h-4 w-4 text-white/40 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <span className="text-white/60 font-medium tracking-widest uppercase text-xs md:[writing-mode:vertical-rl] md:rotate-180 group-hover:text-white transition-colors">
                        {item.name.split(' ')}
                      </span>
                    </div>
                  </div>

                  {/* ACTIVE STATE CONTENT */}
                  <div className={cx(
                    "flex flex-col justify-end h-full transition-all duration-700 delay-100 w-[280px] sm:w-[350px]",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none absolute"
                  )}>
                    <div className="inline-flex items-center gap-2 mb-3">
                      <Sparkles className="h-3.5 w-3.5 text-blue-400 drop-shadow-[0_0_5px_rgba(37,99,235,0.8)]" />
                      <span className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase drop-shadow-md">
                        {item.role}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-3xl sm:text-4xl font-thin tracking-tight text-white whitespace-nowrap drop-shadow-md">
                        {item.name}
                      </h3>
                      <ExternalLink className="h-5 w-5 text-white/80 hover:text-blue-400 transition-colors opacity-0 animate-[fadeIn_0.5s_ease-in-out_0.5s_forwards]" />
                    </div>
                    
                    <p className="text-sm text-white/80 font-medium leading-relaxed mb-6 drop-shadow-md">
                      {item.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-[10px] font-medium tracking-wide text-white backdrop-blur-md drop-shadow-sm"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
