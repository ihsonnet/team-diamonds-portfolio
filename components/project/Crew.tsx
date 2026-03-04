"use client";

// ── Helper: single expanding card ─────────────────────────────────
function HoloTeamCard({ name, role, img }: { name: string; role: string; img: string }) {
  return (
    <div className="group relative flex-1 lg:hover:flex-[2.5] h-24 lg:h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-2xl glass-panel cursor-pointer border border-white/5 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">

      {/* Holographic scanning line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 shadow-[0_0_10px_#22d3ee] -translate-y-[100px] group-hover:animate-[float_2s_ease-in-out_infinite] z-20" />

      {/* Desaturated → colour on hover */}
      <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent z-10 transition-colors duration-700" />
      <img
        src={img}
        className="absolute inset-0 w-full h-full object-cover object-top opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
        alt={name}
      />

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 w-full p-4 lg:p-6 bg-gradient-to-t from-[#02040A] via-[#02040A]/80 to-transparent z-20 flex flex-col justify-end h-full lg:h-auto">
        <div className="translate-y-0 lg:translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
          <h4 className="font-bold text-lg lg:text-2xl mb-1 text-white whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-md">
            {name}
          </h4>
          <p className="text-cyan-400 text-[10px] lg:text-xs uppercase tracking-widest font-bold opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 whitespace-nowrap overflow-hidden text-ellipsis">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────
export default function Crew() {
  const members = [
    { name: "Tisha Khandokar",       role: "Project Lead & Designer",      img: "/images/team/tisha.jpg" },
    { name: "Md Munim Ahmed",         role: "System Analyst & Designer",    img: "/images/team/munim.jpg" },
    { name: "Injamamul Haque Sonet",  role: "System Architect & Lead Dev",  img: "/images/team/sonet.jpg" },
    { name: "Abu Niaz",               role: "Developer",                    img: "/images/team/abu-niaz.jpg" },
    { name: "Zarin Chowdhury",        role: "Researcher",                   img: "/images/team/zarin.jpg" },
  ];

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto text-center">

      {/* Heading */}
      <div className="max-w-2xl mx-auto mb-16 animate-float">
        <h2 className="text-5xl font-black mb-6 tracking-tight uppercase">
          Crew <span className="text-cyan-400">Roster</span>
        </h2>
        <p className="text-white/70 text-lg">
          The visionary architects bringing the cosmos to your fingertips.
        </p>
      </div>

      {/* Accordion row */}
      <div className="flex flex-col lg:flex-row h-auto min-h-[600px] lg:h-[500px] gap-4 w-full">
        {members.map((m) => (
          <HoloTeamCard key={m.name} {...m} />
        ))}
      </div>
    </section>
  );
}