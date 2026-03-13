// "use client";

// import React, { useState, useEffect } from "react";
// import Lenis from "@studio-freight/lenis";
// import {
//   Rocket, Telescope, Play, MonitorPlay, Palette,
//   Wand2, Star, Crown, Code2, Layers, Github,
//   Twitter, Mail, Award, Smartphone, CheckCircle2,
//   BookOpen, Gamepad2, Lightbulb, Sun, Activity, Database, Server,
//   ArrowRight, Sparkles, Terminal, Cpu, Network
// } from "lucide-react";

// // ==========================================
// // SCROLL PROGRESS INDICATOR
// // ==========================================
// function ScrollProgress() {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const updateScroll = () => {
//       const currentScroll = window.scrollY;
//       const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
//       if (scrollHeight > 0) {
//         setProgress((currentScroll / scrollHeight) * 100);
//       }
//     };

//     window.addEventListener("scroll", updateScroll);
//     return () => window.removeEventListener("scroll", updateScroll);
//   }, []);

//   return (
//     <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
//       <div 
//         className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-150 ease-out shadow-[0_0_15px_rgba(34,211,238,0.8)]"
//         style={{ width: `${progress}%` }}
//       />
//     </div>
//   );
// }

// // ==========================================
// // THEME STYLES
// // ==========================================
// function ThemeStyles() {
//   return (
//     <style jsx global>{`
//       @import url('https://fonts.cdnfonts.com/css/trebuchet-ms-2');
      
//       :root {
//         --font-trebuchet: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;
//       }

//       body {
//         font-family: var(--font-trebuchet);
//         background-color: #02040A;
//         margin: 0;
//         overflow-x: hidden;
//       }

//       @keyframes float {
//         0%, 100% { transform: translateY(0px); }
//         50% { transform: translateY(-15px); }
//       }
//       @keyframes float-delayed {
//         0%, 100% { transform: translateY(0px); }
//         50% { transform: translateY(-20px); }
//       }
//       @keyframes shine {
//         100% { left: 125%; }
//       }
      
//       .animate-float { animation: float 6s ease-in-out infinite; }
//       .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      
//       .glass-panel {
//         background: rgba(10, 15, 25, 0.4);
//         backdrop-filter: blur(12px);
//         -webkit-backdrop-filter: blur(12px);
//         border: 1px solid rgba(255, 255, 255, 0.05);
//         transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//       }
//       .glass-panel:hover {
//         background: rgba(15, 20, 35, 0.5);
//         border-color: rgba(34, 211, 238, 0.2);
//         box-shadow: 0 10px 40px -10px rgba(34,211,238,0.1);
//       }

//       /* Hide scrollbar for clean pipeline */
//       .no-scrollbar::-webkit-scrollbar {
//         display: none;
//       }
//       .no-scrollbar {
//         -ms-overflow-style: none;  /* IE and Edge */
//         scrollbar-width: none;  /* Firefox */
//       }

//       html { scroll-behavior: smooth; }
//     `}</style>
//   );
// }

// // ==========================================
// // MAIN PAGE COMPONENT
// // ==========================================
// export default function DiamondInTheSky() {
  
//   // Initialize Smooth Scroll (Lenis)
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       orientation: 'vertical',
//       gestureOrientation: 'vertical',
//       smoothWheel: true,
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => lenis.destroy();
//   }, []);

//   const HERO_BG = "/images/home-hero.jpeg";

//   return (
//     <main className="min-h-screen bg-[#02040A] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
//       <ThemeStyles />
//       <ScrollProgress />

//       {/* GLOBAL BACKGROUND ELEMENTS */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div
//           className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen"
//           style={{ backgroundImage: `url("${HERO_BG}")` }}
//         />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#02040A_90%)]" />
        
//         {/* Ambient Glows */}
//         <div className="absolute top-[30%] left-[-10%] h-[1000px] w-[1000px] bg-cyan-900/5 blur-[180px] rounded-full" />
//         <div className="absolute bottom-[10%] right-[-10%] h-[1000px] w-[1000px] bg-purple-900/5 blur-[180px] rounded-full" />
//       </div>

