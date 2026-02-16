import Link from "next/link";
import { Github, Youtube, Instagram, Diamond } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3 items-center">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-white/5 border border-white/10">
              <Diamond className="text-cyan-300" size={18} />
            </span>
            <div>
              <div className="text-white font-bold">Team Diamonds</div>
              <div className="text-xs text-white/50">
                Diamond in the Sky — Space learning for kids
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-8 text-white/65">
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

          {/* Social */}
          <div className="flex justify-end gap-6 text-white/60">
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

        <div className="mt-10 text-center text-xs text-white/45 tracking-[0.25em] uppercase">
          © {new Date().getFullYear()} Team Diamonds
        </div>
      </div>
    </footer>
  );
}