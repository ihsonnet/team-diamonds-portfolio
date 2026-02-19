// app/diamond-in-the-sky/page.tsx
// ✅ Hero uses HERO_BG only
// ✅ After-hero (Section 2+) uses AFTER_HERO_BG only
// ✅ Curved connector stays
// ✅ Wider containers + subtle animations + colorful CTA
// ✅ Upgraded "Our Technology" with logo grid + Agile workflow cards
// ✅ Upgraded "Meet our team" with image-ready team cards
// No header/footer here.

import React from "react";
import {
    Rocket,
    Telescope,
    Sparkles,
    Stars,
    Play,
    MonitorPlay,
    Palette,
    Orbit,
    CheckCircle2,
    PenTool,
    Code2,
    Bug,
    RocketIcon,
    ClipboardList,
    Wand2,
    Star,
    Zap,
    Crown,
    Compass,
    ArrowRight,
    KanbanSquare,
    ListChecks,
    RefreshCcw,
    Layers,
    Shield,
    Users,
    Linkedin,
    Globe,
} from "lucide-react";

import Image from "next/image";

type TeamMember = { name: string; role: string; img: string; links?: { label: string; href: string; icon?: React.ComponentType<{ className?: string }> }[] };
type IconType = React.ComponentType<{ className?: string }>;

const HERO_BG = "/images/project-bg.jpeg";
const AFTER_HERO_BG = "/images/after-hero-bg.jpeg";

function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

/** Subtle animations without libs */
function MotionStyles() {
    return (
        <style>{`
      @keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
      @keyframes shimmer { 0%{transform:translateX(-130%);opacity:0} 35%{opacity:.35} 100%{transform:translateX(130%);opacity:0} }
      @keyframes twinkle { 0%,100%{opacity:.35} 50%{opacity:.8} }

      .floaty { animation: floaty 7s ease-in-out infinite; }
      .twinkle { animation: twinkle 3.6s ease-in-out infinite; }

      .shimmer:before {
        content:"";
        position:absolute;
        inset:-1px;
        background:linear-gradient(120deg, transparent 0%, rgba(255,255,255,.22) 45%, transparent 100%);
        transform:translateX(-130%);
        animation: shimmer 3.8s ease-in-out infinite;
        pointer-events:none;
      }

      .tilt { transition: transform .22s ease, box-shadow .22s ease, background-color .22s ease; }
      .tilt:hover { transform: translateY(-4px) scale(1.01); }
    `}</style>
    );
}

const glass = "bg-white/[0.06] border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.45)]";
const card = "bg-white/[0.06] border border-white/10 shadow-[0_14px_46px_rgba(0,0,0,0.45)]";

function Pill({ icon: Icon, label }: { icon: IconType; label: string }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
            <Icon className="h-4 w-4 text-cyan-200" />
            {label}
        </span>
    );
}

function Badge({ icon: Icon, label }: { icon: IconType; label: string }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
            <Icon className="h-4 w-4 text-white/80" />
            {label}
        </span>
    );
}

function SectionTitle({
    icon: Icon,
    title,
    subtitle,
}: {
    icon?: IconType;
    title: string;
    subtitle?: string;
}) {
    return (
        <div className="text-center">
            {Icon ? (
                <div className="mx-auto mb-2 flex w-fit items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
                </div>
            ) : null}

            <h2 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">{title}</h2>
            {subtitle ? <p className="mx-auto mt-1 max-w-2xl text-sm text-white/80">{subtitle}</p> : null}
        </div>
    );
}

function SectionKicker({ icon: Icon, label }: { icon: IconType; label: string }) {
    return (
        <div className="mx-auto mb-2 flex w-fit items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
            <Icon className="h-4 w-4 text-indigo-200" />
            {label}
        </div>
    );
}