//       <div className="relative z-10">
//         {/* 1. HERO SECTION */}
//         <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-12">
          
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
//               <div className="relative w-full h-full max-w-[1200px] max-h-[1200px] animate-float opacity-30 md:opacity-40">
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-cyan-500/20 blur-[120px] rounded-full mix-blend-screen" />
//                 <img 
//                     src="/images/Diamond%20Logo.png" 
//                     alt="Diamond In The Sky Logo backdrop" 
//                     className="w-full h-full object-contain drop-shadow-[0_0_80px_rgba(34,211,238,0.5)]" 
//                 />
//                 <Star className="absolute top-[15%] left-[20%] w-6 h-6 text-white/50 animate-pulse" />
//                 <Star className="absolute bottom-[25%] right-[15%] w-4 h-4 text-cyan-400/80 animate-pulse delay-300" />
//               </div>
//           </div>

//           <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 w-full max-w-7xl mx-auto -mt-16 md:-mt-24">
              
//               <h1 className="text-[55px] md:text-8xl lg:text-[110px] xl:text-[130px] font-black tracking-tighter leading-[0.95] mb-8 uppercase drop-shadow-2xl">
//                 <span className="text-white block mb-2 md:mb-4">Diamond</span>
//                 <span className="text-[#60C5F1] block mb-2 md:mb-4">In The</span>
//                 <span className="text-[#5B8DF1] block">Sky</span>
//               </h1>
              
//               <p className="text-lg md:text-2xl lg:text-3xl font-bold uppercase tracking-[0.25em] text-white/95 mb-4 drop-shadow-lg leading-tight">
//                 A new eye to see the unseen
//               </p>
//               <p className="text-sm md:text-base lg:text-lg text-cyan-300/90 font-medium tracking-wide mb-12 max-w-2xl drop-shadow-md">
//                 — Learn, Play, and Explore the Unseen Night Sky! —
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center">
//                 <button className="group relative px-10 py-4.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 overflow-hidden font-bold transition-all uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.7)] hover:-translate-y-1 w-full sm:w-auto">
//                     <div className="absolute inset-0 -left-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
//                     <span className="relative flex items-center justify-center gap-3.5 text-white drop-shadow-md">
//                       <Gamepad2 className="w-5.5 h-5.5 group-hover:rotate-12 transition-transform duration-300" /> Play The Game
//                     </span>
//                 </button>
//                 <button className="group relative px-10 py-4.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden font-bold transition-all uppercase tracking-widest text-sm hover:border-cyan-400/60 hover:bg-cyan-900/20 hover:-translate-y-1 w-full sm:w-auto">
//                     <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                     <span className="relative flex items-center justify-center gap-3 text-white">
//                       <Play className="w-4 h-4 text-cyan-400 group-hover:scale-125 transition-transform duration-300" /> Watch Demo
//                     </span>
//                 </button>
//               </div>
//           </div>
//         </section>

//         {/* 2. PROJECT OVERVIEW */}
//         <section className="relative py-32 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
          
//           <div className="text-center max-w-3xl mx-auto mb-24 animate-float">
//             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-6">
//               Project <span className="text-cyan-400">Overview</span>
//             </h2>
//             <p className="text-white/70 text-base md:text-lg leading-relaxed">
//               Diamond In The Sky is more than a game — it’s a learning tool that helps children understand how stars change over time. By exploring the stars’ brightness, color, and motion, kids gain insight into the science behind stellar behavior.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-20 items-center mb-24">
            
//             <div className="relative w-full max-w-[500px] mr-auto lg:ml-0 flex items-center justify-center animate-float">
//                 <div className="absolute -top-8 -left-4 md:-left-8 z-20 flex items-center gap-4 p-4 glass-panel rounded-2xl border-cyan-500/30 bg-[#02040A]/90 shadow-[0_10px_30px_rgba(34,211,238,0.2)] hover:scale-110 hover:-translate-y-1 transition-transform duration-300 cursor-default">
//                     <div className="bg-cyan-500/10 p-2 rounded-full">
//                         <Award className="w-8 h-8 text-cyan-400 flex-shrink-0" />
//                     </div>
//                     <div>
//                         <h4 className="font-bold text-cyan-300 text-sm md:text-base leading-tight">Most Inspirational</h4>
//                         <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wider font-semibold mt-0.5">Award Winner</p>
//                     </div>
//                 </div>

