"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { BookOpen, Download, Sparkles, Award, Quote, Rocket, Globe, Users } from "lucide-react";

const MAGAZINE_PAGES = [
  {
    id: "cover",
    bg: "bg-gradient-to-br from-[#0A1024] to-[#111A3A]",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-6 relative overflow-hidden">
        {/* Subtle background glow to simulate the magazine cover depth */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1080&auto=format&fit=crop')] opacity-20 mix-blend-overlay" />
        <Sparkles 
          className="relative z-10 w-10 h-10 mb-6 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" 
          style={{ stroke: "url(#icon-gradient)" }} 
        />
        <h4 className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 font-bold tracking-[0.3em] uppercase text-xs mb-4">
          Team Diamonds Presents
        </h4>
        <h1 className="relative z-10 text-4xl sm:text-5xl font-black text-white tracking-[0.1em] uppercase drop-shadow-2xl leading-tight mb-8">
          Diamond <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">In The</span> <br /> Sky
        </h1>
        <div className="relative z-10 w-24 h-[1px] bg-indigo-500/50 mb-8" />
        <p className="relative z-10 text-white/60 font-medium tracking-[0.4em] uppercase text-[9px] sm:text-[10px]">
          The Global Winner's Chronicle
        </p>
      </div>
    )
  },
  {
    id: "mission",
    bg: "bg-[#05070E]",
    content: (
      <div className="flex flex-col justify-center h-full px-8 sm:px-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 w-fit mb-6">
          <Rocket className="w-3.5 h-3.5" style={{ stroke: "url(#icon-gradient)" }} />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Our Vision
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-light text-white mb-6 leading-tight">
          Gamifying the <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Cosmos</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-4">
          Our mission was to create an interactive learning platform that makes complex space data accessible to children.
        </p>
        <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
          By combining NASA's open data with engaging gameplay, we transformed the "Local" hackathon into a global movement.
        </p>
      </div>
    )
  },
  {
    id: "tisha-profile",
    bg: "bg-[#0A0D15]",
    content: (
      <div className="flex flex-col h-full px-8 sm:px-12 justify-center">
        <h4 className="font-bold tracking-[0.2em] uppercase text-[9px] mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
          Team Leadership
        </h4>
        <h2 className="text-3xl font-thin text-white mb-6">Tisha Khandokar</h2>
        <Quote className="w-6 h-6 text-white/10 mb-4" />
        <p className="text-sm text-white/80 font-light leading-relaxed italic">
          "Success wasn't just about winning; it was about representing the potential of Bangladeshi innovators to the entire world at NASA HQ."
        </p>
      </div>
    )
  },
  {
    id: "impact",
    bg: "bg-[#05070E]",
    content: (
      <div className="flex flex-col justify-center h-full px-8 sm:px-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 w-fit mb-6">
          <Globe className="w-3.5 h-3.5" style={{ stroke: "url(#icon-gradient)" }} />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Global Impact
          </span>
        </div>
        <h2 className="text-2xl font-light text-white mb-6 leading-tight">
          From Local to <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Global</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-4">
          Over 31,500 participants competed, but our unique blend of storytelling and science stood out to the NASA judges.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 font-bold text-lg">31k+</p>
            <p className="text-[8px] text-white/40 uppercase tracking-tighter">Participants</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 font-bold text-lg">Winner</p>
            <p className="text-[8px] text-white/40 uppercase tracking-tighter">Global Category</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "team-spread",
    bg: "bg-[#0A0D15]",
    content: (
      <div className="flex flex-col h-full px-8 sm:px-12 justify-center">
        <Users className="w-8 h-8 text-white/20 mb-6" />
        <h4 className="font-bold tracking-[0.2em] uppercase text-[9px] mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
          The Brilliance
        </h4>
        <h2 className="text-3xl font-thin text-white mb-6">Synergy</h2>
        <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-4">
          Our team brought together researchers, designers, and developers to build a cohesive universe for "Diamond in the Sky."
        </p>
        <ul className="text-[10px] text-indigo-400/80 space-y-2 uppercase tracking-widest font-bold">
          <li>• Innovative Research</li>
          <li>• Creative UI/UX</li>
          <li>• Advanced Storytelling</li>
        </ul>
      </div>
    )
  },
  {
    id: "backcover",
    bg: "bg-gradient-to-tl from-[#0A1024] to-[#02040A]",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6">
          <Award className="w-6 h-6 opacity-60" style={{ stroke: "url(#icon-gradient)" }} />
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white/80 tracking-[0.2em] uppercase mb-4">
          Journey to <br/> The Stars
        </h1>
        <div className="w-12 h-[1px] bg-white/20 mb-4" />
        <p className="font-medium tracking-[0.4em] uppercase text-[10px] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 opacity-80">
          Team Diamonds 2022-2024
        </p>
      </div>
    )
  }
];

