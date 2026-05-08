"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { 
  Compass, Rocket, CheckCircle2, 
  Circle, ArrowRight, Sparkles, Star,
  Zap, Box, Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RoadmapClient({ steps, user }: any) {
  const containerRef = useRef(null);
  
  // منطق انیمیشن خط درخشان بر اساس اسکرول
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto pb-64 relative">
      {/* Header لوکس */}
      <div className="flex flex-col items-center text-center space-y-8 mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          className="relative w-24 h-24 bg-[#0a0a10] border border-purple-500/30 rounded-[2.5rem] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-purple-600/20 blur-3xl animate-pulse rounded-full" />
          <Compass className="w-12 h-12 text-purple-500 z-10" />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
            Neural <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-indigo-600">Trajectory</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">
            Projecting the optimal path for <span className="text-white">{user?.name}</span> to dominate the global tech stack.
          </p>
        </div>
      </div>

      <div className="relative px-4 md:px-20">
        {/* خط راهنما - پس‌زمینه خاموش */}
        <div className="absolute left-[59px] md:left-[119px] top-0 bottom-0 w-[2px] bg-white/5" />
        
        {/* خط درخشان فعال - متصل به اسکرول */}
        <motion.div 
          style={{ scaleY }}
          className="absolute left-[59px] md:left-[119px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent origin-top shadow-[0_0_20px_#9333ea]"
        />

        <div className="space-y-40">
          {steps.map((step: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-32 md:pl-56 group"
            >
              {/* Marker گوی مانند */}
              <div className="absolute left-0 top-0 z-20">
                <div className={cn(
                  "w-16 h-16 md:w-28 md:h-28 rounded-[3rem] border-2 flex items-center justify-center transition-all duration-1000",
                  step.status === "completed" ? "bg-[#050508] border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]" :
                  step.status === "current" ? "bg-purple-600 border-white shadow-[0_0_50px_#9333ea]" :
                  "bg-[#030305] border-white/5"
                )}>
                  {step.status === "completed" ? <CheckCircle2 className="w-8 h-8 text-emerald-500" /> :
                   step.status === "current" ? <Zap className="w-10 h-10 text-white fill-white animate-pulse" /> :
                   <Circle className="w-8 h-8 text-zinc-800" />}
                </div>
                <div className="absolute -top-6 -left-6 text-6xl font-black text-white/[0.03] italic">0{index + 1}</div>
              </div>

              {/* Content Card - فوق لوکس */}
              <div className={cn(
                "p-10 md:p-16 rounded-[4rem] border transition-all duration-700 relative overflow-hidden group/card",
                step.status === "current" 
                  ? "bg-[#080812] border-white/10 shadow-2xl" 
                  : "bg-transparent border-white/5 opacity-40 hover:opacity-100"
              )}>
                {/* دکوراسیون متحرک داخلی */}
                {step.status === "current" && (
                  <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full group-hover/card:bg-purple-600/20 transition-all duration-700" />
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-2xl"><Cpu className="w-5 h-5 text-purple-400" /></div>
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500">Neural Phase</span>
                   </div>
                   {step.status === "current" && (
                     <div className="px-5 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-500 text-[10px] font-black uppercase tracking-widest animate-bounce">
                        In Execution
                     </div>
                   )}
                </div>

                <h3 className="text-4xl font-black text-white mb-6 tracking-tighter group-hover/card:translate-x-3 transition-transform duration-500">
                  {step.title}
                </h3>
                
                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-12 font-medium">
                  {step.desc}
                </p>

                {/* بخش منابع و اکشن */}
                <div className="flex flex-wrap gap-6">
                  <button className="px-10 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[3px] rounded-[2rem] hover:bg-purple-600 hover:text-white transition-all shadow-2xl flex items-center gap-3 active:scale-95">
                    Execute Module <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-4 px-6 border-l border-white/10">
                     <div className="flex -space-x-3">
                        {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080812] bg-zinc-800" />)}
                     </div>
                     <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">1.2k+ Enrolled</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