//                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/10 rounded-full blur-[80px]" />
                
//                 <img 
//                     src="/images/game.png" 
//                     alt="Game Interface" 
//                     className="relative z-10 w-full h-auto rounded-[2.5rem] border-[4px] border-[#1a1a1a] shadow-[0_0_60px_rgba(34,211,238,0.15)] object-cover hover:scale-[1.02] transition-transform duration-500"
//                 />
//             </div>

//             <div className="space-y-8 animate-float-delayed lg:pl-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 text-white">The Educational Engine</h3>
//                 <p className="text-[15px] text-white/60 leading-relaxed">
//                   We bridge the gap between complex space science and accessible play. Users are guided through learning modules about stars, constellations, and stellar variability before manipulating these elements in an interactive environment.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
//                 <div className="bg-[#0B101A] border border-white/5 p-4 rounded-xl hover:-translate-y-1.5 hover:border-cyan-500/40 hover:shadow-[0_10px_20px_-5px_rgba(34,211,238,0.2)] hover:bg-cyan-900/10 transition-all duration-300 cursor-default">
//                   <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-semibold">Target Age</div>
//                   <div className="font-bold text-lg text-white">8-14 Yrs</div>
//                 </div>
//                 <div className="bg-[#0B101A] border border-white/5 p-4 rounded-xl hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-[0_10px_20px_-5px_rgba(59,130,246,0.2)] hover:bg-blue-900/10 transition-all duration-300 cursor-default">
//                   <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-semibold">Core Focus</div>
//                   <div className="font-bold text-lg text-white">Stars</div>
//                 </div>
//                 <div className="bg-[#0B101A] border border-white/5 p-4 rounded-xl hover:-translate-y-1.5 hover:border-purple-500/40 hover:shadow-[0_10px_20px_-5px_rgba(168,85,247,0.2)] hover:bg-purple-900/10 transition-all duration-300 cursor-default">
//                   <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-semibold">Platform</div>
//                   <div className="font-bold text-lg text-white">Cross-Gen</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <div className="relative overflow-hidden bg-[#0B101A] border border-white/5 p-6 rounded-2xl hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_15px_30px_-10px_rgba(34,211,238,0.25)] transition-all duration-300 group cursor-default">
//               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <Star className="relative z-10 w-7 h-7 text-cyan-400 mb-5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
//               <h4 className="relative z-10 font-bold text-[17px] text-white mb-3">Recognize Patterns</h4>
//               <p className="relative z-10 text-[13px] text-white/50 leading-relaxed">
//                 Learn to identify star constellations, understand celestial mapping, and recognize underlying brightness variations.
//               </p>
//             </div>

//             <div className="relative overflow-hidden bg-[#0B101A] border border-white/5 p-6 rounded-2xl hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.25)] transition-all duration-300 group cursor-default">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <Palette className="relative z-10 w-7 h-7 text-blue-400 mb-5 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
//               <h4 className="relative z-10 font-bold text-[17px] text-white mb-3">Understand Color</h4>
//               <p className="relative z-10 text-[13px] text-white/50 leading-relaxed">
//                 Discover why stars twinkle and change color, linking visual phenomena to actual star temperatures and lifecycles.
//               </p>
//             </div>

//             <div className="relative overflow-hidden bg-[#0B101A] border border-white/5 p-6 rounded-2xl hover:-translate-y-2 hover:border-purple-400/50 hover:shadow-[0_15px_30px_-10px_rgba(168,85,247,0.25)] transition-all duration-300 group cursor-default">
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <Gamepad2 className="relative z-10 w-7 h-7 text-purple-400 mb-5 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300" />
//               <h4 className="relative z-10 font-bold text-[17px] text-white mb-3">Interactive Play</h4>
//               <p className="relative z-10 text-[13px] text-white/50 leading-relaxed">
//                 Explore the night sky in a truly interactive way, manipulating star properties and observing the cosmic results.
//               </p>
//             </div>

