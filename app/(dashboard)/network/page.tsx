"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring,AnimatePresence } from "framer-motion";
import { 
  Orbit, Search, Zap, Target, 
  Share2, Globe, Users, ShieldCheck, 
  ArrowUpRight, Radio, Fingerprint 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function NetworkPage() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // شبیه‌سازی دیتای گره‌ها (Nodes)
  const nodes = [
    { id: "1", name: "Google", role: "Direct Referral", top: "20%", left: "30%", size: "w-24 h-24", img: "G" },
    { id: "2", name: "OpenAI", role: "Neural Match", top: "60%", left: "15%", size: "w-20 h-20", img: "AI" },
    { id: "3", name: "Sarah Chen", role: "Architect @ Apple", top: "15%", left: "75%", size: "w-16 h-16", img: "SC" },
    { id: "4", name: "NVIDIA", role: "Target Node", top: "75%", left: "80%", size: "w-28 h-28", img: "NV" },
    { id: "5", name: "Alex Rivera", role: "CTO @ Meta", top: "45%", left: "85%", size: "w-14 h-14", img: "AR" },
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6 relative font-sans overflow-hidden bg-[#000]">
      
      {/* --- ۱. نوار وضعیت رادار (HUD) --- */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 px-10 py-4 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-3xl no-print">
         <div className="flex items-center gap-3 border-r border-white/10 pr-6">
            <Radio className="w-4 h-4 text-purple-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Scanning Proximity...</span>
         </div>
         <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Reach:</span>
            <span className="text-xl font-black italic tracking-tighter text-purple-500">EXCEPTIONAL</span>
         </div>
      </div>

      {/* --- ۲. فضای تعاملی کهکشانی (The Galaxy Canvas) --- */}
      <div className="flex-1 relative bg-black rounded-[4rem] border border-white/5 overflow-hidden group">
        
        {/* افکت نوری و خطوط گرید ۳ بعدی */}
        <div className="absolute inset-0 bg-[url('https://vercel.app')] opacity-[0.03] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.12),transparent 70%)]" />
        
        {/* خطوط اسکنر دایره‌ای */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           {[1, 2, 3].map((i) => (
             <motion.div 
               key={i}
               animate={{ rotate: 360 }}
               transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
               className="absolute border border-white/[0.03] rounded-full"
               style={{ width: i * 400, height: i * 400 }}
             />
           ))}
        </div>

        {/* مرکز منظومه (YOU) */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
           <motion.div 
             animate={{ scale: [1, 1.05, 1] }} 
             transition={{ duration: 4, repeat: Infinity }}
             className="relative group/user"
           >
              <div className="absolute -inset-10 bg-purple-600/20 blur-[80px] rounded-full animate-pulse" />
              <div className="w-32 h-32 rounded-full bg-black border-2 border-white/20 p-1 relative z-10 shadow-[0_0_50px_rgba(147,51,234,0.3)]">
                 <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border border-white/10">
                    <img src="https://pravatar.cc" className="w-full h-full object-cover grayscale brightness-110" alt="Core" />
                 </div>
                 <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-black shadow-2xl">
                    <Zap className="w-5 h-5 fill-black" />
                 </div>
              </div>
           </motion.div>
        </div>

        {/* گره‌های شناور در فضا (Nodes) */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, zIndex: 50 }}
            onHoverStart={() => setHoveredNode(node.id)}
            onHoverEnd={() => setHoveredNode(null)}
            className="absolute cursor-pointer group/node"
            style={{ top: node.top, left: node.left }}
          >
            {/* خط اتصال به مرکز (فقط زمان هاور) */}
            {hoveredNode === node.id && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute top-1/2 left-1/2 w-[300px] h-[1px] bg-gradient-to-r from-purple-500 to-transparent origin-left -translate-y-1/2 -z-10"
                style={{ transform: `rotate(180deg)` }}
              />
            )}

            <div className={cn(
              "rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500",
              node.size,
              hoveredNode === node.id ? "border-purple-500 shadow-[0_0_40px_rgba(147,51,234,0.4)]" : "grayscale"
            )}>
              <span className="text-xl font-black text-white italic">{node.img}</span>
              <AnimatePresence>
                {hoveredNode === node.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute -bottom-16 w-48 text-center"
                  >
                    <p className="text-xs font-black uppercase text-white tracking-widest">{node.name}</p>
                    <p className="text-[8px] font-bold uppercase text-purple-400 mt-1">{node.role}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {/* --- ۳. ویجت هوشمند پیشنهادها (Side HUD) --- */}
        <aside className="absolute right-8 top-1/2 -translate-y-1/2 w-80 space-y-4 no-print z-40">
           <div className="p-8 rounded-[3rem] bg-black/60 border border-white/10 backdrop-blur-3xl space-y-6">
              <div className="flex items-center gap-3">
                 <Fingerprint className="w-5 h-5 text-purple-500" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Neural Matches</h3>
              </div>
              <div className="space-y-4">
                 {[
                   { name: "Julian Voss", company: "Netflix", score: "99%" },
                   { name: "Elena Rossi", company: "Meta", score: "96%" }
                 ].map((match, i) => (
                   <div key={i} className="group p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-purple-500/40 transition-all cursor-pointer">
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-[10px] font-bold text-white uppercase">{match.name}</span>
                         <span className="text-[9px] font-black text-purple-500">{match.score}</span>
                      </div>
                      <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{match.company}</p>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-white text-black rounded-2xl font-black text-[9px] uppercase tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all">
                Expand Network
              </button>
           </div>
        </aside>
      </div>

      {/* --- ۴. فوتر مانیتورینگ --- */}
      <footer className="flex justify-between items-center px-10 py-4 bg-white/[0.02] border border-white/5 rounded-[2rem] no-print">
         <div className="flex gap-10">
            <div className="flex flex-col">
               <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Active Connections</span>
               <span className="text-xl font-black italic text-white">1,284</span>
            </div>
            <div className="flex flex-col">
               <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Market Influence</span>
               <span className="text-xl font-black italic text-emerald-500">TOP 2%</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center gap-2">
               <ShieldCheck className="w-3 h-3 text-purple-400" />
               <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">Identity Protected</span>
            </div>
         </div>
      </footer>
    </div>
  );
}
