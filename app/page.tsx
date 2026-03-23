"use client";

import React, { useEffect, useState } from "react";
// 1. Install this: npm install @studio-freight/lenis
import Lenis from "@studio-freight/lenis"; 

// Section Components
import Hero from "@/components/home/Hero";
import Award from "@/components/home/Award";
import MainProjects from "@/components/home/MainProject";
import MeetTeam from "@/components/home/MeetTeam";
import Highlights from "@/components/home/Highlights";
import Media from "@/components/home/Media";
import Discover from "@/components/home/Discover";

const HERO_BG = "/images/home-hero.jpeg";

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-150 ease-out shadow-[0_0_15px_rgba(34,211,238,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ==========================================
// UTILITIES
// ==========================================
function SoftSeparator() {
  return (
    <div className="my-20 sm:my-32 flex items-center justify-center relative">
      <div className="absolute w-full h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none opacity-20" />
      <div className="h-[1px] w-[min(1200px,90%)] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </div>
  );
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function HomePage() {
  
  // 2. Initialize Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main className="min-h-screen bg-[#02040A] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      <ScrollProgress />
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen"
          style={{ backgroundImage: `url("${HERO_BG}")` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#02040A_90%)]" />
        
        {/* Ambient Glows */}
        <div className="absolute top-[30%] left-[-10%] h-[1000px] w-[1000px] bg-cyan-900/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] h-[1000px] w-[1000px] bg-purple-900/5 blur-[180px] rounded-full" />
      </div>

      {/* <Navbar /> */}

      <div className="relative z-10">
        <Hero />

        <div className="relative z-20">
          <Award />
        </div>

        <section className="relative z-10 pt-24 sm:pt-32">
          <MainProjects />
        </section>

        <div className="flex flex-col pt-16">
          <SoftSeparator />
          <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <MeetTeam />
          </section>

          <SoftSeparator />
          <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <Highlights />
          </section>

          <SoftSeparator />
          {/* MEDIA SECTION: Now clean and focused as the Media component handles its own titles */}
          <section className="w-full">
            <Media />
          </section>

          <div className="mt-32">
            <Discover />
          </div>

          <footer className="py-20 text-center">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mx-auto mb-6" />
              <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20">
                © Team Diamonds • Mission Control 2026
              </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