//             <div className="relative overflow-hidden bg-[#0B101A] border border-white/5 p-6 rounded-2xl hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_15px_30px_-10px_rgba(34,211,238,0.25)] transition-all duration-300 group cursor-default">
//               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <Lightbulb className="relative z-10 w-7 h-7 text-cyan-400 mb-5 group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-300" />
//               <h4 className="relative z-10 font-bold text-[17px] text-white mb-3">Inspire Curiosity</h4>
//               <p className="relative z-10 text-[13px] text-white/50 leading-relaxed">
//                 Make astronomy fun and educational, sparking a lifelong passion for space science and exploration in young learners.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* 3. IMMERSIVE LEARNING */}
//         <section className="relative py-32 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
          
//           <div className="text-center mb-16 animate-float">
//             <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-wider">
//               Immersive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Learning</span>
//             </h2>
//             <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full opacity-70" />
//           </div>

//           {/* MOVED IMPORTANT NOTE */}
//           <div className="max-w-3xl mx-auto mb-16 p-5 glass-panel rounded-2xl border-cyan-500/40 text-center relative overflow-hidden group">
//               <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors duration-500" />
//               <p className="relative z-10 font-bold text-cyan-50 flex items-center justify-center gap-3 text-sm md:text-base">
//                   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex-shrink-0 animate-pulse">
//                       <Lightbulb className="w-4 h-4" />
//                   </span>
//                   <span><span className="text-cyan-400 uppercase tracking-widest mr-2">Mandatory Phase:</span> 
//                   The learning module must be completed prior to gameplay to ensure full comprehension of stellar patterns.</span>
//               </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(320px,auto)]">
            
//             <div className="lg:col-span-2 glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)] transition-all duration-500">
//                 <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] group-hover:bg-cyan-500/20 transition-all duration-700" />
                
//                 <div className="relative z-10 flex flex-col h-full justify-between">
//                     <div className="flex items-center gap-4 mb-8">
//                         <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 group-hover:scale-110 transition-transform">
//                             <BookOpen className="w-8 h-8 text-cyan-400" />
//                         </div>
//                         <h3 className="text-3xl font-bold text-white">How It Works</h3>
//                     </div>

//                     <div className="flex flex-col md:flex-row items-center gap-6 mt-auto">
//                         <div className="flex-1 bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-cyan-500/30 transition-colors">
//                             <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-lg mb-4 tracking-widest uppercase">Phase 1</span>
//                             <h4 className="text-xl font-bold mb-2">Learn The Stars</h4>
//                             <p className="text-white/60 text-sm leading-relaxed">Users are visually guided to learn about different star types, constellations, and the mechanics of stellar variability.</p>
//                         </div>

//                         <ArrowRight className="hidden md:block w-8 h-8 text-cyan-500/50 flex-shrink-0 animate-pulse" />

//                         <div className="flex-1 bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-purple-500/30 transition-colors">
//                             <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-lg mb-4 tracking-widest uppercase">Phase 2</span>
//                             <h4 className="text-xl font-bold mb-2">Play & Create</h4>
//                             <p className="text-white/60 text-sm leading-relaxed">Apply knowledge by manipulating the cosmos. Create constellations, and adjust brightness, color, and mass dynamically.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="lg:col-span-1 lg:row-span-2 glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all duration-500 flex flex-col">
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-all duration-700 pointer-events-none" />
                
//                 <div className="relative z-10 flex items-center gap-4 mb-8">
//                     <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:scale-110 transition-transform">
//                         <Wand2 className="w-8 h-8 text-blue-400" />
//                     </div>
//                     <h3 className="text-3xl font-bold text-white">Features</h3>
//                 </div>

