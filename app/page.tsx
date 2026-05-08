"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Globe, Shield, Cpu, Activity, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 0.2], [0, 5]);

  return (
    <div ref={containerRef} className="bg-[#000] text-white min-h-screen selection:bg-purple-500/30 font-sans">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />

      {/* --- NAV HUD --- */}
      <nav className="fixed top-0 w-full z-50 px-10 py-8 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Zap className="w-6 h-6 fill-black" />
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase italic">ZENITH<span className="text-zinc-700">OS</span></span>
        </div>
        
        <div className="hidden lg:flex items-center gap-12 bg-white/[0.03] border border-white/10 px-10 py-3 rounded-full">
          {['Features', 'Intelligence', 'Security', 'Network'].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition">
              {item}
            </Link>
          ))}
        </div>

        <Link href="/login" className="px-8 py-3 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_30px_#fff] transition-all">
          Authorize Access
        </Link>
      </nav>

      {/* --- HERO SECTION: CINEMATIC --- */}
      <section className="relative pt-48 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[9px] font-black uppercase tracking-[0.4em] mb-12 shadow-[0_0_15px_rgba(147,51,234,0.1)]"
        >
          <Activity className="w-3 h-3" /> System Neural Connection: Optimal
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-[10vw] font-black leading-[0.8] tracking-[-0.07em] uppercase italic text-reveal mb-12"
        >
          Architect <br /> your <span className="text-zinc-800">Future.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-zinc-500 text-lg md:text-2xl max-w-3xl leading-relaxed font-light italic mb-16"
        >
          The first neural career operating system. <span className="text-white">Zenith OS</span> deconstructs global market nodes to project your professional DNA into elite opportunities.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Link href="/register" className="group relative px-14 py-6 bg-purple-600 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(147,51,234,0.4)]">
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative flex items-center gap-3">Initialize Identity <ChevronRight className="w-4 h-4" /></span>
          </Link>
        </motion.div>

        {/* --- PREVIEW HUD: THE MASTERPIECE --- */}
        <motion.div 
          style={{ scale, rotateX: rotate }}
          className="mt-40 relative max-w-7xl mx-auto p-4 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,1)]"
        >
          <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-[4rem] blur-2xl opacity-50" />
          <div className="relative rounded-[3.5rem] overflow-hidden border border-white/5 bg-[#020205]">
            <img 
              src="/dashboard-preview.png" 
              alt="System HUD"
              className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent h-1/3 bottom-0" />
          </div>
        </motion.div>
      </section>

      {/* --- CORE CAPABILITIES: BENTO 4.0 --- */}
      <section className="max-w-[1400px] mx-auto px-10 py-64 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* BIG CARD */}
        <div className="md:col-span-8 rounded-[4rem] bg-zinc-900/20 border border-white/5 p-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity">
            <Globe className="w-80 h-80 text-white" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Global Neural <br /> Network</h3>
            <p className="text-zinc-500 text-xl max-w-md">Our AI doesn't just find jobs; it calculates your market alignment across 42 global tech clusters.</p>
          </div>
        </div>

        {/* SMALL CARD */}
        <div className="md:col-span-4 rounded-[4rem] bg-gradient-to-b from-purple-600 to-indigo-900 p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://vercel.app')] opacity-20" />
          <Shield className="w-16 h-16 text-white mb-10 group-hover:scale-110 transition-transform" />
          <div>
            <h3 className="text-3xl font-black italic uppercase leading-none mb-4 text-white">Quantum <br /> Security</h3>
            <p className="text-white/60 text-sm">AES-256 neural encryption for your professional DNA.</p>
          </div>
        </div>

        {/* PROJECT VAULT CARD */}
        <div className="md:col-span-12 rounded-[4rem] border border-white/5 bg-[#050508] p-16 flex flex-col md:flex-row items-center justify-between gap-12 group">
          <div className="space-y-6">
            <div className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[9px] font-black uppercase tracking-widest">
              Feature: Project Hub
            </div>
            <h3 className="text-5xl font-black italic tracking-tighter uppercase text-white leading-none">Technical <br /> Fingerprint</h3>
            <p className="text-zinc-500 text-xl max-w-lg">Every line of code you've written is a data point. Zenith OS audits your repositories to prove your architectural mastery.</p>
          </div>
          <div className="w-full md:w-1/3 aspect-video rounded-3xl bg-zinc-900 border border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
             <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-cyan-500 opacity-20" />
          </div>
        </div>

      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-64 flex flex-col items-center text-center">
        <h2 className="text-7xl md:text-9xl font-black italic text-reveal mb-12 uppercase tracking-tighter leading-none">Ready for <br /> <span className="text-zinc-900">Evolution?</span></h2>
        <Link href="/register" className="px-16 py-8 bg-white text-black rounded-full font-black text-sm uppercase tracking-[0.5em] hover:shadow-[0_0_100px_rgba(255,255,255,0.3)] transition-all">
          Launch Zenith OS
        </Link>
      </section>
    </div>
  );
}
