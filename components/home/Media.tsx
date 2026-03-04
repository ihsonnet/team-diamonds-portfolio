"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Tv, Globe, Radio, ExternalLink, PlayCircle, ArrowRight, Calendar, Mic, BookOpen, Facebook } from "lucide-react";

const PRESS_COVERAGE = [
  {
    id: "press-1",
    icon: Globe,
    outlet: "NASA",
    date: "Jan 2023",
    title: "NASA Announces Winners of 2022 Global Space Apps Challenge",
    desc: "Official announcement from NASA Earthdata recognizing the Bangladeshi team among the global winners of the world's largest hackathon.",
    action: "Read Official News",
    actionIcon: ExternalLink,
    color: "text-cyan-400",
    badgeBg: "bg-cyan-500/20",
    badgeBorder: "border-cyan-500/40",
    glow: "rgba(34,211,238,1)",
    img: "https://www.earthdata.nasa.gov/s3fs-public/2023-01/SpaceApps2022_Winners_Social_1.png",
    url: "https://www.earthdata.nasa.gov/news/nasa-announces-winners-2022-global-space-apps-challenge"
  },
  {
    id: "press-2",
    icon: Newspaper,
    outlet: "The Daily Star",
    date: "Dec 2022",
    title: "Bangladeshi team wins NASA Space Apps Challenge 2022",
    desc: "National coverage of the historic win, highlighting the team's innovative approach to space-themed educational gaming.",
    action: "Read Article",
    actionIcon: ExternalLink,
    color: "text-orange-400",
    badgeBg: "bg-orange-500/20",
    badgeBorder: "border-orange-500/40",
    glow: "rgba(251,146,60,1)",
    img: "https://www.thedailystar.net/sites/default/files/styles/very_big_2/public/images/2022/12/10/nasa_1.jpg",
    url: "https://www.thedailystar.net/tech-startup/news/bangladeshi-team-wins-nasa-space-apps-challenge-2022-3194371"
  },
  {
    id: "press-3",
    icon: Tv,
    outlet: "BBC Bangla",
    date: "Dec 2022",
    title: "Exclusive Feature: Team Diamonds Journey",
    desc: "BBC Bangla covers the journey of the Bangladeshi youth who conquered the global stage at the NASA Space Apps Challenge.",
    action: "Watch Feature",
    actionIcon: PlayCircle,
    color: "text-red-400",
    badgeBg: "bg-red-500/20",
    badgeBorder: "border-red-500/40",
    glow: "rgba(248,113,113,1)",
    img: "https://img.youtube.com/vi/SP597hlHmbQ/maxresdefault.jpg",
    url: "https://youtu.be/SP597hlHmbQ"
  },
  {
    id: "press-4",
    icon: Facebook,
    outlet: "U.S. Embassy Dhaka",
    date: "June 2024",
    title: "Celebrating Innovation with U.S. Embassy",
    desc: "Special recognition and event coverage from the U.S. Embassy in Dhaka celebrating the international achievements of the team.",
    action: "View Video",
    actionIcon: PlayCircle,
    color: "text-blue-400",
    badgeBg: "bg-blue-500/20",
    badgeBorder: "border-blue-500/40",
    glow: "rgba(96,165,250,1)",
    img: "https://images.unsplash.com/photo-1540653542719-2ecd87c3c3b4?q=80&w=1080&auto=format&fit=crop",
    url: "https://fb.watch/lchZntRx9g/"
  },
  {
    id: "press-5",
    icon: Newspaper,
    outlet: "Prothom Alo",
    date: "Dec 2022",
    title: "নাসা জয়ী বাংলাদেশের তরুণরা",
    desc: "A detailed report on how the team secured the top spot globally and their future plans for space tech in Bangladesh.",
    action: "Read Bangla",
    actionIcon: ExternalLink,
    color: "text-indigo-400",
    badgeBg: "bg-indigo-500/20",
    badgeBorder: "border-indigo-500/40",
    glow: "rgba(99,102,241,1)",
    img: "https://images.prothomalo.com/prothomalo-bangla%2F2022-12%2F6f224967-8e68-4f81-9b16-43c79a5c68b3%2F1.jpg",
    url: "https://www.prothomalo.com/technology/wv6yv9lqyr"
  },
  {
    id: "press-6",
    icon: Tv,
    outlet: "Somoy TV",
    date: "Jan 2023",
    title: "Winning NASA: The Technical Deep Dive",
    desc: "Television interview discussing the architectural challenges of the project and the impact of the global victory.",
    action: "Watch Somoy",
    actionIcon: PlayCircle,
    color: "text-emerald-400",
    badgeBg: "bg-emerald-500/20",
    badgeBorder: "border-emerald-500/40",
    glow: "rgba(52,211,153,1)",
    img: "https://img.youtube.com/vi/BGGcuhTMLY4/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=BGGcuhTMLY4"
  },
  {
    id: "press-7",
    icon: Mic,
    outlet: "TED Talk (LEAD)",
    date: "2024",
    title: "Innovating for the Future of Space",
    desc: "A keynote presentation on leveraging technology to democratize space science for children worldwide.",
    action: "Listen to Talk",
    actionIcon: PlayCircle,
    color: "text-rose-400",
    badgeBg: "bg-rose-500/20",
    badgeBorder: "border-rose-500/40",
    glow: "rgba(251,113,133,1)",
    img: "https://images.unsplash.com/photo-1475721027785-f74dea327912?q=80&w=1080&auto=format&fit=crop",
    url: "https://www.facebook.com/share/v/3gePBfDspnKB9tCH/"
  }
];