export default function MagazineViewer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % MAGAZINE_PAGES.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, [isHovered]);

  const pageVariants: Variants = {
    initial: { 
      opacity: 0, 
      scale: 0.9,
      rotateY: 0,
      zIndex: 1
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      zIndex: 10,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      rotateY: -110,
      x: -300,
      opacity: 0,
      zIndex: 20,
      transition: { 
        rotateY: { duration: 0.8, ease: [0.45, 0.05, 0.55, 0.95] },
        x: { duration: 0.9, delay: 0.2, ease: "easeInOut" },
        opacity: { duration: 0.7, delay: 0.3 }
      }
    }
  };

  return (
    <section className="force-trebuchet relative w-full py-24 sm:py-32 bg-transparent overflow-hidden z-10">
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .force-trebuchet, .force-trebuchet * {
          font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif !important;
        }
      `}} />

      {/* SVG Gradient Definition for Icons */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-px w-8 bg-indigo-500/50" />
             <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
               Digital Archive
             </span>
             <div className="h-px w-8 bg-indigo-500/50" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extralight text-white tracking-tight mb-4">
            Magazine <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Edition</span>
          </h2>
        </div>

        {/* MAGAZINE VIEWER */}
        <div 
          className="relative w-full max-w-[380px] sm:max-w-[450px] aspect-[3/4] perspective-[2000px] mb-12 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setCurrentPage((prev) => (prev + 1) % MAGAZINE_PAGES.length)}
        >
          <div className="absolute inset-0 bg-[#02040A] rounded-r-2xl rounded-l-sm border border-white/5 shadow-2xl" />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentPage}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ transformOrigin: "left center" }}
              className={`absolute inset-0 w-full h-full rounded-r-2xl rounded-l-sm border border-white/10 shadow-2xl overflow-hidden ${MAGAZINE_PAGES[currentPage].bg}`}
            >
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/60 to-transparent z-20 pointer-events-none" />
              
              <div className="relative z-10 w-full h-full">
                {MAGAZINE_PAGES[currentPage].content}
              </div>

              <div className="absolute bottom-6 right-6 z-20 text-[10px] font-mono text-white/20 tracking-widest">
                PAGE {currentPage + 1} / {MAGAZINE_PAGES.length}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col items-center gap-8">
            <div className="flex gap-2">
                {MAGAZINE_PAGES.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentPage(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === currentPage ? 'w-8 bg-gradient-to-r from-blue-400 to-indigo-500' : 'w-2 bg-white/10 hover:bg-white/30'}`} 
                    />
                ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a 
                  href="https://www.canva.com/design/DAF3DLlME04/ztc9dSTK37ELFRVYzBvADQ/view" 
                  target="_blank"
                  className="group relative flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-full transition-all duration-300"
              >
                  <BookOpen className="w-4 h-4" style={{ stroke: "url(#icon-gradient)" }} />
                  <span className="text-white font-bold tracking-[0.2em] text-xs uppercase">Read Full on Canva</span>
              </a>
              
              <a 
                  href="/magazine" 
                  className="group relative flex items-center gap-4 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 px-8 py-4 rounded-full transition-all duration-300"
              >
                  <Download className="w-4 h-4 group-hover:animate-bounce" style={{ stroke: "url(#icon-gradient)" }} />
                  <span className="font-bold tracking-[0.2em] text-xs uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                    Get PDF
                  </span>
              </a>
            </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center pointer-events-none opacity-50">
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#1e3a5f] to-transparent" />
        <div className="absolute w-1.5 h-1.5 bg-[#1e3a5f] rotate-45" />
      </div>

    </section>
  );
}
