"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { 
  Zap, Sparkles, Target, Activity, Cpu, 
  Search, Bell, Trophy, LayoutGrid, CheckCircle2,
  ArrowUpRight, Users, Globe, ShieldCheck, Radio
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardClient({ initialData }: any) {
  const { user, resume, projects, roadmap, stats } = initialData;

  const chartData = [
    { v: 10 }, { v: 25 }, { v: 45 }, { v: 38 }, { v: 70 }, { v: stats.score }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white p-4 lg:p-8 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- ۱. TOP TERMINAL NAVIGATION --- */}
      <header className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6 px-2 text-center lg:text-left">
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-cyan-400 drop-shadow-[0_0_15px_#00fff2]">
            ZENITH AI CAREER OS
          </h1>
          <p className="text-[7px] md:text-[9px] font-bold text-zinc-500 uppercase tracking-[0.4em] mt-1">Neural Interface v5.2 // Unauthorized access prohibited</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 bg-white/[0.02] border border-white/10 p-2 md:p-2 px-4 md:px-8 rounded-2xl md:rounded-full backdrop-blur-3xl shadow-2xl w-full lg:w-auto">
           <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
             <Search className="w-3 h-3 text-zinc-600" />
             <input placeholder="SCAN SYSTEM..." className="bg-transparent border-none outline-none text-[10px] w-full sm:w-48 font-mono text-cyan-200 placeholder:text-zinc-800" />
           </div>
           <div className="hidden sm:block h-4 w-[1px] bg-white/10" />
           <div className="flex items-center gap-4 justify-between w-full sm:w-auto">
              <Bell className="w-4 h-4 text-zinc-500" />
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                 <div className="text-right">
                    <p className="text-[8px] md:text-[9px] font-black text-cyan-500 uppercase">ACCESS: ELITE</p>
                    <p className="text-[9px] md:text-[10px] font-bold text-white uppercase">{user?.name}</p>
                 </div>
              </div>
           </div>
        </div>
      </header>

      {/* --- ۲. DENSE HUD GRID --- */}
      <div className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {[
            { label: "Career Score", val: stats.score, sub: "Neural Rank", color: "text-cyan-400" },
            { label: "Skills Found", val: stats.skillsCount, sub: "Verified Nodes", color: "text-white" },
            { label: "Vault Projects", val: stats.projectsCount, sub: "Deployed", color: "text-white" },
            { label: "Market Fit", val: stats.matchRate, sub: "Global Match", color: "text-purple-500" },
            { label: "Sync Level", val: "LVL 12", sub: "Senior Architect", color: "text-white" },
          ].map((s, i) => (
            <div key={i} className={cn("hologram-effect p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center text-center group transition-all hover:border-cyan-500/40 bg-white/[0.01]", i === 4 && "col-span-2 sm:col-span-1")}>
              <span className="text-[7px] md:text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">{s.label}</span>
              <span className={cn("text-2xl md:text-4xl font-black italic tracking-tighter", s.color)}>{s.val}</span>
              <span className="text-[6px] md:text-[7px] font-bold text-zinc-700 uppercase mt-2 tracking-[0.2em]">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* MIDDLE SECTION */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
           <div className="hologram-effect rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 flex-1 relative min-h-[350px] md:min-h-[400px]">
              <div className="scan-line-fast" />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
                 <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">Trajectory Mapping</h3>
                 <div className="flex gap-2">
                    {['24H', '7D', '30D'].map(t => (
                      <button key={t} className="text-[7px] md:text-[8px] px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-cyan-500/20 font-black">{t}</button>
                    ))}
                 </div>
              </div>
              <div className="h-48 md:h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                       <defs>
                          <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#00fff2" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#00fff2" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <Area type="monotone" dataKey="v" stroke="#00fff2" strokeWidth={3} fill="url(#colorCyan)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="hologram-effect rounded-2xl md:rounded-3xl p-5 md:p-6 bg-white/[0.01]">
                 <h4 className="text-[8px] md:text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> Skill Recalibration
                 </h4>
                 <div className="space-y-4">
                    {((resume?.content as any)?.improvements || []).slice(0, 3).map((imp: string, i: number) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 group cursor-pointer">
                        <span className="text-[9px] md:text-[10px] font-bold text-zinc-400 group-hover:text-white uppercase truncate pr-2">{imp}</span>
                        <ArrowUpRight className="w-3 h-3 text-cyan-500 shrink-0" />
                      </div>
                    ))}
                 </div>
              </div>
              <div className="hologram-effect rounded-2xl md:rounded-3xl p-5 md:p-6 bg-white/[0.01]">
                 <h4 className="text-[8px] md:text-[9px] font-black text-purple-500 uppercase mb-6 flex items-center gap-2">
                    <Cpu className="w-3 h-3" /> Technical Audit
                 </h4>
                 <div className="space-y-3">
                    {projects.slice(0, 2).map((p: any, i: number) => (
                       <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
                          <span className="text-[9px] md:text-[10px] font-bold text-white uppercase truncate pr-2">{p.name}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* --- ۳. RIGHT SECTION: NEURAL ORACLE --- */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
           <div className="hologram-effect rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden group bg-gradient-to-b from-[#0a0a1a] to-black min-h-[450px] md:min-h-[550px] justify-between">
              <div className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 w-48 md:w-64 h-48 md:h-64 bg-cyan-500/10 blur-[80px] md:blur-[100px] rounded-full animate-pulse pointer-events-none" />
              <div className="relative w-full h-[250px] md:h-[320px] flex items-center justify-center group-hover:scale-105 transition-transform duration-1000 mt-2">
                 <div className="absolute bottom-6 w-32 md:w-48 h-4 bg-cyan-500/20 blur-xl rounded-[100%] animate-pulse" />
                 <img 
                    src="/avatar.png" 
                    className="w-full h-full object-contain"
                    alt="Neural Oracle"
                 />
              </div>
              <div className="relative z-10 w-full">
                <p className="text-[8px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-2">System Analysis</p>
                <p className="text-xs md:text-sm font-medium italic text-zinc-400">"Your neural patterns suggest a high affinity for System Architecture."</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
// import { 
//   Zap, Sparkles, Target, Activity, Cpu, 
//   Search, Bell, Trophy, LayoutGrid, CheckCircle2,
//   ArrowUpRight, Users, Globe, ShieldCheck, Radio
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// export default function DashboardClient({ initialData }: any) {
//   const { user, resume, projects, roadmap, stats } = initialData;

//   const chartData = [
//     { v: 10 }, { v: 25 }, { v: 45 }, { v: 38 }, { v: 70 }, { v: stats.score }
//   ];

//   return (
//     <div className="min-h-screen bg-[#020205] text-white p-4 lg:p-8 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
//       {/* --- ۱. TOP TERMINAL NAVIGATION (بدون تغییر) --- */}
//       <header className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6 px-2">
//         <div className="flex flex-col">
//           <h1 className="text-2xl font-black tracking-tighter uppercase italic text-cyan-400 drop-shadow-[0_0_15px_#00fff2]">
//             ZENITH AI CAREER OS
//           </h1>
//           <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Neural Interface v5.2 // Unauthorized access prohibited</p>
//         </div>

//         <div className="flex items-center gap-6 bg-white/[0.02] border border-white/10 p-2 px-8 rounded-full backdrop-blur-3xl shadow-2xl">
//            <div className="flex items-center gap-3">
//              <Search className="w-3 h-3 text-zinc-600" />
//              <input placeholder="SCAN SYSTEM..." className="bg-transparent border-none outline-none text-[10px] w-48 font-mono text-cyan-200 placeholder:text-zinc-800" />
//            </div>
//            <div className="h-4 w-[1px] bg-white/10" />
//            <div className="flex items-center gap-4">
//               <Bell className="w-4 h-4 text-zinc-500" />
//               <div className="flex items-center gap-3 pl-4 border-l border-white/10">
//                  <div className="text-right">
//                     <p className="text-[9px] font-black text-cyan-500 uppercase">ACCESS: ELITE</p>
//                     <p className="text-[10px] font-bold text-white uppercase">{user?.name}</p>
//                  </div>
//               </div>
//            </div>
//         </div>
//       </header>

//       {/* --- ۲. DENSE HUD GRID (بدون تغییر) --- */}
//       <div className="grid grid-cols-12 gap-4 h-auto mb-6">
//         <div className="col-span-12 grid grid-cols-2 md:grid-cols-5 gap-4">
//           {[
//             { label: "Career Score", val: stats.score, sub: "Neural Rank", color: "text-cyan-400" },
//             { label: "Skills Found", val: stats.skillsCount, sub: "Verified Nodes", color: "text-white" },
//             { label: "Vault Projects", val: stats.projectsCount, sub: "Deployed", color: "text-white" },
//             { label: "Market Fit", val: stats.matchRate, sub: "Global Match", color: "text-purple-500" },
//             { label: "Sync Level", val: "LVL 12", sub: "Senior Architect", color: "text-white" },
//           ].map((s, i) => (
//             <div key={i} className="hologram-effect p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group transition-all hover:border-cyan-500/40 bg-white/[0.01]">
//               <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">{s.label}</span>
//               <span className={cn("text-4xl font-black italic tracking-tighter", s.color)}>{s.val}</span>
//               <span className="text-[7px] font-bold text-zinc-700 uppercase mt-2 tracking-[0.2em]">{s.sub}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-12 gap-4">
//         {/* MIDDLE SECTION (بدون تغییر) */}
//         <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
//            <div className="hologram-effect rounded-[3rem] p-8 flex-1 relative min-h-[400px]">
//               <div className="scan-line-fast" />
//               <div className="flex justify-between items-center mb-10">
//                  <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">Trajectory Mapping</h3>
//                  <div className="flex gap-2">
//                     {['24H', '7D', '30D'].map(t => (
//                       <button key={t} className="text-[8px] px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-cyan-500/20 font-black">{t}</button>
//                     ))}
//                  </div>
//               </div>
//               <div className="h-64 w-full">
//                  <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={chartData}>
//                        <defs>
//                           <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
//                              <stop offset="5%" stopColor="#00fff2" stopOpacity={0.3}/>
//                              <stop offset="95%" stopColor="#00fff2" stopOpacity={0}/>
//                           </linearGradient>
//                        </defs>
//                        <Area type="monotone" dataKey="v" stroke="#00fff2" strokeWidth={3} fill="url(#colorCyan)" />
//                     </AreaChart>
//                  </ResponsiveContainer>
//               </div>
//            </div>

//            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="hologram-effect rounded-3xl p-6 bg-white/[0.01]">
//                  <h4 className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-6 flex items-center gap-2">
//                     <Sparkles className="w-3 h-3" /> Skill Recalibration
//                  </h4>
//                  <div className="space-y-4">
//                     {((resume?.content as any)?.improvements || []).slice(0, 3).map((imp: string, i: number) => (
//                       <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 group cursor-pointer">
//                         <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white uppercase">{imp}</span>
//                         <ArrowUpRight className="w-3 h-3 text-cyan-500" />
//                       </div>
//                     ))}
//                  </div>
//               </div>
//               <div className="hologram-effect rounded-3xl p-6 bg-white/[0.01]">
//                  <h4 className="text-[9px] font-black text-purple-500 uppercase mb-6 flex items-center gap-2">
//                     <Cpu className="w-3 h-3" /> Technical Audit
//                  </h4>
//                  <div className="space-y-3">
//                     {projects.slice(0, 2).map((p: any, i: number) => (
//                        <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
//                           <span className="text-[10px] font-bold text-white uppercase">{p.name}</span>
//                           <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
//                        </div>
//                     ))}
//                  </div>
//               </div>
//            </div>
//         </div>

//         {/* --- ۳. RIGHT SECTION: NEURAL ORACLE (بخش اصلاح شده و متصل) --- */}
//         <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
           
//            <div className="hologram-effect rounded-[3.5rem] p-8 flex flex-col items-center text-center relative overflow-hidden group bg-gradient-to-b from-[#0a0a1a] to-black min-h-[550px] justify-between">
              
//               {/* هاله نوری پشت SVG برای ابهت بیشتر */}
//               <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full animate-pulse pointer-events-none" />

//               {/* کانتینر آواتار - بزرگ و بدون محدودیت دایره‌ای */}
//               <div className="relative w-full h-[320px] flex items-center justify-center group-hover:scale-105 transition-transform duration-1000 mt-2">
//                  {/* افکت لیزری زیر آواتار */}
//                  <div className="absolute bottom-6 w-48 h-4 bg-cyan-500/20 blur-xl rounded-[100%] animate-pulse" />
                 
//                  <img 
//                     src="/avatar.png" // حتماً نام فایل SVG خودت را اینجا بذار
//                     className="w-full h-full object-contain relative z-10 
//                                drop-shadow-[0_0_35px_rgba(34,211,238,0.6)] 
//                                brightness-110 contrast-110" 
//                     alt="Neural Oracle"
//                  />

//                  {/* نشانگر زنده بودن */}
//                  <div className="absolute top-0 right-0 flex items-center gap-2 px-3 py-1 bg-black/50 border border-white/10 rounded-full backdrop-blur-md">
//                     <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
//                     <span className="text-[8px] font-black uppercase text-cyan-400">Live Sync</span>
//                  </div>
//               </div>

//               {/* دیتای متصل هوش مصنوعی */}
//               <div className="relative z-20 w-full space-y-4">
//                  <div>
//                     <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-1">Neural Oracle</h3>
//                     <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.6em]">Core Intelligence Hub</p>
//                  </div>
                 
//                  <div className="bg-white/[0.03] border-l-4 border-l-cyan-400 p-5 rounded-r-2xl mx-2 shadow-inner">
//                     <p className="italic text-zinc-300 text-[11px] leading-relaxed text-left font-medium">
//                        "Commander, node efficiency is stable at {stats.score}%. I suggest initiating a system-wide project sync for optimal trajectory."
//                     </p>
//                  </div>

//                  <button className="w-full py-5 bg-white text-black rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
//                     Initialize Engage
//                  </button>
//               </div>
//            </div>

//            {/* Daily Roadmap (بدون تغییر) */}
//            <div className="hologram-effect rounded-[2.5rem] p-8 bg-white/[0.01] border border-white/5 flex-1 overflow-y-auto custom-scrollbar">
//               <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.6em] mb-8 text-center">Daily Objectives</h4>
//               <div className="space-y-6">
//                  {roadmap?.slice(0, 3).map((step: any, i: number) => (
//                    <div key={i} className="flex gap-4 group cursor-pointer items-start">
//                       <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-black group-hover:bg-purple-600 transition-all shrink-0">0{i+1}</div>
//                       <div className="pt-1">
//                          <p className="text-[12px] font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors leading-tight">{step.title}</p>
//                          <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest mt-1 italic">Authorized</p>
//                       </div>
//                    </div>
//                  ))}
//               </div>
//            </div>
//         </div>

//       </div>
//     </div>
//   );
// }