function SoftPanel({ children }: { children: React.ReactNode }) {
    return <div className={cx("rounded-3xl p-6", glass)}>{children}</div>;
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

function Card({
    icon: Icon,
    title,
    desc,
    accent = "from-indigo-600 to-cyan-500",
}: {
    icon: IconType;
    title: string;
    desc: string;
    accent?: string;
}) {
    return (
        <div className={cx("group relative rounded-2xl p-5 tilt", card, "hover:bg-white/[0.09] hover:shadow-[0_18px_70px_rgba(0,0,0,0.55)]")}>
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.16),transparent_55%)]" />
            </div>

            <div className="pointer-events-none absolute right-4 top-4 opacity-30 group-hover:opacity-50 transition">
                <Star className="h-4 w-4 text-white" />
            </div>

            <div className="relative flex items-start gap-4">
                <div className={cx("shrink-0 rounded-xl bg-gradient-to-br p-3 transition group-hover:scale-[1.06]", accent)}>
                    <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                    <div className="text-sm font-extrabold text-white">{title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-white/75">{desc}</p>
                </div>
            </div>
        </div>
    );
}

function FeatureMini({
    icon: Icon,
    title,
    desc,
    color = "text-indigo-300",
}: {
    icon: IconType;
    title: string;
    desc: string;
    color?: string;
}) {
    return (
        <div className={cx("group relative rounded-2xl p-4 tilt", card, "hover:bg-white/[0.09]")}>
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.16),transparent_55%)]" />
            </div>

            <div className="relative flex items-start gap-3">
                <div className="rounded-xl bg-white/[0.06] p-2 transition group-hover:scale-[1.06]">
                    <Icon className={cx("h-5 w-5", color)} />
                </div>
                <div>
                    <div className="text-sm font-extrabold text-white">{title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-white/75">{desc}</p>
                </div>
            </div>
        </div>
    );
}

function TechPill({ label }: { label: string }) {
    return (
        <div className="rounded-full bg-white/[0.07] px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur transition hover:bg-white/[0.1]">
            {label}
        </div>
    );
}

function ConstellationPlaceholder() {
    return (
        <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-white/[0.05] justify-items-center border border-white/10">
            <div className="absolute inset-0 opacity-80 [background:radial-gradient(8px_8px_at_18%_35%,rgba(99,102,241,.55),transparent_60%),radial-gradient(7px_7px_at_45%_25%,rgba(14,165,233,.55),transparent_60%),radial-gradient(7px_7px_at_65%_55%,rgba(16,185,129,.45),transparent_60%),radial-gradient(8px_8px_at_82%_30%,rgba(245,158,11,.45),transparent_60%)]" />
            <img src="/images/game.png" alt="Game screenshot placeholder" className="h-full object-cover" />


            <div className="absolute bottom-3 left-3 rounded-full bg-black/25 px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur">
                Explore the space , make fun!
            </div>

            <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 backdrop-blur">
                <span className="inline-flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5 text-cyan-200" />
                    Interactive
                </span>
            </div>
        </div>
    );
}

function SoftSeparator() {
    return (
        <div className="my-10 flex items-center justify-center">
            <div className="h-[3px] w-[min(980px,90%)] rounded-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.14),transparent)]" />
        </div>
    );
}

function StarfieldAccents() {
    return (
        <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full bg-cyan-400/70 blur-[0.5px] twinkle" />
            <div className="absolute left-[18%] top-[62%] h-1.5 w-1.5 rounded-full bg-indigo-400/70 blur-[0.5px] twinkle" />
            <div className="absolute right-[12%] top-[28%] h-2 w-2 rounded-full bg-amber-300/70 blur-[0.5px] twinkle" />
            <div className="absolute right-[26%] top-[70%] h-1.5 w-1.5 rounded-full bg-emerald-300/70 blur-[0.5px] twinkle" />
            <div className="absolute left-1/2 top-[40%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-rose-300/70 blur-[0.5px] twinkle" />
        </div>
    );
}

/* =========================
   NEW: Technology logo grid
   ========================= */
