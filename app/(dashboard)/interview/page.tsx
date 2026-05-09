"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, Sparkles, Activity, Cpu, ChevronRight, 
  Square, ShieldAlert, Radio, Volume2, BrainCircuit
} from "lucide-react";
import { startInterviewSession } from "@/actions/interview-coach";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// دسترسی به API تشخیص صدای مرورگر
const SpeechRecognition = typeof window !== "undefined" ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null;

export default function InterviewCoachPage() {
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null); // برای اسکرول خودکار

  // اسکرول به آخرین پیام
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  // ۱. راه‌اندازی موتور تشخیص صدا
  useEffect(() => {
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join("");
        setInput(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
        toast.error("Vocal Link Fractured. Check Microphone.");
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      handleChat();
    } else {
      setInput("");
      recognitionRef.current?.start();
      setIsRecording(true);
      toast.info("Neural Audio Link: ACTIVE");
    }
  };

  const handleChat = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isPending) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    startTransition(async () => {
      const history = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));
      const res = await startInterviewSession(currentInput, history);
      if (res.text) setMessages(prev => [...prev, { role: "model", text: res.text }]);
    });
  };

  return (
    <div className="h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] flex flex-col gap-4 md:gap-6 relative font-sans overflow-hidden p-2 md:p-0">
      
      {/* --- ۱. BIOMETRIC STATUS HUD (با گرادینت لوکس) --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {[
          { label: "Neural Stress", val: isRecording ? "Analyzing..." : "Stable", bg: "from-cyan-500/10 to-transparent", color: "text-cyan-400", icon: Activity },
          { label: "Vocal Clarity", val: isRecording ? "Active Sync" : "Standby", bg: "from-purple-500/10 to-transparent", color: "text-purple-500", icon: Radio },
          { label: "Logic Score", val: "Calculating", bg: "from-emerald-500/10 to-transparent", color: "text-emerald-500", icon: BrainCircuit },
        ].map((s, i) => (
          <div key={i} className={cn("bg-[#08080c] border border-white/5 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] flex items-center justify-between shadow-2xl relative overflow-hidden group", i === 2 && "hidden md:flex")}>
             <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 group-hover:opacity-100 transition-opacity", s.bg)} />
             <div className="space-y-1 relative z-10">
                <p className="text-[6px] md:text-[7px] font-black text-zinc-600 uppercase tracking-[0.4em]">{s.label}</p>
                <p className={cn("text-xs md:text-lg font-black italic tracking-tighter uppercase", s.color)}>{s.val}</p>
             </div>
             <s.icon className={cn("w-4 h-4 md:w-5 md:h-5 relative z-10", s.color)} />
          </div>
        ))}
      </div>

      {/* --- ۲. INTERROGATION CHAMBER --- */}
      <div className="flex-1 bg-black border border-white/5 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)]">
        <div className="absolute inset-0 bg-[url('https://vercel.app')] opacity-[0.03] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e1b4b_0%,transparent 50%)] opacity-30" />
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 md:space-y-12 relative z-10 custom-scrollbar scroll-smooth">
           {messages.length === 0 && (
             <div className="h-full flex flex-col items-center justify-center text-center space-y-6 md:space-y-8">
                <div className="relative">
                   <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
                   <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center relative bg-black/50">
                      <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-500 animate-bounce" />
                   </div>
                </div>
                <div className="space-y-2">
                   <h3 className="text-lg md:text-xl font-black text-white italic uppercase tracking-[0.2em]">Ready for Interrogation?</h3>
                   <p className="text-[8px] md:text-[9px] font-bold text-zinc-600 uppercase tracking-[0.5em]">Speak or type to initialize simulation</p>
                </div>
             </div>
           )}

           <AnimatePresence mode="popLayout">
             {messages.map((m, i) => (
               <motion.div 
                 initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} 
                 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                 key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
               >
                  <div className={cn(
                    "max-w-[90%] md:max-w-[75%] p-5 md:p-8 rounded-2xl md:rounded-[3rem] text-sm md:text-xl font-medium tracking-tight",
                    m.role === "user" 
                      ? "bg-white text-black rounded-tr-none shadow-[0_20px_50px_rgba(255,255,255,0.1)]" 
                      : "bg-zinc-900/50 border border-white/10 text-zinc-100 rounded-tl-none italic font-light"
                  )}>
                    {m.text}
                  </div>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>

        {/* --- ۳. NEURAL AUDIO INPUT HUD --- */}
        <div className="p-4 md:p-10 bg-[#050508]/80 backdrop-blur-3xl border-t border-white/5 relative z-20">
          <AnimatePresence>
            {isRecording && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 40 }} 
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-center gap-1 md:gap-1.5 mb-6 md:mb-8 items-center overflow-hidden"
              >
                 {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 40)].map((_, i) => (
                   <motion.div 
                     key={i}
                     animate={{ height: [4, Math.random() * 32 + 4, 4] }}
                     transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.02 }}
                     className="w-0.5 md:w-1 bg-gradient-to-t from-red-600 to-purple-500 rounded-full"
                   />
                 ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-8">
             <div className="relative group">
                <div className={cn(
                  "absolute -inset-4 rounded-full blur-2xl opacity-0 transition-opacity duration-700",
                  isRecording ? "bg-red-500/20 opacity-100" : "bg-purple-500/10 group-hover:opacity-100"
                )} />
                <button 
                  onClick={toggleRecording}
                  className={cn(
                    "w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-700 relative z-10 border shadow-2xl",
                    isRecording 
                      ? "bg-red-600 border-red-400 scale-110 shadow-red-500/40" 
                      : "bg-white border-white/20 text-black hover:bg-purple-600 hover:text-white"
                  )}
                >
                  {isRecording ? <Square fill="white" className="w-6 h-6 md:w-8 md:h-8 animate-pulse" /> : <Mic className="w-6 h-6 md:w-8 md:h-8" />}
                </button>
             </div>

             <form onSubmit={handleChat} className="w-full flex-1 relative group">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isRecording ? "Listening..." : "Type your response..."}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 md:py-6 px-6 md:px-10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-xs md:text-lg italic"
                />
                <button 
                  disabled={isPending}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white rounded-full text-black hover:bg-purple-500 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useTransition, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Mic, Sparkles, Activity, Cpu, ChevronRight, 
