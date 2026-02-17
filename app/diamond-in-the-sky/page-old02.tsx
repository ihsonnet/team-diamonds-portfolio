// app/diamond-in-the-sky/page.tsx
// Full-width page (no outer white poster box). Content stays in a centered container.
// “Scratch / hand-drawn” look: wavy dividers, dashed borders, sketchy SVG doodles.
// Hero uses your background image (set HERO_BG below).

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

const HERO_BG = "https://i.ibb.co/Xf7p2t4G/"; // your provided link (you can replace with direct image url if needed)

type TeamMember = { name: string; role: string };

function SketchFrame({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={[
                "relative rounded-2xl bg-white/80 backdrop-blur",
                "ring-1 ring-black/10 shadow-[0_18px_40px_rgba(0,0,0,0.10)]",
                "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl",
                "before:[background-image:repeating-linear-gradient(0deg,rgba(0,0,0,.08),rgba(0,0,0,.08)_2px,transparent_2px,transparent_10px)]",
                "before:opacity-[0.08]",
                className,
            ].join(" ")}
        >
            {/* sketchy border overlay */}
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
            >
                <path
                    d="M6,12 C18,6 82,6 94,12
             C98,22 98,78 94,88
             C82,94 18,94 6,88
             C2,78 2,22 6,12 Z"
                    fill="none"
                    stroke="rgba(15,23,42,0.28)"
                    strokeWidth="0.9"
                    strokeDasharray="2.5 2"
                    vectorEffect="non-scaling-stroke"
                />
                <path
                    d="M7,13 C20,7 80,7 93,13
             C97,23 97,77 93,87
             C80,93 20,93 7,87
             C3,77 3,23 7,13 Z"
                    fill="none"
                    stroke="rgba(15,23,42,0.14)"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            <div className="relative">{children}</div>
        </div>
    );
}

function WavyDivider({ tone = "light" }: { tone?: "light" | "mid" | "dark" }) {
    const fill =
        tone === "dark"
            ? "rgba(2,6,23,0.25)"
            : tone === "mid"
                ? "rgba(15,23,42,0.12)"
                : "rgba(15,23,42,0.08)";
    return (
        <div className="relative h-10 w-full overflow-hidden">
            <svg
                viewBox="0 0 1200 100"
                className="absolute inset-x-0 top-0 h-10 w-[140%]"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    d="M0,60 C120,20 240,90 360,60 C480,30 600,90 720,60 C840,30 960,90 1080,60 C1140,45 1170,45 1200,52 L1200,100 L0,100 Z"
                    fill={fill}
                />
            </svg>
        </div>
    );
}

function Badge({
    icon: Icon,
    label,
    accent = "text-indigo-600",
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    accent?: string;
}) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-black/10">
            <Icon className={`h-4 w-4 ${accent}`} />
            {label}
        </span>
    );
}

function SketchButton({
    icon: Icon,
    label,
    variant = "dark",
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    variant?: "dark" | "light";
}) {
    const base =
        "inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold transition";
    const dark =
        "bg-slate-900 text-white shadow-sm hover:bg-slate-800 ring-1 ring-black/10";
    const light =
        "bg-white/80 text-slate-900 shadow-sm hover:bg-white ring-1 ring-black/10";
    return (
        <button type="button" className={`${base} ${variant === "dark" ? dark : light}`}>
            <Icon className="h-4 w-4" />
            {label}
        </button>
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
            <h2 className="text-base font-extrabold tracking-tight text-slate-950 sm:text-lg">
                {title}
            </h2>
            {subtitle ? (
                <p className="mx-auto mt-1 max-w-xl text-xs font-medium text-slate-700">
                    {subtitle}
                </p>
            ) : null}
        </div>
    );
}

function CornerDoodles() {
    // small scratch doodles: constellation + ringed planet + rocket outline
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0">
            <svg className="absolute left-3 top-3 h-20 w-28 opacity-60" viewBox="0 0 160 110">
                <g fill="none" stroke="rgba(15,23,42,0.35)" strokeWidth="2" strokeLinecap="round">
                    <path d="M16,78 L54,30 L92,66 L128,24" />
                </g>
                <g fill="rgba(15,23,42,0.35)">
                    <circle cx="16" cy="78" r="4" />
                    <circle cx="54" cy="30" r="4" />
                    <circle cx="92" cy="66" r="4" />
                    <circle cx="128" cy="24" r="4" />
                </g>
            </svg>

            <svg className="absolute right-3 top-3 h-20 w-28 opacity-60" viewBox="0 0 160 110">
                <g fill="none" stroke="rgba(15,23,42,0.35)" strokeWidth="2" strokeLinecap="round">
                    <ellipse cx="86" cy="54" rx="34" ry="22" />
                    <path d="M35,58 C60,40 120,40 145,58" />
                    <path d="M40,66 C66,48 115,48 140,66" />
                </g>
            </svg>

            <svg className="absolute left-4 bottom-4 h-16 w-20 opacity-55" viewBox="0 0 120 90">
                <g fill="none" stroke="rgba(15,23,42,0.35)" strokeWidth="2" strokeLinecap="round">
                    <path d="M18,58 C40,20 74,16 100,38 C82,44 62,60 54,76 C42,70 28,66 18,58 Z" />
                    <path d="M52,44 L70,36" />
                    <circle cx="62" cy="48" r="5" />
                </g>
            </svg>
        </div>
    );
}

