"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const METAL_NOISE = 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")';
const GRAIN_NOISE = 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22g%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23g)%22/%3E%3C/svg%3E")';

// SVGs for high performance and self-contained icons
const MicrochipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 h-4 w-4 text-orange-500">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);

const ArrowTrendUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

type RoomProps = {
  backWall?: { tl: [number, number]; tr: [number, number]; br: [number, number]; bl: [number, number] };
  lightsOn?: boolean;
  intensity?: number;
  lightColor?: string;
  spots?: number[];
  vignette?: number;
  isFlickering?: boolean;
  className?: string;
};

function Room({
  backWall = {
    tl: [22, 10],
    tr: [78, 10],
    br: [78, 70],
    bl: [22, 70],
  },
  lightsOn = true,
  intensity = 1,
  lightColor = "230,240,255",
  spots = [35, 50, 65],
  vignette = 0.55,
  isFlickering = false,
  className = "",
}: RoomProps) {
  const { tl, tr, br, bl } = backWall;
  const poly = useMemo(
    () => (pts: readonly (readonly [number, number])[]) =>
      `polygon(${pts.map(([x, y]) => `${x}% ${y}%`).join(", ")})`,
    []
  );
  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden bg-black pointer-events-none ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([tl, tr, br, bl]),
          background:
            "linear-gradient(to bottom, rgba(20,20,22,1) 0%, rgba(8,8,10,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([[0, 0], [100, 0], tr, tl]),
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([[0, 0], tl, bl, [0, 100]]),
          background:
            "linear-gradient(to right, rgba(8,8,10,1) 0%, rgba(18,18,20,1) 70%, rgba(26,26,28,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([[100, 0], tr, br, [100, 100]]),
          background:
            "linear-gradient(to left, rgba(8,8,10,1) 0%, rgba(18,18,20,1) 70%, rgba(26,26,28,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          clipPath: poly([[0, 100], [100, 100], br, bl]),
          background:
            "linear-gradient(to top, rgba(15,15,17,1) 0%, rgba(6,6,8,1) 100%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
        <defs>
          <linearGradient id="baseGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="20%" stopColor="white" stopOpacity="0.5" />
            <stop offset="80%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={`${bl[0]}%`} y1={`${bl[1]}%`} x2={`${br[0]}%`} y2={`${br[1]}%`}
          stroke="rgba(255,255,255,0.2)" strokeWidth="5" style={{ filter: "blur(3px)" }} />
        <line x1={`${bl[0]}%`} y1={`${bl[1]}%`} x2={`${br[0]}%`} y2={`${br[1]}%`}
          stroke="url(#baseGrad)" strokeWidth="1" />
        <line x1={`${tl[0]}%`} y1={`${tl[1]}%`} x2={`${bl[0]}%`} y2={`${bl[1]}%`}
          stroke="url(#vGrad)" strokeWidth="1" />
        <line x1={`${tr[0]}%`} y1={`${tr[1]}%`} x2={`${br[0]}%`} y2={`${br[1]}%`}
          stroke="url(#vGrad)" strokeWidth="1" />
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 15,
          opacity: lightsOn ? intensity : 0,
          transition: isFlickering ? "none" : `opacity 700ms ${EASE}`,
          mixBlendMode: "screen",
          willChange: "opacity",
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{ 
            clipPath: poly([tl, tr, br, bl]), 
            background: spots.map(x => `radial-gradient(ellipse 25% 40% at ${x}% 68%, rgba(${lightColor},0.15) 0%, transparent 70%)`).join(", ")
          }} 
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            clipPath: poly([[0, 0], tl, bl, [0, 100]]), 
            background: `radial-gradient(ellipse 40% 50% at 15% 75%, rgba(${lightColor},0.08) 0%, transparent 60%)`
          }} 
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            clipPath: poly([[100, 0], tr, br, [100, 100]]), 
            background: `radial-gradient(ellipse 40% 50% at 85% 75%, rgba(${lightColor},0.08) 0%, transparent 60%)`
          }} 
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            clipPath: poly([[0, 100], [100, 100], br, bl]), 
            background: spots.map(x => `radial-gradient(ellipse 35% 30% at ${x}% 80%, rgba(${lightColor},0.06) 0%, transparent 60%)`).join(", ")
          }} 
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 16, mixBlendMode: "screen" }}
      >
        {/* Soft wide ambient background wash for warm atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 45% at 50% 15%, rgba(${lightColor},0.18) 0%, rgba(${lightColor},0.04) 55%, transparent 85%)`,
            filter: "blur(30px)",
            opacity: lightsOn ? intensity : 0,
            transition: isFlickering ? "none" : "opacity 700ms ease-out",
          }}
        />

        {spots.map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: lightsOn ? intensity : 0 }}
            transition={isFlickering ? { duration: 0 } : { delay: i * 0.1, duration: 0.8, ease: "easeInOut" }}
            className="absolute flex spotlight-beam h-[82vh] -translate-x-1/2 justify-center pointer-events-none"
            style={{ 
              left: `${pos}%`, 
              top: "95px",
              mixBlendMode: "screen",
              willChange: "opacity"
            }}
          >
            {/* Outer Volumetric Spotlight Cone (matching screenshot shape & soft blur) */}
            <div
              className="w-full h-full absolute top-0"
              style={{
                clipPath: "polygon(43% 0%, 57% 0%, 100% 100%, 0% 100%)",
                background: `linear-gradient(to bottom, rgba(${lightColor},0.45) 0%, rgba(${lightColor},0.22) 30%, rgba(${lightColor},0.06) 70%, transparent 100%)`,
                filter: "blur(12px)",
              }}
            />
            {/* Inner Soft Warm Core Beam */}
            <div
              className="w-[75%] h-full absolute top-0"
              style={{
                clipPath: "polygon(45% 0%, 55% 0%, 82% 100%, 18% 100%)",
                background: `linear-gradient(to bottom, rgba(255,235,200,0.55) 0%, rgba(${lightColor},0.25) 25%, rgba(${lightColor},0.05) 60%, transparent 100%)`,
                filter: "blur(7px)",
              }}
            />
            {/* Spotlight Lens Mouth Glow Flare */}
            <div
              className="w-[32px] h-[16px] rounded-full absolute -top-1"
              style={{
                background: `radial-gradient(ellipse at center, #ffffff 0%, rgba(${lightColor},0.8) 60%, transparent 100%)`,
                boxShadow: `0 0 20px 6px rgba(${lightColor},0.6)`,
                filter: "blur(1px)",
              }}
            />
          </motion.div>
        ))}
      </div>
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 31
        }}
      >
        {[35, 50, 65].map((pos, i) => (
            <div key={i} className="spotlight-fixture absolute flex flex-col items-center" style={{ left: `${pos}%`, top: '20px' }}>
            <div className="w-[14px] h-[34px] rounded-sm border border-zinc-900 shadow-[0_5px_10px_rgba(0,0,0,0.9),inset_0_0_4px_rgba(255,255,255,0.5)] relative overflow-hidden"
                 style={{ background: 'linear-gradient(to right, #666 0%, #ffffff 40%, #999 60%, #333 100%)' }}>
               <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-zinc-900 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,1)]" />
               <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-zinc-900 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,1)]" />
            </div>
            <div className="w-[8px] h-[18px] bg-linear-to-r from-zinc-900 via-zinc-600 to-zinc-950 border-x border-black relative">
               <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[18px] h-[18px] rounded-full border border-zinc-900 shadow-[0_4px_8px_rgba(0,0,0,1),inset_0_1px_2px_rgba(255,255,255,0.3)]"
                    style={{ background: 'radial-gradient(circle at top left, #777, #111)' }} />
            </div>
            <div className="relative mt-[6px] w-[54px] h-[64px] flex justify-center perspective-near">
              <div className="absolute inset-0 rounded-b-2xl rounded-t-sm border border-black shadow-[0_20px_30px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-evenly"
                   style={{ background: 'linear-gradient(to right, #111 0%, #3a3a3a 30%, #555 50%, #2a2a2a 80%, #000 100%)' }}>
                 <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none" style={{ backgroundImage: METAL_NOISE }} />
                 <div className="w-full h-[2px] bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.15)] z-10" />
                 <div className="w-full h-[2px] bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.15)] z-10" />
                 <div className="w-full h-[2px] bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.15)] z-10" />
                 <div className="w-full h-[2px] bg-black/90 shadow-[0_1px_0_rgba(255,255,255,0.15)] z-10" />
              </div>
              <div className="absolute bottom-[-6px] w-[58px] h-[18px] rounded-[50%] border-2 border-zinc-900 shadow-[0_10px_15px_rgba(0,0,0,1)] flex items-center justify-center z-10 overflow-hidden"
                   style={{ background: 'radial-gradient(ellipse at center, #222, #000)' }}>
                 <div className="w-[34px] h-[10px] rounded-[50%] transition-all duration-700"
                      style={{
                        background: lightsOn ? '#ffffff' : '#111',
                        boxShadow: lightsOn 
                          ? `0 0 20px 8px rgba(255,255,255,0.9), inset 0 0 8px #fff`
                          : `inset 0 2px 5px rgba(0,0,0,0.9), inset 0 -1px 1px rgba(255,255,255,0.05)`,
                      }}
                 />
              </div>
              <div className="absolute bottom-[-18px] w-[46px] h-[20px] border border-black shadow-[0_15px_15px_rgba(0,0,0,0.8)] origin-top z-20 flex justify-center"
                   style={{ transform: 'rotateX(-45deg)', background: 'linear-gradient(to bottom, #222, #050505)' }}>
                 <div className="w-[80%] h-full bg-white/3" />
              </div>
              <div className="absolute bottom-[6px] w-[46px] h-[20px] border border-black origin-bottom z-0"
                   style={{ transform: 'rotateX(45deg)', background: 'linear-gradient(to top, #111, #000)' }} />
              <div className="absolute bottom-[-6px] left-[-6px] w-[14px] h-[22px] bg-zinc-900 border border-black origin-right z-10 shadow-[5px_0_10px_rgba(0,0,0,0.5)]"
                   style={{ transform: 'rotateY(-55deg) skewY(15deg)' }} />
              <div className="absolute bottom-[-6px] right-[-6px] w-[14px] h-[22px] bg-zinc-900 border border-black origin-left z-10 shadow-[-5px_0_10px_rgba(0,0,0,0.5)]"
                   style={{ transform: 'rotateY(55deg) skewY(-15deg)' }} />
            </div>
          </div>
        ))}
      </div>
      <div 
        className="absolute pointer-events-none w-full h-[80px] bg-linear-to-b from-black/60 to-transparent blur-xl"
        style={{ zIndex: 29, top: '4%', left: 0 }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 30,
          clipPath: poly([[0, 0], [100, 0], tr, tl])
        }}
      >
        <div 
          className="absolute w-full h-[26px]"
          style={{ 
            top: '3%', 
            left: '0%', 
            background: 'linear-gradient(to bottom, #111 0%, #3a3a3a 30%, #555 50%, #2a2a2a 80%, #000 100%)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.9), 0 10px 20px -5px rgba(0,0,0,0.8)'
          }}
        >
          <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none" style={{ backgroundImage: METAL_NOISE }} />
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{
          zIndex: 20,
          background: `radial-gradient(ellipse 90% 80% at 50% 45%,
            transparent 55%,
            rgba(0,0,0,${vignette}) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 25,
          opacity: 0.04,
          mixBlendMode: "screen",
          backgroundImage: GRAIN_NOISE,
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}

export const VolumetricStudio = ({ 
  className,
  children
}: { 
  className?: string;
  children?: React.ReactNode;
}) => {
  const [lightsOn, setLightsOn] = useState(false);
  const [isFlickering, setIsFlickering] = useState(true);
  useEffect(() => {
    let mounted = true;
    const runFlicker = async () => {
      const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
      await sleep(600);
      if (!mounted) return;
      setLightsOn(true);
      await sleep(100);
      setLightsOn(false);
      await sleep(300);
      setLightsOn(true);
      await sleep(50);
      setLightsOn(false);
      await sleep(200);
      setLightsOn(true);
      await sleep(40);
      setLightsOn(false);
      await sleep(60);
      setLightsOn(true);
      await sleep(40);
      setLightsOn(false);
      await sleep(400);
      if (!mounted) return;
      setIsFlickering(false);
      setLightsOn(true);
    };
    runFlicker();
    return () => { mounted = false; };
  }, []);
  return (
    <section className={cn("relative w-full bg-black overflow-hidden font-sans", className)}>
      <Room
        lightsOn={lightsOn}
        intensity={1}
        lightColor="250,130,50" // Tailored orange glow light color for INNOVIK 6.0
        spots={[35, 50, 65]}
        isFlickering={isFlickering}
      />
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </section>
  );
};

export const VolumetricHero = () => {
  // Target date: September 15, 2026
  const targetDate = "2026-09-15T09:00:00";

  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // cubic-bezier easeOutExpo
      },
    },
  };

  return (
    <VolumetricStudio className="flex items-center justify-center">
      {/* Hero content wrapper */}
      <div className="relative z-40 w-full min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
        {/* Layout spacer to reserve the spotlight area exactly where the light beams begin (20px top + 122px fixture = 142px) */}
        <div className="w-full shrink-0" style={{ height: "142px" }} aria-hidden="true" />
        
        {/* Content container aligned to the top to maintain relationship with absolute spotlights */}
        <div className="flex-1 flex flex-col items-center justify-start w-full pt-12 md:pt-[50px] pb-12 sm:pb-16">
          <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto pointer-events-auto"
        >
          {/* Restored Junior Hackathon CTA at the top */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center w-full max-w-[280px] sm:max-w-md px-2 sm:px-4 mx-auto pointer-events-auto mb-1 sm:mb-2"
          >
            <a 
              href="https://forms.gle/nBespXoUn4PGBpcW9" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative group flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500/80 via-orange-500/80 to-amber-500/80 border border-orange-300 shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:shadow-[0_0_60px_rgba(249,115,22,0.8)] backdrop-blur-md transition-all duration-300 w-full hover:scale-[1.03] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative flex items-center justify-center gap-2">
                <span className="text-sm sm:text-base font-extrabold text-white text-center leading-snug drop-shadow-md">
                  Junior Hackathon<br className="block sm:hidden" /> Registration (Class 10-12)
                </span>
                <ArrowTrendUpIcon />
              </div>
            </a>
          </motion.div>

          {/* Badge */}
          <motion.div 
            variants={itemVariants} 
            className="inline-flex flex-wrap items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[9px] sm:text-[11px] md:text-xs lg:text-sm font-semibold tracking-wide uppercase backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.12)] hover:border-orange-500/50 transition-colors duration-300 max-w-[95%] mx-auto"
          >
          <MicrochipIcon />
            <span>Agentic AI for Smart Solutions</span>
          </motion.div>

          {/* Subtitle / Venue */}
          <motion.span 
            variants={itemVariants} 
            className="relative z-10 text-[10px] sm:text-[11px] md:text-xs lg:text-sm font-bold tracking-[0.06em] sm:tracking-[0.1em] md:tracking-[0.15em] text-zinc-300 uppercase max-w-[280px] sm:max-w-sm md:max-w-xl lg:max-w-3xl leading-relaxed px-3 py-1 mt-1 rounded-md bg-black/40 backdrop-blur-sm text-center"
          >
            Vikrant Institute of Technology &amp; Management (VITM), Indore
          </motion.span>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants} 
            className="text-[2rem] sm:text-[2.8rem] md:text-5xl lg:text-7xl xl:text-8xl leading-tight font-black tracking-tight text-center select-none bg-gradient-to-r from-orange-400 via-amber-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(249,115,22,0.25)] py-1 sm:py-2 px-2 font-sans">
            INNOVIK 6.0
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            variants={itemVariants} 
            className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-zinc-300 font-medium tracking-wide text-center max-w-[260px] sm:max-w-sm md:max-w-xl lg:max-w-3xl leading-relaxed px-2 sm:px-4"
          >
            Central India's First International Hackathon
          </motion.p>

          {/* Battle Cry */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs md:text-sm lg:text-base font-extrabold tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-orange-500 px-4 text-center"
          >
            <span>CODE</span>
            <span className="text-zinc-700 font-normal select-none">•</span>
            <span>CREATE</span>
            <span className="text-zinc-700 font-normal select-none">•</span>
            <span>CONQUER</span>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-4 md:mt-5 w-full px-2 sm:px-4"
          >
            <div className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] text-zinc-500 uppercase text-center">
              Hackathon Starts In:
            </div>
            
            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div 
                  key={label} 
                  className="flex flex-col items-center justify-center bg-zinc-950/60 backdrop-blur-md border border-zinc-800/60 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.03)] relative overflow-hidden group hover:border-orange-500/20 transition-colors duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight font-mono select-all">
                    {String(value).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[10px] md:text-xs font-semibold text-zinc-500 tracking-wider uppercase mt-0.5">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons — stack vertically on very small screens, row on sm+ */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 mt-4 sm:mt-6 md:mt-8 w-full max-w-[280px] sm:max-w-none px-2 sm:px-4"
          >
            <a 
              href="https://forms.gle/nBespXoUn4PGBpcW9" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-action-btn hero-btn-primary hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto sm:min-w-[180px] md:min-w-[220px] justify-center"
            >
              <span>Register Now!</span>
              <ArrowTrendUpIcon />
            </a>
            
            <a 
              href="#about" 
              className="hero-action-btn hero-btn-secondary hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto sm:min-w-[180px] md:min-w-[220px] justify-center"
            >
              <span>Explore Event</span>
              <InfoIcon />
            </a>
          </motion.div>

          {/* Junior Hackathon CTA */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mt-3 sm:mt-5 w-full max-w-[280px] sm:max-w-sm px-2 sm:px-4 mx-auto pointer-events-auto"
          >
            <a 
              href="https://forms.gle/nBespXoUn4PGBpcW9" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-action-btn hero-btn-primary hero-btn-blink hover:scale-[1.03] active:scale-[0.98] w-full min-h-[52px] justify-center text-center"
            >
              <span>Junior Hackathon (Cl. 10-12)</span>
              <ArrowTrendUpIcon />
            </a>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </VolumetricStudio>
  );
};