//                 <div className="relative z-10 flex-1 flex flex-col justify-center space-y-4">
//                     <div className="group/item flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all cursor-default">
//                         <Star className="w-5 h-5 text-blue-400 group-hover/item:rotate-180 transition-transform duration-500" />
//                         <span className="font-semibold text-white/90">Match star patterns</span>
//                     </div>
//                     <div className="group/item flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all cursor-default">
//                         <Sun className="w-5 h-5 text-blue-400 group-hover/item:scale-125 transition-transform duration-500" />
//                         <span className="font-semibold text-white/90">Brighten or dim stars</span>
//                     </div>
//                     <div className="group/item flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all cursor-default">
//                         <Palette className="w-5 h-5 text-blue-400 group-hover/item:-rotate-12 transition-transform duration-500" />
//                         <span className="font-semibold text-white/90">Change star colors</span>
//                     </div>
//                     <div className="group/item flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all cursor-default">
//                         <Activity className="w-5 h-5 text-blue-400 group-hover/item:scale-125 transition-transform duration-500" />
//                         <span className="font-semibold text-white/90">Adjust star mass</span>
//                     </div>
//                 </div>
//             </div>

//             <div className="lg:col-span-2 glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group hover:border-purple-400/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] transition-all duration-500">
//                 <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/20 transition-all duration-700" />
                
//                 <div className="relative z-10 flex flex-col h-full">
//                     <div className="flex items-center gap-4 mb-8">
//                         <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 group-hover:scale-110 transition-transform">
//                             <Lightbulb className="w-8 h-8 text-purple-400" />
//                         </div>
//                         <h3 className="text-3xl font-bold text-white">Benefits for Kids</h3>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
//                         <div className="p-5 rounded-2xl bg-[#02040A]/50 border border-white/5 hover:border-purple-500/30 transition-colors">
//                             <Gamepad2 className="w-6 h-6 text-purple-400 mb-3" />
//                             <h5 className="font-bold text-sm text-white mb-1">Hands-on Learning</h5>
//                             <p className="text-xs text-white/50">Absorb complex concepts naturally through engaging gameplay.</p>
//                         </div>
//                         <div className="p-5 rounded-2xl bg-[#02040A]/50 border border-white/5 hover:border-purple-500/30 transition-colors">
//                             <MonitorPlay className="w-6 h-6 text-purple-400 mb-3" />
//                             <h5 className="font-bold text-sm text-white mb-1">Stellar Variability</h5>
//                             <p className="text-xs text-white/50">Gain a true understanding of how and why stars change over time.</p>
//                         </div>
//                         <div className="p-5 rounded-2xl bg-[#02040A]/50 border border-white/5 hover:border-purple-500/30 transition-colors">
//                             <Rocket className="w-6 h-6 text-purple-400 mb-3" />
//                             <h5 className="font-bold text-sm text-white mb-1">Dynamic Exploration</h5>
//                             <p className="text-xs text-white/50">Freely explore the night sky in a safe, simulated environment.</p>
//                         </div>
//                         <div className="p-5 rounded-2xl bg-[#02040A]/50 border border-white/5 hover:border-purple-500/30 transition-colors">
//                             <Telescope className="w-6 h-6 text-purple-400 mb-3" />
//                             <h5 className="font-bold text-sm text-white mb-1">Spark Curiosity</h5>
//                             <p className="text-xs text-white/50">Ignite a long-term passion for real-world space science and astronomy.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//           </div>
//         </section>

//         {/* 4. SYSTEM ARCHITECTURE & SCIENCE (NEW INNOVATIVE LAYOUT) */}
//         <section className="relative py-32 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
            
