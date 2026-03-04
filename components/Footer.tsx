// app/components/Footer.tsx
import Link from "next/link";
import { Github, Youtube, Instagram, Diamond, Sparkles } from "lucide-react";

const SECTION2_BG = "/images/section-2-bg.jpg";

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

      {/* Background image + overlays */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${SECTION2_BG}")` }}
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-slate-950/70 to-slate-950/85" />
        <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute inset-0 backdrop-blur-xl" />
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
          fill="rgba(2,6,23,0.55)"
        />
        <path
          d="M0,85
             C280,28 460,12 600,12
             C740,12 920,28 1200,85"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="2"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid items-center gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <Diamond className="text-cyan-300" size={18} />
            </span>
            <div>
              <div className="text-white font-bold">Team Diamonds</div>
              <div className="text-xs text-white/55">
                Diamond in the Sky — Space learning for kids
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-white/65">
            <Link href="/" className="text-sm font-semibold hover:text-white transition">
              Home
            </Link>
            <Link
              href="/diamond-in-the-sky"
              className="text-sm font-semibold hover:text-white transition"
            >
              Diamond In The Sky
            </Link>
            <Link href="/survey" className="text-sm font-semibold hover:text-white transition">
              Survey
            </Link>
          </div>

          {/* Social + small badge */}
          <div className="flex flex-col items-center justify-end gap-4 md:items-end">

            <div className="flex gap-6 text-white/60">
              <a href="#" className="hover:text-white transition" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="#" className="hover:text-white transition" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href="#" className="hover:text-white transition" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/45 tracking-[0.25em] uppercase">
          © {new Date().getFullYear()} Team Diamonds
        </div>
      </div>
    </footer>
  );
}