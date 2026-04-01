// app/components/Footer.tsx
import Link from "next/link";
import { Github, Youtube, Instagram, Diamond } from "lucide-react";
import { DEMO_VIDEO_URL, PORTFOLIO_REPO_URL } from "@/lib/externalLinks";

// Updated to use the new premium dark blue background image
const FOOTER_BG = "/images/after-hero-bg.jpeg";

export default function Footer() {
  return (
    <footer className="force-trebuchet relative overflow-hidden">
      
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Force Trebuchet MS everywhere inside this component */
        .force-trebuchet, .force-trebuchet * {
          font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif !important;
        }
      `}} />

      {/* SVG Gradient Definition for Icons (Unique ID for footer) */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="footer-icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background image + overlays */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${FOOTER_BG}")` }}
        />
        {/* Swapped slate for the deep #02040A blue/black tone */}
        <div className="absolute inset-0 bg-[#02040A]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-[#02040A]/80 to-transparent" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute inset-0 backdrop-blur-md" />
      </div>

      {/* Top arc (mirrors header arc, feels connected) */}
      <svg
        className="pointer-events-none absolute inset-x-0 -top-[18px] h-10 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,120 V85
             C280,28 460,10 600,10
             C740,10 920,28 1200,85
             V120 Z"
          fill="rgba(2,4,10,0.8)" /* Adjusted to match the new dark background */
        />
        <path
          d="M0,85
             C280,28 460,12 600,12
             C740,12 920,28 1200,85"
          fill="none"
          stroke="rgba(99,102,241,0.2)" /* Subtle indigo stroke instead of stark white */
          strokeWidth="2"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid items-center gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
              {/* Applied SVG Gradient to Diamond */}
              <Diamond style={{ stroke: "url(#footer-icon-gradient)" }} size={18} />
            </span>
            <div>
              <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Team Diamonds
              </div>
              <div className="text-xs text-white/55">
                Diamond in the Sky — Space learning for kids
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-white/65">
            <Link href="/" className="text-sm font-semibold hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link
              href="/diamond-in-the-sky"
              className="text-sm font-semibold hover:text-blue-400 transition-colors"
            >
              Diamond In The Sky
            </Link>
            <Link href="/survey" className="text-sm font-semibold hover:text-blue-400 transition-colors">
              Survey
            </Link>
          </div>

          {/* Social + small badge */}
          <div className="flex flex-col items-center justify-end gap-4 md:items-end">
            <div className="flex gap-6 text-white/60">
              <a
                href={PORTFOLIO_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 hover:scale-110 transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={DEMO_VIDEO_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <span
                className="hover:text-blue-400 hover:scale-110 transition-all"
                aria-label="Instagram"
                role="img"
              >
                <Instagram size={18} />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/45 tracking-[0.25em] uppercase flex items-center justify-center gap-2">
          © {new Date().getFullYear()} Team Diamonds
        </div>
      </div>
    </footer>
  );
}