const cx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

export default function Media() {
  const [gridItems, setGridItems] = useState([...PRESS_COVERAGE]);

  const handleSwap = (clickedItem: any) => {
    setGridItems((prevItems) => {
      const clickedIndex = prevItems.findIndex(item => item.id === clickedItem.id);
      if (clickedIndex === 0 || clickedIndex === -1) return prevItems; 

      const newLayout = [...prevItems];
      const tempCenter = newLayout[0];
      newLayout[0] = newLayout[clickedIndex];
      newLayout[clickedIndex] = tempCenter;

      return newLayout;
    });
  };

  const heroItem = gridItems[0];
  const carouselItems = gridItems.slice(1);

  const MarqueeTrack = () => (
    <div className="flex shrink-0 gap-6 pr-6">
      {carouselItems.map((item) => (
        <div 
          key={item.id}
          onClick={() => handleSwap(item)}
          className="shrink-0 relative w-[300px] sm:w-[380px] h-[320px] rounded-[1.5rem] overflow-hidden cursor-pointer group"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:opacity-80"
            style={{ backgroundImage: `url('${item.img}')` }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-[#02040A]/40 to-transparent" />
          
          <div className={cx("absolute top-5 left-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full", item.badgeBg)}>
            <item.icon className={cx("w-3.5 h-3.5", item.color)} />
            <span className={cx("text-[10px] font-bold tracking-[0.15em] uppercase", item.color)}>{item.outlet}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 pt-12">
            <h3 className="text-lg sm:text-xl font-medium text-white mb-2 leading-snug line-clamp-2">{item.title}</h3>
            <div className="flex items-center gap-2 text-white/50">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wider uppercase">{item.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="force-trebuchet relative w-full py-24 bg-transparent overflow-hidden z-10">
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .force-trebuchet, .force-trebuchet * {
          font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif !important;
        }
      `}} />

      <div className="relative z-10 flex flex-col items-center text-center mb-16 px-4">
        <div className="flex items-center gap-3 mb-4 rounded-full bg-white/[0.03] px-4 py-1.5">
          <Radio className="h-4 w-4 text-cyan-400 animate-pulse" />
          <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-cyan-100">
            Media Transmissions
          </h2>
        </div>
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white mb-4">
          Global <span className="font-normal bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-400">Coverage</span>
        </h3>
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto flex flex-col gap-10">
        
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex group">
          <div 
            key={`hero-${heroItem.id}`}
            className="relative w-full h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden transition-all duration-700 animate-in fade-in zoom-in-95"
            style={{ boxShadow: `0 0 80px -15px ${heroItem.glow.replace('1)', '0.15)')}` }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-1000 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${heroItem.img}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-[#02040A]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02040A]/80 via-transparent to-transparent" />
            
            <div className="relative z-10 flex flex-col h-full justify-between p-8 sm:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <div className={cx("inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md", heroItem.badgeBg, heroItem.badgeBorder)}>
                  <heroItem.icon className={cx("w-4 h-4", heroItem.color)} />
                  <span className={cx("text-[10px] font-bold tracking-[0.2em] uppercase", heroItem.color)}>{heroItem.outlet}</span>
                </div>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight max-w-2xl leading-tight">
                  {heroItem.title}
                </h3>
                <p className="text-base text-white/60 font-light leading-relaxed max-w-xl mb-8">
                  {heroItem.desc}
                </p>
                
                <div className="flex items-center gap-6">
                  <a 
                    href={heroItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center gap-3 rounded-full bg-white text-black px-8 py-4 text-sm font-bold tracking-wide transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                  >
                    <heroItem.actionIcon className="h-4 w-4" />
                    {heroItem.action}
                    <ArrowRight className="h-4 w-4 opacity-50 group-hover/btn:translate-x-1 group-hover/btn:opacity-100 transition-all" />
                  </a>
                  
                  <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-3 backdrop-blur-md">
                    <Calendar className="h-4 w-4 text-white/50" />
                    <span className="text-xs font-medium tracking-wider text-white/60 uppercase">
                      {heroItem.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden py-4 flex">
          <motion.div
            className="flex shrink-0"
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          >
            <MarqueeTrack />
          </motion.div>
          <motion.div
            className="flex shrink-0"
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          >
            <MarqueeTrack />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center pointer-events-none opacity-80">
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#1e3a5f] to-transparent" />
        <div className="absolute w-1.5 h-1.5 bg-[#1e3a5f] rotate-45" />
      </div>

    </section>
  );
}