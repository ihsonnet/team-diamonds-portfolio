"use client";

import React, { useState, useEffect } from "react";
import { Rocket, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Project", href: "/diamond-in-the-sky" },
  ];

  const isProjectPage = pathname === "/diamond-in-the-sky";

  return (
    <header className="fixed top-4 left-0 right-0 z-[100] px-4 md:px-0 flex justify-center pointer-events-none">
      <nav
        className={`
          pointer-events-auto
          flex items-center justify-between
          w-full max-w-[90%] md:max-w-[850px] /* Reduced max-width */
          h-[56px] px-4 md:px-6 /* Reduced height and padding */
          rounded-full border border-white/10
          bg-[#050A15]/90 backdrop-blur-2xl shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)]
          transition-all duration-500 ease-in-out
          ${isScrolled || isProjectPage ? "scale-[0.98] border-indigo-500/20" : "scale-100"}
        `}
      >
        {/* LEFT: Logo Section - Narrowed */}
        <div className="flex items-center w-[100px] md:w-[150px]">
          <Link href="/" className="relative flex items-center group flex-shrink-0">
             <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
             <img 
               src="/images/White Logo.png" 
               alt="Logo" 
               className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300" 
             />
          </Link>
        </div>

        {/* MIDDLE: Branding vs Navigation - Compact */}
        <div className="flex-1 flex justify-center items-center overflow-hidden h-full">
          {!isProjectPage && !isScrolled ? (
            <h2 className="text-lg md:text-xl font-medium tracking-tight text-white flex items-center whitespace-nowrap animate-in fade-in zoom-in-95 duration-500">
              Team <span className="ml-1.5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A5F3FC] to-[#C084FC]">Diamonds</span>
            </h2>
          ) : (
            <div className="hidden md:flex items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                    pathname === link.href ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Action Button - Compact */}
        <div className="flex items-center justify-end w-[100px] md:w-[150px]">
          <Link
            href="/survey"
            className="group flex items-center gap-2 bg-white px-4 md:px-5 py-1.5 rounded-full transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="text-[10px] md:text-[11px] font-bold text-black tracking-tight whitespace-nowrap">
              Take Survey
            </span>
            <Rocket className="w-3.5 h-3.5 text-gray-600 transition-transform group-hover:rotate-12 group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="ml-3 md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[85%] bg-[#050A15]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-4 md:hidden pointer-events-auto shadow-2xl animate-in zoom-in-95 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold uppercase tracking-[0.1em] text-white/70 hover:text-white py-2 border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}