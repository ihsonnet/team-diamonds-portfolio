// app/diamond-in-the-sky/page.tsx
// Update: Section-2 uses your local image: /section-2-bg.jpg
// ✅ Full-width section background
// ✅ Top border CURVED (big rounded “cap”)
// ✅ Negative top margin (-30px) so it overlaps hero
// ✅ Hero height increased a bit to compensate
// No header/footer.

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
} from "lucide-react";

const HERO_BG = "https://i.ibb.co/ZRBKLxJb/Adobe-Stock-1524458761.jpg";

type TeamMember = { name: string; role: string };

const glass =
    "bg-white/[0.06] backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.45)]";
const card =
    "bg-white/[0.06] backdrop-blur-md shadow-[0_14px_46px_rgba(0,0,0,0.45)]";

function Pill({
    icon: Icon,
    label,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
            <Icon className="h-4 w-4 text-cyan-200" />
            {label}
        </span>
    );
}

function Badge({
    icon: Icon,
    label,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
            <Icon className="h-4 w-4 text-white/80" />
            {label}
        </span>
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
                <p className="mx-auto mt-1 max-w-2xl text-sm text-white/80">
                    {subtitle}
                </p>
            ) : null}
        </div>
    );
}

function Card({
    icon: Icon,
    title,
    desc,
    accent = "from-indigo-600 to-cyan-500",
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    desc: string;
    accent?: string;
}) {
    return (
        <div className={`rounded-2xl ${card} p-5 transition hover:bg-white/[0.085]`}>
            <div className="flex items-start gap-4">
                <div className={`shrink-0 rounded-xl bg-gradient-to-br ${accent} p-3`}>
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

function SoftPanel({ children }: { children: React.ReactNode }) {
    return <div className={`rounded-3xl ${glass} p-6`}>{children}</div>;
}

function SectionKicker({
    icon: Icon,
    label,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}) {
    return (
        <div className="mx-auto mb-2 flex w-fit items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
            <Icon className="h-4 w-4 text-indigo-200" />
            {label}
        </div>
    );
}

function ConstellationPlaceholder() {
    return (
        <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-white/[0.05]">
            <div className="absolute inset-0 opacity-80 [background:radial-gradient(8px_8px_at_18%_35%,rgba(99,102,241,.55),transparent_60%),radial-gradient(7px_7px_at_45%_25%,rgba(14,165,233,.55),transparent_60%),radial-gradient(7px_7px_at_65%_55%,rgba(16,185,129,.45),transparent_60%),radial-gradient(8px_8px_at_82%_30%,rgba(245,158,11,.45),transparent_60%)]" />
            <svg viewBox="0 0 420 160" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <g fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="2" strokeLinecap="round">
                    <path d="M60,110 L140,70 L210,95 L270,55 L340,85" />
                </g>
                <g fill="rgba(255,255,255,.42)">
                    <circle cx="60" cy="110" r="5" />
                    <circle cx="140" cy="70" r="5" />
                    <circle cx="210" cy="95" r="5" />
                    <circle cx="270" cy="55" r="5" />
                    <circle cx="340" cy="85" r="5" />
                </g>
            </svg>
            <div className="absolute bottom-3 left-3 rounded-full bg-black/25 px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur">
                Placeholder image
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
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    desc: string;
    color?: string;
}) {
    return (
        <div className={`rounded-2xl ${card} p-4 transition hover:bg-white/[0.085]`}>
            <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white/[0.06] p-2">
                    <Icon className={`h-5 w-5 ${color}`} />
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
        <div className="rounded-full bg-white/[0.07] px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur">
            {label}
        </div>
    );
}

function Pipeline() {
    const steps = [
        { label: "Requirement", icon: ClipboardList },
        { label: "Design", icon: PenTool },
        { label: "Development", icon: Code2 },
        { label: "Testing", icon: Bug },
        { label: "Deployment", icon: RocketIcon },
        { label: "Review", icon: CheckCircle2 },
    ];

    return (
        <div className={`rounded-3xl ${glass} p-5`}>
            <div className="flex flex-wrap items-center justify-center gap-3">
                {steps.map((s, i) => (
                    <React.Fragment key={s.label}>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur">
                            <s.icon className="h-4 w-4 text-indigo-200" />
                            {s.label}
                        </div>
                        {i !== steps.length - 1 ? (
                            <div className="hidden h-[2px] w-10 rounded-full bg-white/10 sm:block" />
                        ) : null}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

function TeamCard({ name, role }: { name: string; role: string }) {
    return (
        <div className={`rounded-2xl ${card} p-4 text-center transition hover:bg-white/[0.085]`}>
            <div className="mx-auto mb-3 h-16 w-16 rounded-2xl bg-white/[0.05]" />
            <div className="text-sm font-extrabold text-white">{name}</div>
            <div className="mt-1 text-xs font-semibold text-white/70">{role}</div>
        </div>
    );
}

function SoftSeparator() {
    return (
        <div className="my-10 flex items-center justify-center">
            <div className="h-[3px] w-[min(720px,90%)] rounded-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.14),transparent)]" />
        </div>
    );
}

/** Big curved top edge for section 2 */
function CurvedTop() {
    return (
        <div className="pointer-events-none absolute inset-x-0 top-0 -translate-y-1/2">
            <div className="mx-auto max-w-[1400px] px-0">
                <div className="h-24 rounded-t-[64px] bg-slate-950/60 backdrop-blur-md shadow-[0_-18px_70px_rgba(0,0,0,0.6)]" />
                <div className="-mt-24 h-24 rounded-t-[64px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12),transparent_60%)] opacity-60" />
            </div>
        </div>
    );
}

export default function Page() {
    const team: TeamMember[] = [
        { name: "Tisha Khandokar", role: "Project Lead" },
        { name: "Md Munim Ahmed", role: "System Analyst" },
        { name: "Injamamul Haque Sonet", role: "System Architect & Technical Lead" },
        { name: "Abu Niaz", role: "Developer" },
        { name: "Zarin Chowdhury", role: "Researcher" },
    ];

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <div className="relative min-h-screen overflow-hidden">
                {/* global night base */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(99,102,241,0.28),transparent_60%),radial-gradient(900px_600px_at_80%_20%,rgba(14,165,233,0.22),transparent_55%),radial-gradient(1000px_700px_at_20%_40%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(1200px_800px_at_50%_100%,rgba(245,158,11,0.10),transparent_60%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:46px_46px]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />

                {/* SECTION 1: HERO (full width, taller) */}
                <section className="relative">
                    <div
                        className="relative bg-cover bg-center"
                        style={{ backgroundImage: `url("${HERO_BG}")` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/35 to-slate-950/90" />
                        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />

                        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
                            <div className="mx-auto max-w-3xl text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Pill icon={Rocket} label="Team Diamonds" />
                                    <Pill icon={Stars} label="Space Learning" />
                                </div>

                                <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                                    Diamond In the Sky
                                </h1>
                                <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
                                    Discover the magic of stars — Learn, Play, and Explore the Night Sky!
                                </p>

                                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                    <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-white/95">
                                        <Play className="h-5 w-5 text-indigo-600" />
                                        Play the Game
                                    </button>
                                    <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15">
                                        <MonitorPlay className="h-5 w-5 text-cyan-200" />
                                        Watch Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: framed + arc connector like your sketch */}
                <section className="relative -mt-[30px]">
                    {/* full width (behind) */}
                    <div className="absolute inset-0 bg-slate-950" />

                    <div className="relative">
                        {/* Frame */}
                        <div
                            className="
                                    relative overflow-hidden
                                    bg-slate-950/55 backdrop-blur-md
                                    shadow-[0_28px_90px_rgba(0,0,0,0.65)]
                                "
                        >
                            {/* Image INSIDE the frame */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url("/images/section-2-bg.jpg")` }}
                            />
                            {/* overlays for readability */}
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/60 to-slate-950/85" />
                            <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />

                            {/* ===== The CURVE connector (like your sketch) ===== */}
                            {/* This draws a big arc at the top inside the same frame */}
                            <svg
                                className="pointer-events-none absolute left-0 top-0 h-24 w-full sm:h-28"
                                viewBox="0 0 1200 160"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                {/* The arc “cap” fill = same as frame base so it looks like one piece */}
                                <path
                                    d="M0,0 H1200 V60
             C920,120 740,150 600,150
             C460,150 280,120 0,60
             Z"
                                    fill="rgba(2,6,23,0.72)"
                                />
                                {/* subtle highlight rim */}
                                <path
                                    d="M0,58
             C280,118 460,145 600,145
             C740,145 920,118 1200,58"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.12)"
                                    strokeWidth="2"
                                />
                            </svg>

                            {/* Content (push down so it doesn’t sit under the arc) */}
                            <div className="relative px-5 pb-10 pt-24 sm:px-10 sm:pb-14 sm:pt-28">
                                <div className="mx-auto max-w-4xl">
                                    <SectionTitle
                                        title="What is Diamond In the Sky?"
                                        subtitle="An interactive space-learning game for kids aged 10–12"
                                    />

                                    <div className="mt-6">
                                        <SoftPanel>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge icon={Telescope} label="Learn" />
                                                <Badge icon={Play} label="Play" />
                                                <Badge icon={Sparkles} label="Explore" />
                                            </div>

                                            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
                                                <div className="rounded-3xl bg-white/[0.05] p-5">
                                                    <div className="text-sm font-extrabold text-white">
                                                        A fun way to understand constellations
                                                    </div>
                                                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                                                        Connect star patterns, learn color & brightness, and explore the night sky
                                                        through interactive missions.
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
                                                    <div
                                                        className={`rounded-3xl ${card} p-5 bg-gradient-to-br from-indigo-500/15 to-cyan-500/10`}
                                                    >
                                                        <div className="text-sm font-extrabold text-white">
                                                            Built for the Space Apps vibe
                                                        </div>
                                                        <p className="mt-2 text-sm leading-relaxed text-white/75">
                                                            Clean, modern UI with colorful accents—optimized for night mode.
                                                        </p>
                                                    </div>

                                                    <FeatureMini
                                                        icon={Sparkles}
                                                        title="Engaging missions"
                                                        desc="Short challenges that keep learning fun."
                                                        color="text-indigo-300"
                                                    />
                                                    <FeatureMini
                                                        icon={Telescope}
                                                        title="Guided exploration"
                                                        desc="Simple steps to identify patterns in the sky."
                                                        color="text-cyan-300"
                                                    />
                                                    <FeatureMini
                                                        icon={CheckCircle2}
                                                        title="Kid-friendly learning"
                                                        desc="Clear UI that focuses attention on discovery."
                                                        color="text-emerald-300"
                                                    />
                                                </div>
                                            </div>
                                        </SoftPanel>
                                    </div>
                                </div>

                                {/* optional separator inside frame */}
                                <div className="mt-10 flex items-center justify-center">
                                    <div className="h-[3px] w-[min(720px,90%)] rounded-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.16),transparent)]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTIONS 3+ (same as before, using the global dark base) */}
                <section className="relative">
                    <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
                        {/* ABOUT */}
                        <div className="mx-auto max-w-4xl">
                            <div className="pt-2">
                                <SectionKicker icon={Sparkles} label="About the Project" />
                            </div>
                            <SectionTitle title="Learning, Playing, Exploring the Stars" />

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <Card
                                    icon={Stars}
                                    title="Recognize star patterns"
                                    desc="Identify constellations by connecting dots."
                                    accent="from-indigo-600 to-violet-600"
                                />
                                <Card
                                    icon={Palette}
                                    title="Understand star colors"
                                    desc="Learn what color tells us about stars."
                                    accent="from-cyan-600 to-indigo-600"
                                />
                                <Card
                                    icon={Orbit}
                                    title="Explore the night sky"
                                    desc="Navigate different sky regions and stories."
                                    accent="from-emerald-600 to-cyan-600"
                                />
                                <Card
                                    icon={Sparkles}
                                    title="Make astronomy fun"
                                    desc="Gamified learning with friendly visuals."
                                    accent="from-amber-500 to-rose-500"
                                />
                            </div>
                        </div>

                        <SoftSeparator />

                        {/* HOW IT WORKS */}
                        <div className="mx-auto max-w-4xl">
                            <SectionKicker icon={Rocket} label="How It Works" />
                            <SectionTitle title="Play → Learn → Explore" />

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className={`rounded-3xl ${card} p-6`}>
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 p-3">
                                            <Telescope className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-extrabold text-white">Learn to Play</div>
                                            <p className="mt-1 text-sm leading-relaxed text-white/75">
                                                Discover stars & constellations with guided steps.
                                            </p>
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

                                <div className={`rounded-3xl ${card} p-6`}>
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-amber-500 p-3">
                                            <Sparkles className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-extrabold text-white">Play with Stars</div>
                                            <p className="mt-1 text-sm leading-relaxed text-white/75">
                                                Adjust brightness & color to see patterns clearly.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl bg-white/[0.05] p-4">
                                            <div className="text-sm font-bold text-white/90">Brightness control</div>
                                            <p className="mt-2 text-sm text-white/75">
                                                Make faint stars visible without clutter.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-white/[0.05] p-4">
                                            <div className="text-sm font-bold text-white/90">Color hints</div>
                                            <p className="mt-2 text-sm text-white/75">
                                                Learn how temperature links to color.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <SoftSeparator />

                        {/* TECHNOLOGY */}
                        <div className="mx-auto max-w-4xl">
                            <SectionKicker icon={Code2} label="Our Technology" />
                            <SectionTitle title="Tools & Workflow" />

                            <div className="mt-6 space-y-4">
                                <div className={`rounded-3xl ${card} p-5`}>
                                    <div className="flex flex-wrap items-center justify-center gap-3">
                                        <TechPill label="Dart" />
                                        <TechPill label="Flutter" />
                                        <TechPill label="Canva" />
                                        <TechPill label="Azure" />
                                        <TechPill label="Azure" />
                                    </div>
                                </div>

                                <Pipeline />
                            </div>
                        </div>

                        <SoftSeparator />

                        {/* TEAM */}
                        <div className="mx-auto max-w-4xl">
                            <SectionKicker icon={Stars} label="Meet Our Team" />
                            <SectionTitle title="Team Diamonds" />

                            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                                {team.map((m) => (
                                    <TeamCard key={m.name} name={m.name} role={m.role} />
                                ))}
                            </div>
                        </div>

                        <SoftSeparator />

                        {/* CTA */}
                        <div className="mx-auto max-w-4xl pb-6">
                            <div className={`rounded-3xl ${glass} p-8 text-center`}>
                                <h3 className="text-lg font-extrabold text-white">
                                    Join the Journey of Discovery!
                                </h3>
                                <p className="mx-auto mt-2 max-w-2xl text-sm text-white/75">
                                    Start learning constellations, play missions, and explore the night sky.
                                </p>

                                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                    <button className="inline-flex items-center gap-2 rounded-xl bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/[0.12]">
                                        <Sparkles className="h-5 w-5 text-indigo-300" />
                                        Start Learning
                                    </button>
                                    <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-400">
                                        <Play className="h-5 w-5 text-white" />
                                        Try the Game
                                    </button>
                                    <button className="inline-flex items-center gap-2 rounded-xl bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/[0.12]">
                                        <MonitorPlay className="h-5 w-5 text-cyan-200" />
                                        Watch Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}