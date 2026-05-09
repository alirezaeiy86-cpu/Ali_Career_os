"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { 
  Zap, Sparkles, Cpu, Activity, ChevronRight, Menu, X, 
  ShieldCheck, Globe, Orbit, ArrowDown, Command, Terminal, Network, Layout
} from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // افکت‌های سه‌بعدی برای دشبورد
  const rotateX = useTransform(smoothProgress, [0, 0.2], [15, 0]);
  const scale = useTransform(smoothProgress, [0, 0.2], [0.8, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  const navItems = [
    { id: 'mentor', label: 'Intelligence' },
    { id: 'architect', label: 'The Vault' },
    { id: 'simulator', label: 'Interrogation' },
    { id: 'nexus', label: 'Nexus' }
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div ref={containerRef} className="bg-black text-white font-sans overflow-x-hidden selection:bg-purple-600/40">
      <div className="fixed inset-0 noise-bg z-50" />

      {/* --- ۱. NAV: FLOATING HUB --- */}
      <nav className="fixed top-6 left-0 right-0 z-[100] px-4 md:px-10">
        <motion.div 
          initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="max-w-[1400px] mx-auto glass-card rounded-[2.5rem] p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-10 h-10 bg-white text-black rounded-2xl flex items-center justify-center font-black group-hover:rotate-12 transition-all">Z</div>
            <span className="font-black text-xl tracking-tighter uppercase italic hidden sm:block">ZENITH<span className="text-zinc-600">.OS</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 hover:text-white transition-all">
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="px-8 py-3 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-2xl">
              Terminal
            </Link>
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-white">
              <Menu size={24} />
            </button>
          </div>
        </motion.div>
      </nav>

      {/* --- ۲. HERO: CINEMATIC SCALE --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent 70%)]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}
          className="text-center z-10"
        >
          <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-zinc-500 text-[9px] font-black uppercase tracking-[0.6em] mx-auto w-fit mb-12">
            <Activity className="w-3 h-3 text-purple-500 animate-pulse" /> Neural Link: v9.4 Stable
          </div>

          <h1 className="text-[14vw] md:text-[12vw] font-black leading-[0.8] tracking-[-0.08em] uppercase italic text-reveal-mask mb-12">
            ARCHITECT <br /> <span className="text-zinc-900">YOUR IDENTITY.</span>
          </h1>

          <p className="text-zinc-500 text-lg md:text-3xl max-w-4xl mx-auto font-light italic mb-16">
            The world’s first neural-driven career operating system. <br className="hidden md:block" /> 
            <span className="text-white">Professional DNA projection at the speed of thought.</span>
          </p>

          <Link href="/register" className="inline-flex items-center gap-4 px-12 py-6 md:px-20 md:py-8 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.6em] shadow-[0_0_80px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all">
            Initialize Identification <ChevronRight size={18} />
          </Link>
        </motion.div>

        {/* --- ۳. DASHBOARD PREVIEW: 3D ANIMATION --- */}
        <div className="w-full max-w-[1600px] mt-32 perspective-view px-4">
           <motion.div 
             style={{ rotateX, scale, opacity }}
             className="glass-card p-2 md:p-4 rounded-[3rem] md:rounded-[5rem] shadow-[0_100px_200px_rgba(0,0,0,1)]"
           >
              <div className="relative rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden bg-[#020205] border border-white/5">
                 <img src="/dashboard.jpeg" className="w-full h-auto opacity-90 group-hover:scale-105 transition-transform duration-[3s]" alt="Neural Dashboard" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent h-1/2 bottom-0" />
              </div>
           </motion.div>
        </div>
      </section>

      {/* --- ۴. FEATURES: THE BENTO SAGA --- */}
      <section className="py-64 px-6 max-w-[1500px] mx-auto space-y-32">
        
        {/* MENTOR SECTION */}
        <div id="mentor" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-7 space-y-10">
              <span className="text-purple-500 text-[10px] font-black uppercase tracking-[1em] block">01 // Neural Intelligence</span>
              <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8]">THE <br/> <span className="text-zinc-800">ORACLE.</span></h2>
              <p className="text-zinc-500 text-xl md:text-3xl font-extralight italic leading-relaxed">
                 نه یک چت‌بوت ساده، بلکه یک مغز متفکر جهانی. مربی هوش مصنوعی شما که با تحلیل لحظه‌ای دارایی‌های فنی‌تان، مسیر ورود به غول‌های تکنولوژی را ترسیم می‌کند.
              </p>
           </div>
           <div className="lg:col-span-5">
              <div className="relative group">
                 <div className="absolute -inset-10 bg-purple-600/10 blur-[100px] rounded-full group-hover:bg-purple-600/20 transition-all duration-1000" />
                 <div className="relative rounded-[4rem] border border-white/10 bg-zinc-900 p-2 overflow-hidden shadow-2xl">
                    <img src="/avatar.png" className="w-full h-auto grayscale brightness-50 hover:grayscale-0 transition-all duration-1000" />
                 </div>
              </div>
           </div>
        </div>

        {/* CV ARCHITECT SECTION (White Contrast) */}
        <div id="architect" className="bg-white text-black rounded-[4rem] md:rounded-[10rem] p-12 md:p-32 text-center space-y-16 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://transparenttextures.com')] opacity-10" />
           <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
              <span className="text-[10px] font-black uppercase tracking-[1em] text-zinc-400 mb-12 block">02 // Identity Engineering</span>
              <h2 className="text-7xl md:text-[10vw] font-black uppercase italic leading-none tracking-tighter">MASTER <br/> VAULT.</h2>
              <p className="text-zinc-600 text-xl md:text-3xl max-w-4xl mx-auto italic font-medium mt-12">
                 رزومه‌ای که کدهای تو را به زبان قدرت ترجمه می‌کند. سینک خودکار با گیت‌هاب برای اثبات ابهت مهندسی تو در یک سند Executive.
              </p>
              <Link href="/register" className="inline-block mt-20 px-16 py-8 bg-black text-white rounded-full font-black text-xs uppercase tracking-[0.5em] hover:scale-105 transition-all shadow-2xl">
                 Initialize Blueprint
              </Link>
           </motion.div>
        </div>

        {/* INTERVIEW & NETWORK (Duo Bento) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto">
           <div id="simulator" className="md:col-span-7 min-h-[600px] glass-card rounded-[5rem] p-10 md:p-16 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-opacity"><Terminal size={400}/></div>
              <div className="space-y-8">
                 <div className="w-16 h-16 rounded-3xl bg-purple-600/10 flex items-center justify-center border border-purple-500/20"><Cpu className="text-purple-500 w-8 h-8" /></div>
                 <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Virtual <br/> Interrogation.</h3>
                 <p className="text-zinc-500 text-xl font-light italic">شبیه‌ساز مصاحبه صوتی با سخت‌گیرترین مدیران سیلیکون‌ولی. با صدای خودت پاسخ بده و نمره نهایی را از AI بگیر.</p>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]" />
                 <span className="text-[9px] font-black uppercase tracking-[0.5em] text-red-500">Live Simulation Interface</span>
              </div>
           </div>

           <div id="nexus" className="md:col-span-5 min-h-[600px] bg-white text-black rounded-[5rem] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"><Orbit className="w-full h-full animate-spin-slow" /></div>
              <div className="space-y-8 relative z-10">
                 <Network className="w-12 h-12" />
                 <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">Global <br/> Nexus.</h3>
                 <p className="text-zinc-600 text-lg font-bold italic">فراتر از نتورک؛ یک کهکشان از فرصت‌ها. اتصال مستقیم به گره‌های قدرت در خوشه‌های تکنولوژی جهان.</p>
              </div>
              <Link href="/login" className="w-fit px-10 py-5 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:shadow-2xl transition-all">Initialize Connection</Link>
           </div>
        </div>
      </section>

      {/* --- ۵. FOOTER: THE LOGOUT SEQUENCE --- */}
      <footer className="py-40 px-10 border-t border-white/5 flex flex-col items-center text-center space-y-20 bg-black">
         <div className="w-24 h-24 bg-white text-black rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.15)]">
            <Command size={48} />
         </div>
         <h2 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter text-reveal-mask">Ready for <br/> Deployment?</h2>
         <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.8em] text-zinc-700">
            <span className="text-white">SILICON VALLEY</span>
            <span>BALKH</span>
            <span className="text-white">LONDON</span>
            <span>SINGAPORE</span>
         </div>
         <p className="text-zinc-800 text-[10px] font-black uppercase tracking-[2em] pt-20">Zenith labs © 2026 // Distributed Career OS</p>
      </footer>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[200] bg-black p-10 flex flex-col justify-center gap-10"
          >
             <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 p-4 bg-white/5 rounded-full"><X size={32}/></button>
             {navItems.map((item, i) => (
               <motion.button 
                 key={item.id} onClick={() => scrollTo(item.id)}
                 initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i*0.1 }}
                 className="text-5xl font-black uppercase italic tracking-tighter text-left"
               >
                 {item.label}
               </motion.button>
             ))}
             <Link href="/login" className="text-2xl font-black text-purple-500 uppercase tracking-widest mt-10">Access Terminal _</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-[100] scan-line-fast opacity-[0.01]" />
    </div>
  );
}



// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { Sparkles, ArrowRight, Zap, Globe, Shield, Cpu, Activity, ChevronRight } from "lucide-react";
// import Link from "next/link";
// import { useRef } from "react";

// export default function LandingPage() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
//   const rotate = useTransform(scrollYProgress, [0, 0.2], [0, 5]);

//   return (
//     <div ref={containerRef} className="bg-[#000] text-white min-h-screen selection:bg-purple-500/30 font-sans">
      
//       {/* --- BACKGROUND ELEMENTS --- */}
//       <div className="fixed inset-0 grid-pattern pointer-events-none" />
//       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />

//       {/* --- NAV HUD --- */}
//       <nav className="fixed top-0 w-full z-50 px-10 py-8 flex items-center justify-between backdrop-blur-md">
//         <div className="flex items-center gap-3 group cursor-pointer">
//           <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
//             <Zap className="w-6 h-6 fill-black" />
//           </div>
//           <span className="font-black text-2xl tracking-tighter uppercase italic">ZENITH<span className="text-zinc-700">OS</span></span>
//         </div>
        
//         <div className="hidden lg:flex items-center gap-12 bg-white/[0.03] border border-white/10 px-10 py-3 rounded-full">
//           {['Features', 'Intelligence', 'Security', 'Network'].map((item) => (
//             <Link key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition">
//               {item}
//             </Link>
//           ))}
//         </div>

