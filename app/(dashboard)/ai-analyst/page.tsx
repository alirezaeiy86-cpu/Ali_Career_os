"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CloudUpload, Cpu, Sparkles, ShieldCheck, 
  Loader2, CheckCircle2, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { analyzeResume } from "@/actions/resume-analysis";
import { toast } from "sonner";

export default function ResumePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let file: File | undefined;
    
    if ('dataTransfer' in e) {
      e.preventDefault();
      file = e.dataTransfer.files[0];
    } else {
      file = (e.target as HTMLInputElement).files?.[0];
    }

    if (!file) return;

    // چک کردن فرمت فایل برای لوکس‌تر شدن پلتفرم
    if (file.type !== "application/pdf") {
      toast.error("System only accepts Neural PDF formats.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    
    startTransition(async () => {
      const result = await analyzeResume(formData);
      
      if (result.error) {
        toast.error(result.error);
        setIsUploading(false);
      } else if (result.success && result.data) {
        toast.success("Identity Synchronized. Opening Analysis...");
        
        // جادوی اصلی: ریدایرکت به صفحه گزارش با ID واقعی دیتابیس
        router.push(`/ai-analyst/${result.data.id}`);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 relative">
      {/* Background Cinematic Light */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/5 blur-[120px] pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="relative">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-400">Quantum Processor Active</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-white">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">Decryptor</span>
          </h1>
          <p className="text-zinc-500 text-sm max-w-md font-medium leading-relaxed">
            Deploy your resume into our neural network. Zenith AI will extract every pixel of your professional potential.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <motion.div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onFileChange}
            className={cn(
              "relative h-[500px] rounded-[4rem] border transition-all duration-700 overflow-hidden group",
              isDragging ? "border-purple-500 bg-purple-500/5 scale-[0.98]" : "border-white/5 bg-[#050508]",
              isUploading && "pointer-events-none"
            )}
          >
            {/* Scanning Laser Effect (ظاهر شدن هنگام آپلود) */}
            <AnimatePresence>
              {isUploading && (
                <motion.div 
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent z-20 pointer-events-none"
                >
                   <div className="w-full h-[1px] bg-purple-400 shadow-[0_0_15px_#a855f7]" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-dots opacity-[0.15]" />
            
            <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
              {/* Center Icon Stage */}
              <div className="relative mb-10">
                <div className={cn(
                  "w-28 h-28 bg-[#0a0a10] border border-white/10 rounded-[3rem] flex items-center justify-center transition-all duration-700 shadow-2xl",
                  isUploading ? "scale-110 border-purple-500/50" : "group-hover:border-white/20"
                )}>
                  {isUploading ? (
                    <Zap className="w-12 h-12 text-purple-500 animate-pulse fill-purple-500" />
                  ) : (
                    <CloudUpload className="w-12 h-12 text-zinc-500 group-hover:text-white transition-colors" />
                  )}
                </div>
                {/* Orbital Rings */}
                <div className="absolute inset-0 border border-white/5 rounded-full scale-150 animate-slow-spin" />
                <div className="absolute inset-0 border border-white/[0.02] rounded-full scale-[1.8] animate-slow-spin [animation-direction:reverse]" />
              </div>

              <div className="space-y-4 max-w-sm">
                <h3 className="text-3xl font-black text-white tracking-tight leading-none">
                  {isUploading ? "DECRYPTING DATA..." : "INITIALIZE DEPLOYMENT"}
                </h3>
                <p className="text-zinc-500 text-sm font-medium">
                  {isUploading ? "Our neural engine is analyzing skills and impact..." : "Drag your PDF here or use the terminal button below."}
                </p>
              </div>

              {!isUploading && (
                <label className="mt-10 group relative px-12 py-5 bg-white rounded-2xl overflow-hidden transition-all active:scale-95 cursor-pointer">
                  <input type="file" className="hidden" onChange={onFileChange} accept=".pdf" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-black group-hover:text-white font-black text-[10px] uppercase tracking-[3px]">
                    Access Filesystem
                  </span>
                </label>
              )}
            </div>
          </motion.div>
        </div>

        {/* Status Indicators */}
        <div className="flex flex-col gap-6">
          {[
            { t: "Deep Scan", d: "Parsing experience layers & impact.", i: Cpu },
            { t: "ATS Protocol", d: "100+ global recruitment standards.", i: Sparkles },
            { t: "Encrypted", d: "Zero-knowledge security architecture.", i: ShieldCheck },
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-[2.5rem] bg-[#080810] border border-white/5 hover:border-white/10 transition-all group">
              <item.i className="w-6 h-6 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-2">{item.t}</h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed font-medium">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   CloudUpload, 
//   FileText, 
//   Sparkles, 
//   ShieldCheck, 
//   Cpu, 
//   CheckCircle2,
//   AlertCircle
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// import { useTransition,  } from "react";
// import { analyzeResume } from "@/actions/resume-analysis";
// import { toast } from "sonner";

// import { Loader2 } from "lucide-react"; // برای اسپینر لوکس

// export default function ResumePage() {
//   const [isDragging, setIsDragging] = useState(false);
//   const [file, setFile] = useState<File | null>(null);

//    const [isPending, startTransition] = useTransition();
//   const [isUploading, setIsUploading] = useState(false);

//   const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     setIsUploading(true);
//     startTransition(async () => {
//       const result = await analyzeResume(formData);
      
//       if (result.error) {
//         toast.error(result.error);
//       } else {
//         toast.success("Analysis Complete! Your profile is now optimized.");
//         // اینجا می‌توانیم کاربر را به صفحه نتایج ریدایرکت کنیم
//       }
//       setIsUploading(false);
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-12 pb-20">
//       {/* --- Section Header --- */}
//       <div className="relative">
//         <motion.div 
//           initial={{ opacity: 0, x: -20 }} 
//           animate={{ opacity: 1, x: 0 }}
//           className="space-y-2"
//         >
//           <div className="flex items-center gap-2">
//             <div className="h-[1px] w-8 bg-purple-500" />
//             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500">Neural Engine v2</span>
//           </div>
//           <h1 className="text-5xl font-black tracking-tighter text-white">
//             Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Intelligence</span>
//           </h1>
//           <p className="text-zinc-500 text-sm max-w-md leading-relaxed">
//             Upload your professional identity. Our AI will deconstruct, analyze, and optimize it for the global market.
//           </p>
//         </motion.div>
//       </div>

//       {/* --- Main Upload Terminal --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* Drop Zone (2/3 of grid) */}
//         <div className="lg:col-span-2">
//           <motion.div 
//             onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
//             onDragLeave={() => setIsDragging(false)}
//             className={cn(
//               "relative h-[450px] rounded-[3.5rem] border border-white/5 bg-[#050508] overflow-hidden transition-all duration-700",
//               isDragging ? "border-purple-500/50 scale-[0.99]" : "hover:border-white/10"
//             )}
//           >
//             {/* Background Texture & Light */}
//             <div className="absolute inset-0 bg-dots opacity-20" />
//             <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
            
//             <div className="relative h-full w-full flex flex-col items-center justify-center p-12">
//               {/* Rotating Ring Decor */}
//               <div className="absolute w-64 h-64 border border-white/5 rounded-full animate-slow-spin" />
//               <div className="absolute w-80 h-80 border border-white/[0.02] rounded-full animate-slow-spin [animation-direction:reverse]" />

//               {/* Upload Icon with Animated Glow */}
//               <div className="relative mb-8">
//                 <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-20 animate-pulse" />
//                 <div className="relative w-24 h-24 bg-[#0a0a10] border border-white/10 rounded-[2.5rem] flex items-center justify-center group cursor-pointer">
//                    <CloudUpload className="w-10 h-10 text-white group-hover:text-purple-400 transition-colors duration-500" />
//                 </div>
//               </div>

//               <div className="text-center space-y-4">
//                 <h3 className="text-2xl font-bold text-white tracking-tight">
//                   Deploy Resume Data
//                 </h3>
//                 <p className="text-zinc-500 text-sm max-w-xs mx-auto">
//                   Drag and drop your PDF/DOCX or click to browse. Let the AI handle the rest.
//                 </p>
//               </div>
//                <label className="mt-10 group relative px-10 py-4 bg-white rounded-2xl overflow-hidden transition-all active:scale-95 cursor-pointer block text-center">
//       <input type="file" className="hidden" onChange={onFileChange} disabled={isUploading} />
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
//       <span className="relative text-black group-hover:text-white font-black text-[11px] uppercase tracking-[2px] flex items-center justify-center gap-2">
//         {isUploading ? (
//           <>
//             <Loader2 className="w-4 h-4 animate-spin" />
//             Processing Identity...
//           </>
//         ) : (
//           "Initialize Upload"
//         )}
//       </span>
//     </label>

            
//             </div>
//           </motion.div>
//         </div>

//         {/* --- Side Info Panel (1/3 of grid) --- */}
//         <div className="space-y-6">
//           {[
//             { title: "Smart Extraction", desc: "Entity recognition for skills and experience.", icon: Cpu },
//             { title: "ATS Scoring", desc: "Real-time checks against 100+ global standards.", icon: Sparkles },
//             { title: "Privacy Lock", desc: "Your data is anonymized and encrypted.", icon: ShieldCheck }
//           ].map((item, idx) => (
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.1 }}
//               key={item.title}
//               className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all"
//             >
//               <item.icon className="w-6 h-6 text-purple-500 mb-4" />
//               <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
//               <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
