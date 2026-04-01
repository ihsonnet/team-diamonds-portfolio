"use client"; 

import { useState, useEffect, useRef } from "react"; 
import { useRouter } from "next/navigation"; 
import { Star, Rocket, X, Zap, Smile, Gamepad2, Globe, Volume2, VolumeX } from "lucide-react"; 
import { MISSION_PHASES } from "@/lib/missionSurvey";

// GRAPHICS COMPONENTS
const SunGraphic = () => (
    <svg viewBox="0 0 100 100" className="w-64 h-64 absolute -top-20 -right-20 opacity-30 animate-pulse">
        <circle cx="50" cy="50" r="40" fill="#FBBF24" />
        <circle cx="50" cy="50" r="50" fill="#F59E0B" style={{filter: 'blur(20px)'}}/>
    </svg>
);

const PlanetGraphic = ({color, size, position}: {color: string, size: string, position: string}) => (
    <div className={`absolute rounded-full ${color} ${size} ${position} opacity-40 shadow-inner`}>
        <div className="absolute inset-0 rounded-full bg-white/20" style={{clipPath: 'circle(40% at 30% 30%)'}}></div>
    </div>
);

const StarGraphic = ({size, position, delay}: {size: string, position: string, delay: string}) => (
    <Star className={`absolute text-white/50 fill-white/30 ${size} ${position} animate-twinkle ${delay}`} />
);

// SPACESHIP GRAPHIC
const SpaceshipGraphic = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
    const scale = size === "lg" ? "scale-100" : "scale-50";
    return (
      <div className={`relative flex flex-col items-center ${scale} animate-bounce-slow transition-transform duration-500 w-64 h-80`}>
        
        {/* Floating Logo Stars */}
        <div className="absolute -top-12 flex flex-col items-center animate-pulse duration-1000 z-50">
           <Star className="w-6 h-6 text-blue-100 fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
           <div className="flex gap-4 mt-1">
             <Star className="w-3 h-3 text-blue-100 fill-white" />
             <Star className="w-3 h-3 text-blue-100 fill-white" />
           </div>
        </div>

        {/* TOP HALF: Translucent Blue Diamond */}
        <div className="absolute top-0 w-48 h-24 z-10 flex justify-center items-end pb-1">
          <div 
            className="absolute inset-0 bg-gradient-to-b from-blue-300/80 to-blue-600/90 backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]" 
            style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)' }}
          >
             {/* Geometric Facets */}
             <svg className="absolute inset-0 w-full h-full stroke-white/40 stroke-[1.5] fill-none" preserveAspectRatio="none">
                <line x1="25%" y1="0" x2="50%" y2="100%" />
                <line x1="75%" y1="0" x2="50%" y2="100%" />
                <line x1="0" y1="100%" x2="50%" y2="40%" />
                <line x1="100%" y1="100%" x2="50%" y2="40%" />
                <line x1="25%" y1="0" x2="0" y2="100%" />
                <line x1="75%" y1="0" x2="100%" y2="100%" />
                <line x1="25%" y1="0" x2="50%" y2="40%" />
                <line x1="75%" y1="0" x2="50%" y2="40%" />
             </svg>
          </div>
          <Smile className="text-white/80 w-10 h-10 drop-shadow-md z-20" />
        </div>

        {/* GLOWING BLUE RING */}
        <div 
          className="absolute top-[4.5rem] left-1/2 -translate-x-1/2 w-[130%] h-12 z-20 rounded-[100%] border-[8px] border-blue-400 shadow-[0_0_15px_#3b82f6,inset_0_0_10px_#3b82f6] pointer-events-none"
        ></div>

        {/* MIDDLE DASHBOARD (Pill Shape with 4 Blue Lights) */}
        <div className="absolute top-[4.75rem] w-56 h-12 bg-[#050A1F] rounded-full z-30 flex items-center justify-evenly px-5 border-b-4 border-[#02040D] shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
           <div className="w-4 h-4 rounded-full bg-blue-300 shadow-[0_0_12px_#60a5fa] animate-pulse"></div>
           <div className="w-4 h-4 rounded-full bg-blue-300 shadow-[0_0_12px_#60a5fa] animate-pulse delay-75"></div>
           <div className="w-4 h-4 rounded-full bg-blue-300 shadow-[0_0_12px_#60a5fa] animate-pulse delay-150"></div>
           <div className="w-4 h-4 rounded-full bg-blue-300 shadow-[0_0_12px_#60a5fa] animate-pulse delay-300"></div>
        </div>

        {/* BOTTOM HALF: Dark Blue Diamond */}
        <div className="absolute top-[5.5rem] w-48 h-32 z-10">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#1A2541] via-[#050A1F] to-[#02040D]"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
          >
            {/* Bottom Facets */}
            <svg className="absolute inset-0 w-full h-full stroke-[#2A3B69]/40 stroke-[1.5] fill-none" preserveAspectRatio="none">
                <line x1="50%" y1="100%" x2="20%" y2="0" />
                <line x1="50%" y1="100%" x2="80%" y2="0" />
                <line x1="50%" y1="100%" x2="50%" y2="0" />
            </svg>
          </div>
        </div>

        {/* TRACTOR BEAM */}
        <div className="absolute top-[13.5rem] w-64 h-56 bg-gradient-to-b from-blue-400/40 to-transparent z-0 flex justify-center" style={{ clipPath: 'polygon(48% 0, 52% 0, 100% 100%, 0% 100%)' }}>
            <div className="w-1 h-full bg-blue-200/60 shadow-[0_0_10px_#3b82f6]"></div>
        </div>
      </div>
    );
};

