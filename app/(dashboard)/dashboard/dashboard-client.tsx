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
      
      {/* --- ۱. TOP TERMINAL NAVIGATION (بدون تغییر) --- */}
      <header className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6 px-2">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-cyan-400 drop-shadow-[0_0_15px_#00fff2]">
            ZENITH AI CAREER OS
          </h1>
          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Neural Interface v5.2 // Unauthorized access prohibited</p>
        </div>

        <div className="flex items-center gap-6 bg-white/[0.02] border border-white/10 p-2 px-8 rounded-full backdrop-blur-3xl shadow-2xl">
           <div className="flex items-center gap-3">
             <Search className="w-3 h-3 text-zinc-600" />
             <input placeholder="SCAN SYSTEM..." className="bg-transparent border-none outline-none text-[10px] w-48 font-mono text-cyan-200 placeholder:text-zinc-800" />
           </div>
           <div className="h-4 w-[1px] bg-white/10" />
           <div className="flex items-center gap-4">
              <Bell className="w-4 h-4 text-zinc-500" />
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                 <div className="text-right">
                    <p className="text-[9px] font-black text-cyan-500 uppercase">ACCESS: ELITE</p>
                    <p className="text-[10px] font-bold text-white uppercase">{user?.name}</p>
                 </div>
              </div>
           </div>
        </div>
      </header>

      {/* --- ۲. DENSE HUD GRID (بدون تغییر) --- */}
      <div className="grid grid-cols-12 gap-4 h-auto mb-6">
        <div className="col-span-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Career Score", val: stats.score, sub: "Neural Rank", color: "text-cyan-400" },
            { label: "Skills Found", val: stats.skillsCount, sub: "Verified Nodes", color: "text-white" },
            { label: "Vault Projects", val: stats.projectsCount, sub: "Deployed", color: "text-white" },
            { label: "Market Fit", val: stats.matchRate, sub: "Global Match", color: "text-purple-500" },
            { label: "Sync Level", val: "LVL 12", sub: "Senior Architect", color: "text-white" },
          ].map((s, i) => (
            <div key={i} className="hologram-effect p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group transition-all hover:border-cyan-500/40 bg-white/[0.01]">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">{s.label}</span>
              <span className={cn("text-4xl font-black italic tracking-tighter", s.color)}>{s.val}</span>
              <span className="text-[7px] font-bold text-zinc-700 uppercase mt-2 tracking-[0.2em]">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* MIDDLE SECTION (بدون تغییر) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
           <div className="hologram-effect rounded-[3rem] p-8 flex-1 relative min-h-[400px]">
              <div className="scan-line-fast" />
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">Trajectory Mapping</h3>
                 <div className="flex gap-2">
                    {['24H', '7D', '30D'].map(t => (
                      <button key={t} className="text-[8px] px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-cyan-500/20 font-black">{t}</button>
                    ))}
                 </div>
              </div>
              <div className="h-64 w-full">
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
              <div className="hologram-effect rounded-3xl p-6 bg-white/[0.01]">
                 <h4 className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> Skill Recalibration
                 </h4>
                 <div className="space-y-4">
                    {((resume?.content as any)?.improvements || []).slice(0, 3).map((imp: string, i: number) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 group cursor-pointer">
                        <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white uppercase">{imp}</span>
                        <ArrowUpRight className="w-3 h-3 text-cyan-500" />
                      </div>
                    ))}
                 </div>
              </div>
              <div className="hologram-effect rounded-3xl p-6 bg-white/[0.01]">
                 <h4 className="text-[9px] font-black text-purple-500 uppercase mb-6 flex items-center gap-2">
                    <Cpu className="w-3 h-3" /> Technical Audit
                 </h4>
                 <div className="space-y-3">
                    {projects.slice(0, 2).map((p: any, i: number) => (
                       <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
                          <span className="text-[10px] font-bold text-white uppercase">{p.name}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* --- ۳. RIGHT SECTION: NEURAL ORACLE (بخش اصلاح شده و متصل) --- */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
           
           <div className="hologram-effect rounded-[3.5rem] p-8 flex flex-col items-center text-center relative overflow-hidden group bg-gradient-to-b from-[#0a0a1a] to-black min-h-[550px] justify-between">
              
              {/* هاله نوری پشت SVG برای ابهت بیشتر */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full animate-pulse pointer-events-none" />

              {/* کانتینر آواتار - بزرگ و بدون محدودیت دایره‌ای */}
              <div className="relative w-full h-[320px] flex items-center justify-center group-hover:scale-105 transition-transform duration-1000 mt-2">
                 {/* افکت لیزری زیر آواتار */}
                 <div className="absolute bottom-6 w-48 h-4 bg-cyan-500/20 blur-xl rounded-[100%] animate-pulse" />
                 
                 <img 
                    src="/avatar.png" // حتماً نام فایل SVG خودت را اینجا بذار
                    className="w-full h-full object-contain relative z-10 
                               drop-shadow-[0_0_35px_rgba(34,211,238,0.6)] 
                               brightness-110 contrast-110" 
                    alt="Neural Oracle"
                 />

                 {/* نشانگر زنده بودن */}
                 <div className="absolute top-0 right-0 flex items-center gap-2 px-3 py-1 bg-black/50 border border-white/10 rounded-full backdrop-blur-md">
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span className="text-[8px] font-black uppercase text-cyan-400">Live Sync</span>
                 </div>
              </div>

              {/* دیتای متصل هوش مصنوعی */}
              <div className="relative z-20 w-full space-y-4">
                 <div>
                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-1">Neural Oracle</h3>
                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.6em]">Core Intelligence Hub</p>
                 </div>
                 
                 <div className="bg-white/[0.03] border-l-4 border-l-cyan-400 p-5 rounded-r-2xl mx-2 shadow-inner">
                    <p className="italic text-zinc-300 text-[11px] leading-relaxed text-left font-medium">
                       "Commander, node efficiency is stable at {stats.score}%. I suggest initiating a system-wide project sync for optimal trajectory."
                    </p>
                 </div>

                 <button className="w-full py-5 bg-white text-black rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                    Initialize Engage
                 </button>
              </div>
           </div>

           {/* Daily Roadmap (بدون تغییر) */}
           <div className="hologram-effect rounded-[2.5rem] p-8 bg-white/[0.01] border border-white/5 flex-1 overflow-y-auto custom-scrollbar">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.6em] mb-8 text-center">Daily Objectives</h4>
              <div className="space-y-6">
                 {roadmap?.slice(0, 3).map((step: any, i: number) => (
                   <div key={i} className="flex gap-4 group cursor-pointer items-start">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-black group-hover:bg-purple-600 transition-all shrink-0">0{i+1}</div>
                      <div className="pt-1">
                         <p className="text-[12px] font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors leading-tight">{step.title}</p>
                         <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest mt-1 italic">Authorized</p>
                      </div>
                   </div>
                 ))}
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
//   Search, Bell, CheckCircle2, ArrowUpRight, 
//   Fingerprint, Radio, Orbit 
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// export default function DashboardClient({ initialData }: any) {
//   const { user, resume, projects, roadmap, stats } = initialData;

//   const chartData = (resume?.content as any)?.aiFeedbackHistory || [
//     { v: 10 }, { v: 25 }, { v: 45 }, { v: 38 }, { v: 70 }, { v: stats.score }
//   ];

//   return (
//     <div className="min-h-screen bg-[#000] text-white p-3 md:p-6 lg:p-8 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative flex flex-col gap-4">
      
//       {/* --- ۱. HEADER HUD (Responsive & Bold) --- */}
//       <header className="flex flex-col md:flex-row justify-between items-center gap-6 px-2 shrink-0">
//         <div className="flex items-center gap-5 w-full md:w-auto justify-center md:justify-start">
//           <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,242,0.5)]">
//             ZENITH<span className="text-white">.OS</span>
//           </h1>
//           <div className="hidden md:block h-6 w-[1px] bg-white/10" />
//           <p className="hidden md:block text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">{user?.name} // ALPHA_LINK</p>
//         </div>

//         <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 p-2 px-6 rounded-full backdrop-blur-3xl w-full md:w-auto shadow-2xl">
//            <Search className="w-4 h-4 text-zinc-600 shrink-0" />
//            <input placeholder="SCAN..." className="bg-transparent border-none outline-none text-[11px] flex-1 md:w-32 font-bold uppercase tracking-widest text-white" />
//            <div className="h-4 w-[1px] bg-white/10 mx-2" />
//            <div className="relative cursor-pointer">
//               <Bell className="w-5 h-5 text-zinc-500" />
//               <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full border-2 border-black" />
//            </div>
//            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] shrink-0">
//               <img src={user?.image || "https://pravatar.cc"} className="w-full h-full object-cover rounded-[9px] grayscale" />
//            </div>
//         </div>
//       </header>

//       {/* --- ۲. STATS MATRIX (درشت برای زوم ۷۵٪) --- */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 h-auto shrink-0">
//         {[
//           { label: "RANK", val: stats.score, color: "text-cyan-400" },
//           { label: "NODES", val: stats.skillsCount, color: "text-white" },
//           { label: "VAULT", val: stats.projectsCount, color: "text-white" },
//           { label: "MATCH", val: `${stats.matchRate}%`, color: "text-purple-500" },
//           { label: "SYNC", val: "L12", color: "text-white" },
//         ].map((s, i) => (
//           <div key={i} className="hologram-effect p-4 md:p-6 rounded-[2rem] flex flex-col items-center justify-center text-center border border-white/5 bg-white/[0.01] hover:border-cyan-500/30 transition-all">
//             <span className="text-[8px] md:text-[10px] font-black text-zinc-600 uppercase mb-2 tracking-[0.3em]">{s.label}</span>
//             <span className={cn("text-4xl md:text-5xl font-black italic leading-none tracking-tighter", s.color)}>{s.val}</span>
//           </div>
//         ))}
//       </div>

//       {/* --- ۳. CORE GRID (Balanced Density) --- */}
//       <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 overflow-visible md:overflow-hidden min-h-0">
        
//         {/* CENTER: CHART & WIDGETS */}
//         <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6 h-full min-h-0">
//            {/* Trajectory Canvas */}
//            <div className="hologram-effect rounded-[3rem] p-6 md:p-8 flex-1 relative overflow-hidden flex flex-col border border-white/5 bg-black/40 min-h-[350px]">
//               <div className="scan-line-fast opacity-5" />
//               <div className="flex justify-between items-center mb-6 shrink-0 relative z-10">
//                  <div className="flex items-center gap-3">
//                     <Activity className="text-cyan-400 w-5 h-5 animate-pulse" />
//                     <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.5em] text-cyan-400 italic">Neural Trajectory</h3>
//                  </div>
//                  <div className="flex gap-2 no-print">
//                     {['7D', '30D'].map(t => (
//                       <button key={t} className="text-[9px] px-4 py-1.5 bg-white/5 border border-white/10 rounded-full font-black uppercase hover:bg-white hover:text-black transition-all">{t}</button>
//                     ))}
//                  </div>
//               </div>
//               <div className="flex-1 w-full min-h-0 relative z-10">
//                  <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                        <defs>
//                           <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
//                              <stop offset="5%" stopColor="#00fff2" stopOpacity={0.3}/>
//                              <stop offset="95%" stopColor="#00fff2" stopOpacity={0}/>
//                           </linearGradient>
//                        </defs>
//                        <Area type="monotone" dataKey="v" stroke="#00fff2" strokeWidth={4} fill="url(#colorCyan)" />
//                     </AreaChart>
//                  </ResponsiveContainer>
//               </div>
//            </div>

//            {/* Mobile-Friendly Widgets */}
//            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto md:h-48 shrink-0">
//               <div className="hologram-effect rounded-[2.5rem] p-6 bg-white/[0.01] border border-white/5 overflow-hidden flex flex-col">
//                  <h4 className="text-[10px] font-black text-cyan-500 uppercase mb-4 flex items-center gap-3">
//                     <Sparkles size={16}/> Recalibration
//                  </h4>
//                  <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1 pr-2">
//                     {((resume?.content as any)?.improvements || ["Node Sync", "AI Logic"]).slice(0, 3).map((imp: string, i: number) => (
//                       <div key={i} className="flex justify-between items-center text-[11px] font-bold text-zinc-500 border-b border-white/5 pb-2 hover:text-white transition-colors">
//                         <span className="uppercase truncate pr-4">{imp}</span>
//                         <ArrowUpRight className="w-4 h-4 text-cyan-500 shrink-0" />
//                       </div>
//                     ))}
//                  </div>
//               </div>
//               <div className="hologram-effect rounded-[2.5rem] p-6 bg-white/[0.01] border border-white/5">
//                  <h4 className="text-[10px] font-black text-purple-500 uppercase mb-4 flex items-center gap-3">
//                     <Cpu size={16}/> Technical Audit
//                  </h4>
//                  <div className="space-y-2">
//                     {projects.slice(0, 2).map((p: any, i: number) => (
//                        <div key={i} className="flex items-center justify-between bg-black border border-white/10 p-3 rounded-2xl">
//                           <span className="text-[11px] font-black text-white uppercase truncate pr-4">{p.name}</span>
//                           <CheckCircle2 className="w-4 h-4 text-emerald-500 drop-shadow-[0_0_8px_#10b981]" />
//                        </div>
//                     ))}
//                  </div>
//               </div>
//            </div>
//         </div>

//         {/* RIGHT: MENTOR & ROADMAP (SVG Ready) */}
//         <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6 h-full min-h-0">
           
//            {/* Oracle Section (Special SVG Container) */}
//           {/* --- بخش مربی هوشمند (Oracle Section) --- */}
// <div className="hologram-effect rounded-[3rem] p-6 flex flex-col items-center justify-between text-center relative flex-[2] border border-white/5 overflow-hidden bg-gradient-to-b from-[#0a0a1a] to-black group">
  
//   {/* هاله نوری پشت آواتار برای عمق دادن به SVG */}
//   <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full animate-pulse pointer-events-none" />

//   {/* صحنه نمایش آواتار (Stage) */}
//   <div className="relative w-full h-[350px] mt-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-1000">
//     {/* افکت اسکنر لیزری زیر پا */}
//     <div className="absolute bottom-10 w-40 h-4 bg-cyan-500/20 blur-xl rounded-[100%] animate-pulse" />
    
//     <img 
//       src="/avatar.png" 
//       className="w-full h-full object-contain relative z-10 
//                  drop-shadow-[0_0_30px_rgba(147,51,234,0.5)] 
//                  brightness-110 contrast-110" 
//       alt="Neural Oracle"
//     />

//     {/* نشانگر وضعیت زنده */}
//     <div className="absolute top-10 right-10 flex items-center gap-2 px-3 py-1 bg-black/50 border border-white/10 rounded-full backdrop-blur-md z-20">
//        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
//        <span className="text-[8px] font-black uppercase tracking-widest text-cyan-400">Live Sync</span>
//     </div>
//   </div>

//   {/* جزئیات متنی - متراکم و شیک */}
//   <div className="relative z-20 w-full space-y-4 pb-4">
//     <div>
//       <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-1">Neural Oracle</h3>
//       <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.6em]">Core Intelligence Hub</p>
//     </div>
    
//     <div className="bg-white/[0.03] border-l-4 border-l-purple-600 p-4 rounded-r-2xl mx-2 shadow-inner">
//        <p className="italic text-zinc-300 text-[11px] leading-relaxed text-left font-medium">
//           "Commander, system readiness is at {stats.score}%. I suggest initiating a system-wide project synchronization for optimal trajectory."
//        </p>
//     </div>

//     <button className="w-full py-5 bg-white text-black rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
//        Initiate Engage
//     </button>
//   </div>
// </div>

//            {/* Daily Roadmap (Scrollable on Mobile) */}
//            <div className="hologram-effect rounded-[2.5rem] p-8 bg-white/[0.01] border border-white/5 flex-1 min-h-[250px] md:min-h-0 overflow-y-auto custom-scrollbar">
//               <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.6em] mb-8 text-center">Daily Objectives</h4>
//               <div className="space-y-6">
//                  {roadmap.slice(0, 4).map((step: any, i: number) => (
//                    <div key={i} className="flex gap-5 items-start group">
//                       <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-black group-hover:bg-purple-600 transition-all shadow-inner shrink-0 text-zinc-400 group-hover:text-white">0{i+1}</div>
//                       <div className="pt-1">
//                          <p className="text-[13px] font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors leading-tight">{step.title}</p>
//                          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Authorized Protocol</p>
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


// "use client";

// import { motion } from "framer-motion";
// import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
// import { 
//   Zap, Sparkles, Target, Activity, Cpu, 
//   Search, Bell, CheckCircle2, ArrowUpRight, 
//   Fingerprint, Radio, Orbit, Globe
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// export default function DashboardClient({ initialData }: any) {
//   const { user, resume, projects, roadmap, stats } = initialData;

//   // استخراج تاریخچه بازخورد از محتوای رزومه برای چارت
//   const chartData = (resume?.content as any)?.aiFeedbackHistory || [
//     { name: 'Initial', score: 20 },
//     { name: 'Sync 1', score: 45 },
//     { name: 'Sync 2', score: stats.score - 10 },
//     { name: 'Current', score: stats.score }
//   ];

//   return (
//     <div className="min-h-screen bg-[#020205] text-white p-4 lg:p-10 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
//       {/* --- ۱. TOP TERMINAL HUD (بزرگ و مقتدر) --- */}
//       <header className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-8 px-2">
//         <div className="flex flex-col">
//           <h1 className="text-5xl font-black tracking-tighter uppercase italic text-cyan-400 drop-shadow-[0_0_25px_rgba(0,255,242,0.5)]">
//             ZENITH<span className="text-white">.OS</span>
//           </h1>
//           <p className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.6em] mt-2 italic">Neural Interface v5.2 // Authorized: {user?.name}</p>
//         </div>

//         <div className="flex items-center gap-8 bg-white/[0.03] border border-white/10 p-3 px-10 rounded-full backdrop-blur-3xl shadow-2xl group hover:border-cyan-500/30 transition-all">
//            <div className="flex items-center gap-4">
//              <Search className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
//              <input placeholder="SCAN SYSTEM NODES..." className="bg-transparent border-none outline-none text-xs w-64 font-bold uppercase tracking-widest text-cyan-100 placeholder:text-zinc-800" />
//            </div>
//            <div className="h-6 w-[1px] bg-white/10" />
//            <div className="flex items-center gap-6">
//               <div className="relative">
//                  <Bell className="w-6 h-6 text-zinc-500 hover:text-white transition-colors cursor-pointer" />
//                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-500 rounded-full border-2 border-[#020205] animate-pulse" />
//               </div>
//               <div className="flex items-center gap-5 pl-6 border-l border-white/10">
//                  <div className="text-right hidden md:block">
//                     <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">ACCESS: ELITE</p>
//                     <p className="text-sm font-black text-white uppercase italic">{user?.name}</p>
//                  </div>
//                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
//                     <div className="w-full h-full bg-black rounded-[15px] overflow-hidden">
//                        <img src={user?.image || "https://pravatar.cc"} className="w-full h-full object-cover grayscale brightness-125" />
//                     </div>
//                  </div>
//               </div>
//            </div>
//         </div>
//       </header>

//       {/* --- ۲. DENSE HUD GRID (Bento Architecture) --- */}
//       <div className="grid grid-cols-12 gap-6 h-auto">
        
//         {/* STATS CARDS: با فونت‌های درشت و خیره‌کننده */}
//         <div className="col-span-12 grid grid-cols-1 md:grid-cols-5 gap-6">
//           {[
//             { label: "Career Score", val: stats.score, sub: "Neural Rank", color: "text-cyan-400" },
//             { label: "Verified Nodes", val: stats.skillsCount, sub: "Market Ready", color: "text-white" },
//             { label: "Vault Assets", val: stats.projectsCount, sub: "Live Repos", color: "text-white" },
//             { label: "Global Match", val: stats.matchRate, sub: "FAANG Index", color: "text-purple-500" },
//             { label: "Sync Level", val: "L12", sub: "Architect", color: "text-white" },
//           ].map((s, i) => (
//             <motion.div 
//               whileHover={{ scale: 1.03, borderColor: 'rgba(0,255,242,0.3)' }}
//               key={i} className="hologram-effect p-8 rounded-[3rem] flex flex-col items-center justify-center text-center transition-all shadow-xl bg-white/[0.01]"
//             >
//               <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] mb-4">{s.label}</span>
//               <span className={cn("text-7xl font-black tracking-tighter italic", s.color)}>{s.val}</span>
//               <span className="text-[9px] font-bold text-zinc-500 uppercase mt-4 tracking-[0.4em]">{s.sub}</span>
//             </motion.div>
//           ))}
//         </div>

//         {/* MIDDLE SECTION: چارت بازخورد هوش مصنوعی */}
//         <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
//            <div className="hologram-effect rounded-[4rem] p-10 relative min-h-[500px] overflow-hidden group">
//               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
//                  <Orbit className="w-64 h-64 text-cyan-400" />
//               </div>
//               <div className="scan-line-fast opacity-10" />
              
//               <div className="flex justify-between items-start mb-16 relative z-10">
//                  <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping shadow-[0_0_15px_#00fff2]" />
//                        <h3 className="text-lg font-black uppercase tracking-[0.6em] text-cyan-400 italic">Neural Trajectory Mapping</h3>
//                     </div>
//                     <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest opacity-60">Synchronizing AI Feedback History...</p>
//                  </div>
//                  <div className="flex gap-4">
//                     {['24H', '7D', 'ALL NODES'].map(t => (
//                       <button key={t} className="text-[10px] px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all font-black uppercase tracking-[0.2em]">{t}</button>
//                     ))}
//                  </div>
//               </div>

//               <div className="h-80 w-full relative z-10">
//                  <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={chartData}>
//                        <defs>
//                           <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
//                              <stop offset="5%" stopColor="#00fff2" stopOpacity={0.4}/>
//                              <stop offset="95%" stopColor="#00fff2" stopOpacity={0}/>
//                           </linearGradient>
//                        </defs>
//                        <Area type="monotone" dataKey="score" stroke="#00fff2" strokeWidth={5} fill="url(#colorCyan)" animationDuration={3000} />
//                     </AreaChart>
//                  </ResponsiveContainer>
//               </div>
//            </div>

//            {/* WIDGETS: Skill Recalibration & Technical Audit */}
//            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="hologram-effect rounded-[3.5rem] p-10 bg-white/[0.01] group hover:border-cyan-500/20 transition-all">
//                  <div className="flex items-center gap-5 mb-10">
//                     <div className="w-14 h-14 rounded-3xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
//                        <Sparkles className="w-7 h-7 text-cyan-400" />
//                     </div>
//                     <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">Skill Recalibration</h4>
//                  </div>
//                  <div className="space-y-6">
//                     {((resume?.content as any)?.improvements || ["Microservices Scale", "AI Logic Orchestration"]).slice(0, 3).map((imp: string, i: number) => (
//                       <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3 group/item cursor-pointer">
//                         <span className="text-sm font-bold text-zinc-400 group-hover/item:text-white transition-colors uppercase tracking-tight">{imp}</span>
//                         <ArrowUpRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover/item:opacity-100 transition-all" />
//                       </div>
//                     ))}
//                  </div>
//               </div>

//               <div className="hologram-effect rounded-[3.5rem] p-10 bg-white/[0.01] group hover:border-purple-500/20 transition-all">
//                  <div className="flex items-center gap-5 mb-10">
//                     <div className="w-14 h-14 rounded-3xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
//                        <Cpu className="w-7 h-7 text-purple-400" />
//                     </div>
//                     <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">Technical Audit</h4>
//                  </div>
//                  <div className="space-y-4">
//                     {projects.slice(0, 3).map((p: any, i: number) => (
//                        <div key={i} className="p-4 bg-black border border-white/5 rounded-2xl flex items-center justify-between group/p hover:border-cyan-400/30 transition-all">
//                           <div className="flex items-center gap-4">
//                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
//                              <span className="text-xs font-black text-white uppercase">{p.name}</span>
//                           </div>
//                           <span className="text-[10px] font-black text-zinc-600 group-hover/p:text-cyan-400 transition-colors tracking-widest uppercase">Verified</span>
//                        </div>
//                     ))}
//                  </div>
//               </div>
//            </div>
//         </div>

//         {/* --- ۳. RIGHT SECTION: AI Mentor & Roadmap --- */}
//         <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
           
//            <div className="hologram-effect rounded-[4rem] p-12 flex flex-col items-center text-center relative overflow-hidden group shadow-2xl">
//               <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
//               <div className="w-60 h-60 relative mb-10">
//                  <div className="absolute inset-0 bg-cyan-400/20 blur-[80px] rounded-full animate-pulse" />
//                  <img src="/ai-avatar.png" className="w-full h-full object-cover rounded-full border-4 border-white/10 grayscale brightness-125" />
//                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-3xl flex items-center justify-center shadow-[0_0_30px_#fff]">
//                     <Radio className="w-6 h-6 text-black animate-pulse" />
//                  </div>
//               </div>
//               <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">Neural Mentor</h3>
//               <p className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.7em] mt-4 mb-12">Analysis Protocol: Active</p>
              
//               <div className="bg-[#08080c] border-l-4 border-l-cyan-400 p-8 rounded-r-[2.5rem] mb-12 text-left italic font-medium text-zinc-300 text-base leading-relaxed">
//                  "Commander, your technical nodes are performing at {stats.score}% efficiency. I recommend deploying the next system project to hit FAANG benchmarks."
//               </div>

//               <button className="w-full py-7 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.5em] hover:bg-cyan-400 transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)] active:scale-95">
//                  Initiate Oracle
//               </button>
//            </div>

//            {/* Today's Roadmap (بزرگ و خوانا) */}
//            <div className="hologram-effect rounded-[3.5rem] p-12 bg-white/[0.01]">
//               <h4 className="text-xs font-black text-zinc-500 uppercase tracking-[0.6em] mb-12 text-center flex items-center justify-center gap-4">
//                  <Activity size={20} className="text-cyan-400" /> Operational Objectives
//               </h4>
//               <div className="space-y-12">
//                  {roadmap.slice(0, 3).map((step: any, i: number) => (
//                    <div key={i} className="flex gap-8 group cursor-pointer items-start">
//                       <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-lg font-black group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-all shadow-inner shrink-0">0{i+1}</div>
//                       <div className="pt-2">
//                          <p className="text-base font-black text-white uppercase tracking-tighter group-hover:text-cyan-400 transition-colors leading-tight">{step.title}</p>
//                          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-2 italic">Status: Synchronized</p>
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



// "use client";

// import { motion } from "framer-motion";
// import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
// import { 
//   Zap, Sparkles, Target, Activity, Cpu, 
//   Search, Bell, Trophy, LayoutGrid, CheckCircle2,
//   ArrowUpRight, Users, Globe, ShieldCheck
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// export default function DashboardClient({ initialData }: any) {
//   const { user, resume, projects, roadmap, stats } = initialData;

//   // داده‌های نمودار برای نمایش زنده روند پیشرفت
//   const chartData = [
//     { v: 10 }, { v: 25 }, { v: 45 }, { v: 38 }, { v: 70 }, { v: stats.score }
//   ];

//   return (
//     <div className="min-h-screen bg-[#020205] text-white p-4 lg:p-8 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
//       {/* --- ۱. TOP TERMINAL NAVIGATION --- */}
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

//       {/* --- ۲. DENSE HUD GRID (Bento 5.0) --- */}
//       <div className="grid grid-cols-12 gap-4 h-auto">
        
//         {/* STATS ROW: متراکم و هولوگرافیک */}
//         <div className="col-span-12 grid grid-cols-2 md:grid-cols-5 gap-4">
//           {[
//             { label: "Career Score", val: stats.score, sub: "Neural Rank", color: "text-cyan-400" },
//             { label: "Skills Found", val: stats.skillsCount, sub: "Verified Nodes", color: "text-white" },
//             { label: "Vault Projects", val: stats.projectsCount, sub: "Deployed", color: "text-white" },
//             { label: "Market Fit", val: stats.matchRate, sub: "Global Match", color: "text-purple-500" },
//             { label: "Sync Level", val: "LVL 12", sub: "Senior Architect", color: "text-white" },
//           ].map((s, i) => (
//             <div key={i} className="hologram-effect p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group transition-all hover:border-cyan-500/40">
//               <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">{s.label}</span>
//               <span className={cn("text-4xl font-black italic tracking-tighter", s.color)}>{s.val}</span>
//               <span className="text-[7px] font-bold text-zinc-700 uppercase mt-2 tracking-[0.2em]">{s.sub}</span>
//             </div>
//           ))}
//         </div>

//         {/* MIDDLE SECTION: Graph & Neural Core */}
//         <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
//            {/* نمودار روند پیشرفت واقعی */}
//            <div className="hologram-effect rounded-[3rem] p-8 flex-1 relative min-h-[400px]">
//               <div className="scan-line-fast" />
//               <div className="flex justify-between items-center mb-10">
//                  <div className="space-y-1">
//                     <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">Trajectory Mapping</h3>
//                     <p className="text-[8px] text-zinc-600 font-bold uppercase">Real-time data synchronization from neural core</p>
//                  </div>
//                  <div className="flex gap-2">
//                     {['24H', '7D', '30D'].map(t => (
//                       <button key={t} className="text-[8px] px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-cyan-500/20 transition-all font-black">{t}</button>
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

//            {/* بخش توصیه‌های هوشمند واقعی */}
//            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="hologram-effect rounded-3xl p-6">
//                  <h4 className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-6 flex items-center gap-2">
//                     <Sparkles className="w-3 h-3" /> Skill Recalibration
//                  </h4>
//                  <div className="space-y-4">
//                     {(resume?.content as any)?.improvements?.slice(0, 3).map((imp: string, i: number) => (
//                       <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 group cursor-pointer">
//                         <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white transition-colors">{imp}</span>
//                         <ArrowUpRight className="w-3 h-3 text-cyan-500" />
//                       </div>
//                     ))}
//                  </div>
//               </div>
//               <div className="hologram-effect rounded-3xl p-6">
//                  <h4 className="text-[9px] font-black text-purple-500 uppercase tracking-widest mb-6 flex items-center gap-2">
//                     <Cpu className="w-3 h-3" /> Technical Audit
//                  </h4>
//                  <div className="space-y-3">
//                     {projects.slice(0, 2).map((p: any, i: number) => (
//                        <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
//                              <span className="text-[10px] font-bold text-white uppercase">{p.name}</span>
//                           </div>
//                           <span className="text-[9px] font-black text-zinc-600">AUDIT: OK</span>
//                        </div>
//                     ))}
//                  </div>
//               </div>
//            </div>
//         </div>

//         {/* RIGHT SECTION: AI Mentor & Today's Roadmap */}
//         <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
           
//            {/* AI Mentor Hologram */}
//            <div className="hologram-effect rounded-[3rem] p-8 flex flex-col items-center text-center relative overflow-hidden group">
//               <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
//               <div className="w-52 h-44 relative mb-6">
//                  <div className="absolute inset-0 bg-cyan-400/20 blur-[50px] rounded-full animate-pulse" />
//                  <img src="/avatar.png" className="w-full h-full object-contain relative z-10 opacity-70 group-hover:opacity-100 transition-all duration-700" alt="AI Mentor" />
//                  <div className="scan-line-fast" />
//               </div>
//               <h4 className="text-sm font-black text-cyan-400 uppercase italic tracking-[0.2em]">AI Mentor Online</h4>
//               <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed uppercase font-medium px-4">
//                 "{resume ? `Commander, your ${stats.projectsCount} projects are verified. Focus on the ML roadmap to reach 98% market fit.` : "Initialize neural link to receive career intelligence."}"
//               </p>
//               <button className="mt-8 w-full py-4 bg-cyan-400/5 border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-cyan-400 hover:text-black transition-all rounded-xl">
//                  Initialize Full Sync
//               </button>
//            </div>

//            {/* Today's Mission (Real Roadmap Steps) */}
//            <div className="hologram-effect rounded-[3rem] p-8 flex-1">
//               <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
//                  <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
//                     <Trophy className="w-4 h-4 text-amber-500" /> System Mission
//                  </h4>
//                  <span className="text-[8px] font-bold text-zinc-600">Active Phases</span>
//               </div>
//               <div className="space-y-6">
//                  {roadmap.slice(0, 4).map((step: any, i: number) => (
//                     <div key={i} className="space-y-2 group cursor-pointer">
//                        <div className="flex justify-between items-center">
//                           <span className="text-[10px] font-bold text-zinc-300 uppercase transition-colors group-hover:text-cyan-400">{step.title}</span>
//                           <span className="text-[8px] font-black text-zinc-700 uppercase">Step 0{i+1}</span>
//                        </div>
//                        <div className="h-[1px] w-full bg-white/5 rounded-full overflow-hidden">
//                           <motion.div initial={{ width: 0 }} animate={{ width: i === 0 ? '100%' : '20%' }} className="h-full bg-cyan-500 shadow-[0_0_10px_#00fff2]" />
//                        </div>
//                     </div>
//                  ))}
//                  {roadmap.length === 0 && <p className="text-[9px] text-zinc-800 italic text-center uppercase mt-10">Waiting for identity data...</p>}
//               </div>
//            </div>

//         </div>

//       </div>
//     </div>
//   );
// }


// "use client";

// import { motion } from "framer-motion";
// import { 
//   Zap, Sparkles, Target, Activity, Cpu, 
//   Search, Bell, Trophy, LayoutGrid, CheckCircle2,
//   MessageSquare, Settings, Compass, Users, ArrowUpRight
// } from "lucide-react";
// import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
// import { cn } from "@/lib/utils";

// export default function DashboardClient({ initialData }: any) {
//   const { user, resume, projects, roadmap, stats } = initialData;

//   return (
//     <div className="min-h-screen bg-[#020205] text-white p-4 font-sans overflow-hidden">
//       <div className="flex h-full gap-4 max-w-[1800px] mx-auto">
        
//         {/* --- SIDE NAVIGATION: ULTRA-SLIM HUD --- */}
//         <aside className="hidden lg:flex w-24 flex-col items-center py-10 gap-10 bg-black/20 border border-white/5 rounded-[3rem] backdrop-blur-3xl">
//           <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(147,51,234,0.4)]">
//             <Zap className="w-6 h-6 fill-white" />
//           </div>
//           <nav className="flex flex-col gap-8 mt-10">
//             {[LayoutGrid, MessageSquare, Compass, Cpu, Target, Settings].map((Icon, i) => (
//               <Icon key={i} className={cn("w-6 h-6 cursor-pointer transition-all hover:text-purple-400", i === 0 ? "text-purple-500" : "text-zinc-700")} />
//             ))}
//           </nav>
//         </aside>

//         {/* --- MAIN INTERFACE --- */}
//         <main className="flex-1 space-y-6 overflow-y-auto custom-scrollbar">
          
//           {/* HEADER HUD */}
//           <header className="flex justify-between items-center px-4">
//             <div className="space-y-1">
//               <h1 className="text-3xl font-black tracking-tighter uppercase italic">Good Evening, {user?.name?.split(' ')[0]}</h1>
//               <p className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em]">Neural Connection: Optimal</p>
//             </div>
//             <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 p-3 px-8 rounded-full">
//                <Search className="w-4 h-4 text-zinc-500" />
//                <div className="h-4 w-[1px] bg-white/10" />
//                <Bell className="w-4 h-4 text-zinc-500" />
//                <div className="flex items-center gap-4 pl-4 border-l border-white/10">
//                   <div className="text-right">
//                     <p className="text-[10px] font-black text-purple-500 uppercase">Premium Elite</p>
//                     <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">ID: {user?.id?.slice(0, 8)}</p>
//                   </div>
//                   <img src={user?.image || "https://dicebear.com"} className="w-10 h-10 rounded-xl border border-purple-500/30" />
//                </div>
//             </div>
//           </header>

//           {/* DYNAMIC STATS ROW */}
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-2">
//             {[
//               { label: "Career Score", val: stats.score, sub: "Neural Rank", color: "text-purple-500" },
//               { label: "Skills Mastered", val: stats.skillsCount, sub: "Verified", color: "text-white" },
//               { label: "Vault Projects", val: stats.projectsCount, sub: "Active", color: "text-white" },
//               { label: "Market Match", val: stats.matchRate, sub: "Global", color: "text-cyan-400" },
//               { label: "XP Points", val: "12.4k", sub: "Level 12", color: "text-white" },
//             ].map((s, i) => (
//               <div key={i} className="hologram-effect p-6 rounded-[2rem] flex flex-col items-center justify-center text-center">
//                 <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">{s.label}</span>
//                 <span className={cn("text-4xl font-black italic tracking-tighter", s.color)}>{s.val}</span>
//                 <span className="text-[8px] font-bold text-zinc-700 uppercase mt-1 tracking-widest">{s.sub}</span>
//               </div>
//             ))}
//           </div>

//           {/* MAIN GRID: GRAPH & MENTOR */}
//           <div className="grid grid-cols-12 gap-6 h-auto lg:h-[450px] px-2">
            
//             {/* Career Progress Area (Zنده با ری‌چارتس) */}
//             <div className="col-span-12 lg:col-span-8 hologram-effect rounded-[3rem] p-10 relative group">
//               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><Activity className="w-40 h-40" /></div>
//               <div className="flex justify-between items-center mb-10">
//                 <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-500">Career Trajectory Mapping</h3>
//                 <div className="flex gap-2">
//                    {['Week', 'Month', 'Year'].map(t => <button key={t} className="text-[9px] px-4 py-1.5 bg-white/5 border border-white/10 rounded-full font-bold uppercase">{t}</button>)}
//                 </div>
//               </div>
//               <div className="h-64 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={[{v:30}, {v:50}, {v:45}, {v:80}, {v:stats.score}]}>
//                     <Area type="monotone" dataKey="v" stroke="#9333ea" strokeWidth={4} fill="url(#colorV)" />
//                     <defs>
//                       <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
//                         <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
//                       </linearGradient>
//                     </defs>
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* AI MENTOR: هولوگرام زنده */}
//             <div className="col-span-12 lg:col-span-4 hologram-effect rounded-[3rem] p-8 flex flex-col items-center text-center overflow-hidden">
//                <div className="w-40 h-40 relative mb-6">
//                   <div className="absolute inset-0 bg-cyan-400/10 blur-[50px] rounded-full animate-pulse" />
//                   <div className="scan-line-fast" />
//                   <img src="/ai-avatar.png" className="w-full h-full object-contain relative z-10 opacity-60" />
//                </div>
//                <h4 className="text-xl font-black text-cyan-400 uppercase italic tracking-tighter">AI Mentor</h4>
//                <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed uppercase font-medium italic px-6">
//                   "{resume ? `Commander, I've analyzed your ${projects.length} projects. You're ready for the Global Sync.` : "Initializing neural link... Please upload your DNA (Resume) to begin."}"
//                </p>
//                <button className="mt-8 w-full py-4 bg-cyan-400/5 border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-cyan-400 hover:text-black transition-all">
//                   Initialize Chat
//                </button>
//             </div>
//           </div>

//           {/* BOTTOM HUD: RECOMMENDATIONS & TODAY'S PLAN */}
//           <div className="grid grid-cols-12 gap-6 px-2">
            
//             {/* Recommendations (واقعی بر اساس رزومه) */}
//             <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//                <div className="hologram-effect rounded-[2.5rem] p-8">
//                   <h5 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.5em] mb-6">Skill Optimization</h5>
//                   <div className="space-y-4">
//                     {(resume?.content as any)?.improvements?.slice(0, 3).map((imp: string, i: number) => (
//                       <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 group cursor-pointer">
//                         <span className="text-[11px] font-bold text-zinc-400 group-hover:text-white">{imp}</span>
//                         <ArrowUpRight className="w-3 h-3 text-purple-500" />
//                       </div>
//                     ))}
//                   </div>
//                </div>
//                <div className="hologram-effect rounded-[2.5rem] p-8">
//                   <h5 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.5em] mb-6">Market Opportunities</h5>
//                   <div className="space-y-4">
//                     {projects.slice(0, 2).map((p: any, i: number) => (
//                       <div key={i} className="flex items-center gap-4 p-3 bg-white/[0.02] rounded-2xl border border-white/5">
//                         <Cpu className="w-5 h-5 text-cyan-500" />
//                         <div>
//                           <p className="text-[11px] font-bold">{p.name}</p>
//                           <p className="text-[9px] text-zinc-500 uppercase">Analysis: Complete</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                </div>
//             </div>

//             {/* TODAY'S PLAN: متصل به Roadmap */}
//             <div className="col-span-12 lg:col-span-4 hologram-effect rounded-[2.5rem] p-8">
//                <div className="flex justify-between items-center mb-8">
//                   <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.5em]">Today's Plan</h5>
//                   <Trophy className="w-5 h-5 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
//                </div>
//                <div className="space-y-6">
//                   {roadmap.slice(0, 3).map((step: any, i: number) => (
//                     <div key={i} className="space-y-2">
//                        <div className="flex justify-between items-center">
//                           <span className="text-[10px] font-bold text-zinc-300 uppercase">{step.title}</span>
//                           <CheckCircle2 className={cn("w-4 h-4", i === 0 ? "text-emerald-500" : "text-zinc-800")} />
//                        </div>
//                        <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
//                           <motion.div initial={{ width: 0 }} animate={{ width: i === 0 ? '100%' : '30%' }} className="h-full bg-cyan-400" />
//                        </div>
//                     </div>
//                   ))}
//                </div>
//             </div>
//           </div>

//         </main>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { motion } from "framer-motion";
// import { 
//   Zap, Sparkles, Cpu, Target, 
//   Activity, Globe, Shield, Terminal, 
//   Settings, Orbit, Atom, Radar
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// export default function DashboardClient({ resumes, jobs, projects, roadmap, user }: any) {
//   const latestResume = resumes[0];

//   return (
//     <div className="min-h-screen hologram-container p-4 md:p-8 font-mono">
      
//       {/* --- ۱. NAVIGATION HUD (معلق و هولوگرافیک) --- */}
//       <div className="flex justify-between items-start mb-12 relative z-50">
//         <div className="space-y-2">
//           <div className="flex items-center gap-3">
//             <div className="w-2 h-2 bg-[#00fff2] rounded-full animate-ping" />
//             <span className="text-[10px] font-bold text-[#00fff2] tracking-[0.5em] uppercase">Neural Link Established</span>
//           </div>
//           <h1 className="text-7xl font-black tracking-tighter text-white uppercase italic mix-blend-difference">
//             Zenith <span className="text-[#00fff2] drop-shadow-[0_0_15px_#00fff2]">OS</span>
//           </h1>
//         </div>

//         <div className="grid grid-cols-2 gap-4 text-right">
//           <div className="hologram-card p-4 rounded-xl">
//              <p className="text-[8px] text-zinc-500 uppercase">System Time</p>
//              <p className="text-xs text-[#00fff2] font-mono">2026.05.07 // 12:42:01</p>
//           </div>
//           <div className="hologram-card p-4 rounded-xl">
//              <p className="text-[8px] text-zinc-500 uppercase">Authorized User</p>
//              <p className="text-xs text-white uppercase tracking-tighter">{user?.name}</p>
//           </div>
//         </div>
//       </div>

//       {/* --- ۲. BENTO QUANTUM GRID --- */}
//       <div className="grid grid-cols-12 auto-rows-[180px] gap-4 relative z-10">
        
//         {/* کارت مرکزی: AI NEURAL CORE */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
//           className="col-span-12 lg:col-span-8 row-span-3 hologram-card rounded-3xl p-10 relative overflow-hidden group"
//         >
//           {/* افکت رادار در پس‌زمینه کارت */}
//           <div className="absolute top-0 right-0 w-[400px] h-[400px] border border-[#00fff2]/5 rounded-full animate-ping opacity-20" />
          
//           <div className="h-full flex flex-col justify-between">
//             <div className="space-y-8">
//               <div className="inline-flex items-center gap-4 px-4 py-2 border border-[#00fff2]/30 rounded-lg bg-[#00fff2]/5 text-[#00fff2]">
//                 <Atom className="w-5 h-5 animate-spin-slow" />
//                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">Quantum Brain V2</span>
//               </div>
//               <h2 className="text-6xl font-black text-white leading-none uppercase italic">
//                 Identity <br /> <span className="text-[#00fff2] opacity-50">Projection</span>
//               </h2>
//               <p className="text-zinc-400 text-sm max-w-lg font-medium leading-relaxed uppercase">
//                 {latestResume 
//                   ? `Trajectory detected. Career strength normalized at ${latestResume.aiScore}%. Target: Global Lead Roles.` 
//                   : "Scanning for professional DNA... Upload resume to initialize trajectory."}
//               </p>
//             </div>
            
//             <div className="flex gap-4">
//               <button className="px-8 py-3 bg-[#00fff2] text-black text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_30px_#00fff2] transition-all">
//                 Sync Neural Path
//               </button>
//               <button className="px-8 py-3 border border-[#00fff2]/30 text-[#00fff2] text-[10px] font-black uppercase tracking-widest hover:bg-[#00fff2]/10 transition-all">
//                 System Diagnostics
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* کارت رادار آماری (Radar Scanner) */}
//         <div className="col-span-12 lg:col-span-4 row-span-2 hologram-card rounded-3xl flex flex-col items-center justify-center relative group overflow-hidden">
//            <div className="absolute w-full h-full opacity-10 bg-[url('https://transparenttextures.com')]" />
//            <div className="relative w-44 h-44 border border-[#00fff2]/20 rounded-full flex items-center justify-center">
//               <div className="absolute inset-0 border-t-2 border-[#00fff2] rounded-full animate-spin" />
//               <div className="flex flex-col items-center">
//                 <span className="text-5xl font-black text-white tracking-tighter italic">{latestResume?.aiScore || 0}%</span>
//                 <span className="text-[8px] text-[#00fff2] uppercase tracking-[0.5em] font-bold">Integrity</span>
//               </div>
//            </div>
//         </div>

//         {/* مینی کارت‌های HUD (متراکم) */}
//         {[
//           { label: "Job Matches", val: jobs.length, icon: Target },
//           { label: "Code Repos", val: projects.length, icon: Cpu },
//         ].map((item, i) => (
//           <div key={i} className="col-span-12 lg:col-span-2 row-span-1 hologram-card rounded-2xl p-6 flex flex-col justify-between group cursor-crosshair">
//             <item.icon className="w-5 h-5 text-[#00fff2] opacity-50 group-hover:opacity-100" />
//             <div>
//               <p className="text-[24px] font-black text-white italic">{item.val < 10 ? `0${item.val}` : item.val}</p>
//               <p className="text-[8px] text-zinc-500 uppercase font-black">{item.label}</p>
//             </div>
//           </div>
//         ))}

//         {/* بخش ROADMAP (عمودی و لوکس) */}
//         <div className="col-span-12 lg:col-span-4 row-span-3 hologram-card rounded-3xl p-8 space-y-6">
//            <h3 className="text-[10px] font-black text-[#00fff2] uppercase tracking-[0.5em] border-b border-[#00fff2]/10 pb-4 flex items-center gap-2">
//              <Orbit className="w-4 h-4" /> Neural Roadmap
//            </h3>
//            <div className="space-y-4">
//               {(roadmap?.steps as any[])?.slice(0, 3).map((step, i) => (
//                 <div key={i} className="group flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01] hover:bg-[#00fff2]/5 transition-all">
//                   <span className="text-xl font-black text-zinc-800 italic">0{i+1}</span>
//                   <div className="flex flex-col">
//                     <span className="text-[10px] font-bold text-white uppercase">{step.title}</span>
//                     <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest">Awaiting Command</span>
//                   </div>
//                 </div>
//               ))}
//            </div>
//         </div>

//         {/* کارت پایینی: SYSTEM ANALYSIS LOGS */}
//         <div className="col-span-12 lg:col-span-8 row-span-2 hologram-card rounded-[3rem] p-10 flex items-center justify-between overflow-hidden">
//            <div className="space-y-4">
//               <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Global Market Impact</h3>
//               <div className="flex gap-2">
//                  {[...Array(20)].map((_, i) => (
//                    <div key={i} className={cn("w-2 h-8", i < 12 ? "bg-[#00fff2]/40" : "bg-white/5")} />
//                  ))}
//               </div>
//               <p className="text-[9px] text-zinc-500 uppercase tracking-widest leading-loose">
//                 {">"} ANALYZING GLOBAL NODES... SUCCESS<br />
//                 {">"} MATCHING PROFILE WITH TECH STACKS... 82% MATCH
//               </p>
//            </div>
//            <div className="text-right">
//               <span className="text-8xl font-black text-white/5 select-none italic absolute right-10 bottom-0 uppercase tracking-tighter">ZENITH</span>
//               <button className="px-12 py-4 bg-white/5 border border-[#00fff2]/30 text-[#00fff2] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#00fff2] hover:text-black transition-all">
//                 Download Intel
//               </button>
//            </div>
//         </div>

//       </div>
//     </div>
//   );
// }