//             <div className="text-center mb-20 animate-float">
//                 <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-wider">
//                     System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Architecture</span>
//                 </h2>
//                 <p className="text-white/60 text-lg max-w-2xl mx-auto">Built on a robust monolithic framework merging real NASA telemetry with an engaging game engine.</p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
//                 {/* Tech Terminal (HUD Style) */}
//                 <div className="lg:col-span-5 glass-panel rounded-[2rem] p-8 border border-cyan-500/20 flex flex-col group hover:border-cyan-500/50 transition-colors">
//                     <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
//                         <div className="flex items-center gap-3">
//                             <Terminal className="w-6 h-6 text-cyan-400" />
//                             <h3 className="text-xl font-bold font-mono tracking-tight text-cyan-50">DEV_ENVIRONMENT</h3>
//                         </div>
//                         <div className="flex gap-2">
//                             <div className="w-3 h-3 rounded-full bg-red-500/50" />
//                             <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
//                             <div className="w-3 h-3 rounded-full bg-green-500/50" />
//                         </div>
//                     </div>

//                     <div className="space-y-6 font-mono text-sm flex-1">
//                         <TerminalLine label="LANG" value="Dart" icon={Code2} />
//                         <TerminalLine label="FRAMEWORK" value="Flutter (Mobile/Desktop)" icon={Smartphone} />
//                         <TerminalLine label="DESIGN_SYS" value="Canva Prototypes" icon={Palette} />
//                         <TerminalLine label="CLOUD_INFRA" value="Microsoft Azure" icon={Server} />
//                     </div>

//                     <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
//                         <a href="#" className="flex-1 py-2 px-3 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold text-center flex justify-center items-center gap-2 transition-colors">
//                             <Github className="w-4 h-4" /> REPOSITORY
//                         </a>
//                         <a href="#" className="flex-1 py-2 px-3 rounded bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold text-center flex justify-center items-center gap-2 transition-colors">
//                             <Play className="w-4 h-4" /> DEMO
//                         </a>
//                     </div>
//                 </div>

//                 {/* Agile Pipeline */}
//                 <div className="lg:col-span-7 glass-panel rounded-[2rem] p-8 border border-blue-500/20 overflow-hidden relative group hover:border-blue-500/50 transition-colors">
//                     <div className="absolute top-0 right-0 p-8 opacity-10">
//                         <Network className="w-32 h-32 text-blue-400" />
//                     </div>
                    
//                     <h3 className="text-xl font-bold mb-2 flex items-center gap-3 relative z-10">
//                         <Layers className="text-blue-400"/> Agile Deployment Pipeline
//                     </h3>
//                     <p className="text-sm text-white/50 mb-10 relative z-10">Monolithic architecture executed through iterative sprints.</p>

//                     <div className="relative z-10 flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
//                         <div className="absolute top-6 left-0 w-[800px] h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-400/40 to-transparent -z-10" />
                        
//                         <AgileNode num="01" title="Requirement" desc="Define parameters" delay="0ms" />
//                         <AgileNode num="02" title="Design" desc="Monolithic structure" delay="100ms" />
//                         <AgileNode num="03" title="Dev" desc="Engine & Logic" delay="200ms" />
//                         <AgileNode num="04" title="Testing" desc="QA & Simulation" delay="300ms" />
//                         <AgileNode num="05" title="Deploy" desc="Azure Cloud" delay="400ms" />
//                         <AgileNode num="06" title="Review" desc="Sprint retro" delay="500ms" />
//                     </div>
//                 </div>

//                 {/* Science Integration Bottom Bar */}
//                 <div className="lg:col-span-12 glass-panel rounded-[2rem] p-8 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
//                         <div>
//                             <h3 className="text-2xl font-bold flex items-center gap-3">
//                                 <Telescope className="text-purple-400"/> Space Science Integration
//                             </h3>
//                             <p className="text-sm text-white/50 mt-1">Real-world astrophysics parameters translated into gameplay mechanics.</p>
//                         </div>
//                         <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
//                             Powered by NASA Data
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         <ScienceDataNode title="Cepheid Variables" desc="Stellar lifetimes" icon={Sun} />
//                         <ScienceDataNode title="Cataclysmic Variables" desc="Binary motions" icon={Activity} />
//                         <ScienceDataNode title="Light Curves" desc="Brightness tracking" icon={Database} />
//                         <ScienceDataNode title="Spectroscopy" desc="Temperature/Color" icon={Palette} />
//                     </div>
//                 </div>

