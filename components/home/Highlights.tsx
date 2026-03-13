"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Mic, Hexagon, Users, Code, Sparkles, ArrowUpRight, Rocket, Award 
} from "lucide-react";

// --- Initial Data ---
const INITIAL_LEFT = [
  {
    id: "nasa-pilot",
    title: "NASA Junior Pilot Program",
    tag: "Special Guest",
    desc: "Invited as a special guest to inspire and guide the next generation of space explorers. Sharing our journey to ignite curiosity among young minds.",
    img: "/images/Pilot.jpg",
    icon: Rocket,
    color: "text-blue-400",
    glow: "rgba(37,99,235,1)",
    badgeBg: "bg-blue-500/10",
  },
  { 
    id: "spaceverse", 
    title: "SPACEVERSE 1.0", 
    tag: "Panelist", 
    icon: Mic, 
    color: "text-blue-400", 
    glow: "rgba(37,99,235,1)", 
    badgeBg: "bg-blue-500/10", 
    desc: "Shared insights on the future of interactive space education and stellar variability.", 
    img: "/images/DU.jpg",
  }
];

const INITIAL_RIGHT = [
  { 
    id: "washington-uni", 
    title: "Washington University of Science & Technology", 
    tag: "Workshop", 
    icon: Users, 
    color: "text-blue-400", 
    glow: "rgba(37,99,235,1)", 
    badgeBg: "bg-blue-500/10", 
    desc: "Conducted a hands-on workshop bridging the gap between complex space data and accessible technology.", 
    img: "/images/WUST.jpg",
  },
  { 
    id: "bd-2022", 
    title: "বাংলাদেশ ২০২২: গৌরবময় অর্জন উদযাপন", 
    tag: "Invited Guest", 
    icon: Trophy, 
    color: "text-blue-400", 
    glow: "rgba(37,99,235,1)", 
    badgeBg: "bg-blue-500/10", 
    desc: "Honored to participate in the celebration of glorious achievements and technological milestones.", 
    img: "/images/Ekattor.jpg",
  },
  { 
    id: "nrb-global", 
    title: "NRB Global Reception", 
    tag: "Reception", 
    icon: Sparkles, 
    color: "text-blue-400", 
    glow: "rgba(37,99,235,1)", 
    badgeBg: "bg-blue-500/10", 
    desc: "Received a special reception recognizing our innovative approach to educating children about the cosmos.", 
    img: "/images/NRB.jpg",
  },
];

const DEFAULT_FEATURED = {
  id: "nasa-hq-celebration",
  title: "Space Apps Winners Celebration Program at NASA HQ",
  tag: "Global Champion",
  desc: "An exclusive celebration program hosted at NASA Headquarters in Washington, D.C., honoring the global winners of the NASA Space Apps Challenge.",
  img: "/images/NASA.jpg",
  icon: Award,
  color: "text-blue-400",
  glow: "rgba(37,99,235,1)",
  badgeBg: "bg-blue-500/10",
};

export default function MissionGallery() {
  const [featured, setFeatured] = useState(DEFAULT_FEATURED);
  const [leftItems, setLeftItems] = useState(INITIAL_LEFT);
  const [rightItems, setRightItems] = useState(INITIAL_RIGHT);

  const handleSwap = (clickedItem: any, side: "left" | "right") => {
    const prevFeatured = { ...featured };
    setFeatured(clickedItem);
    if (side === "left") {
      setLeftItems(prev => prev.map(item => item.id === clickedItem.id ? prevFeatured : item));
    } else {
      setRightItems(prev => prev.map(item => item.id === clickedItem.id ? prevFeatured : item));
    }
  };

  return (
    <section className="force-trebuchet relative w-full py-24 bg-transparent overflow-hidden">
      
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Force Trebuchet MS everywhere inside this component */
        .force-trebuchet, .force-trebuchet * {
          font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif !important;
        }
      `}} />
      
      {/* Title Section */}
      <div className="relative z-10 flex flex-col items-center text-center mb-16 px-4">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-blue-400" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">Mission Archives</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tight drop-shadow-md">
          Highlighted <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Events</span>
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: Down to Up */}
          <div className="md:col-span-3 h-[650px] overflow-hidden relative">
            <motion.div 
              animate={{ y: "-50%" }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex flex-col gap-6"
            >
              {[...leftItems, ...leftItems].map((item, idx) => (
                <SideCard key={`left-${item.id}-${idx}`} item={item} onClick={() => handleSwap(item, "left")} />
              ))}
            </motion.div>
          </div>

          {/* CENTER: Featured Card with Spinning Border Gradient */}
          <div className="md:col-span-6 h-[650px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={featured.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full rounded-[2.5rem] p-[2px] overflow-hidden group"
              >
                {/* Conic Spinning Border */}
                <div 
                  className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] opacity-40 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 70%, ${featured.glow} 100%)` }}
                />

                <div className="relative h-full w-full rounded-[calc(2.5rem-2px)] overflow-hidden bg-[#060d1b] flex flex-col">
                  
                  {/* Top Block: 4:3 Blended Image */}
                  <div className="relative w-full aspect-[4/3] max-h-[50%] shrink-0 bg-[#060d1b] overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 transition-transform duration-1000 group-hover:scale-105" 
                      style={{ backgroundImage: `url('${featured.img}')` }} 
                    />
                    
                    {/* Tag overlaying the image */}
                    <div className="absolute top-6 left-6 z-20">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl ${featured.badgeBg}`}>
                        <featured.icon className={`w-4 h-4 ${featured.color}`} />
                        <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${featured.color}`}>{featured.tag}</span>
                      </div>
                    </div>
                    
                    {/* Seamless blend image smoothly into the transparent card base */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060d1b] via-[#060d1b]/40 to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom Block: Text Content & Button */}
                  <div className="flex flex-col justify-between flex-1 p-8 lg:p-10 z-20">
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-light text-white mb-4 tracking-tight leading-tight">
                        {featured.title}
                      </h3>
                      <p className="text-base text-white/60 font-light leading-relaxed max-w-xl">
                        {featured.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                      <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black text-xs font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        View Gallery
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Up to Down */}
          <div className="md:col-span-3 h-[650px] overflow-hidden relative">
            <motion.div 
              initial={{ y: "-50%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex flex-col gap-6"
            >
              {[...rightItems, ...rightItems].map((item, idx) => (
                <SideCard key={`right-${item.id}-${idx}`} item={item} onClick={() => handleSwap(item, "right")} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function SideCard({ item, onClick }: { item: any, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="group relative w-full h-[312px] shrink-0 text-left overflow-hidden rounded-[2rem] border border-white/5 bg-[#060d1b] backdrop-blur-md transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] flex flex-col"
    >
      {/* Top Block: Blended Image */}
      <div className="relative w-full flex-1 overflow-hidden bg-[#060d1b]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90" 
          style={{ backgroundImage: `url('${item.img}')` }} 
        />
        {/* Deep fade into the transparent background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060d1b] via-[#060d1b]/30 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Block: Title seamlessly blended */}
      <div className="relative w-full px-6 pb-6 pt-2 z-20 shrink-0">
        <h3 className="text-lg font-medium text-white tracking-tight group-hover:text-blue-400 transition-colors line-clamp-2">
          {item.title}
        </h3>
      </div>
    </button>
  );
}