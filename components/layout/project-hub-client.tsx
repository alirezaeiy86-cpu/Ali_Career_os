"use client";

import { useState, useTransition, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ShieldCheck,
  Zap,
  Activity,
  Code2,
  BarChart3,
  Braces,
  Brain,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { analyzeProject } from "@/actions/project-analysis";
import { toast } from "sonner";

export default  function ProjectHub({ initialData }: { initialData: any[] }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [isPending, startTransition] = useTransition();
  const [projects, setProjects] = useState<any[]>(initialData); 

  const handleScan = () => {
    if (!repoUrl) return toast.error("Please enter a repository URL");

    startTransition(async () => {
      const response = await analyzeProject(repoUrl);
      
      if (response.error) {
        toast.error(response.error);
      } else {
        
        setProjects((prev) => [response.data, ...prev]);
        setRepoUrl("");
        toast.success("Neural Audit Complete!");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* --- Header --- */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-500 font-black tracking-[0.4em] text-[10px] uppercase">
          <Activity className="w-3 h-3 animate-pulse" />
          Neural Code Auditor Active
        </div>
        <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none">
          Project <span className="text-blue-600">Vault</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- Left: Interactive Scanner --- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative p-1 rounded-[3rem] bg-gradient-to-br from-blue-600/20 via-transparent to-white/5 overflow-hidden">
            <div className="bg-[#050508] rounded-[2.9rem] p-10 relative overflow-hidden h-[550px] flex flex-col justify-between">
              <div className="absolute inset-0 opacity-10 bg-repeat bg-[url('https://vercel.app')]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-500/5 rounded-full animate-radar" />

              <div className="relative z-10 space-y-8">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <Terminal className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-tight italic">
                    Initialize Audit
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Our AI deconstructs your architecture to reveal technical
                    impact.
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    disabled={isPending}
                    placeholder="https://github.com"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 text-sm text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-800"
                  />
                  <button
                    onClick={handleScan}
                    disabled={isPending}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[3px] rounded-2xl transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] active:scale-95"
                  >
                    {isPending ? "Neural Scan in Progress..." : "Start System Scan"}
                  </button>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> AES-256 Neural Sandbox
              </div>
            </div>
          </div>
        </div>

        {/* --- Right: Live Results --- */}
        <div className="lg:col-span-7 space-y-6 min-h-[550px]">
          <AnimatePresence mode="wait">
            {isPending ? (
              /* --- Terminal Loading Effect --- */
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full bg-black rounded-[3rem] p-10 font-mono text-[11px] text-blue-500/80 space-y-3 border border-blue-500/20"
              >
                <p className="text-white">_ ZENITH NEURAL AUDITOR v1.0.4</p>
                <p className="animate-pulse">{">"} FETCHING REPOSITORY: {repoUrl}</p>
                <p className="delay-75">{">"} ANALYZING DIRECTORY STRUCTURE...</p>
                <p className="delay-150">{">"} GEMINI 1.5 PRO: SCANNING CODE PATTERNS...</p>
                <p className="delay-300 text-emerald-500">{">"} ARCHITECTURE IDENTIFIED: \[SYSTEM READY]</p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 gap-6"
              >
                {projects.length === 0 && (
                  <div className="h-[550px] border border-dashed border-white/5 rounded-[3rem] flex items-center justify-center text-zinc-700 font-bold uppercase tracking-widest">
                    No active audits found
                  </div>
                )}
                {projects.map((project, idx) => {
                  const impact = project.aiImpact; // Stored Gemini data
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-8 rounded-[3rem] bg-[#080810] border border-white/5 relative group overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-20">
                        <Brain className="w-12 h-12 text-blue-500" />
                      </div>

                      <div className="flex gap-6 items-start">
                        <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                          <Cpu className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold text-white tracking-tight">
                              {project.name}
                            </h3>
                            <span className="text-2xl font-black text-blue-500">
                              {impact?.score || 0}%
                            </span>
                          </div>
                          <div className="flex gap-2 mb-6">
                            {project.techStack?.map((t: string) => (
                              <span
                                key={t}
                                className="text-[9px] font-bold text-zinc-500 bg-white/5 px-3 py-1 rounded-md border border-white/5"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>

                          {/* --- Real Technical Breakdown --- */}
                          <div className="grid grid-cols-2 gap-6 mt-8">
                            {[
                              {
                                label: "Architecture",
                                val: impact?.architecture || 0,
                                color: "bg-blue-500",
                              },
                              {
                                label: "Performance",
                                val: impact?.performance || 0,
                                color: "bg-indigo-500",
                              },
                              {
                                label: "Clean Code",
                                val: impact?.cleanCode || 0,
                                color: "bg-cyan-500",
                              },
                              {
                                label: "Readability",
                                val: impact?.readability || 0,
                                color: "bg-violet-500",
                              },
                            ].map((bar) => (
                              <div key={bar.label} className="space-y-1">
                                <div className="flex justify-between text-[9px] font-black uppercase text-zinc-600 tracking-widest">
                                  <span>{bar.label}</span>
                                  <span>{bar.val}%</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${bar.val}%` }}
                                    className={cn("h-full", bar.color)}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-8 pt-6 border-t border-white/5">
                            <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                              AI Review: "
                              {impact?.review ||
                                "System audit pending detailed feedback."}
                              "
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//    Cpu, Terminal, 
//   ShieldCheck, Zap, Activity,
//   Code2, Braces, BarChart3
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// import {  useTransition } from "react";
// import { analyzeProject } from "@/actions/project-analysis"; // ایمپورت اکشنی که ساختی
// import { toast } from "sonner";

// export default function ProjectHub() {
//   const [loading, setLoading] = useState(false);
//   const [repoUrl, setRepoUrl] = useState("");
//   const [isPending, startTransition] = useTransition();
 
//   const [result, setResult] = useState<any>(null); // برای ذخیره نتیجه واقعی

//   const handleScan = () => {
//     if (!repoUrl) return toast.error("Please enter a repository URL");

//     startTransition(async () => {
//       const response = await analyzeProject(repoUrl);
      
//       if (response.error) {
//         toast.error(response.error);
//       } else {
//         setResult(response.data);
//         toast.success("Neural Audit Complete!");
//       }
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto space-y-12 pb-20">
//       {/* Header */}
//       <div className="flex flex-col gap-2">
//         <div className="flex items-center gap-2 text-blue-500 font-black tracking-[0.4em] text-[10px] uppercase">
//           <Activity className="w-3 h-3 animate-pulse" />
//           Neural Code Auditor Active
//         </div>
//         <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic">
//           Project <span className="text-blue-600">Vault</span>
//         </h1>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         {/* Left: Interactive Scanner */}
//         <div className="lg:col-span-5 space-y-6">
//           <div className="relative p-1 rounded-[3rem] bg-gradient-to-br from-blue-600/20 via-transparent to-white/5 overflow-hidden">
//             <div className="bg-[#050508] rounded-[2.9rem] p-10 relative overflow-hidden h-[550px] flex flex-col justify-between">
              
//               {/* Radar Grid Background */}
//               <div className="absolute inset-0 opacity-10 bg-[url('https://vercel.app')] bg-repeat" />
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-500/5 rounded-full animate-radar" />

//               <div className="relative z-10 space-y-8">
//                 <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
//                   <Terminal className="w-8 h-8 text-blue-500" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Deploy to Intelligence</h2>
//                   <p className="text-zinc-500 text-sm leading-relaxed">Enter your repository link. Gemini 1.5 Pro will perform a deep neural audit of your architecture.</p>
//                 </div>

//                 <div className="space-y-4">
//                    <div className="relative">
//                       <input 
//                         value={repoUrl}
//                          onChange={(e) => setRepoUrl(e.target.value)}
//                             disabled={isPending}
//                             placeholder="https://github.com"
//                             className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 text-sm text-white outline-none focus:border-blue-500/50 transition-all"
//                                               />
//                                           <button 
//                                        onClick={handleScan}
//                                        disabled={isPending}
//                               className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[3px] rounded-2xl transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)]"
//                                           >
//                                         {isPending ? "Scanning System Core..." : "Initialize Audit"}
//                                       </button>
//                                      </div>
                  
                 
//                 </div>
//               </div>

//               <div className="relative z-10 flex items-center gap-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
//                 <ShieldCheck className="w-4 h-4 text-emerald-500" /> AES-256 Analysis Security
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right: Detailed Analysis Cards */}
//         <div className="lg:col-span-7 space-y-6">
//           <AnimatePresence>
//             {!loading ? (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-6">
//                 {[1, 2].map((i) => (
//                   <div key={i} className="p-8 rounded-[3rem] bg-[#080810] border border-white/5 relative group overflow-hidden">
//                     <div className="absolute top-0 right-0 p-8 flex flex-col items-end opacity-20">
//                         <BarChart3 className="w-12 h-12 text-blue-500" />
//                     </div>
                    
//                     <div className="flex gap-6 items-start">
//                       <div className="w-14 h-14 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center">
//                         <Code2 className="w-6 h-6 text-blue-400" />
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex justify-between items-center mb-2">
//                            <h3 className="text-xl font-bold text-white tracking-tight">System Core Engine</h3>
//                            <span className="text-2xl font-black text-blue-500">92%</span>
//                         </div>
//                         <div className="flex gap-3 mb-6">
//                           {["Rust", "Next.js", "gRPC"].map(t => (
//                             <span key={t} className="text-[9px] font-bold text-zinc-500 bg-white/5 px-3 py-1 rounded-md">#{t}</span>
//                           ))}
//                         </div>
                        
//                         {/* Technical Breakdown Bar */}
//                         <div className="space-y-4">
//                           {[
//                             { label: "Architecture", val: 95, color: "bg-blue-500" },
//                             { label: "Readability", val: 88, color: "bg-indigo-500" }
//                           ].map(bar => (
//                             <div key={bar.label} className="space-y-1">
//                               <div className="flex justify-between text-[9px] font-black uppercase text-zinc-600 tracking-widest">
//                                 <span>{bar.label}</span>
//                                 <span>{bar.val}%</span>
//                               </div>
//                               <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
//                                 <motion.div 
//                                   initial={{ width: 0 }} animate={{ width: `${bar.val}%` }}
//                                   className={cn("h-full", bar.color)} 
//                                 />
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </motion.div>
//             ) : (
//               /* Loading State: Terminal Logs */
//               <div className="h-full bg-black rounded-[3rem] p-10 font-mono text-[11px] text-blue-500/80 space-y-2 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
//                 <p className="text-white">_ INITIALIZING NEURAL SCAN...</p>
//                 <p>{">"} Accessing GitHub Repository API...</p>
//                 <p>{">"} Cloned 128 source files.</p>
//                 <p>{">"} Gemini 1.5 Pro analyzing patterns...</p>
//                 <p className="animate-pulse">{">"} Detecting Architecture Gaps...</p>
//               </div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }
