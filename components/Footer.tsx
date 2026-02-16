import { Github, Youtube, Instagram } from "lucide-react";
import { SOCIALS } from "@/lib/siteData";

export default function Footer() {
  return (
    <footer className="relative z-10 py-16 border-t border-white/5 bg-[#05070a]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center space-y-8">
        <div className="flex justify-center gap-10 text-slate-400">
          <a href={SOCIALS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={22} className="hover:text-white transition-colors" />
          </a>
          <a href={SOCIALS.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
            <Youtube size={22} className="hover:text-white transition-colors" />
          </a>
          <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={22} className="hover:text-white transition-colors" />
          </a>
        </div>

        <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">
          © 2026 Team Diamonds
        </p>
      </div>
    </footer>
  );
}