const PHASE_ICONS = [
  <Smile key="cadet_profile" className="w-10 h-10 text-blue-400" />,
  <Globe key="space_explorer" className="w-10 h-10 text-blue-400" />,
  <Gamepad2 key="future_missions" className="w-10 h-10 text-yellow-400" />
];

export default function StarMissionPage() { 
  const router = useRouter(); 
  const [showSurvey, setShowSurvey] = useState(false); 
  const [currentStep, setCurrentStep] = useState(0); 
  const [isFinalizing, setIsFinalizing] = useState(false); 
  const [showFinalSky, setShowFinalSky] = useState(false); 
  const [isLaunching, setIsLaunching] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({}); 
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [missedQuestionId, setMissedQuestionId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Refs for audio and scrolling
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const successSoundRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Audio Objects
    backgroundMusicRef.current = new Audio('/space-ambient.mp3');
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.3;
    
    clickSoundRef.current = new Audio('/click.mp3');
    successSoundRef.current = new Audio('/success.mp3');

    return () => {
        backgroundMusicRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (isMusicPlaying) {
        backgroundMusicRef.current?.play().catch(() => undefined);
    } else {
        backgroundMusicRef.current?.pause();
    }
  }, [isMusicPlaying]);

  const playSound = (soundRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (soundRef.current) {
        soundRef.current.currentTime = 0; // Rewind
        soundRef.current.play();
    }
  };

  const startMissionLaunch = () => { 
    setIsLaunching(true); 
    playSound(clickSoundRef);
    setTimeout(() => { 
      setShowSurvey(true); 
      setIsLaunching(false); 
    }, 2000); 
  }; 

  const submitSurvey = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(answers)
      });

      const result = await response.json();

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "Failed to submit the survey.");
      }

      setIsSubmitting(false);
      setIsFinalizing(true);
      playSound(successSoundRef);
      setTimeout(() => setShowFinalSky(true), 1200);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit the survey."
      );
    }
  };

  const handlePhaseNavigation = async () => {
    const activePhase = MISSION_PHASES[currentStep];
    
    // Find the first unanswered question in the current phase
    const firstUnansweredQuestion = activePhase.questions.find(
      (q) => answers[q.id] === undefined
    );

    if (firstUnansweredQuestion) {
      // Scroll to the unanswered question
      const questionElement = document.getElementById(`question-${firstUnansweredQuestion.id}`);
      if (questionElement && scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: questionElement.offsetTop - 20, // 20px padding
          behavior: 'smooth'
        });
        
        // Trigger shaking animation
        setMissedQuestionId(firstUnansweredQuestion.id);
        setTimeout(() => setMissedQuestionId(null), 1000); // Remove shake after 1s
      }
      return; // Do not proceed to next step
    }

    // Proceed to next phase or finalize
    if (currentStep < MISSION_PHASES.length - 1) { 
      setCurrentStep(currentStep + 1); 
      playSound(clickSoundRef);
      setSubmitError(null);
      // Scroll back to top for the new phase
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } else { 
      await submitSurvey();
    } 
  }; 

  const closeAndReset = () => { 
    setShowSurvey(false); 
    setCurrentStep(0); 
    setIsFinalizing(false); 
    setShowFinalSky(false); 
    setIsLaunching(false); 
    setIsSubmitting(false);
    setAnswers({}); 
    setSubmitError(null);
    playSound(clickSoundRef);
  }; 

  const activePhase = MISSION_PHASES[currentStep]; 
  const activePhaseIcon = PHASE_ICONS[currentStep];

  return ( 
    <section 
      className="relative min-h-screen bg-[#02040D] text-white overflow-hidden" 
      style={{ 
       fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" 
      }} 
    > 
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 z-0 pointer-events-none"> 
        <div className="absolute inset-0 bg-[#02040D]/90" /> 
        <SunGraphic />
        <PlanetGraphic color="bg-indigo-900" size="w-32 h-32" position="top-20 left-10" />
        <PlanetGraphic color="bg-blue-800" size="w-20 h-20" position="bottom-32 right-20" />
        
        {/* Static Stars */}
        <StarGraphic size="w-5 h-5" position="top-1/4 left-1/3" delay="animate-delay-100" />
        <StarGraphic size="w-3 h-3" position="top-10 right-1/4" delay="animate-delay-300" />
        <StarGraphic size="w-6 h-6" position="bottom-1/3 left-10" delay="animate-delay-500" />
        <StarGraphic size="w-4 h-4" position="bottom-20 right-1/3" delay="animate-delay-700" />
      </div> 

      {!showSurvey && !isLaunching && !showFinalSky && ( 
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center"> 
          <div className="flex flex-col items-center animate-in zoom-in duration-500 delay-100 mt-16">
            <SpaceshipGraphic />
          </div>

          <p className="mt-8 text-blue-200 text-xl font-medium tracking-wide animate-pulse delay-500">
            Ready to explore the cosmos?
          </p>

          <button 
            onClick={startMissionLaunch} 
            className="mt-6 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-12 py-5 rounded-full text-3xl font-black shadow-[0_10px_0_#b8860b] hover:shadow-[0_6px_0_#b8860b] hover:translate-y-[4px] active:shadow-none active:translate-y-[8px] group flex items-center gap-3 transition-all tracking-tight" 
          > 
            START MISSION <Zap className="animate-pulse w-9 h-9" /> 
          </button> 
        </div> 
      )} 

      {isLaunching && ( 
        <div className="fixed inset-0 z-50 flex justify-center items-end pointer-events-none pb-20"> 
          <div className="animate-power-launch flex flex-col items-center"> 
            <SpaceshipGraphic />
          </div> 
        </div> 
      )} 

      {showSurvey && !showFinalSky && ( 
        <div className={`fixed inset-0 z-40 flex items-center justify-center p-4 md:p-8 transition-all duration-1000 ${isFinalizing ? 'scale-110 blur-3xl opacity-0' : 'opacity-100'}`}> 
          <div className="absolute inset-0 bg-[#050A1F]/80 backdrop-blur-md" /> 
          
          <div className="relative w-full max-w-3xl bg-[#0B132B]/90 border-4 border-[#1A2541]/50 rounded-[2.5rem] shadow-[0_0_80px_rgba(37,99,235,0.3)] flex flex-col max-h-[90vh] backdrop-blur-xl overflow-hidden"> 
            
            {/* Added small decorative spaceship graphic in survey top corner */}
            <div className="absolute -top-10 -left-10 opacity-20 transform -rotate-12">
              <SpaceshipGraphic size="sm" />
            </div>

            {/* Music Toggle */}
            <button 
                onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                className="absolute top-6 left-6 z-20 p-3 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-all"
            >
                {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>

            <div className="p-6 md:p-8 border-b border-[#1A2541]/50 relative z-10"> 
              <div className="flex justify-center gap-3 mb-6">
                {MISSION_PHASES.map((_, i) => (
                  <div key={i} className={`h-3 rounded-full transition-all duration-500 ${i === currentStep ? 'w-16 bg-yellow-400 shadow-[0_0_15px_#facc15]' : i < currentStep ? 'w-8 bg-yellow-400/50' : 'w-8 bg-white/10'}`} />
                ))}
              </div>

              <div className="flex justify-between items-center relative"> 
                <div className="flex items-center gap-4 text-center w-full justify-center"> 
                  <div className="p-4 bg-[#02040D]/50 rounded-3xl shadow-inner border border-white/5">
                    {activePhaseIcon}
                  </div>
                  <div> 
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md"> 
                      {activePhase.title} 
                    </h2> 
                    <p className="text-blue-200 text-lg md:text-xl font-medium mt-1">{activePhase.subtitle}</p> 
                  </div> 
                </div>
                <button onClick={closeAndReset} className="p-3 bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-red-500 transition-colors absolute right-0 top-0">
                  <X size={24} />
                </button> 
              </div> 
            </div> 

            <div ref={scrollContainerRef} className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar space-y-10 bg-[#02040D]/30 relative z-10"> 
              {activePhase.questions.map((q, qIndex) => ( 
                <div 
                  key={q.id} 
                  id={`question-${q.id}`}
                  className={`space-y-5 animate-in slide-in-from-bottom-6 fade-in duration-500 fill-mode-both ${missedQuestionId === q.id ? 'animate-shake' : ''}`} 
                  style={{ animationDelay: `${qIndex * 150}ms` }} 
                > 
                  <p className="text-2xl font-black flex flex-col items-center gap-3 text-white text-center tracking-tight"> 
                    <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                    {q.label} 
                  </p> 
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
                    {q.options.map(opt => { 
                      const isSelected = answers[q.id] === opt.value; 
                      return ( 
                        <button 
                          key={opt.value} 
                          onClick={() => {
                            setAnswers({...answers, [q.id]: opt.value});
                            setSubmitError(null);
                            playSound(clickSoundRef);
                          }} 
                          className={` 
                            group relative p-6 rounded-3xl border-b-[6px] transition-all duration-300 flex items-center justify-between font-extrabold text-xl overflow-hidden
                            ${isSelected 
                              ? 'bg-gradient-to-b from-blue-400 to-indigo-600 border-indigo-900 text-white shadow-xl translate-y-[2px] border-b-[3px] scale-[1.02]' 
                              : 'bg-[#1A2541]/80 border-[#02040D] hover:bg-[#2A3B69] hover:border-[#1A2541] text-white hover:text-white hover:-translate-y-1' 
                            } 
                          `} 
                        > 
                          <span className="relative z-10 w-full text-center">{opt.label}</span> 
                        </button> 
                      ); 
                    })} 
                  </div> 
                </div> 
              ))} 
            </div> 

            <div className="p-6 bg-[#02040D]/80 border-t border-[#1A2541] flex justify-between items-center rounded-b-[2.5rem] relative z-10"> 
              <div className="hidden sm:block">
                <span className="text-blue-200 font-bold text-lg">
                  Step {currentStep + 1} of {MISSION_PHASES.length}
                </span>
                {submitError ? (
                  <p className="mt-2 max-w-sm text-sm font-medium text-red-300">
                    {submitError}
                  </p>
                ) : null}
              </div>
              <button 
                onClick={handlePhaseNavigation}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-12 py-5 rounded-full text-2xl font-black transition-all flex justify-center items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_8px_0_rgba(49,46,129,1)] hover:shadow-[0_4px_0_rgba(49,46,129,1)] hover:translate-y-[4px] active:shadow-none active:translate-y-[8px] disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none disabled:opacity-70" 
              > 
                {isSubmitting
                  ? "Submitting..."
                  : currentStep === MISSION_PHASES.length - 1
                    ? "Submit"
                    : "NEXT STEP"} 
                <Rocket className="w-6 h-6" /> 
              </button> 
            </div> 
            {submitError ? (
              <div className="px-6 pb-6 sm:hidden">
                <p className="text-center text-sm font-medium text-red-300">
                  {submitError}
                </p>
              </div>
            ) : null}
          </div> 
        </div> 
      )} 

      {showFinalSky && ( 
        <div className="fixed inset-0 z-50 bg-[#02040D] flex flex-col items-center justify-center overflow-hidden"> 
          {[...Array(100)].map((_, i) => ( 
            <div key={i} className="absolute bg-white rounded-full animate-twinkle" 
              style={{ width: '4px', height: '4px', top: Math.random()*100+'%', left: Math.random()*100+'%', animationDelay: Math.random()*3+'s' }} /> 
          ))} 
          
          <div className="relative z-10 text-center px-6 flex flex-col items-center"> 
            
            <div className="animate-star-place mb-6 flex items-center justify-center relative"> 
              <div className="absolute inset-0 bg-yellow-400/20 blur-[100px] rounded-full" />
              <Star className="w-48 h-48 md:w-64 md:h-64 text-yellow-300 fill-yellow-300 drop-shadow-[0_0_60px_rgba(253,224,71,1)]" />
              <Zap className="absolute -top-10 -right-10 text-white animate-ping w-16 h-16 delay-300" /> 
              <Star className="absolute -bottom-5 -left-10 text-blue-200 animate-pulse w-10 h-10 delay-150" /> 
            </div> 

            <h2 className="text-5xl md:text-8xl font-black text-white leading-tight mb-10 tracking-tight animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 fill-mode-both"> 
              You are the <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 drop-shadow-lg text-7xl md:text-9xl">STAR</span> 
            </h2> 

            <button 
              onClick={() => {
                router.push('/');
                playSound(clickSoundRef);
              }} 
              className="px-10 py-4 bg-white/10 border-2 border-white/20 backdrop-blur-md text-white rounded-full font-bold text-xl hover:bg-white hover:text-[#02040D] transition-all tracking-wide animate-in fade-in duration-1000 delay-1000 fill-mode-both"
            > 
              Return to Base
            </button> 
          </div> 
        </div> 
      )} 

      <style jsx global>{` 
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        @keyframes rumble-zip { 
          0% { transform: translate(0, 0) scale(1); } 
          10%, 30%, 50% { transform: translate(3px, -2px) rotate(1deg) scale(1); } 
          20%, 40%, 60% { transform: translate(-3px, 2px) rotate(-1deg) scale(1); } 
          70% { transform: translate(0, 10px) scale(1); opacity: 1;}
          100% { transform: translate(0, -150vh) scale(0.5); opacity: 0; } 
        } 
        .animate-power-launch { 
          animation: rumble-zip 1.5s cubic-bezier(0.5, 0, 0.2, 1) forwards; 
        } 
        @keyframes twinkle { 
          0%, 100% { opacity: 0.1; transform: scale(0.8); } 
          50% { opacity: 1; transform: scale(1.5); box-shadow: 0 0 10px rgba(255,255,255,0.8); } 
        } 
        .animate-twinkle { animation: twinkle 3s infinite ease-in-out; } 
        @keyframes star-place { 
          0% { transform: translateY(50vh) scale(0) rotate(-180deg); opacity: 0; filter: blur(20px); } 
          100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; filter: blur(0px); } 
        } 
        .animate-star-place { animation: star-place 1.5s cubic-bezier(0.17, 0.89, 0.32, 1.2) forwards; } 
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }

        .custom-scrollbar::-webkit-scrollbar { width: 8px; } 
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); } 
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .animate-delay-100 { animation-delay: 100ms; }
        .animate-delay-300 { animation-delay: 300ms; }
        .animate-delay-500 { animation-delay: 500ms; }
        .animate-delay-700 { animation-delay: 700ms; }
      `}</style> 
    </section> 
  ); 
}