//         <Link href="/login" className="px-8 py-3 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_30px_#fff] transition-all">
//           Authorize Access
//         </Link>
//       </nav>

//       {/* --- HERO SECTION: CINEMATIC --- */}
//       <section className="relative pt-48 pb-20 px-6 flex flex-col items-center justify-center text-center">
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
//           className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[9px] font-black uppercase tracking-[0.4em] mb-12 shadow-[0_0_15px_rgba(147,51,234,0.1)]"
//         >
//           <Activity className="w-3 h-3" /> System Neural Connection: Optimal
//         </motion.div>

//         <motion.h1 
//           initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
//           className="text-[10vw] font-black leading-[0.8] tracking-[-0.07em] uppercase italic text-reveal mb-12"
//         >
//           Architect <br /> your <span className="text-zinc-800">Future.</span>
//         </motion.h1>

//         <motion.p 
//           initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
//           className="text-zinc-500 text-lg md:text-2xl max-w-3xl leading-relaxed font-light italic mb-16"
//         >
//           The first neural career operating system. <span className="text-white">Zenith OS</span> deconstructs global market nodes to project your professional DNA into elite opportunities.
//         </motion.p>

//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
//           <Link href="/register" className="group relative px-14 py-6 bg-purple-600 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(147,51,234,0.4)]">
//             <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
//             <span className="relative flex items-center gap-3">Initialize Identity <ChevronRight className="w-4 h-4" /></span>
//           </Link>
//         </motion.div>