//             </div>
//         </section>

//         {/* 5. MEET TEAM DIAMONDS (NEW HOLOGRAPHIC ACCORDION) */}
//         <section className="relative py-32 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto text-center">
            
//             <div className="max-w-2xl mx-auto mb-16 animate-float">
//                 <h2 className="text-5xl font-black mb-6 tracking-tight uppercase">Crew <span className="text-cyan-400">Roster</span></h2>
//                 <p className="text-white/70 text-lg">
//                     The visionary architects bringing the cosmos to your fingertips.
//                 </p>
//             </div>

//             {/* Interactive Accordion Layout */}
//             <div className="flex flex-col lg:flex-row h-auto min-h-[600px] lg:h-[500px] gap-4 w-full">
//                 <HoloTeamCard name="Tisha Khandokar" role="Project Lead & Designer" img="/images/team/tisha.jpg" />
//                 <HoloTeamCard name="Md Munim Ahmed" role="System Analyst & Designer" img="/images/team/munim.jpg" />
//                 <HoloTeamCard name="Injamamul Haque Sonet" role="System Architect & Lead Dev" img="/images/team/sonet.jpg" />
//                 <HoloTeamCard name="Abu Niaz" role="Developer" img="/images/team/abu-niaz.jpg" />
//                 <HoloTeamCard name="Zarin Chowdhury" role="Researcher" img="/images/team/zarin.jpg" />
//             </div>

//         </section>

//         {/* 6. CTA / FOOTER */}
//         <section className="relative py-40 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#02040A]">
//             <div className="max-w-4xl mx-auto text-center space-y-12 animate-float">
//                 <h2 className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-2xl">Join the Journey <br/>of Discovery</h2>
                
//                 <div className="flex flex-col md:flex-row justify-center gap-8 text-lg font-medium text-white/80 mb-12">
//                     <div className="flex items-center justify-center gap-2">
//                         <Star className="w-5 h-5 text-cyan-400" /> Play & Learn
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                         <Telescope className="w-5 h-5 text-blue-400" /> Explore Stars
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                         <Lightbulb className="w-5 h-5 text-purple-400" /> Be Inspired
//                     </div>
//                 </div>

//                 <div className="flex flex-wrap justify-center gap-6">
//                     <button className="px-10 py-4 rounded-xl bg-cyan-500 text-[#02040A] font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.3)]">
//                         Start Learning
//                     </button>
//                     <button className="px-10 py-4 rounded-xl border border-cyan-500/50 hover:bg-cyan-500/10 text-white font-bold transition-all uppercase tracking-widest text-sm backdrop-blur-sm">
//                         Try the Game
//                     </button>
//                 </div>
//             </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// /** HELPER COMPONENTS */

// // Terminal HUD Line
// function TerminalLine({ label, value, icon: Icon }: any) {
//     return (
//         <div className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
//             <span className="flex items-center gap-2 text-white/40">
//                 <Icon className="w-4 h-4" /> {label}
//             </span>
//             <span className="text-cyan-300 font-semibold">{value}</span>
//         </div>
//     );
// }

// // Agile Timeline Node
// function AgileNode({ num, title, desc, delay }: any) {
//     return (
//         <div className="min-w-[140px] flex-shrink-0 snap-center animate-pulse" style={{ animationDelay: delay, animationDuration: '3s' }}>
//             <div className="w-12 h-12 rounded-full bg-[#02040A] border-2 border-blue-500/50 flex items-center justify-center text-blue-400 font-bold mb-4 relative shadow-[0_0_15px_rgba(59,130,246,0.3)]">
//                 {num}
//                 {/* Connecting dot inner */}
//                 <div className="absolute w-2 h-2 rounded-full bg-white animate-ping" />
//             </div>
//             <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
//             <p className="text-xs text-white/50">{desc}</p>
//         </div>
//     );
// }