//   Square, ShieldAlert, Radio, Volume2, BrainCircuit
// } from "lucide-react";
// import { startInterviewSession } from "@/actions/interview-coach";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";

// // دسترسی به API تشخیص صدای مرورگر
// const SpeechRecognition = typeof window !== "undefined" ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null;

// export default function InterviewCoachPage() {
//   const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
//   const [isRecording, setIsRecording] = useState(false);
//   const [input, setInput] = useState("");
//   const [isPending, startTransition] = useTransition();
//   const recognitionRef = useRef<any>(null);

//   // ۱. راه‌اندازی موتور تشخیص صدا
//   useEffect(() => {
//     if (SpeechRecognition) {
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = true;
//       recognitionRef.current.lang = "en-US"; // می‌توانید به fa-IR تغییر دهید

//       recognitionRef.current.onresult = (event: any) => {
//         const transcript = Array.from(event.results)
//           .map((result: any) => result[0])
//           .map((result: any) => result.transcript)
//           .join("");
//         setInput(transcript);
//       };

//       recognitionRef.current.onerror = () => {
//         setIsRecording(false);
//         toast.error("Vocal Link Fractured. Check Microphone.");
//       };
//     }
//   }, []);

//   const toggleRecording = () => {
//     if (isRecording) {
//       recognitionRef.current?.stop();
//       setIsRecording(false);
//       handleChat(); // بعد از اتمام ضبط، خودکار ارسال شود
//     } else {
//       setInput("");
//       recognitionRef.current?.start();
//       setIsRecording(true);
//       toast.info("Neural Audio Link: ACTIVE");
//     }
//   };

//   const handleChat = (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!input.trim() || isPending) return;

//     const userMsg = { role: "user", text: input };
//     setMessages(prev => [...prev, userMsg]);
//     const currentInput = input;
//     setInput("");

//     startTransition(async () => {
//       const history = messages.map(m => ({
//         role: m.role === "user" ? "user" : "model",
//         parts: [{ text: m.text }]
//       }));
//       const res = await startInterviewSession(currentInput, history);
//       if (res.text) setMessages(prev => [...prev, { role: "model", text: res.text }]);
//     });
//   };

//   return (
//     <div className="h-[calc(100vh-140px)] flex flex-col gap-6 relative font-sans overflow-hidden md:gap-6 relative font-sans overflow-hidden p-2 md:p-0">
      
//       {/* --- ۱. BIOMETRIC STATUS HUD --- */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {[
//           { label: "Neural Stress", val: isRecording ? "Analyzing..." : "Stable", color: "text-cyan-400", icon: Activity },
//           { label: "Vocal Clarity", val: isRecording ? "Active Sync" : "Standby", color: "text-purple-500", icon: Radio },
//           { label: "Logic Score", val: "Calculating", color: "text-emerald-500", icon: BrainCircuit },
//         ].map((s, i) => (
//           <div key={i} className="bg-[#08080c] border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between shadow-2xl relative overflow-hidden group">
//              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//              <div className="space-y-1 relative z-10">
//                 <p className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.4em]">{s.label}</p>
//                 <p className={cn("text-lg font-black italic tracking-tighter uppercase", s.color)}>{s.val}</p>
//              </div>
//              <s.icon className={cn("w-5 h-5 opacity-20 relative z-10", s.color)} />
//           </div>
//         ))}
//       </div>