//         {/* --- PREVIEW HUD: THE MASTERPIECE --- */}
//         <motion.div 
//           style={{ scale, rotateX: rotate }}
//           className="mt-40 relative max-w-7xl mx-auto p-4 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,1)]"
//         >
//           <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-[4rem] blur-2xl opacity-50" />
//           <div className="relative rounded-[3.5rem] overflow-hidden border border-white/5 bg-[#020205]">
//             <img 
//               src="/dashboard-preview.png" 
//               alt="System HUD"
//               className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent h-1/3 bottom-0" />
//           </div>
//         </motion.div>
//       </section>

//       {/* --- CORE CAPABILITIES: BENTO 4.0 --- */}
//       <section className="max-w-[1400px] mx-auto px-10 py-64 grid grid-cols-1 md:grid-cols-12 gap-8">
        
//         {/* BIG CARD */}
//         <div className="md:col-span-8 rounded-[4rem] bg-zinc-900/20 border border-white/5 p-16 relative overflow-hidden group">
//           <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity">
//             <Globe className="w-80 h-80 text-white" />
//           </div>
//           <div className="relative z-10 space-y-6">
//             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
//               <Sparkles className="w-6 h-6 text-purple-500" />
//             </div>
//             <h3 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Global Neural <br /> Network</h3>
//             <p className="text-zinc-500 text-xl max-w-md">Our AI doesn't just find jobs; it calculates your market alignment across 42 global tech clusters.</p>
//           </div>
//         </div>

//         {/* SMALL CARD */}
//         <div className="md:col-span-4 rounded-[4rem] bg-gradient-to-b from-purple-600 to-indigo-900 p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
//           <div className="absolute inset-0 bg-[url('https://vercel.app')] opacity-20" />
//           <Shield className="w-16 h-16 text-white mb-10 group-hover:scale-110 transition-transform" />
//           <div>
//             <h3 className="text-3xl font-black italic uppercase leading-none mb-4 text-white">Quantum <br /> Security</h3>
//             <p className="text-white/60 text-sm">AES-256 neural encryption for your professional DNA.</p>
//           </div>
//         </div>

//         {/* PROJECT VAULT CARD */}
//         <div className="md:col-span-12 rounded-[4rem] border border-white/5 bg-[#050508] p-16 flex flex-col md:flex-row items-center justify-between gap-12 group">
//           <div className="space-y-6">
//             <div className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[9px] font-black uppercase tracking-widest">
//               Feature: Project Hub
//             </div>
//             <h3 className="text-5xl font-black italic tracking-tighter uppercase text-white leading-none">Technical <br /> Fingerprint</h3>
//             <p className="text-zinc-500 text-xl max-w-lg">Every line of code you've written is a data point. Zenith OS audits your repositories to prove your architectural mastery.</p>
//           </div>
//           <div className="w-full md:w-1/3 aspect-video rounded-3xl bg-zinc-900 border border-white/5 relative overflow-hidden">
//              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
//              <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-cyan-500 opacity-20" />
//           </div>
//         </div>

//       </section>

//       {/* --- FINAL CTA --- */}
//       <section className="py-64 flex flex-col items-center text-center">
//         <h2 className="text-7xl md:text-9xl font-black italic text-reveal mb-12 uppercase tracking-tighter leading-none">Ready for <br /> <span className="text-zinc-900">Evolution?</span></h2>
//         <Link href="/register" className="px-16 py-8 bg-white text-black rounded-full font-black text-sm uppercase tracking-[0.5em] hover:shadow-[0_0_100px_rgba(255,255,255,0.3)] transition-all">
//           Launch Zenith OS
//         </Link>
//       </section>
//     </div>
//   );
// }
