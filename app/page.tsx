
"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  Rocket,
  Sparkles,
  Stars,
  ArrowRight,
  CalendarDays,
  Mic,
  Users,
  Newspaper,
  Tv,
  Github,
  Youtube,
  Instagram,
} from "lucide-react";

type IconType = React.ComponentType<{ className?: string }>;

const HERO_BG = "/images/home-hero.jpeg"; // hero background
const AFTER_HERO_BG = "/images/after-hero-bg.jpeg"; // everything after hero

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** subtle animations (no libs) */
function MotionStyles() {
  return (
    <style>{`
      @keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes twinkle { 0%,100%{opacity:.35} 50%{opacity:.85} }
      @keyframes shimmer { 0%{transform:translateX(-130%);opacity:0} 35%{opacity:.35} 100%{transform:translateX(130%);opacity:0} }

      .floaty { animation: floaty 7s ease-in-out infinite; }
      .twinkle { animation: twinkle 3.6s ease-in-out infinite; }
      .shimmer:before {
        content:"";
        position:absolute;
        inset:-1px;
        background:linear-gradient(120deg, transparent 0%, rgba(255,255,255,.22) 45%, transparent 100%);
        transform:translateX(-130%);
        animation: shimmer 4.2s ease-in-out infinite;
        pointer-events:none;
      }
      .tilt { transition: transform .22s ease, box-shadow .22s ease, background-color .22s ease; }
      .tilt:hover { transform: translateY(-4px) scale(1.01); }
    `}</style>
  );
}

const glass =
  "bg-white/[0.06] border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.45)]";
const card =
  "bg-white/[0.06] border border-white/10 shadow-[0_14px_46px_rgba(0,0,0,0.45)]";

function SectionKicker({ icon: Icon, label }: { icon: IconType; label: string }) {
  return (
    <div className="mx-auto mb-2 flex w-fit items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
      <Icon className="h-4 w-4 text-indigo-200" />
      {label}
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      <h2 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-1 max-w-2xl text-sm text-white/80">{subtitle}</p>
      ) : null}
    </div>
  );
}

function SoftSeparator() {
  return (
    <div className="my-10 flex items-center justify-center">
      <div className="h-[3px] w-[min(1080px,92%)] rounded-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.14),transparent)]" />
    </div>
  );
}

function StarfieldAccents() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-[8%] top-[80%] h-2 w-2 rounded-full bg-cyan-400/70 blur-[0.5px] twinkle" />
      <div className="absolute left-[18%] top-[66%] h-1.5 w-1.5 rounded-full bg-indigo-400/70 blur-[0.5px] twinkle" />
      <div className="absolute right-[12%] top-[28%] h-2 w-2 rounded-full bg-amber-300/70 blur-[0.5px] twinkle" />
      <div className="absolute right-[26%] top-[70%] h-1.5 w-1.5 rounded-full bg-emerald-300/70 blur-[0.5px] twinkle" />
      <div className="absolute left-1/2 top-[44%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-rose-300/70 blur-[0.5px] twinkle" />
    </div>
  );
}

function GlowCorners() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-70">
      <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-2xl" />
      <div className="absolute -right-24 top-12 h-64 w-64 rounded-full bg-indigo-500/10 blur-2xl" />
      <div className="absolute left-1/2 bottom-[-140px] h-80 w-80 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
    </div>
  );
}

