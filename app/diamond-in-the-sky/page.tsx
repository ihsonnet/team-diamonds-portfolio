"use client";

import { useState, useEffect } from "react";
// Removed Lenis import

import ProjectHero from "@/components/project/ProjectHero";
import Overview from "@/components/project/Overview";
import Feature from "@/components/project/Feature";
import System from "@/components/project/System";
import Crew from "@/components/project/Crew";
import Join from "@/components/project/Join";

// ── Scroll progress bar ────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) setProgress((window.scrollY / scrollHeight) * 100);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
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

// ── Global styles injected once ────────────────────────────────────
function GlobalStyles() {
  return (
    <style jsx global>{`
      :root {
        --font-trebuchet: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode',
          'Lucida Sans', Tahoma, sans-serif;
      }

      body {
        font-family: var(--font-trebuchet);
        background-color: #02040A;
        margin: 0;
        overflow-x: hidden;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-15px); }
      }
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-20px); }
      }
      @keyframes shine {
        100% { left: 125%; }
      }

      .animate-float         { animation: float 6s ease-in-out infinite; }
      .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }

      .glass-panel {
        background: rgba(10, 15, 25, 0.4);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .glass-panel:hover {
        background: rgba(15, 20, 35, 0.5);
        border-color: rgba(34, 211, 238, 0.2);
        box-shadow: 0 10px 40px -10px rgba(34, 211, 238, 0.1);
      }

      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      /* Removed scroll-behavior: smooth */
    `}</style>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function DiamondInTheSkyPage() {

  // Removed Lenis useEffect hook

  return (
    <main className="min-h-screen bg-[#02040A] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      {/* <Navbar/> */}
      <GlobalStyles />
      <ScrollProgress />

      {/* ── Shared background layer ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen"
          style={{ backgroundImage: `url("/images/home-hero.jpeg")` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#02040A_90%)]" />
        <div className="absolute top-[30%] left-[-10%] h-[1000px] w-[1000px] bg-cyan-900/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] h-[1000px] w-[1000px] bg-purple-900/5 blur-[180px] rounded-full" />
      </div>

      {/* ── Sections ── */}
      <div className="relative z-10">
        <ProjectHero />
        <Overview />
        <Feature />
        <System />
        <Crew />
        <Join />
      </div>
    </main>
  );
}