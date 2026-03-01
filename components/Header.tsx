"use client";

import React from "react";
import Link from "next/link";
import { Stars, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    // Outer wrapper handles positioning without blocking clicks underneath the nav
    <div className="force-trebuchet fixed top-0 inset-x-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Force Trebuchet MS everywhere inside this component */
        .force-trebuchet, .force-trebuchet * {
          font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif !important;
        }
      `}} />

      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        // Restore pointer events for the pill itself
        className="pointer-events-auto flex items-center justify-between gap-6 md:gap-12 rounded-full bg-[#02040A]/40 backdrop-blur-2xl border border-white/10 px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-3 group pl-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-cyan-500/20">
            <Stars className="h-4 w-4 text-cyan-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black leading-tight tracking-[0.2em] text-white uppercase">
              Team <span className="text-cyan-300">Diamonds</span>
            </span>
          </div>
        </Link>

        {/* --- CENTER LINKS --- */}
        {/* Hidden on very small screens to prevent crowding, adjust breakpoints as needed */}
        <div className="hidden sm:flex items-center gap-6">
          <Link 
            href="/diamond-in-the-sky" 
            className="text-xs font-semibold tracking-wider text-white/60 uppercase transition-colors hover:text-white"
          >
            Project
          </Link>
          <Link 
            href="/media" 
            className="text-xs font-semibold tracking-wider text-white/60 uppercase transition-colors hover:text-white"
          >
            Media
          </Link>
        </div>

        {/* --- CTA BUTTON --- */}
        <Link
          href="/survey"
          className="group relative inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold tracking-wide text-black transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          <span>Take Survey</span>
          <Rocket className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
        </Link>

      </motion.nav>
      
    </div>
  );
}