// // Science Grid Node
// function ScienceDataNode({ title, desc, icon: Icon }: any) {
//     return (
//         <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-900/10 border border-purple-500/10 hover:border-purple-500/40 hover:bg-purple-900/20 transition-all group">
//             <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
//                 <Icon className="w-5 h-5 text-purple-400" />
//             </div>
//             <div>
//                 <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
//                 <p className="text-xs text-white/50 leading-tight">{desc}</p>
//             </div>
//         </div>
//     );
// }

// // Holographic Expanding Team Card
// function HoloTeamCard({ name, role, img }: any) {
//   return (
//     <div className="group relative flex-1 lg:hover:flex-[2.5] h-24 lg:h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-2xl glass-panel cursor-pointer border border-white/5 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
        
//         {/* Holographic scanning line effect */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 shadow-[0_0_10px_#22d3ee] -translate-y-[100px] group-hover:animate-[float_2s_ease-in-out_infinite] z-20" />

//         {/* Desaturated Image turning to color */}
//         <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent z-10 transition-colors duration-700" />
//         <img 
//             src={img} 
//             className="absolute inset-0 w-full h-full object-cover object-top opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100" 
//             alt={name} 
//         />
        
//         {/* Text Container */}
//         <div className="absolute bottom-0 left-0 w-full p-4 lg:p-6 bg-gradient-to-t from-[#02040A] via-[#02040A]/80 to-transparent z-20 flex flex-col justify-end h-full lg:h-auto">
//             <div className="translate-y-0 lg:translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
//                 <h4 className="font-bold text-lg lg:text-2xl mb-1 text-white whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-md">
//                     {name}
//                 </h4>
//                 <p className="text-cyan-400 text-[10px] lg:text-xs uppercase tracking-widest font-bold opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 whitespace-nowrap overflow-hidden text-ellipsis">
//                     {role}
//                 </p>
//             </div>
//         </div>
//     </div>
//   );
// }






"use client";

import { useState, useEffect } from "react";
// Removed Lenis import

import ProjectHero from "@/components/project/ProjectHero";
import Overview    from "@/components/project/Overview";
import Feature     from "@/components/project/Feature";
import System      from "@/components/project/System";
import Crew        from "@/components/project/Crew";
import Join        from "@/components/project/Join";

// ── Scroll progress bar ────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) setProgress((window.scrollY / scrollHeight) * 100);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-150 ease-out shadow-[0_0_15px_rgba(34,211,238,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ── Global styles injected once ────────────────────────────────────
function GlobalStyles() {
  return (
    <style jsx global>{`
      :root {
        --font-trebuchet: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode',
          'Lucida Sans', Tahoma, sans-serif;
      }

      body {
        font-family: var(--font-trebuchet);
        background-color: #02040A;
        margin: 0;
        overflow-x: hidden;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-15px); }
      }
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-20px); }
      }
      @keyframes shine {
        100% { left: 125%; }
      }

      .animate-float         { animation: float 6s ease-in-out infinite; }
      .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }

      .glass-panel {
        background: rgba(10, 15, 25, 0.4);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .glass-panel:hover {
        background: rgba(15, 20, 35, 0.5);
        border-color: rgba(34, 211, 238, 0.2);
        box-shadow: 0 10px 40px -10px rgba(34, 211, 238, 0.1);
      }

      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      /* Removed scroll-behavior: smooth */
    `}</style>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function DiamondInTheSkyPage() {

  // Removed Lenis useEffect hook

  return (
    <main className="min-h-screen bg-[#02040A] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      {/* <Navbar/> */}
      <GlobalStyles />
      <ScrollProgress />

      {/* ── Shared background layer ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen"
          style={{ backgroundImage: `url("/images/home-hero.jpeg")` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#02040A_90%)]" />
        <div className="absolute top-[30%] left-[-10%] h-[1000px] w-[1000px] bg-cyan-900/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] h-[1000px] w-[1000px] bg-purple-900/5 blur-[180px] rounded-full" />
      </div>

      {/* ── Sections ── */}
      <div className="relative z-10">
        <ProjectHero />
        <Overview />
        <Feature />
        <System />
        <Crew />
        <Join />
      </div>
    </main>
  );
}