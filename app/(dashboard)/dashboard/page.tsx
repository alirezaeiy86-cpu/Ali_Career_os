import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // استخراج همزمان تمام داده‌ها برای سرعت حداکثری (Parallel Fetching)
  const [resume, projects, roadmap, user] = await Promise.all([
    db.resume.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
    db.project.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
    db.roadmap.findUnique({
      where: { userId: session.user.id }
    }),
    db.user.findUnique({
      where: { id: session.user.id }
    })
  ]);

  // آماده‌سازی داده‌ها برای کلاینت
  const dashboardData = {
    user,
    resume,
    projects,
    roadmap: roadmap?.steps || [],
    // محاسبه فرضی مهارت‌ها و امتیازات بر اساس داده‌های واقعی
    stats: {
      score: resume?.aiScore || 0,
      projectsCount: projects.length,
      skillsCount: (resume?.content as any)?.skills?.length || 0,
      matchRate: "98%", // این بخش را بعداً با Job Matcher واقعی وصل می‌کنیم
    }
  };

  return <DashboardClient initialData={dashboardData} />;
}



// import { auth } from "@/auth";
// import { db } from "@/lib/prisma";
// import { 
//   Cpu, Zap, Target, Briefcase, 
//   ArrowUpRight, Sparkles, Activity, 
//   Globe, Shield, Fingerprint, Search,
//   Terminal, BarChart3, Code2
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// export default async function DashboardPage() {
//   const session = await auth();
  
//   // دیتای واقعی از DB
//   const [resumes, jobs, projects, roadmap] = await Promise.all([
//     db.resume.findMany({ where: { userId: session?.user?.id }, take: 1, orderBy: { createdAt: 'desc' } }),
//     db.job.findMany({ where: { userId: session?.user?.id }, take: 3 }),
//     db.project.findMany({ where: { userId: session?.user?.id }, take: 2 }),
//     db.roadmap.findUnique({ where: { userId: session?.user?.id } })
//   ]);

//   const latestResume = resumes[0];

//   return (
//     <div className="max-w-[1600px] mx-auto p-6 space-y-6 subtle-grid min-h-screen">
      
//       {/* --- HUD TOP BAR: بسیار ظریف و متراکم --- */}
//       <div className="flex items-center justify-between border-b border-white/[0.05] pb-6">
//         <div className="flex items-center gap-6">
//           <div className="flex flex-col">
//             <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em]">Neural Status</span>
//             <div className="flex items-center gap-2">
//               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
//               <span className="text-sm font-bold text-white tracking-tighter">IDENTIFIED: {session?.user?.name?.toUpperCase()}</span>
//             </div>
//           </div>
//           <div className="h-8 w-[1px] bg-white/5" />
//           <div className="hidden md:flex gap-8">
//             <div className="flex flex-col">
//               <span className="text-[9px] text-zinc-600 uppercase font-bold">Latency</span>
//               <span className="text-[11px] text-zinc-300 font-mono">14ms</span>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-[9px] text-zinc-600 uppercase font-bold">Node</span>
//               <span className="text-[11px] text-zinc-300 font-mono">US-EAST-1</span>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 p-1 rounded-xl">
//            <button className="px-4 py-1.5 text-[10px] font-black uppercase text-zinc-500 hover:text-white transition">Logs</button>
//            <button className="px-4 py-1.5 bg-purple-600 text-[10px] font-black uppercase text-white rounded-lg shadow-lg">New Scan</button>
//         </div>
//       </div>

//       {/* --- MAIN BENTO CORE: متراکم و پر از جزئیات --- */}
//       <div className="grid grid-cols-12 grid-rows-6 gap-4 h-auto lg:h-[900px]">
        
//         {/* ۱. کارت آنالیز مرکزی (بافت‌دار و لوکس) */}
//         <div className="col-span-12 lg:col-span-7 row-span-3 bg-card-bg border border-border-glass rounded-3xl p-8 relative overflow-hidden group">
//           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
//             <Fingerprint className="w-40 h-40 text-purple-500" />
//           </div>
//           <div className="flex flex-col h-full justify-between">
//             <div className="space-y-6">
//               <div className="inline-flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-[9px] font-bold text-purple-500 uppercase tracking-widest">
//                 <Sparkles className="w-3 h-3" /> AI Core Output
//               </div>
//               <h2 className="text-5xl font-black tracking-tighter text-white leading-none italic uppercase">
//                 Neural <br /> <span className="text-zinc-600">Trajectory</span>
//               </h2>
//               <p className="text-zinc-500 text-sm max-w-md leading-relaxed">
//                 The career engine has synthesized your professional DNA. Currently projecting a 12.4% increase in market value based on latest skill acquisition.
//               </p>
//             </div>
//             <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
//                {['Architecture', 'Optimization', 'Leadership'].map((t, i) => (
//                  <div key={t} className="space-y-2">
//                     <span className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">{t}</span>
//                     <div className="h-1 bg-white/5 rounded-full overflow-hidden">
//                       <div className="h-full bg-purple-500 w-2/3 shadow-[0_0_10px_#9333ea]" />
//                     </div>
//                  </div>
//                ))}
//             </div>
//           </div>
//         </div>