//       {/* --- ۲. INTERROGATION CHAMBER --- */}
//       <div className="flex-1 bg-black border border-white/5 rounded-[4rem] relative overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)]">
//         <div className="absolute inset-0 bg-[url('https://vercel.app')] opacity-[0.03] pointer-events-none" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e1b4b_0%,transparent 50%)] opacity-30" />
        
//         <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 md:space-y-12 relative z-10 custom-scrollbar">
//            {messages.length === 0 && (
//              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 md:space-y-8">
//                 <div className="relative">
//                    <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
//                    <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center relative bg-black/50">
//                       <Sparkles className="w-8 h-8 text-purple-500 animate-bounce" />
//                    </div>
//                 </div>
//                 <div className="space-y-2">
//                    <h3 className="text-xl font-black text-white italic uppercase tracking-[0.2em]">Ready for Interrogation?</h3>
//                    <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.5em]">Speak or type to initialize simulation</p>
//                 </div>
//              </div>
//            )}

//            <AnimatePresence mode="popLayout">
//              {messages.map((m, i) => (
//                <motion.div 
//                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} 
//                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//                  key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
//                >
//                   <div className={cn(
//                     "max-w-[75%] p-8 rounded-[3rem] text-xl font-medium tracking-tight",
//                     m.role === "user" 
//                       ? "bg-white text-black rounded-tr-none shadow-[0_20px_50px_rgba(255,255,255,0.1)]" 
//                       : "bg-zinc-900/50 border border-white/10 text-zinc-100 rounded-tl-none italic font-light"
//                   )}>
//                     {m.text}
//                   </div>
//                </motion.div>
//              ))}
//            </AnimatePresence>
//         </div>

//         {/* --- ۳. NEURAL AUDIO INPUT HUD --- */}
//         <div className="p-10 bg-[#050508]/80 backdrop-blur-3xl border-t border-white/5 relative z-20">
//           <div className="max-w-5xl mx-auto flex items-center gap-8">
             
//              {/* دکمه ضبط فوق لوکس */}
//              <div className="relative group">
//                 <div className={cn(
//                   "absolute -inset-4 rounded-full blur-2xl opacity-0 transition-opacity duration-700",
//                   isRecording ? "bg-red-500/20 opacity-100" : "bg-purple-500/10 group-hover:opacity-100"
//                 )} />
//                 <button 
//                   onClick={toggleRecording}
//                   className={cn(
//                     "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 relative z-10 border shadow-2xl",
//                     isRecording 
//                       ? "bg-red-600 border-red-400 scale-110 shadow-red-500/40" 
//                       : "bg-white border-white/20 text-black hover:bg-purple-600 hover:text-white"
//                   )}
//                 >
//                   {isRecording ? <Square fill="white" className="w-8 h-8 animate-pulse" /> : <Mic className="w-8 h-8" />}
//                 </button>
//              </div>

//              {/* ورودی متن دستی */}
//              <form onSubmit={handleChat} className="flex-1 relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-400/20 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-1000" />
//                 <input 
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder={isRecording ? "Listening to your neural signals..." : "ENTER COMMAND OR SPEAK..."} 
//                   className="w-full bg-white/[0.03] border border-white/10 rounded-[2.5rem] px-10 py-7 text-sm font-black uppercase tracking-[0.3em] outline-none focus:border-purple-500/50 transition-all placeholder:text-zinc-800 relative z-10"
//                 />
//                 <button 
//                   disabled={isPending}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white text-black rounded-full hover:bg-cyan-400 transition-all active:scale-90 shadow-2xl z-20"
//                 >
//                    <ChevronRight className="w-6 h-6" />
//                 </button>
//              </form>
//           </div>

//           {/* ویژوالایزر موج صوتی زنده (Fake Waveform for UX) */}
//           <AnimatePresence>
//             {isRecording && (
//               <motion.div 
//                 initial={{ opacity: 0, height: 0 }} 
//                 animate={{ opacity: 1, height: 40 }} 
//                 exit={{ opacity: 0, height: 0 }}
//                 className="flex justify-center gap-1.5 mt-8 items-center overflow-hidden"
//               >
//                  {[...Array(40)].map((_, i) => (
//                    <motion.div 
//                      key={i}
//                      animate={{ height: [4, Math.random() * 32 + 4, 4] }}
//                      transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.02 }}
//                      className="w-1 bg-gradient-to-t from-red-600 to-purple-500 rounded-full"
//                    />
//                  ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//     </div>
//   );
// }