function TechLogo({
    src,
    name,
}: {
    src: string;
    name: string;
}) {
    return (
        <div
            className={cx(
                "group relative flex items-center gap-3 rounded-2xl p-4 tilt",
                "bg-white/[0.05] border border-white/10",
                "hover:bg-white/[0.08]"
            )}
        >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white/[0.06] border border-white/10">
                {/* Put logos in /public/logos */}
                {/* Example: /public/logos/flutter.svg */}
                <img
                    src={src}
                    alt={name}
                    className="h-full w-full object-contain p-2 opacity-90 group-hover:opacity-100 transition"
                    loading="lazy"
                />
            </div>
            <div className="min-w-0">
                <div className="text-sm font-extrabold text-white">{name}</div>
                <div className="text-xs text-white/60">Used in our build</div>
            </div>
        </div>
    );
}

/* =========================
   NEW: Agile workflow cards
   ========================= */
function FlowCard({
    icon: Icon,
    title,
    lines,
    accent,
}: {
    icon: IconType;
    title: string;
    lines: string[];
    accent: string; // gradient
}) {
    return (
        <div className={cx("relative overflow-hidden rounded-2xl p-5 tilt", card, "hover:bg-white/[0.09]")}>
            <div className={cx("absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl opacity-25", accent)} />
            <div className="relative">
                <div className="flex items-center gap-3">
                    <div className={cx("rounded-xl p-3 bg-gradient-to-br", accent)}>
                        <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm font-extrabold text-white">{title}</div>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-white/75">
                    {lines.map((t) => (
                        <li key={t} className="flex gap-2">
                            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/40 shrink-0" />
                            <span>{t}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function FlowArrow() {
    return (
        <div className="hidden lg:flex items-center justify-center">
            <div className="flex items-center gap-2 text-white/40">
                <div className="h-[2px] w-10 rounded-full bg-white/10" />
                <ArrowRight className="h-4 w-4" />
            </div>
        </div>
    );
}

/* =========================
   NEW: Team card (image-ready)
   ========================= */
function TeamCard({ m }: { m: TeamMember }) {
    return (
        <div className={cx("group relative overflow-hidden rounded-3xl tilt", card, "hover:bg-white/[0.09]")}>
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(34,211,238,0.16),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(99,102,241,0.14),transparent_60%)]" />
            </div>

            {/* top image */}
            <div className="relative h-40 overflow-hidden border-b border-white/10">
                <img
                    src={m.img}
                    alt={m.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                <div className="absolute left-4 bottom-3 inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
                    <Users className="h-3.5 w-3.5 text-cyan-200" />
                    Team Diamonds
                </div>
            </div>

            {/* body */}
            <div className="relative p-5 text-left">
                <div className="text-sm font-extrabold text-white">{m.name}</div>
                <div className="mt-1 text-xs font-semibold text-white/70">{m.role}</div>

                {/* actions */}
                {m.links?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {m.links.map((l) => {
                            const Ico = l.icon;
                            return (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/[0.12] transition"
                                >
                                    {Ico ? <Ico className="h-4 w-4 text-white/70" /> : null}
                                    {l.label}
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
                        <Shield className="h-4 w-4 text-white/35" />
                        Add member links (optional)
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Page() {
    const team: TeamMember[] = [
        {
            name: "Tisha Khandokar",
            role: "Project Lead",
            img: "/images/team/tisha.jpg",
            links: [{ label: "Portfolio", href: "#", icon: Globe }],
        },
        {
            name: "Md Munim Ahmed",
            role: "System Analyst",
            img: "/images/team/munim.jpg",
            links: [{ label: "LinkedIn", href: "#", icon: Linkedin }],
        },
        {
            name: "Injamamul Haque Sonet",
            role: "System Architect & Technical Lead",
            img: "/images/team/sonet.jpg",
            links: [{ label: "Website", href: "#", icon: Globe }],
        },
        {
            name: "Abu Niaz",
            role: "Developer",
            img: "/images/team/abu-niaz.jpg",
            links: [{ label: "LinkedIn", href: "#", icon: Linkedin }],
        },
        {
            name: "Zarin Chowdhury",
            role: "Researcher",
            img: "/images/team/zarin.jpg",
            links: [{ label: "LinkedIn", href: "#", icon: Linkedin }],
        },
    ];

    // Put these logos in /public/logos
    // Use svg/png: flutter.svg, dart.svg, canva.svg, azure.svg, figma.svg, github.svg etc.
    const techLogos = [
        { name: "Flutter", src: "/logos/flutter.svg" },
        { name: "Dart", src: "/logos/dart.svg" },
        { name: "Azure", src: "/logos/azure.svg" },
        { name: "Canva", src: "/logos/canva.svg" },
        { name: "Figma", src: "/logos/figma.svg" },
        { name: "GitHub", src: "/logos/github.svg" },
    ];

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <MotionStyles />

            <div className="relative min-h-screen overflow-hidden">
                {/* global night base */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(99,102,241,0.28),transparent_60%),radial-gradient(900px_600px_at_80%_20%,rgba(14,165,233,0.22),transparent_55%),radial-gradient(1000px_700px_at_20%_40%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(1200px_800px_at_50%_100%,rgba(245,158,11,0.10),transparent_60%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:46px_46px]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />

                {/* HERO */}
                <section className="relative">
                    <div className="relative bg-cover bg-center" style={{ backgroundImage: `url("${HERO_BG}")` }}>
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/35 to-slate-950/90" />
                        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
                        <StarfieldAccents />

                        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-28">
                            <div className="mx-auto max-w-3xl text-center">
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    <Pill icon={Rocket} label="Team Diamonds" />
                                    <Pill icon={Stars} label="Space Learning" />
                                    <Pill icon={Wand2} label="Interactive Missions" />
                                </div>

                                <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                                    Diamond In the Sky
                                </h1>
                                <p className="mx-auto mt-4 max-w-2xl text-base text-white/85">
                                    Discover the magic of stars — Learn, Play, and Explore the Night Sky!
                                </p>

                                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                    <button className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-white/95 hover:shadow-[0_0_34px_rgba(255,255,255,0.18)]">
                                        <Play className="h-5 w-5 text-indigo-600 transition group-hover:scale-[1.06]" />
                                        Play the Game
                                    </button>

                                    <button className="group inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 hover:shadow-[0_0_34px_rgba(34,211,238,0.18)]">
                                        <MonitorPlay className="h-5 w-5 text-cyan-200 transition group-hover:scale-[1.06]" />
                                        Watch Demo
                                    </button>
                                </div>

                                <div className="mt-10 hidden sm:block">
                                    <div className="mx-auto h-10 w-10 rounded-2xl bg-white/[0.06] floaty border border-white/10 shadow-[0_0_40px_rgba(34,211,238,0.12)]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AFTER HERO BG WRAPPER */}
                <div className="relative">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${AFTER_HERO_BG}")` }} />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/80 to-slate-950/95" />
                        <div className="absolute inset-0 opacity-80 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:26px_26px]" />
                        <GlowCorners />
                    </div>

                    {/* SECTION 2 */}
                    <section className="relative -mt-[44px]">
                        <div className="relative">
                            <div className="group relative overflow-hidden border-white/10">
                                <svg
                                    className="pointer-events-none absolute left-0 top-0 h-24 w-full sm:h-28"
                                    viewBox="0 0 1200 160"
                                    preserveAspectRatio="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M0,0 H1200 V60
                       C920,120 740,150 600,150
                       C460,150 280,120 0,60
                       Z"
                                        fill="rgba(2,6,23,0.74)"
                                    />
                                    <path
                                        d="M0,58 C280,118 460,145 600,145 C740,145 920,118 1200,58"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.12)"
                                        strokeWidth="2"
                                    />
                                </svg>

                                <div className="relative px-5 pb-10 pt-24 sm:px-10 sm:pb-14 sm:pt-28">
                                    <div className="mx-auto max-w-6xl">
                                        <SectionTitle icon={Compass} title="What is Diamond In the Sky?" subtitle="An interactive space-learning game for kids aged 10–12" />

                                        <div className="mt-6">
                                            <SoftPanel>
                                                <div className="flex flex-wrap items-center justify-center gap-2">
                                                    <Badge icon={Telescope} label="Learn" />
                                                    <Badge icon={Play} label="Play" />
                                                    <Badge icon={Sparkles} label="Explore" />
                                                    <Badge icon={Zap} label="Mini challenges" />
                                                    <Badge icon={Crown} label="Rewards" />
                                                </div>

                                                <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_380px]">
                                                    <div className="rounded-3xl bg-white/[0.05] p-5">
                                                        <div className="flex items-center gap-2 text-sm font-extrabold text-white">
                                                            <Stars className="h-4 w-4 text-cyan-200" />
                                                            A fun way to understand constellations
                                                        </div>
                                                        <p className="mt-2 text-sm leading-relaxed text-white/75">
                                                            Connect star patterns, learn color & brightness, and explore the night sky through interactive missions.
                                                        </p>

                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            <Badge icon={Stars} label="Constellations" />
                                                            <Badge icon={Palette} label="Star colors" />
                                                            <Badge icon={Sparkles} label="Brightness" />
                                                        </div>

                                                        <div className="mt-5">
                                                            <ConstellationPlaceholder />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className={cx("relative overflow-hidden rounded-3xl p-5", card, "bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-amber-500/10")}>
                                                            <div className="pointer-events-none absolute inset-0 opacity-25">
                                                                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-500/20 blur-2xl" />
                                                            </div>
                                                            <div className="relative">
                                                                <div className="flex items-center gap-2 text-sm font-extrabold text-white">
                                                                    <Sparkles className="h-4 w-4 text-indigo-200" />
                                                                    Built for the Space Apps vibe
                                                                </div>
                                                                <p className="mt-2 text-sm leading-relaxed text-white/75">
                                                                    Clean, modern UI with colorful accents—optimized for night mode.
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <FeatureMini icon={Sparkles} title="Engaging missions" desc="Short challenges that keep learning fun." color="text-indigo-300" />
                                                        <FeatureMini icon={Telescope} title="Guided exploration" desc="Simple steps to identify patterns in the sky." color="text-cyan-300" />
                                                        <FeatureMini icon={CheckCircle2} title="Kid-friendly learning" desc="Clear UI that focuses attention on discovery." color="text-emerald-300" />
                                                    </div>
                                                </div>
                                            </SoftPanel>
                                        </div>
                                    </div>

                                    <div className="mt-10 flex items-center justify-center">
                                        <div className="h-[3px] w-[min(980px,90%)] rounded-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.16),transparent)]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTIONS 3+ */}
                    <section className="relative">
                        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
                            {/* ABOUT */}
                            <div className="mx-auto max-w-6xl">
                                <div className="pt-10">
                                    <SectionKicker icon={Sparkles} label="About the Project" />
                                </div>
                                <SectionTitle icon={Stars} title="Learning, Playing, Exploring the Stars" />

                                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    <Card icon={Stars} title="Recognize star patterns" desc="Identify constellations by connecting dots." accent="from-indigo-600 to-violet-600" />
                                    <Card icon={Palette} title="Understand star colors" desc="Learn what color tells us about stars." accent="from-cyan-600 to-indigo-600" />
                                    <Card icon={Orbit} title="Explore the night sky" desc="Navigate different sky regions and stories." accent="from-emerald-600 to-cyan-600" />
                                    <Card icon={Wand2} title="Make astronomy fun" desc="Gamified learning with friendly visuals." accent="from-amber-500 to-rose-500" />
                                </div>
                            </div>

                            <SoftSeparator />

                            {/* HOW IT WORKS */}
                            <div className="mx-auto max-w-6xl">
                                <SectionKicker icon={Rocket} label="How It Works" />
                                <SectionTitle icon={Compass} title="Play → Learn → Explore" />

                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    <div className={cx("rounded-3xl p-6 tilt", card, "hover:bg-white/[0.09]")}>
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 p-3">
                                                <Telescope className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-extrabold text-white">Learn to Play</div>
                                                <p className="mt-1 text-sm leading-relaxed text-white/75">Discover stars & constellations with guided steps.</p>
                                            </div>
                                        </div>

                                        <div className="mt-5 rounded-2xl bg-white/[0.05] p-4">
                                            <div className="text-sm font-bold text-white/90">Quick flow</div>
                                            <ul className="mt-3 space-y-2 text-sm text-white/75">
                                                <li>• Choose a constellation mission</li>
                                                <li>• Connect stars in the right order</li>
                                                <li>• Learn the story and key facts</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={cx("rounded-3xl p-6 tilt", card, "hover:bg-white/[0.09]")}>
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-amber-500 p-3">
                                                <Sparkles className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-extrabold text-white">Play with Stars</div>
                                                <p className="mt-1 text-sm leading-relaxed text-white/75">Adjust brightness & color to see patterns clearly.</p>
                                            </div>
                                        </div>

                                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                            <div className="rounded-2xl bg-white/[0.05] p-4">
                                                <div className="text-sm font-bold text-white/90">Brightness control</div>
                                                <p className="mt-2 text-sm text-white/75">Make faint stars visible without clutter.</p>
                                            </div>
                                            <div className="rounded-2xl bg-white/[0.05] p-4">
                                                <div className="text-sm font-bold text-white/90">Color hints</div>
                                                <p className="mt-2 text-sm text-white/75">Learn how temperature links to color.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <SoftSeparator />

                            {/* ✅ UPGRADED: OUR TECHNOLOGY */}
                            <div className="mx-auto max-w-6xl">
                                <SectionKicker icon={Code2} label="Our Technology" />
                                <SectionTitle
                                    icon={Layers}
                                    title="Tools & Workflow"
                                    subtitle="Our stack + an Agile sprint loop that keeps builds fast, clean, and testable."
                                />

                                {/* logo grid */}
                                <div className="mt-6">
                                    <div className={cx("rounded-3xl p-6", glass)}>
                                        <div className="flex items-center justify-between gap-4 flex-wrap">
                                            <div>
                                                <div className="text-sm font-extrabold text-white">Technology Stack</div>
                                                <p className="mt-1 text-sm text-white/70">
                                                    Drop your logos into <span className="text-white/85 font-semibold">/public/logos</span>.
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <TechPill label="Mobile" />
                                                <TechPill label="Design" />
                                                <TechPill label="Cloud" />
                                                <TechPill label="Collaboration" />
                                            </div>
                                        </div>

                                        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {techLogos.map((t) => (
                                                <TechLogo key={t.name} src={t.src} name={t.name} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* agile flow */}
                                <div className="mt-6">
                                    <div className={cx("rounded-3xl p-6", glass)}>
                                        <div className="flex items-start justify-between gap-4 flex-wrap">
                                            <div>
                                                <div className="text-sm font-extrabold text-white">Agile Workflow</div>
                                                <p className="mt-1 text-sm text-white/70">
                                                    Clear stages, repeatable sprint loop, and review gates for quality.
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1 text-xs font-semibold text-white/80">
                                                <RefreshCcw className="h-4 w-4 text-cyan-200" />
                                                Sprint Cycle
                                            </div>
                                        </div>

                                        {/* GRID wrapper so we can draw connectors */}
                                        <div className="relative mt-6">
                                            {/* Row 1: left -> right */}
                                            <div className="grid gap-4 lg:grid-cols-[1fr_60px_1fr_60px_1fr]">
                                                <FlowCard
                                                    icon={ListChecks}
                                                    title="Backlog + Requirements"
                                                    lines={["User stories", "Scope & priorities", "Acceptance criteria"]}
                                                    accent="from-indigo-600/60 to-cyan-500/60"
                                                />
                                                <FlowArrow />
                                                <FlowCard
                                                    icon={PenTool}
                                                    title="Design + UI Plan"
                                                    lines={["Wireframes", "Components", "Night-sky theme system"]}
                                                    accent="from-cyan-600/60 to-indigo-600/60"
                                                />
                                                <FlowArrow />
                                                <FlowCard
                                                    icon={Code2}
                                                    title="Implementation"
                                                    lines={["Feature branches", "Reusable widgets", "Performance pass"]}
                                                    accent="from-emerald-600/60 to-cyan-600/60"
                                                />
                                            </div>

                                            {/* Connector: top-right DOWN to bottom-right (Implementation -> Testing) */}
                                            <div className="pointer-events-none hidden lg:block absolute right-[calc(0%+0px)] top-[calc(100%-10px)] translate-y-0">
                                                {/* This sits near the right edge between rows */}
                                            </div>
                                            <div className="pointer-events-none hidden lg:block absolute right-[24px] top-[calc(50%-10px)]">
                                                {/* (kept empty intentionally) */}
                                            </div>

                                            {/* Use a simple SVG connector so it's precise */}
                                            <svg
                                                className="pointer-events-none hidden lg:block absolute inset-0"
                                                viewBox="0 0 1000 360"
                                                preserveAspectRatio="none"
                                                aria-hidden="true"
                                            >
                                                {/* Down arrow at right side (Row1 -> Row2) */}
                                                <path
                                                    d="M 950 120
             C 970 140, 970 170, 950 190
             L 950 220"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.18)"
                                                    strokeWidth="2.2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M 940 214 L 950 228 L 960 214"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.18)"
                                                    strokeWidth="2.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />

                                                {/* Up arrow at left side (Row2 -> Row1) */}
                                                <path
                                                    d="M 50 240
             C 30 220, 30 190, 50 170
             L 50 140"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.18)"
                                                    strokeWidth="2.2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M 40 146 L 50 132 L 60 146"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.18)"
                                                    strokeWidth="2.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>

                                            {/* Row 2: RIGHT -> LEFT (Testing starts on right, ends on left) */}
                                            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_60px_1fr_60px_1fr]">
                                                {/* Left cell = Review (end of row2) */}
                                                <FlowCard
                                                    icon={KanbanSquare}
                                                    title="Review + Improve"
                                                    lines={["Sprint retro", "What worked / what didn’t", "Next sprint plan"]}
                                                    accent="from-cyan-600/60 to-emerald-600/60"
                                                />

                                                {/* Reverse arrow (points left) */}
                                                <div className="hidden lg:flex items-center justify-center">
                                                    <div className="flex items-center gap-2 text-white/40">
                                                        <ArrowRight className="h-4 w-4 rotate-180" />
                                                        <div className="h-[2px] w-10 rounded-full bg-white/10" />
                                                    </div>
                                                </div>

                                                {/* Middle = Deploy */}
                                                <FlowCard
                                                    icon={RocketIcon}
                                                    title="Deploy"
                                                    lines={["Release build", "Versioning", "Monitoring & feedback"]}
                                                    accent="from-indigo-600/60 to-violet-600/60"
                                                />

                                                {/* Reverse arrow (points left) */}
                                                <div className="hidden lg:flex items-center justify-center">
                                                    <div className="flex items-center gap-2 text-white/40">
                                                        <ArrowRight className="h-4 w-4 rotate-180" />
                                                        <div className="h-[2px] w-10 rounded-full bg-white/10" />
                                                    </div>
                                                </div>

                                                {/* Right cell = Testing (start of row2) */}
                                                <FlowCard
                                                    icon={Bug}
                                                    title="Testing"
                                                    lines={["QA checklist", "Edge cases", "UI polish fixes"]}
                                                    accent="from-amber-500/60 to-rose-500/60"
                                                />
                                            </div>

                                            {/* Small hint line */}
                                            <div className="mt-5 rounded-2xl bg-white/[0.05] p-4 text-sm text-white/70">
                                                <span className="font-semibold text-white/85">Cycle:</span>{" "}
                                                Backlog → Design → Build ↓ Testing → Deploy → Review ↑ (repeat)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <SoftSeparator />

                            {/* ✅ UPGRADED: TEAM */}
                            <div className="mx-auto max-w-6xl">
                                <SectionKicker icon={Stars} label="Meet Our Team" />
                                <SectionTitle
                                    icon={Users}
                                    title="Team Diamonds"
                                    subtitle="Real people behind the mission "
                                />

                                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-center">
                                    {team.map((m) => (
                                        <TeamCard key={m.name} m={m} />
                                    ))}
                                </div>
                            </div>

                            <SoftSeparator />

                            {/* CTA */}
                            <div className="mx-auto max-w-6xl pb-10">
                                <div
                                    className={cx(
                                        "relative overflow-hidden rounded-3xl p-8 text-center",
                                        "border border-white/12 backdrop-blur-md shadow-[0_26px_90px_rgba(0,0,0,0.65)]",
                                        "bg-[radial-gradient(900px_420px_at_20%_0%,rgba(34,211,238,0.26),transparent_60%),radial-gradient(900px_520px_at_90%_20%,rgba(99,102,241,0.22),transparent_60%),radial-gradient(900px_520px_at_50%_100%,rgba(245,158,11,0.18),transparent_65%),radial-gradient(720px_420px_at_65%_65%,rgba(16,185,129,0.14),transparent_70%)]"
                                    )}
                                >
                                    <div className="pointer-events-none absolute inset-0 opacity-40 shimmer" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/35" />

                                    {/* Big rocket bg icon (TOP RIGHT) */}
                                    <div className="pointer-events-none absolute -right-10 -top-12 opacity-20 rotate-[18deg]">
                                        <div className="relative">
                                            <div className="absolute inset-0 blur-3xl bg-indigo-400/20 rounded-full scale-125" />
                                            <Rocket className="relative h-44 w-44 text-white/80 drop-shadow-[0_0_30px_rgba(99,102,241,0.28)]" />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
                                            <Sparkles className="h-4 w-4 text-cyan-200" />
                                            Ready to start?
                                        </div>

                                        <h3 className="text-lg font-extrabold text-white">Join the Journey of Discovery!</h3>
                                        <p className="mx-auto mt-2 max-w-2xl text-sm text-white/80">
                                            Start learning constellations, play missions, and explore the night sky.
                                        </p>

                                        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                            <button className="group inline-flex items-center gap-2 rounded-xl bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/[0.12] hover:shadow-[0_0_34px_rgba(34,211,238,0.16)]">
                                                <ClipboardList className="h-5 w-5 text-indigo-300 transition group-hover:scale-[1.06]" />
                                                Take Survey
                                            </button>

                                            <button className="group inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-400 hover:shadow-[0_0_34px_rgba(99,102,241,0.35)]">
                                                <Play className="h-5 w-5 text-white transition group-hover:scale-[1.06]" />
                                                Try the Game
                                            </button>

                                            <button className="group inline-flex items-center gap-2 rounded-xl bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/[0.12] hover:shadow-[0_0_34px_rgba(34,211,238,0.16)]">
                                                <MonitorPlay className="h-5 w-5 text-cyan-200 transition group-hover:scale-[1.06]" />
                                                Watch Demo
                                            </button>
                                        </div>
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