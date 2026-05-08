"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, Sparkles, Cpu, Zap, Printer, 
  Mail, MapPin, CheckCircle2, X, Plus, Trash2, FileCode 
} from "lucide-react";
import { generateSmartCV, polishCVSection } from "@/actions/generate-cv";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function CVBuilderPage() {
  const { data: session } = useSession();
  const [cvData, setCvData] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [newSkill, setNewSkill] = useState("");
  
  const summaryRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (summaryRef.current) {
      summaryRef.current.style.height = "auto";
      summaryRef.current.style.height = summaryRef.current.scrollHeight + "px";
    }
  }, [cvData?.summary]);

  const handleSynthesize = () => {
    startTransition(async () => {
      const res = await generateSmartCV();
      if (res.success) {
        setCvData({
          ...res.data,
          name: session?.user?.name || "SAMIM",
          email: session?.user?.email || "SAMIM@ZENITH.OS",
          image: session?.user?.image,
          role: "SENIOR FULL STACK ARCHITECT",
          location: "BALKH, AFGHANISTAN"
        });
        toast.success("Identity Matrix Synchronized.");
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 md:gap-8 p-4 md:p-6 lg:p-12 bg-black text-white relative font-sans overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; }
          body * { visibility: hidden !important; }
          .cv-master-document, .cv-master-document * { visibility: visible !important; }
          .cv-master-document {
            position: fixed !important;
            left: 0 !important; top: 0 !important;
            width: 210mm !important;
            height: auto !important;
            margin: 0 !important;
            padding: 10mm !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .print-header-black {
            background-color: black !important;
            -webkit-print-color-adjust: exact !important;
            color: white !important;
            display: flex !important;
            width: 100% !important;
          }
          input, textarea { border: none !important; background: transparent !important; color: inherit !important; }
          .no-print { display: none !important; }
        }
      `}} />

      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/5 pb-10 no-print text-center sm:text-left">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
          CV<span className="text-zinc-800">VAULT</span>
        </h1>
        <button 
          onClick={() => window.print()} 
          className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:shadow-[0_0_40px_#fff] transition-all"
        >
          Deploy PDF Matrix
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6 no-print">
           <div className="p-8 md:p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-10">
              <h3 className="text-xl font-bold italic uppercase text-purple-400">Data Sync</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl">
                    <span className="text-[9px] font-black text-zinc-500 tracking-widest uppercase">GitHub Assets</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                 </div>
              </div>
              <button onClick={handleSynthesize} disabled={isPending} className="w-full py-6 bg-purple-600 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-purple-500 transition-all shadow-2xl">
                {isPending ? "Constructing..." : "Start Neural Build"}
              </button>
           </div>
        </div>

        <div className="col-span-1 lg:col-span-8 relative">
           <AnimatePresence mode="wait">
             {cvData ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="cv-master-document w-full bg-white text-black rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col min-h-[1100px]">
                  
                  <header className="print-header-black bg-black text-white p-8 md:p-16 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 relative text-center md:text-left">
                    <div className="space-y-4 md:space-y-6 flex-1 w-full">
                      <input 
                        value={cvData.name} 
                        onChange={e => setCvData({...cvData, name: e.target.value.toUpperCase()})} 
                        className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none w-full outline-none bg-transparent" 
                      />
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <input 
                          value={cvData.role} 
                          onChange={(e) => setCvData({...cvData, role: e.target.value.toUpperCase()})} 
                          className="text-lg md:text-xl font-bold text-zinc-400 tracking-[0.2em] uppercase outline-none bg-transparent w-full" 
                        />
                        <span className="hidden md:block h-4 w-[1px] bg-zinc-700" />
                        <span className="text-[9px] font-black text-purple-600 uppercase tracking-widest shrink-0">Verified Identity</span>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 md:gap-8 pt-4 text-[10px] font-black uppercase text-zinc-400 border-t border-white/10">
                         <span className="flex items-center justify-center gap-2"><Mail size={12} className="text-zinc-500 md:text-black"/> {cvData.email}</span>
                         <span className="flex items-center justify-center gap-2"><MapPin size={12} className="text-zinc-500 md:text-black"/> {cvData.location}</span>
                      </div>
                    </div>
                    <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2rem] border-[4px] md:border-[6px] border-white/20 md:border-black p-1 shadow-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                       <img src={session?.user?.image!} className="w-full h-full object-cover rounded-[1.8rem]" alt="Profile" />
                    </div>
                  </header>

                  <div className="flex-1 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 bg-white">
                    <div className="col-span-1 lg:col-span-8 space-y-12 md:space-y-16">
                       <section>
                          <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400 border-b pb-2 mb-6">Neural Summary</h4>
                          <textarea 
                            ref={summaryRef}
                            value={cvData.summary} 
                            onChange={e => setCvData({...cvData, summary: e.target.value})} 
                            className="w-full text-lg md:text-xl leading-[1.4] font-medium italic text-zinc-900 font-serif outline-none bg-transparent resize-none overflow-hidden" 
                            rows={1}
                          />
                       </section>
                       
                       <section>
                          <div className="flex justify-between items-center border-b pb-2 mb-10">
                             <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Tenure History</h4>
                             <button onClick={() => setCvData({...cvData, experience: [{company: "NEW ENTITY", role: "SOFTWARE ENGINEER", period: "2026"}, ...cvData.experience]})} className="no-print p-1 bg-black text-white rounded-md transition"><Plus size={14}/></button>
                          </div>
                          <div className="space-y-10 md:space-y-12">
                             {cvData.experience?.map((exp: any, i: number) => (
                               <div key={i} className="relative pl-10 border-l-[3px] border-black group">
                                  <div className="absolute -left-[11px] top-0 w-5 h-5 bg-white border-[4px] border-black rounded-full" />
                                  <input value={exp.company} onChange={e => { const up = [...cvData.experience]; up[i].company = e.target.value.toUpperCase(); setCvData({...cvData, experience: up}); }} className="text-xl md:text-2xl font-black uppercase tracking-tighter outline-none bg-transparent w-full" />
                                  <input value={exp.role} onChange={e => { const up = [...cvData.experience]; up[i].role = e.target.value; setCvData({...cvData, experience: up}); }} className="text-sm font-bold text-purple-600 uppercase mb-4 tracking-widest outline-none bg-transparent w-full" />
                                  <button onClick={() => setCvData({...cvData, experience: cvData.experience.filter((_:any,idx:number)=>idx!==i)})} className="no-print absolute -right-6 top-0 text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 size={16}/></button>
                               </div>
                             ))}
                          </div>
                       </section>
                    </div>

                    <div className="col-span-1 lg:col-span-4 space-y-12 md:space-y-16 border-t lg:border-t-0 lg:border-l border-zinc-50 pt-10 lg:pt-0 lg:pl-12">
                       <section>
                          <div className="flex justify-between items-center border-b pb-2 mb-8">
                             <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Technical DNA</h4>
                             <Plus size={14} className="no-print cursor-pointer hover:text-purple-600" onClick={() => setCvData({...cvData, skills: [...cvData.skills, "NEW NODE"]})} />
                          </div>
                          <div className="flex flex-wrap gap-2">
                             {cvData.skills?.map((s: string, i: number) => (
                               <div key={i} className="group flex items-center gap-2 px-3 py-1 bg-zinc-100 text-[9px] md:text-[10px] font-black uppercase rounded relative">
                                 <input value={s} onChange={e => { const up = [...cvData.skills]; up[i] = e.target.value; setCvData({...cvData, skills: up}); }} className="bg-transparent outline-none w-16 md:w-20" />
                                 <X size={10} className="no-print cursor-pointer text-zinc-400 hover:text-red-500" onClick={() => setCvData({...cvData, skills: cvData.skills.filter((_:any, idx:number)=>idx!==i)})} />
                               </div>
                             ))}
                          </div>
                       </section>
                    </div>
                  </div>
               </motion.div>
             ) : (
               <div className="h-[400px] md:h-[600px] border-2 border-dashed border-white/5 rounded-[2rem] md:rounded-[4rem] flex flex-col items-center justify-center text-center p-10 md:p-20 gap-6 opacity-20 no-print">
                  <FileText className="w-12 h-12 md:w-20 md:h-20" />
                  <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[1em]">Neural Sync Pending</p>
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useTransition, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FileText, Sparkles, Cpu, Zap, Printer, 
//   Mail, MapPin, CheckCircle2, X, Plus, Trash2, FileCode 
// } from "lucide-react";
// import { generateSmartCV, polishCVSection } from "@/actions/generate-cv";
// import { toast } from "sonner";
// import { useSession } from "next-auth/react";

// export default function CVBuilderPage() {
//   const { data: session } = useSession();
//   const [cvData, setCvData] = useState<any>(null);
//   const [isPending, startTransition] = useTransition();
//   const [newSkill, setNewSkill] = useState("");
  
//   //create summary itself
//   const summaryRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     if (summaryRef.current) {
//       summaryRef.current.style.height = "auto";
//       summaryRef.current.style.height = summaryRef.current.scrollHeight + "px";
//     }
//   }, [cvData?.summary]);

//   const handleSynthesize = () => {
//     startTransition(async () => {
//       const res = await generateSmartCV();
//       if (res.success) {
//         setCvData({
//           ...res.data,
//           name: session?.user?.name || "SAMIM",
//           email: session?.user?.email || "SAMIM@ZENITH.OS",
//           image: session?.user?.image,
//           role: "SENIOR FULL STACK ARCHITECT",
//           location: "BALKH, AFGHANISTAN"
//         });
//         toast.success("Identity Matrix Synchronized.");
//       }
//     });
//   };

//   return (
//     <div className="h-full flex flex-col gap-8 p-6 lg:p-12 bg-black text-white relative font-sans overflow-x-hidden">
      
//       <style dangerouslySetInnerHTML={{ __html: `
//         @media print {
//           @page { size: A4; margin: 0; }
//           body * { visibility: hidden !important; }
//           .cv-master-document, .cv-master-document * { visibility: visible !important; }
//           .cv-master-document {
//             position: fixed !important;
//             left: 0 !important; top: 0 !important;
//             width: 210mm !important;
//             height: auto !important;
//             margin: 0 !important;
//             padding: 10mm !important;
//             background: white !important;
//             color: black !important;
//             box-shadow: none !important;
//             border-radius: 0 !important;
//           }
//           .print-header-black {
//             background-color: black !important;
//             -webkit-print-color-adjust: exact !important;
//             color: white !important;
//             display: flex !important;
//             width: 100% !important;
//           }
//           input, textarea { border: none !important; background: transparent !important; color: inherit !important; }
//           .no-print { display: none !important; }
//         }
//       `}} />

//       <div className="relative z-10 flex justify-between items-end border-b border-white/5 pb-10 no-print">
//         <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-none">
//           CV<span className="text-zinc-800">VAULT</span>
//         </h1>
//         <button 
//           onClick={() => window.print()} 
//           className="px-10 py-5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:shadow-[0_0_40px_#fff] transition-all"
//         >
//           Deploy PDF Matrix
//         </button>
//       </div>

//       <div className="grid grid-cols-12 gap-10">
//         <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 no-print">
//            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-10">
//               <h3 className="text-xl font-bold italic uppercase text-purple-400">Data Sync</h3>
//               <div className="space-y-4">
//                  <div className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl">
//                     <span className="text-[9px] font-black text-zinc-500 tracking-widest uppercase">GitHub Assets</span>
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                  </div>
//               </div>
//               <button onClick={handleSynthesize} disabled={isPending} className="w-full py-6 bg-purple-600 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-purple-500 transition-all shadow-2xl">
//                 {isPending ? "Constructing..." : "Start Neural Build"}
//               </button>
//            </div>
//         </div>

//         <div className="col-span-12 lg:col-span-8 relative">
//            <AnimatePresence mode="wait">
//              {cvData ? (
//                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="cv-master-document w-full bg-white text-black rounded-[3rem] shadow-2xl overflow-hidden flex flex-col min-h-[1100px]">
                  
//                   <header className="print-header-black bg-black text-white p-16 flex justify-between items-center relative">
//                     <div className="space-y-6 flex-1 pr-10">
//                       <input 
//                         value={cvData.name} 
//                         onChange={e => setCvData({...cvData, name: e.target.value.toUpperCase()})} 
//                         className="text-6xl font-black tracking-tighter uppercase italic leading-none w-full outline-none bg-transparent" 
//                       />
//                       <input 
//                         value={cvData.role} 
//                         onChange={e => setCvData({...cvData, role: e.target.value.toUpperCase()})} 
//                         className="text-xl font-bold text-zinc-400 tracking-[0.2em] uppercase outline-none bg-transparent w-full" 
//                       />
//                       <div className="flex gap-8 pt-4 text-[10px] font-black uppercase text-zinc-500 border-t border-white/10">
//                          <span className="flex items-center gap-2"><Mail size={12}/> <input value={cvData.email} onChange={e => setCvData({...cvData, email: e.target.value})} className="bg-transparent outline-none w-44"/></span>
//                          <span className="flex items-center gap-2"><MapPin size={12}/> <input value={cvData.location} onChange={e => setCvData({...cvData, location: e.target.value})} className="bg-transparent outline-none w-44"/></span>
//                       </div>
//                     </div>
//                     <div className="w-44 h-44 rounded-[2.5rem] border-[6px] border-white/20 p-1 shadow-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ml-10">
//                        <img src={session?.user?.image!} className="w-full h-full object-cover rounded-[1.8rem]" alt="Profile" />
//                     </div>
//                   </header>

//                   <div className="flex-1 p-16 grid grid-cols-12 gap-16 bg-white">
//                     <div className="col-span-8 space-y-16">
//                        <section>
//                           <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400 border-b pb-2 mb-6">Neural Summary</h4>
                          
//                           <textarea 
//                             ref={summaryRef}
//                             value={cvData.summary} 
//                             onChange={e => setCvData({...cvData, summary: e.target.value})} 
//                             className="w-full text-xl leading-[1.4] font-medium italic text-zinc-900 font-serif outline-none bg-transparent resize-none overflow-hidden" 
//                             rows={1}
//                           />
//                        </section>
                       
//                        <section>
//                           <div className="flex justify-between items-center border-b pb-2 mb-10">
//                              <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Tenure History</h4>
//                              <button onClick={() => setCvData({...cvData, experience: [{company: "NEW ENTITY", role: "SOFTWARE ENGINEER", period: "2026"}, ...cvData.experience]})} className="no-print p-1 bg-black text-white rounded-md transition"><Plus size={14}/></button>
//                           </div>
//                           <div className="space-y-12">
//                              {cvData.experience?.map((exp: any, i: number) => (
//                                <div key={i} className="relative pl-10 border-l-[3px] border-black group">
//                                   <div className="absolute -left-[11px] top-0 w-5 h-5 bg-white border-[4px] border-black rounded-full" />
//                                   <input value={exp.company} onChange={e => { const up = [...cvData.experience]; up[i].company = e.target.value.toUpperCase(); setCvData({...cvData, experience: up}); }} className="text-2xl font-black uppercase tracking-tighter outline-none bg-transparent w-full" />
//                                   <input value={exp.role} onChange={e => { const up = [...cvData.experience]; up[i].role = e.target.value; setCvData({...cvData, experience: up}); }} className="text-sm font-bold text-purple-600 uppercase mb-4 tracking-widest outline-none bg-transparent w-full" />
//                                   <button onClick={() => setCvData({...cvData, experience: cvData.experience.filter((_:any,idx:number)=>idx!==i)})} className="no-print absolute -right-6 top-0 text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 size={16}/></button>
//                                </div>
//                              ))}
//                           </div>
//                        </section>
//                     </div>

//                     <div className="col-span-4 space-y-16 border-l border-zinc-50 pl-12">
//                        <section>
//                           <div className="flex justify-between items-center border-b pb-2 mb-8">
//                              <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Technical DNA</h4>
//                              <Plus size={14} className="no-print cursor-pointer hover:text-purple-600" onClick={() => setCvData({...cvData, skills: [...cvData.skills, "NEW NODE"]})} />
//                           </div>
//                           <div className="flex flex-wrap gap-2">
//                              {cvData.skills?.map((s: string, i: number) => (
//                                <div key={i} className="group flex items-center gap-2 px-3 py-1 bg-zinc-100 text-[10px] font-black uppercase rounded relative">
//                                  <input value={s} onChange={e => { const up = [...cvData.skills]; up[i] = e.target.value; setCvData({...cvData, skills: up}); }} className="bg-transparent outline-none w-20" />
//                                  <X size={10} className="no-print cursor-pointer text-zinc-400 hover:text-red-500" onClick={() => setCvData({...cvData, skills: cvData.skills.filter((_:any, idx:number)=>idx!==i)})} />
//                                </div>
//                              ))}
//                           </div>
//                        </section>
//                     </div>
//                   </div>
//                </motion.div>
//              ) : (
//                <div className="h-[600px] border-2 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center text-center p-20 gap-6 opacity-20 no-print">
//                   <FileText className="w-20 h-20" />
//                   <p className="text-[11px] font-black uppercase tracking-[1em]">Neural Sync Pending</p>
//                </div>
//              )}
//            </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useTransition, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FileText, Sparkles, Cpu, Zap, Printer, 
//   Mail, MapPin, CheckCircle2, X, Plus, Trash2, FileCode 
// } from "lucide-react";
// import { generateSmartCV, polishCVSection } from "@/actions/generate-cv";
// import { toast } from "sonner";
// import { useSession } from "next-auth/react";

// export default function CVBuilderPage() {
//   const { data: session } = useSession();
//   const [cvData, setCvData] = useState<any>(null);
//   const [isPending, startTransition] = useTransition();
//   const [newSkill, setNewSkill] = useState("");

//   const handleSynthesize = () => {
//     startTransition(async () => {
//       const res = await generateSmartCV();
//       if (res.success) {
//         setCvData({
//           ...res.data,
//           name: session?.user?.name || "SAMIM",
//           email: session?.user?.email || "SAMIM@ZENITH.OS",
//           image: session?.user?.image,
//           role: "SENIOR FULL STACK ARCHITECT",
//           location: "BALKH, AFGHANISTAN"
//         });
//         toast.success("Identity Matrix Synchronized.");
//       }
//     });
//   };

//   return (
//     <div className="h-full flex flex-col gap-8 p-6 lg:p-12 bg-black text-white relative font-sans overflow-x-hidden">
      
//       {/* --- مهندسی دقیق پرینت برای حل مشکل هدر و عکس --- */}
//       <style dangerouslySetInnerHTML={{ __html: `
//         @media print {
//           @page { size: A4; margin: 0; }
          
//           /* ۱. مخفی کردن تمام اجزای سایت */
//           body * { visibility: hidden !important; }
          
//           /* ۲. نمایش فقط رزومه و تمام فرزندانش */
//           .cv-master-document, .cv-master-document * { 
//             visibility: visible !important; 
//           }

//           /* ۳. انتقال رزومه به بالاترین نقطه کاغذ */
//           .cv-master-document {
//             position: fixed !important;
//             left: 0 !important;
//             top: 0 !important;
//             width: 210mm !important;
//             height: auto !important;
//             margin: 0 !important;
//             padding: 10mm !important;
//             background: white !important;
//             color: black !important;
//             box-shadow: none !important;
//             border-radius: 0 !important;
//           }

//           /* ۴. تضمین چاپ هدر سیاه و عکس */
//           .print-header-black {
//             background-color: black !important;
//             -webkit-print-color-adjust: exact !important;
//             color: white !important;
//             display: flex !important;
//             width: 100% !important;
//           }
          
//           /* ۵. اصلاح ورودی‌ها برای چاپ */
//           input, textarea { 
//             border: none !important; 
//             background: transparent !important; 
//             color: inherit !important; 
//           }
          
//           .no-print { display: none !important; }
//         }
//       `}} />

//       {/* هدر HUD (فقط در سایت) */}
//       <div className="relative z-10 flex justify-between items-end border-b border-white/5 pb-10 no-print">
//         <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-none">
//           CV<span className="text-zinc-800">VAULT</span>
//         </h1>
//         <button 
//           onClick={() => window.print()} 
//           className="px-10 py-5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:shadow-[0_0_40px_#fff] transition-all"
//         >
//           Deploy PDF Matrix
//         </button>
//       </div>

//       <div className="grid grid-cols-12 gap-10">
//         {/* پنل چپ (no-print) */}
//         <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 no-print">
//            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-10">
//               <h3 className="text-xl font-bold italic uppercase text-purple-400">Data Sync</h3>
//               <div className="space-y-4">
//                  <div className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl">
//                     <span className="text-[9px] font-black text-zinc-500 tracking-widest uppercase">GitHub Assets</span>
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                  </div>
//               </div>
//               <button onClick={handleSynthesize} disabled={isPending} className="w-full py-6 bg-purple-600 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-purple-500 transition-all shadow-2xl">
//                 {isPending ? "Constructing..." : "Start Neural Build"}
//               </button>
//            </div>
//         </div>

//         {/* --- بوم رزومه (اصلی) --- */}
//         <div className="col-span-12 lg:col-span-8 relative">
//            <AnimatePresence mode="wait">
//              {cvData ? (
//                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="cv-master-document w-full bg-white text-black rounded-[3rem] shadow-2xl overflow-hidden flex flex-col min-h-[1100px]">
                  
//                   {/* هدر رزومه با استایل Executive */}
//                   <header className="print-header-black bg-black text-white p-16 flex justify-between items-center relative">
//                     <div className="space-y-6 flex-1 pr-10">
//                       <input 
//                         value={cvData.name} 
//                         onChange={e => setCvData({...cvData, name: e.target.value.toUpperCase()})} 
//                         className="text-6xl font-black tracking-tighter uppercase italic leading-none w-full outline-none bg-transparent" 
//                       />
//                       <input 
//                         value={cvData.role} 
//                         onChange={e => setCvData({...cvData, role: e.target.value.toUpperCase()})} 
//                         className="text-xl font-bold text-zinc-400 tracking-[0.2em] uppercase outline-none bg-transparent w-full" 
//                       />
//                       <div className="flex gap-8 pt-4 text-[10px] font-black uppercase text-zinc-500 border-t border-white/10">
//                          <span className="flex items-center gap-2"><Mail size={12}/> <input value={cvData.email} onChange={e => setCvData({...cvData, email: e.target.value})} className="bg-transparent outline-none w-44"/></span>
//                          <span className="flex items-center gap-2"><MapPin size={12}/> <input value={cvData.location} onChange={e => setCvData({...cvData, location: e.target.value})} className="bg-transparent outline-none w-44"/></span>
//                       </div>
//                     </div>
                    
//                     {/* تصویر پروفایل با ابهت */}
//                     <div className="w-44 h-44 rounded-[2.5rem] border-[6px] border-white/20 p-1 shadow-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
//                        <img src={session?.user?.image} className="w-full h-full object-cover rounded-[1.8rem]" />
//                     </div>
//                   </header>

//                   {/* بدنه رزومه */}
//                   <div className="flex-1 p-16 grid grid-cols-12 gap-16 bg-white">
//                     <div className="col-span-8 space-y-16">
//                        <section>
//                           <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400 border-b pb-2 mb-6">Neural Summary</h4>
//                           <textarea value={cvData.summary} onChange={e => setCvData({...cvData, summary: e.target.value})} className="w-full text-xl leading-[1.4] font-medium italic text-zinc-900 font-serif outline-none bg-transparent resize-none h-auto" rows={6} />
//                        </section>
                       
//                        <section>
//                           <div className="flex justify-between items-center border-b pb-2 mb-10">
//                              <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Tenure History</h4>
//                              <button onClick={() => setCvData({...cvData, experience: [{company: "NEW ENTITY", role: "SOFTWARE ENGINEER", period: "2026"}, ...cvData.experience]})} className="no-print p-1 bg-black text-white rounded-md"><Plus size={14}/></button>
//                           </div>
//                           <div className="space-y-12">
//                              {cvData.experience?.map((exp: any, i: number) => (
//                                <div key={i} className="relative pl-10 border-l-[3px] border-black group">
//                                   <div className="absolute -left-[11px] top-0 w-5 h-5 bg-white border-[4px] border-black rounded-full" />
//                                   <input value={exp.company} onChange={e => { const up = [...cvData.experience]; up[i].company = e.target.value.toUpperCase(); setCvData({...cvData, experience: up}); }} className="text-2xl font-black uppercase tracking-tighter outline-none bg-transparent w-full" />
//                                   <input value={exp.role} onChange={e => { const up = [...cvData.experience]; up[i].role = e.target.value; setCvData({...cvData, experience: up}); }} className="text-sm font-bold text-purple-600 uppercase mb-4 tracking-widest outline-none bg-transparent w-full" />
//                                   <button onClick={() => setCvData({...cvData, experience: cvData.experience.filter((_:any,idx:number)=>idx!==i)})} className="no-print absolute -right-6 top-0 text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
//                                </div>
//                              ))}
//                           </div>
//                        </section>
//                     </div>

//                     {/* اسکیل‌ها در ستون کناری */}
//                     <div className="col-span-4 space-y-16 border-l border-zinc-50 pl-12">
//                        <section>
//                           <div className="flex justify-between items-center border-b pb-2 mb-8">
//                              <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Technical DNA</h4>
//                              <Plus size={14} className="no-print cursor-pointer" onClick={() => setCvData({...cvData, skills: [...cvData.skills, "NEW NODE"]})} />
//                           </div>
//                           <div className="flex flex-wrap gap-2">
//                              {cvData.skills?.map((s: string, i: number) => (
//                                <div key={i} className="group flex items-center gap-2 px-3 py-1 bg-zinc-100 text-[10px] font-black uppercase rounded relative">
//                                  <input value={s} onChange={e => { const up = [...cvData.skills]; up[i] = e.target.value; setCvData({...cvData, skills: up}); }} className="bg-transparent outline-none w-20" />
//                                  <X size={10} className="no-print cursor-pointer text-zinc-400 hover:text-red-500" onClick={() => setCvData({...cvData, skills: cvData.skills.filter((_:any, idx:number)=>idx!==i)})} />
//                                </div>
//                              ))}
//                           </div>
//                        </section>
//                     </div>
//                   </div>
//                </motion.div>
//              ) : (
//                <div className="h-[600px] border-2 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center text-center p-20 gap-6 opacity-20 no-print">
//                   <FileText className="w-20 h-20" />
//                   <p className="text-[11px] font-black uppercase tracking-[1em]">Neural Sync Pending</p>
//                </div>
//              )}
//            </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState, useTransition, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FileText, Sparkles, Download, Cpu, 
//   Layers, ShieldCheck, Zap, ArrowRight,
//   Printer, Share2, Globe, FileCode, CheckCircle2,
//   X, Plus, Mail, MapPin, Smartphone
// } from "lucide-react";
// import { generateSmartCV } from "@/actions/generate-cv";
// import { toast } from "sonner";
// import { cn } from "@/lib/utils";
// import { useSession } from "next-auth/react";

// export default function CVBuilderPage() {
//   const { data: session } = useSession();
//   const [cvData, setCvData] = useState<any>(null);
//   const [isPending, startTransition] = useTransition();
//   const [format, setFormat] = useState("pdf");
//   const [newSkill, setNewSkill] = useState("");

//   const handleSynthesize = () => {
//     startTransition(async () => {
//       const res = await generateSmartCV();
//       if (res.success) {
//         setCvData(res.data);
//         toast.success("Professional DNA Synthesized.");
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col gap-8 p-4 lg:p-8 bg-black text-white font-sans overflow-x-hidden">
      
//       {/* استایل طلایی برای پرینت لبه به لبه و کامل */}
//       <style dangerouslySetInnerHTML={{ __html: `
//         @media print {
//           /* پنهان کردن کل سایت */
//           nav, aside, header, .no-print, .fixed { display: none !important; }
//           body, html { background: white !important; height: auto !important; overflow: visible !important; }
          
//           /* آزاد کردن رزومه از اسکرول دشبورد */
//           .cv-preview-canvas { 
//             position: absolute !important; left: 0 !important; top: 0 !important; 
//             width: 210mm !important; margin: 0 !important; padding: 15mm !important;
//             box-shadow: none !important; border-radius: 0 !important;
//             overflow: visible !important; height: auto !important;
//             display: block !important;
//           }
//           .main-grid-layout { display: block !important; }
//           @page { size: A4; margin: 0; }
//         }
//       `}} />

//       {/* --- ۱. هدر HUD (بدون تغییر) --- */}
//       <div className="relative z-10 flex justify-between items-end border-b border-white/5 pb-10 no-print">
//         <div className="space-y-4">
//           <div className="flex items-center gap-3">
//              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping" />
//              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.5em]">Neural Architect v1.0</span>
//           </div>
//           <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-none">
//             CV<span className="text-zinc-800">VAULT</span>
//           </h1>
//         </div>

//         <div className="flex gap-4">
//            <button onClick={() => window.print()} className="px-10 py-5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:shadow-[0_0_40px_#fff] transition-all">
//              Deploy PDF Matrix
//            </button>
//         </div>
//       </div>

//       {/* --- ۲. فضای کاری اصلی (Main Grid) --- */}
//       <div className="grid grid-cols-12 gap-10 main-grid-layout">
        
//         {/* بخش چپ: همون استایل Data Sync که میخواستی */}
//         <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 no-print">
//            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-10">
//               <div className="space-y-2">
//                  <h3 className="text-xl font-bold italic uppercase tracking-tight text-purple-400">Data Synchronization</h3>
//                  <p className="text-zinc-500 text-xs leading-relaxed">System is pulling assets from your verified GitHub projects.</p>
//               </div>

//               <div className="space-y-4">
//                  <div className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl">
//                     <div className="flex items-center gap-4">
//                        <FileCode className="w-4 h-4 text-cyan-400" />
//                        <span className="text-[10px] font-bold uppercase text-white">GitHub Assets</span>
//                     </div>
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                  </div>
//                  <div className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl">
//                     <div className="flex items-center gap-4">
//                        <Zap className="w-4 h-4 text-purple-400" />
//                        <span className="text-[10px] font-bold uppercase text-white">Skill Matrix</span>
//                     </div>
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                  </div>
//               </div>

//               <button 
//                 onClick={handleSynthesize}
//                 disabled={isPending}
//                 className="w-full py-6 bg-purple-600 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-purple-500 transition-all flex items-center justify-center gap-3"
//               >
//                 {isPending ? "Extracting DNA..." : <><Sparkles className="w-4 h-4" /> Start Neural Build</>}
//               </button>
//            </div>
//         </div>

//         {/* بخش راست: پیش‌نمایش تمام قد با هدر شخصی */}
//         <div className="col-span-12 lg:col-span-8 relative">
//            <AnimatePresence mode="wait">
//              {cvData ? (
//                <motion.div 
//                  initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
//                  className="cv-preview-canvas w-full bg-white text-black rounded-[3rem] p-16 lg:p-20 shadow-2xl relative"
//                >
//                   {/* --- هدر شیک و لوکس رزومه --- */}
//                   <header className="border-b-[5px] border-black pb-12 mb-12 flex justify-between items-center">
//                     <div className="space-y-4">
//                       <h2 className="text-7xl font-black tracking-tighter uppercase italic leading-none">{session?.user?.name}</h2>
//                       <div className="flex items-center gap-4">
//                         <p className="text-xl font-bold text-zinc-400 tracking-[0.2em] uppercase">Senior Full Stack Architect</p>
//                         <div className="h-4 w-[1px] bg-zinc-200" />
//                         <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Verified Identity</span>
//                       </div>
//                       <div className="flex gap-6 pt-2 text-[10px] font-black uppercase text-zinc-400">
//                          <span className="flex items-center gap-2"><Mail size={12} className="text-black"/> {session?.user?.email}</span>
//                          <span className="flex items-center gap-2"><MapPin size={12} className="text-black"/> Balkh, Afghanistan</span>
//                       </div>
//                     </div>
                    
//                     {/* تصویر پروفایل با ابهت */}
//                     <div className="w-44 h-44 rounded-[2.5rem] border-[6px] border-black p-1 rotate-3 shadow-2xl overflow-hidden grayscale contrast-125">
//                        <img src={session?.user?.image} className="w-full h-full object-cover rounded-[2rem]" />
//                     </div>
//                   </header>

//                   <div className="grid grid-cols-12 gap-16">
//                     {/* محتوای رزومه */}
//                     <div className="col-span-8 space-y-16">
//                        <section>
//                           <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400 border-b pb-2 mb-6">Neural Summary</h4>
//                           <p className="text-2xl leading-[1.4] font-medium italic text-zinc-900 font-serif">"{cvData.summary}"</p>
//                        </section>
                       
//                        <section>
//                           <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400 border-b pb-2 mb-10">Tenure History</h4>
//                           <div className="space-y-12">
//                              {cvData.experience?.map((exp: any, i: number) => (
//                                <div key={i} className="relative pl-10 border-l-[3px] border-black group">
//                                   <div className="absolute -left-[11px] top-0 w-5 h-5 bg-white border-[4px] border-black rounded-full" />
//                                   <h5 className="text-2xl font-black uppercase tracking-tighter">{exp.company}</h5>
//                                   <p className="text-sm font-bold text-purple-600 uppercase mb-4 tracking-widest">{exp.role}</p>
//                                   <p className="text-lg text-zinc-500 leading-relaxed italic">Architected high-scale neural systems and global cloud infrastructures.</p>
//                                </div>
//                              ))}
//                           </div>
//                        </section>
//                     </div>

//                     {/* ستون کناری */}
//                     <div className="col-span-4 space-y-16 border-l border-zinc-50 pl-12">
//                        <section>
//                           <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400 border-b pb-2 mb-8">Technical DNA</h4>
//                           <div className="flex flex-wrap gap-2">
//                              {cvData.skills?.map((s: string) => (
//                                <span key={s} className="px-3 py-1 bg-zinc-100 text-[10px] font-black uppercase rounded">{s}</span>
//                              ))}
//                           </div>
//                        </section>
//                     </div>
//                   </div>
                  
//                   {/* فوتر Certification */}
//                   <div className="mt-32 pt-10 border-t border-zinc-100 flex justify-between items-center opacity-30">
//                      <p className="text-[8px] font-black uppercase tracking-[1em]">Zenith Certified Architecture</p>
//                      <Zap size={20} className="fill-black" />
//                   </div>
//                </motion.div>
//              ) : (
//                <div className="h-[600px] border-2 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center text-center p-20 gap-6 opacity-20 no-print">
//                   <FileText className="w-20 h-20" />
//                   <p className="text-[11px] font-black uppercase tracking-[1em]">Awaiting Neural Synthesis</p>
//                </div>
//              )}
//            </AnimatePresence>
//         </div>

//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useTransition } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FileText, Sparkles, Download, Cpu, 
//   Layers, ShieldCheck, Zap, ArrowRight,
//   Printer, Share2, Globe, FileCode,CheckCircle2
// } from "lucide-react";
// import { generateSmartCV } from "@/actions/generate-cv";
// import { toast } from "sonner";
// import { cn } from "@/lib/utils";

// export default function CVBuilderPage() {
//   const [cvData, setCvData] = useState<any>(null);
//   const [isPending, startTransition] = useTransition();
//   const [format, setFormat] = useState("pdf");

//   const handleSynthesize = () => {
//     startTransition(async () => {
//       const res = await generateSmartCV();
//       if (res.success) {
//         setCvData(res.data);
//         toast.success("Professional DNA Synthesized.");
//       } else {
//         toast.error("Synthesis Failed.");
//       }
//     });
//   };

//   return (
//     <div className="h-[calc(100vh-80px)] flex flex-col gap-8 p-6 lg:p-12 bg-black text-white relative overflow-hidden font-sans">
      
//       {/* --- ۱. محیط هدر (HUD) --- */}
//       <div className="relative z-10 flex justify-between items-end border-b border-white/5 pb-10">
//         <div className="space-y-4">
//           <div className="flex items-center gap-3">
//              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping" />
//              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.5em]">Neural Architect v1.0</span>
//           </div>
//           <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-none">
//             CV<span className="text-zinc-800">VAULT</span>
//           </h1>
//         </div>

//         <div className="flex gap-4">
//            <select 
//              value={format} 
//              onChange={(e) => setFormat(e.target.value)}
//              className="bg-white/5 border border-white/10 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest outline-none focus:border-purple-500 transition-all"
//            >
//               <option value="pdf">Export PDF</option>
//               <option value="json">Export JSON</option>
//               <option value="html">Export HTML</option>
//            </select>
//            <button 
//              onClick={() => window.print()}
//              className="px-10 py-5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:shadow-[0_0_40px_#fff] transition-all"
//            >
//              Download Document
//            </button>
//         </div>
//       </div>

//       {/* --- ۲. فضای کاری (Workspace) --- */}
//       <div className="flex-1 grid grid-cols-12 gap-10 overflow-hidden">
        
//         {/* بخش چپ: کنترلر (Data Feed) */}
//         <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-4 custom-scrollbar">
//            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-10">
//               <div className="space-y-2">
//                  <h3 className="text-xl font-bold italic uppercase tracking-tight text-purple-400">Data Synchronization</h3>
//                  <p className="text-zinc-500 text-xs leading-relaxed">System is pulling assets from your verified GitHub projects and Neural Resume Score.</p>
//               </div>

//               <div className="space-y-4">
//                  <div className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl">
//                     <div className="flex items-center gap-4">
//                        <FileCode className="w-4 h-4 text-cyan-400" />
//                        <span className="text-[10px] font-bold uppercase">GitHub Assets</span>
//                     </div>
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                  </div>
//                  <div className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-2xl">
//                     <div className="flex items-center gap-4">
//                        <Zap className="w-4 h-4 text-purple-400" />
//                        <span className="text-[10px] font-bold uppercase">Skill Matrix</span>
//                     </div>
//                     <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                  </div>
//               </div>

//               <button 
//                 onClick={handleSynthesize}
//                 disabled={isPending}
//                 className="w-full py-6 bg-purple-600 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-purple-500 transition-all flex items-center justify-center gap-3"
//               >
//                 {isPending ? "Synthesizing..." : <><Sparkles className="w-4 h-4" /> Start Neural Build</>}
//               </button>
//            </div>
//         </div>

//         {/* بخش راست: پیش‌نمایش (Cinematic Preview) */}
//         <div className="col-span-12 lg:col-span-8 relative">
//            <AnimatePresence mode="wait">
//              {cvData ? (
//                <motion.div 
//                  initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}
//                  className="w-full h-full cv-preview-canvas rounded-t-[4rem] p-20 overflow-y-auto shadow-2xl"
//                >
//                   {/* خروجی واقعی CV در سطح لوکس */}
//                   <div className="max-w-3xl mx-auto">
//                      <header className="border-b-4 border-black pb-10 mb-10">
//                         <h2 className="text-6xl font-black tracking-tighter uppercase italic">{cvData.name || "COMMANDER"}</h2>
//                         <p className="text-xl font-bold text-zinc-600 uppercase tracking-widest mt-2">Senior Full Stack Architect</p>
//                      </header>

//                      <section className="space-y-12">
//                         <div className="space-y-4">
//                            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400 border-b pb-2">Profile Summary</h4>
//                            <p className="text-lg leading-relaxed font-medium">{cvData.summary}</p>
//                         </div>

//                         <div className="grid grid-cols-2 gap-10">
//                            <div className="space-y-6">
//                               <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400 border-b pb-2">Technical Vault</h4>
//                               <div className="flex flex-wrap gap-2">
//                                  {cvData.skills?.map((s: string) => (
//                                    <span key={s} className="px-3 py-1 bg-zinc-100 text-[10px] font-black uppercase">{s}</span>
//                                  ))}
//                               </div>
//                            </div>
//                            <div className="space-y-6">
//                               <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400 border-b pb-2">Core Impact</h4>
//                               <ul className="space-y-2">
//                                  {cvData.impactMetrics?.map((m: string, i: number) => (
//                                    <li key={i} className="text-[11px] font-bold uppercase tracking-tight flex items-start gap-2">
//                                       <div className="w-1 h-1 bg-black mt-1.5 rounded-full" /> {m}
//                                    </li>
//                                  ))}
//                               </ul>
//                            </div>
//                         </div>
//                      </section>
//                   </div>
//                </motion.div>
//              ) : (
//                <div className="w-full h-full border-2 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center text-center p-20 gap-6 opacity-20">
//                   <FileText className="w-20 h-20" />
//                   <p className="text-[11px] font-black uppercase tracking-[1em]">Awaiting Data Synthesis</p>
//                </div>
//              )}
//            </AnimatePresence>
//         </div>

//       </div>
//     </div>
//   );
// }