function ConstellationPlaceholder() {
    return (
        <div className="relative h-40 w-full rounded-xl bg-gradient-to-br from-white to-slate-50 ring-1 ring-black/10">
            <div className="absolute inset-0 rounded-xl [background:radial-gradient(8px_8px_at_20%_35%,rgba(99,102,241,.35),transparent_60%),radial-gradient(7px_7px_at_45%_25%,rgba(14,165,233,.35),transparent_60%),radial-gradient(7px_7px_at_65%_55%,rgba(16,185,129,.30),transparent_60%),radial-gradient(8px_8px_at_80%_30%,rgba(245,158,11,.30),transparent_60%)]" />
            <svg viewBox="0 0 420 160" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <g fill="none" stroke="rgba(15,23,42,.25)" strokeWidth="2" strokeLinecap="round">
                    <path d="M60,110 L140,70 L210,95 L270,55 L340,85" />
                </g>
                <g fill="rgba(15,23,42,.35)">
                    <circle cx="60" cy="110" r="5" />
                    <circle cx="140" cy="70" r="5" />
                    <circle cx="210" cy="95" r="5" />
                    <circle cx="270" cy="55" r="5" />
                    <circle cx="340" cy="85" r="5" />
                </g>
            </svg>
            <div className="absolute bottom-3 left-3 rounded-md bg-white/85 px-2 py-1 text-[10px] font-semibold text-slate-700 ring-1 ring-black/10">
                Placeholder: constellation image
            </div>
        </div>
    );
}

function MiniCard({
    title,
    desc,
    icon: Icon,
    grad,
}: {
    title: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
    grad: string;
}) {
    return (
        <div className="rounded-xl bg-white/85 p-4 shadow-sm ring-1 ring-black/10">
            <div className="flex items-start gap-3">
                <div className={`rounded-lg p-2 ${grad}`}>
                    <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                    <div className="text-xs font-extrabold text-slate-900">{title}</div>
                    <div className="mt-1 text-[11px] leading-relaxed text-slate-600">
                        {desc}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TechPill({ label }: { label: string }) {
    return (
        <div className="rounded-md bg-white/85 px-3 py-1.5 text-xs font-semibold text-slate-800 ring-1 ring-black/10">
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
        <div className="mt-3 rounded-xl bg-white/85 p-4 ring-1 ring-black/10">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {steps.map((s, i) => (
                    <React.Fragment key={s.label}>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 ring-1 ring-black/10">
                            <s.icon className="h-4 w-4 text-indigo-600" />
                            {s.label}
                        </div>
                        {i !== steps.length - 1 ? (
                            <div className="h-[2px] w-6 rounded-full bg-slate-900/10" />
                        ) : null}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

function TeamCard({ name, role }: { name: string; role: string }) {
    return (
        <div className="rounded-xl bg-white/85 p-3 text-center shadow-sm ring-1 ring-black/10">
            <div className="mx-auto mb-2 h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-100 to-white ring-1 ring-black/10" />
            <div className="text-[11px] font-extrabold text-slate-900">{name}</div>
            <div className="mt-1 text-[10px] font-semibold text-slate-600">{role}</div>
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
        <main className="min-h-screen bg-slate-950 text-slate-900">
            {/* Full-width night background */}
            <div className="relative min-h-screen overflow-hidden">
                {/* space gradients + subtle stars */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(99,102,241,0.35),transparent_60%),radial-gradient(900px_600px_at_80%_20%,rgba(14,165,233,0.25),transparent_55%),radial-gradient(1000px_700px_at_20%_40%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(1200px_800px_at_50%_100%,rgba(245,158,11,0.12),transparent_60%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:40px_40px]" />

                {/* ===== FULL WIDTH PAGE (container content) ===== */}
                <div className="relative mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
                    {/* HERO: full-width section, container content, with your bg image */}
                    <section className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
                        <div
                            className="relative bg-cover bg-center"
                            style={{ backgroundImage: `url("${HERO_BG}")` }}
                        >
                            {/* overlay for readability */}
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/35 to-slate-950/65" />
                            <div className="absolute inset-0 [background:radial-gradient(900px_500px_at_50%_10%,rgba(255,255,255,0.14),transparent_60%)]" />

                            <div className="relative px-5 py-10 sm:px-10 sm:py-14">
                                <SketchFrame className="mx-auto max-w-3xl p-6 sm:p-8">
                                    <CornerDoodles />

                                    <div className="text-center">
                                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                                            Diamond In the Sky
                                        </h1>
                                        <p className="mx-auto mt-2 max-w-xl text-xs font-semibold text-slate-700 sm:text-sm">
                                            Discover the magic of stars — <br className="hidden sm:block" />
                                            Learn, Play, and Explore the Night Sky!
                                        </p>

                                        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                            <SketchButton icon={Play} label="Play the Game" variant="dark" />
                                            <SketchButton icon={MonitorPlay} label="Watch Demo" variant="light" />
                                        </div>
                                    </div>
                                </SketchFrame>
                            </div>
                        </div>
                    </section>

                    {/* BODY: full width page, sections feel like the “scratch poster” (no outer box) */}
                    <div className="mt-10 space-y-10">
                        {/* WHAT IS */}
                        <section className="relative">
                            <div className="mx-auto max-w-4xl">
                                <SectionTitle
                                    title="What is Diamond In the Sky?"
                                    subtitle="An interactive space-learning game for kids aged 10–12"
                                />
                                <div className="mt-5">
                                    <SketchFrame className="p-5 sm:p-6">
                                        <div className="flex flex-wrap gap-2">
                                            <Badge icon={Telescope} label="Learn" accent="text-indigo-600" />
                                            <Badge icon={Play} label="Play" accent="text-sky-600" />
                                            <Badge icon={Sparkles} label="Explore" accent="text-emerald-600" />
                                        </div>

                                        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_280px]">
                                            {/* left */}
                                            <div className="rounded-xl bg-white/85 p-4 ring-1 ring-black/10">
                                                <div className="text-xs font-extrabold text-slate-900">
                                                    A fun way to understand constellations
                                                </div>
                                                <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                                                    Connect star patterns, learn color & brightness, and explore the night sky
                                                    through interactive missions.
                                                </p>

                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    <Badge icon={Stars} label="Constellations" accent="text-indigo-600" />
                                                    <Badge icon={Palette} label="Star colors" accent="text-amber-600" />
                                                    <Badge icon={Sparkles} label="Brightness" accent="text-emerald-600" />
                                                </div>

                                                <div className="mt-4">
                                                    <ConstellationPlaceholder />
                                                </div>
                                            </div>

                                            {/* right stacked */}
                                            <div className="space-y-3">
                                                <div className="rounded-xl bg-white/85 p-4 ring-1 ring-black/10">
                                                    <div className="text-xs font-extrabold text-slate-900">
                                                        Built for the Space Apps vibe
                                                    </div>
                                                    <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                                                        A clean, scratchy poster layout with playful doodles and crisp cards.
                                                    </p>
                                                </div>

                                                <MiniCard
                                                    title="Engaging missions"
                                                    desc="Short challenges that keep learning fun."
                                                    icon={Sparkles}
                                                    grad="bg-gradient-to-br from-indigo-600 to-sky-500"
                                                />
                                                <MiniCard
                                                    title="Guided exploration"
                                                    desc="Simple steps to identify patterns in the sky."
                                                    icon={Telescope}
                                                    grad="bg-gradient-to-br from-sky-600 to-emerald-500"
                                                />
                                                <MiniCard
                                                    title="Kid-friendly learning"
                                                    desc="Clear UI that focuses attention on discovery."
                                                    icon={CheckCircle2}
                                                    grad="bg-gradient-to-br from-emerald-600 to-amber-500"
                                                />
                                            </div>
                                        </div>
                                    </SketchFrame>
                                </div>
                            </div>

                            <div className="mt-8">
                                <WavyDivider tone="mid" />
                            </div>
                        </section>

                        {/* ABOUT */}
                        <section className="relative">
                            <div className="mx-auto max-w-4xl">
                                <div className="flex justify-center">
                                    <Badge icon={Sparkles} label="About the Project" accent="text-amber-600" />
                                </div>
                                <div className="mt-2">
                                    <SectionTitle title="Learning, Playing, Exploring the Stars" />
                                </div>

                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    <MiniCard
                                        title="Recognize star patterns"
                                        desc="Identify constellations by connecting dots."
                                        icon={Stars}
                                        grad="bg-gradient-to-br from-indigo-600 to-violet-600"
                                    />
                                    <MiniCard
                                        title="Understand star colors"
                                        desc="Learn what color tells us about stars."
                                        icon={Palette}
                                        grad="bg-gradient-to-br from-sky-600 to-indigo-600"
                                    />
                                    <MiniCard
                                        title="Explore the night sky"
                                        desc="Navigate different sky regions and stories."
                                        icon={Orbit}
                                        grad="bg-gradient-to-br from-emerald-600 to-sky-600"
                                    />
                                    <MiniCard
                                        title="Make astronomy fun"
                                        desc="Gamified learning with friendly visuals."
                                        icon={Sparkles}
                                        grad="bg-gradient-to-br from-amber-500 to-rose-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <WavyDivider tone="mid" />
                            </div>
                        </section>

                        {/* HOW IT WORKS */}
                        <section className="relative">
                            <div className="mx-auto max-w-4xl">
                                <div className="flex justify-center">
                                    <Badge icon={Rocket} label="How It Works" accent="text-emerald-600" />
                                </div>
                                <div className="mt-2">
                                    <SectionTitle title="Play → Learn → Explore" />
                                </div>

                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <SketchFrame className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-lg bg-gradient-to-br from-indigo-600 to-sky-500 p-2">
                                                <Telescope className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-extrabold text-slate-900">
                                                    Learn to Play
                                                </div>
                                                <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                                                    Discover stars & constellations with guided steps.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-3 rounded-xl bg-white/85 p-3 ring-1 ring-black/10">
                                            <div className="text-[11px] font-bold text-slate-800">Quick flow</div>
                                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                                <li>• Choose a constellation mission</li>
                                                <li>• Connect stars in the right order</li>
                                                <li>• Learn the story and key facts</li>
                                            </ul>
                                        </div>
                                    </SketchFrame>

                                    <SketchFrame className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-lg bg-gradient-to-br from-emerald-600 to-amber-500 p-2">
                                                <Sparkles className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-extrabold text-slate-900">
                                                    Play with Stars
                                                </div>
                                                <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                                                    Adjust brightness & color to see patterns clearly.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                            <div className="rounded-xl bg-white/85 p-3 ring-1 ring-black/10">
                                                <div className="text-[11px] font-bold text-slate-800">
                                                    Brightness control
                                                </div>
                                                <div className="mt-1 text-[11px] text-slate-600">
                                                    Make faint stars visible without clutter.
                                                </div>
                                            </div>
                                            <div className="rounded-xl bg-white/85 p-3 ring-1 ring-black/10">
                                                <div className="text-[11px] font-bold text-slate-800">Color hints</div>
                                                <div className="mt-1 text-[11px] text-slate-600">
                                                    Learn how temperature links to color.
                                                </div>
                                            </div>
                                        </div>
                                    </SketchFrame>
                                </div>
                            </div>

                            <div className="mt-8">
                                <WavyDivider tone="mid" />
                            </div>
                        </section>

                        {/* OUR TECHNOLOGY */}
                        <section className="relative">
                            <div className="mx-auto max-w-4xl">
                                <div className="flex justify-center">
                                    <Badge icon={Code2} label="Our Technology" accent="text-violet-600" />
                                </div>
                                <div className="mt-2">
                                    <SectionTitle title="Tools & Workflow" />
                                </div>

                                <div className="mt-5 space-y-3">
                                    <SketchFrame className="p-4">
                                        <div className="flex flex-wrap items-center justify-center gap-2">
                                            <TechPill label="Dart" />
                                            <TechPill label="Flutter" />
                                            <TechPill label="Canva" />
                                            <TechPill label="Azure" />
                                            <TechPill label="Azure" />
                                        </div>
                                    </SketchFrame>

                                    <SketchFrame className="p-2 sm:p-3">
                                        <Pipeline />
                                    </SketchFrame>
                                </div>
                            </div>

                            <div className="mt-8">
                                <WavyDivider tone="mid" />
                            </div>
                        </section>

                        {/* TEAM */}
                        <section className="relative">
                            <div className="mx-auto max-w-4xl">
                                <div className="flex justify-center">
                                    <Badge icon={Stars} label="Meet Our Team" accent="text-sky-600" />
                                </div>
                                <div className="mt-2">
                                    <SectionTitle title="Team Diamonds" />
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
                                    {team.map((m) => (
                                        <SketchFrame key={m.name} className="p-2">
                                            <TeamCard name={m.name} role={m.role} />
                                        </SketchFrame>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8">
                                <WavyDivider tone="mid" />
                            </div>
                        </section>

                        {/* CTA */}
                        <section className="relative pb-6">
                            <div className="mx-auto max-w-4xl">
                                <SketchFrame className="p-5 text-center">
                                    <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-black/10">
                                        <Sparkles className="h-4 w-4 text-indigo-600" />
                                        Join the Journey of Discovery!
                                    </div>

                                    <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                        <SketchButton icon={Sparkles} label="Start Learning" variant="light" />
                                        <SketchButton icon={Play} label="Try the Game" variant="dark" />
                                        <SketchButton icon={MonitorPlay} label="Watch Demo" variant="light" />
                                    </div>
                                </SketchFrame>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}