//         {/* ۲. کارت قدرت پروفایل (Circular & Minimal) */}
//         <div className="col-span-12 lg:col-span-5 row-span-2 bg-card-bg border border-border-glass rounded-3xl p-8 flex flex-col items-center justify-center relative group">
//           <div className="relative w-40 h-40 flex items-center justify-center">
//             <svg className="w-full h-full -rotate-90">
//               <circle cx="80" cy="80" r="70" className="text-white/[0.02]" stroke="currentColor" strokeWidth="4" fill="transparent" />
//               <circle cx="80" cy="80" r="70" className="text-purple-600 drop-shadow-[0_0_10px_#9333ea]" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="440" strokeDashoffset={440 - (440 * (latestResume?.aiScore || 45)) / 100} />
//             </svg>
//             <div className="absolute flex flex-col items-center">
//               <span className="text-4xl font-black text-white italic">{latestResume?.aiScore || 0}</span>
//               <span className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.3em]">Integrity</span>
//             </div>
//           </div>
//         </div>

//         {/* ۳. مینی‌کارت‌های آماری (Small & Sharp) */}
//         <div className="col-span-12 lg:col-span-2 row-span-1 bg-[#08080c] border border-border-glass rounded-3xl p-6 flex flex-col justify-between group hover:border-purple-500/30 transition">
//           <Activity className="w-4 h-4 text-purple-500" />
//           <div className="space-y-1">
//             <span className="text-2xl font-black text-white italic">{jobs.length}</span>
//             <p className="text-[8px] text-zinc-600 uppercase font-black">Active Matches</p>
//           </div>
//         </div>

//         <div className="col-span-12 lg:col-span-3 row-span-1 bg-[#08080c] border border-border-glass rounded-3xl p-6 flex items-center justify-between group">
//           <div className="space-y-1">
//              <span className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">Tech Vault</span>
//              <p className="text-lg font-bold text-white tracking-tighter italic">{projects.length} System Deployed</p>
//           </div>
//           <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition">
//             <Code2 className="w-4 h-4 text-zinc-400" />
//           </div>
//         </div>

//         {/* ۴. لیست آخرین فعالیت‌ها (Detail Oriented) */}
//         <div className="col-span-12 lg:col-span-5 row-span-3 bg-card-bg border border-border-glass rounded-3xl p-8 space-y-6">
//           <div className="flex justify-between items-center">
//              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Neural Roadmap</h3>
//              <div className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[8px] font-bold rounded uppercase">Active</div>
//           </div>
//           <div className="space-y-4">
//              {((roadmap?.steps as any[])?.slice(0, 3) || []).map((s, i) => (
//                <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.03] rounded-2xl hover:bg-white/[0.04] transition group">
//                   <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[10px] font-bold text-zinc-500 group-hover:text-purple-500">0{i+1}</div>
//                   <div className="flex flex-col">
//                     <span className="text-[11px] font-bold text-zinc-200">{s.title}</span>
//                     <span className="text-[9px] text-zinc-600">Pending Execution</span>
//                   </div>
//                   <ArrowUpRight className="w-3 h-3 ml-auto text-zinc-800 group-hover:text-white" />
//                </div>
//              ))}
//           </div>
//         </div>

//         {/* ۵. ویجت پروژه‌های برتر (Visuals) */}
//         <div className="col-span-12 lg:col-span-7 row-span-3 bg-card-bg border border-border-glass rounded-3xl p-8 grid grid-cols-2 gap-8 relative overflow-hidden">
//            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent" />
//            <div className="space-y-6 relative">
//               <h3 className="text-xl font-bold text-white tracking-tighter italic">Top Performance</h3>
//               <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4">
//                  <div className="flex justify-between items-center">
//                     <Cpu className="w-5 h-5 text-purple-500" />
//                     <span className="text-xs font-black text-white">98.2%</span>
//                  </div>
//                  <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">Your 'Zenith Core' repository has achieved the highest architecture score this week.</p>
//               </div>
//            </div>
//            <div className="flex flex-col justify-end items-end relative">
//               <div className="text-right space-y-1">
//                  <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">Global Ranking</p>
//                  <p className="text-4xl font-black text-white italic">#142</p>
//                  <div className="flex gap-1 justify-end">
//                     {[1, 2, 3, 4, 5].map(i => <div key={i} className={cn("w-1 h-3 rounded-full", i < 4 ? "bg-purple-600" : "bg-white/5")} />)}
//                  </div>
//               </div>
//            </div>
//         </div>

//       </div>
//     </div>
//   );
// }