/** ===== Award (single card) ===== */
function AwardSingleCard() {
  return (
    <div className="mx-auto max-w-6xl">
      <div
        className={cx(
          "relative overflow-hidden rounded-3xl px-6 py-7 sm:px-10 sm:py-10",
          "border border-white/12 bg-white/[0.06] backdrop-blur-md",
          "shadow-[0_26px_90px_rgba(0,0,0,0.55)]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-dashed border-cyan-300/35" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative flex flex-col items-center text-center gap-4">
          <div className="flex items-center justify-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
              <Award className="h-6 w-6 text-amber-300" />
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Most Inspirational
            </h3>
          </div>

          <div className="flex items-center gap-3 text-sm text-white/75">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/10">
              <BadgeCheck className="h-4 w-4 text-cyan-200" />
            </span>
            <p className="max-w-2xl">
              The solution that captures our hearts.
            </p>
          </div>

          <div className="text-xs text-white/55">
            NASA Space Apps Challenge • Team Diamonds • Diamond in the Sky
          </div>
        </div>
      </div>
    </div>
  );
}

/** ===== Hero diamond-bubble cluster ===== */
type Bubble = {
  name: string;
  role: string;
  img: string; // /public path
};

function BubblePill({ name, role }: { name: string; role: string }) {
  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
      <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[11px] font-semibold text-white/85 backdrop-blur">
        {name}
      </span>
    </div>
  );
}

function TeamBubble({
  b,
  className,
}: {
  b: Bubble;
  className: string;
}) {
  return (
    <div className={cx("absolute", className)}>
      <div className="group relative">
        <div className="relative h-30 w-30 sm:h-24 sm:w-24 rounded-full p-[2px] bg-[conic-gradient(from_210deg,rgba(34,211,238,.55),rgba(99,102,241,.45),rgba(245,158,11,.35),rgba(34,211,238,.55))] shadow-[0_0_38px_rgba(34,211,238,0.12)] tilt">
          <div className="h-full w-full overflow-hidden rounded-full bg-white/10 border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.img}
              alt={b.name}
              className="h-full w-full object-cover opacity-95 transition group-hover:opacity-100"
            />
          </div>
        </div>
        <div className="hidden sm:block">
          <BubblePill name={b.name} role={b.role} />
        </div>
      </div>
    </div>
  );
}

function LogoCore() {
  return (
    <div className="relative mx-auto w-fit">
      <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-3xl p-[2px] bg-[conic-gradient(from_220deg,rgba(34,211,238,.55),rgba(99,102,241,.45),rgba(255,255,255,.20),rgba(34,211,238,.55))] shadow-[0_0_52px_rgba(34,211,238,0.18)]">
        <div className="h-full w-full rounded-3xl bg-white/10 border border-white/10 backdrop-blur flex items-center justify-center">
          {/* Replace with your logo image if you have one */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/team-logo.png"
            alt="Team Diamonds logo"
            className="h-14 w-14 sm:h-16 sm:w-16 object-contain opacity-95"
            onError={(e) => {
              // fallback if logo missing
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="text-center">
            <div className="text-sm font-extrabold text-white">Team</div>
            <div className="text-sm font-extrabold text-cyan-200">Diamonds</div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
          <Stars className="h-4 w-4 text-cyan-200" />
          Global Champions • Space Apps
        </div>
      </div>
    </div>
  );
}

/** ===== Project card ===== */
function ProjectCard() {
  return (
    <div className={cx("relative overflow-hidden rounded-3xl p-6 sm:p-8", card, "tilt")}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" />
      <div className="grid gap-6 md:grid-cols-[260px_1fr] items-center">
        <div className="relative overflow-hidden rounded-2xl bg-white/[0.05] border border-white/10 h-44">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/diamond-in-the-sky-thumb.jpg"
            alt="Diamond in the Sky"
            className="h-full w-full object-cover opacity-90"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
          <div className="absolute left-3 top-3 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
            Featured Project
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
              Education Game
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur">
              Night-sky learning
            </span>
          </div>

          <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-white">
            Diamond in the Sky
          </h3>
          <p className="mt-2 text-sm text-white/75 max-w-2xl">
            An interactive space-learning game for kids—connect constellations, learn star colors &
            brightness, and explore the night sky with guided missions.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/diamond-in-the-sky"
              className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-black transition hover:brightness-110 shadow-[0_0_30px_rgba(0,212,255,0.12)]"
            >
              See Details
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/survey"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/15"
            >
              <Sparkles className="h-4 w-4 text-cyan-200" />
              Take Survey
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/** ===== Meet team alternating block ===== */
type TeamBio = {
  name: string;
  role: string;
  img: string;
  desc: string;
  highlights: string[];
};

function TeamBioRow({ item, flip }: { item: TeamBio; flip?: boolean }) {
  return (
    <div className={cx("grid gap-6 items-center", flip ? "md:grid-cols-[1fr_340px]" : "md:grid-cols-[340px_1fr]")}>
      {/* image */}
      <div className={cx("relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] h-64 sm:h-72", flip ? "md:order-2" : "")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-cover opacity-95"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/55" />
        <div className="absolute left-4 top-4 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
          {item.role}
        </div>
      </div>

      {/* text */}
      <div className={cx("relative rounded-3xl p-6 sm:p-7", card, "tilt")}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
            {item.name}
          </span>
          <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur">
            Team Diamonds
          </span>
        </div>

        <p className="mt-3 text-sm text-white/75 leading-relaxed">
          {item.desc}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full bg-white/7 border border-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** ===== Activity cards ===== */
function ActivityCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: IconType;
  title: string;
  desc: string;
}) {
  return (
    <div className={cx("group relative rounded-2xl p-5 tilt", card, "hover:bg-white/[0.09]")}>
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-white/10 border border-white/10 p-3">
          <Icon className="h-5 w-5 text-cyan-200" />
        </div>
        <div>
          <div className="text-sm font-extrabold text-white">{title}</div>
          <p className="mt-1 text-sm text-white/75">{desc}</p>
        </div>
      </div>
    </div>
  );
}

/** ===== Media cards ===== */
function MediaCard({
  icon: Icon,
  outlet,
  title,
}: {
  icon: IconType;
  outlet: string;
  title: string;
}) {
  return (
    <div className={cx("relative rounded-2xl p-5 tilt", card, "hover:bg-white/[0.09]")}>
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-white/10 border border-white/10 p-3">
          <Icon className="h-5 w-5 text-indigo-200" />
        </div>
        <div>
          <div className="text-xs font-semibold text-white/60">{outlet}</div>
          <div className="mt-1 text-sm font-extrabold text-white">{title}</div>
          <div className="mt-2 text-xs text-white/60">(Link placeholder)</div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const bubbles: Bubble[] = [
    { name: "Tisha Khandokar", role: "Team Leader", img: "/images/team/tisha.jpg" },
    { name: "Md Munim Ahmed", role: "UI/UX Designer", img: "/images/team/munim.jpg" },
    { name: "Injamamul Haque Sonet", role: "System Architect", img: "/images/team/sonet.jpg" },
    { name: "Abu Niaz", role: "Developer", img: "/images/team/niaz.jpg" },
    { name: "Zarin Chowdhury", role: "Researcher", img: "/images/team/zarin.jpg" },
  ];

  const bios: TeamBio[] = [
    {
      name: "Tisha Khandokar",
      role: "Team Leader",
      img: "/images/team/tisha.jpg",
      desc:
        "Leads product direction and coordinates the team’s milestones, ensuring the learning experience stays kid-friendly and mission-driven.",
      highlights: ["Planning", "Coordination", "Product direction"],
    },
    {
      name: "Md Munim Ahmed",
      role: "UI/UX Designer",
      img: "/images/team/munim.jpg",
      desc:
        "Designs the user interface and experience, ensuring the app is intuitive, visually appealing, and accessible to kids.",
      highlights: ["UI design", "UX research", "Accessibility"],
    },
    {
      name: "Injamamul Haque Sonet",
      role: "System Architect",
      img: "/images/team/sonet.jpg",
      desc:
        "Designs the overall system architecture and builds the interactive experience—balancing performance, clarity, and the Space Apps night-sky vibe.",
      highlights: ["Architecture", "UI systems", "Delivery"],
    },
    {
      name: "Abu Niaz",
      role: "Developer",
      img: "/images/team/niaz.jpg",
      desc:
        "Implements core components and interactions, focusing on clean UI details and reliable behavior across devices.",
      highlights: ["Frontend", "Interaction", "Implementation"],
    },
    {
      name: "Zarin Chowdhury",
      role: "Researcher",
      img: "/images/team/zarin.jpg",
      desc:
        "Supports content accuracy, learning structure, and research-backed explanations—so kids learn real astronomy in a fun way.",
      highlights: ["Research", "Learning content", "Accuracy"],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <MotionStyles />

      <div className="relative min-h-screen overflow-hidden">
        {/* ===== HERO (HERO_BG ONLY) ===== */}
        <section className="relative">
          <div
            className="relative bg-cover bg-center"
            style={{ backgroundImage: `url("${HERO_BG}")` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/35 to-slate-950/90" />
            <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
            <StarfieldAccents />

            {/* diamond bubble cluster */}
            <div className="relative">
              <div className="relative mx-auto h-[150px]  max-w-[760px] justify-center">

                {/* bubbles arranged like a diamond around the logo */}
                {/* top */}
                <TeamBubble
                  b={bubbles[0]}
                  className="left-1/2 top-[10px] -translate-x-1/2"
                />
                {/* upper-left */}
                <TeamBubble
                  b={bubbles[1]}
                  className="left-[0%] top-[50%]"
                />
                {/* upper-right */}
                <TeamBubble
                  b={bubbles[2]}
                  className="right-[0%] top-[50%]"
                />
                {/* lower-left */}
                <TeamBubble
                  b={bubbles[3]}
                  className="left-[-8%] top-[150%]"
                />
                {/* lower-right */}
                <TeamBubble
                  b={bubbles[4]}
                  className="right-[-8%] top-[150%]"
                />
              </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
              <div className="mx-auto max-w-4xl text-center">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
                    <Stars className="h-4 w-4 text-cyan-200" />
                    NASA Space Apps Global Champions
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
                    <Sparkles className="h-4 w-4 text-indigo-200" />
                    Space Learning for Kids
                  </span>
                </div>

                <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
                  Team Diamonds
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base text-white/85">
                  Building playful, story-driven learning experiences—starting with{" "}
                  <span className="font-semibold text-white">Diamond in the Sky</span>.
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/diamond-in-the-sky"
                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-white/95 hover:shadow-[0_0_34px_rgba(255,255,255,0.18)]"
                  >
                    <Rocket className="h-5 w-5 text-indigo-600 transition group-hover:scale-[1.06]" />
                    Explore Project
                  </Link>

                  <Link
                    href="/survey"
                    className="group inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 hover:shadow-[0_0_34px_rgba(34,211,238,0.18)]"
                  >
                    <Sparkles className="h-5 w-5 text-cyan-200 transition group-hover:scale-[1.06]" />
                    Take Survey
                  </Link>
                </div>


              </div>
            </div>

            {/* hero bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-slate-950/85" />
          </div>
        </section>

        {/* ===== AFTER-HERO BACKGROUND WRAPPER (AFTER_HERO_BG ONLY) ===== */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${AFTER_HERO_BG}")` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/82 to-slate-950/95" />
            <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:26px_26px]" />
            <GlowCorners />
            <div className="mt-[-120px] mx-auto max-w-7xl px-4 py-14 sm:px-6">
              <AwardSingleCard />
            </div>
          </div>


          <section className="mt-10 relative">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
              <div className="my-20">.</div>
              {/* Project */}
              <SectionKicker icon={Rocket} label="Project" />
              <SectionTitle
                title="What we built"
                subtitle="A space-learning game that makes astronomy simple and fun for kids."
              />
              <div className="mt-6">
                <ProjectCard />
              </div>

              <SoftSeparator />

              {/* Meet The Team (Main Section) */}
              <SectionKicker icon={Users} label="Meet The Team" />
              <SectionTitle
                title="Meet The Team"
                subtitle="The people behind Team Diamonds—building a playful space-learning experience."
              />

              <div className="mt-8 space-y-8">
                {bios.map((item, idx) => (
                  <TeamBioRow key={item.name} item={item} flip={idx % 2 === 1} />
                ))}
              </div>

              <SoftSeparator />

              {/* Team activity section */}
              <SectionKicker icon={CalendarDays} label="Team Activity" />
              <SectionTitle
                title="Highlights & Contributions"
                subtitle="Events, talks, demos, and contributions that shaped our work."
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ActivityCard
                  icon={Mic}
                  title="Talks & speakers"
                  desc="Sharing the project vision and how kids learn patterns in the sky."
                />
                <ActivityCard
                  icon={Users}
                  title="Workshops & mentoring"
                  desc="Helping others learn and build, and collecting feedback for improvements."
                />
                <ActivityCard
                  icon={Stars}
                  title="Community demos"
                  desc="Demo sessions to refine UI clarity, missions, and learning flow."
                />
              </div>

              <SoftSeparator />

              {/* Media & Coverage */}
              <SectionKicker icon={Newspaper} label="Media & Coverage" />
              <SectionTitle
                title="Media & Coverage"
                subtitle="Newspaper mentions and TV interviews (placeholders for links)."
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <MediaCard
                  icon={Newspaper}
                  outlet="Newspaper"
                  title="Feature story: Team Diamonds & Diamond in the Sky"
                />
                <MediaCard
                  icon={Tv}
                  outlet="TV Interview"
                  title="Short interview about our Space Apps journey"
                />
                <MediaCard
                  icon={Newspaper}
                  outlet="Online Media"
                  title="Coverage: space learning game for kids"
                />
              </div>

              <SoftSeparator />

              {/* Footer-ish CTA */}
              <div
                className={cx(
                  "relative overflow-hidden rounded-3xl p-8 text-center",
                  "border border-white/12 backdrop-blur-md shadow-[0_26px_90px_rgba(0,0,0,0.65)]",
                  "bg-[radial-gradient(900px_420px_at_20%_0%,rgba(34,211,238,0.20),transparent_60%),radial-gradient(900px_520px_at_90%_20%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(900px_520px_at_50%_100%,rgba(245,158,11,0.14),transparent_65%)]"
                )}
              >
                <div className="pointer-events-none absolute inset-0 opacity-40 shimmer" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/35" />

                {/* simple social row */}
                <div className="relative mx-auto mb-4 flex w-fit items-center gap-4 text-white/70">
                  <a className="hover:text-white transition" href="#" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                  <a className="hover:text-white transition" href="#" aria-label="YouTube">
                    <Youtube className="h-5 w-5" />
                  </a>
                  <a className="hover:text-white transition" href="#" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>

                <div className="relative">
                  <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
                    <Sparkles className="h-4 w-4 text-cyan-200" />
                    Want to help us improve?
                  </div>

                  <h3 className="text-lg font-extrabold text-white">
                    Join the Journey of Discovery!
                  </h3>
                  <p className="mx-auto mt-2 max-w-2xl text-sm text-white/80">
                    Explore the project and share feedback through our survey.
                  </p>

                  <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                      href="/survey"
                      className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-black transition hover:brightness-110 shadow-[0_0_30px_rgba(0,212,255,0.12)]"
                    >
                      Take Survey
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>

                    <Link
                      href="/diamond-in-the-sky"
                      className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/15"
                    >
                      <Rocket className="h-4 w-4 text-indigo-200" />
                      Explore Project
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}