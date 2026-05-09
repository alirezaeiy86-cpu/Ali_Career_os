"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Command, Terminal, ChevronRight, Activity, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendMessageToMentor } from "@/actions/mentor-chat";

export default function MentorPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isPending]);

  const handleExecute = () => {
    if (!input.trim() || isPending) return;
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    const prompt = input;
    setInput("");

    startTransition(async () => {
      const res = await sendMessageToMentor(prompt);
      if (res.success) {
        setMessages(prev => [...prev, { role: "model", content: res.text }]);
      }
    });
  };

  return (
    <div className="h-[calc(100vh-0px)] md:h-[calc(100vh-60px)] flex flex-col bg-[#050505] text-white selection:bg-white/20 font-sans relative overflow-hidden">
      
      {/* --- ۱. محیط بصری (Cinematic Background) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/10 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      {/* --- ۲. نوار وضعیت هوشمند (Adaptive HUD) --- */}
      <div className="relative z-30 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-xl bg-black/20">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-[10px] md:text-sm font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-glow-white">Neural Interface</h1>
            <p className="text-[8px] md:text-[10px] text-zinc-500 font-bold uppercase mt-0.5">v9.8.2 Protocol</p>
          </div>
        </div>

        <div className="flex gap-4 md:gap-10">
          <div className="flex items-center gap-2">
            <Activity className="w-2.5 h-2.5 text-emerald-500 animate-pulse" />
            <span className="hidden xs:block text-[8px] font-black uppercase text-zinc-500 tracking-widest">Live</span>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-4 md:pl-10">
            <ShieldCheck className="w-2.5 h-2.5 text-purple-500" />
            <span className="hidden xs:block text-[8px] font-black uppercase text-zinc-500 tracking-widest">Encrypted</span>
          </div>
        </div>
      </div>

      {/* --- ۳. محتوای گفتگو (The Neural Stream) --- */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-20 lg:px-40 py-10 md:py-20 space-y-12 md:space-y-24 relative z-10 custom-scrollbar"
      >
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="h-full flex flex-col items-center justify-center space-y-8"
            >
               <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-white/10 flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-white/[0.02] rounded-full group-hover:bg-white/[0.05] transition-all duration-700" />
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-zinc-600 group-hover:text-white transition-all duration-700" />
               </div>
               <p className="text-[8px] md:text-[10px] font-black text-zinc-700 uppercase tracking-[1.5em] text-center">Awaiting Command</p>
            </motion.div>
          )}

          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              key={i} 
              className={cn("flex flex-col", msg.role === 'model' ? "items-start" : "items-end")}
            >
              <div className="max-w-[90%] md:max-w-4xl space-y-3">
                 {msg.role === 'model' && (
                   <div className="flex items-center gap-2 opacity-30 mb-2">
                      <Terminal className="w-3 h-3" />
                      <span className="text-[7px] font-black uppercase tracking-widest">Response Stream</span>
                   </div>
                 )}
                 
                 <p className={cn(
                   "text-lg md:text-3xl lg:text-4xl font-light tracking-tight leading-relaxed",
                   msg.role === 'model' 
                    ? "text-zinc-300 italic border-l-2 border-white/5 pl-4 md:pl-8" 
                    : "text-white font-medium text-right text-glow-white bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0"
                 )}>
                   {msg.content}
                 </p>

                 {msg.role === 'user' && (
                    <div className="flex justify-end gap-2 pt-2 opacity-10">
                       <div className="w-8 md:w-16 h-[1px] bg-white mt-2" />
                    </div>
                 )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isPending && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
             <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <div className="flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}} />)}
                </div>
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest italic">Processing...</span>
             </div>
          </motion.div>
        )}
      </div>

      {/* --- ۴. ورودی دستور (The Command Horizon) --- */}
      <div className="relative z-40 px-4 pb-6 md:pb-12 md:px-20 lg:px-40">
        <div className="relative group max-w-5xl mx-auto">
          {/* Ambient Glow */}
          <div className="absolute -inset-2 bg-gradient-to-t from-purple-500/10 to-transparent blur-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-1000" />
          
          <div className="relative flex items-center gap-3 md:gap-6 border-b border-white/10 py-4 md:py-6 bg-black/40 backdrop-blur-md px-2">
             <Command className="w-4 h-4 md:w-5 md:h-5 text-zinc-600 hidden xs:block" />
             <input 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
               placeholder="System Command..." 
               className="flex-1 bg-transparent text-lg md:text-2xl font-light text-white outline-none placeholder:text-zinc-800 tracking-tight italic"
             />
             <button 
               onClick={handleExecute}
               disabled={isPending}
               className="w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50"
             >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
             </button>
          </div>
          
          <div className="flex justify-between mt-3 px-1">
             <span className="text-[6px] md:text-[7px] font-black text-zinc-700 uppercase tracking-[0.3em]">Protocol: AES-256</span>
             <span className="text-[6px] md:text-[7px] font-black text-zinc-700 uppercase tracking-[0.3em]">© 2026 ZENITH</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .text-glow-white {
          text-shadow: 0 0 15px rgba(255,255,255,0.3);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        @media (max-width: 640px) {
          .text-glow-white {
            text-shadow: 0 0 8px rgba(255,255,255,0.2);
          }
        }
      `}</style>
    </div>
  );
}

// "use client";

// import { useState, useTransition, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Zap, Command, Terminal, ChevronRight, Activity, ShieldCheck, Sparkles } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { sendMessageToMentor } from "@/actions/mentor-chat";

// export default function MentorPage() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<any[]>([]);
//   const [isPending, startTransition] = useTransition();
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//   }, [messages, isPending]);

//   const handleExecute = () => {
//     if (!input.trim() || isPending) return;
//     const userMsg = { role: "user", content: input };
//     setMessages(prev => [...prev, userMsg]);
//     const prompt = input;
//     setInput("");

//     startTransition(async () => {
//       const res = await sendMessageToMentor(prompt);
//       if (res.success) {
//         setMessages(prev => [...prev, { role: "model", content: res.text }]);
//       }
//     });
//   };

//   return (
//     <div className="h-[calc(100vh-60px)] flex flex-col bg-black text-white selection:bg-white/20 font-sans relative overflow-hidden">
      
//       {/* --- ۱. محیط بصری (Cinematic Background) --- */}
//       <div className="absolute inset-0 neural-canvaس pointer-events-none" />
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-600/5 blur-[120px] rounded-full" />
//       {[...Array(20)].map((_, i) => (
//         <div key={i} className="floating-node" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 10}s` }} />
//       ))}

//       {/* --- ۲. نوار وضعیت فوق لوکس (HUD) --- */}
//       <div className="relative z-10 px-8 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-md">
//         <div className="flex items-center gap-6">
//           <div className="flex flex-col">
//             <h1 className="text-sm font-black tracking-[0.5em] uppercase text-glow-white">Neural Interface</h1>
//             <p className="text-[12px] text-zinc-600 font-bold uppercase mt-1">Authorized Command Center v9.8.2</p>
//           </div>
//         </div>

//         <div className="flex gap-10">
//           <div className="flex items-center gap-3">
//             <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
//             <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Link: Optimal</span>
//           </div>
//           <div className="flex items-center gap-3 border-l border-white/10 pl-10">
//             <ShieldCheck className="w-3 h-3 text-purple-500" />
//             <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Security: Level 5</span>
//           </div>
//         </div>
//       </div>

//       {/* --- ۳. محتوای گفتگو (The Neural Stream) --- */}
//       <div 
//         ref={scrollRef}
//         className="flex-1 overflow-y-auto px-6 lg:px-40 py-20 space-y-24 relative z-10 custom-scrollbar scroll-smooth"
//       >
//         <AnimatePresence>
//           {messages.length === 0 && (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center space-y-12">
//                <div className="w-32 h-32 rounded-full border border-white/5 flex items-center justify-center relative overflow-hidden group">
//                   <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.05] transition-all" />
//                   <Sparkles className="w-8 h-8 text-zinc-700 group-hover:text-white transition-all duration-1000" />
//                </div>
//                <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[2em]">Initiate Trajectory</p>
//             </motion.div>
//           )}

//           {messages.map((msg, i) => (
//             <motion.div 
//               initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
//               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
//               key={i} 
//               className={cn("flex flex-col", msg.role === 'model' ? "items-start" : "items-end")}
//             >
//               <div className="max-w-4xl space-y-4">
//                  {msg.role === 'model' && (
//                    <div className="flex items-center gap-3 opacity-20">
//                       <Terminal className="w-3 h-3" />
//                       <span className="text-[8px] font-black uppercase tracking-[0.4em]">Core Logic Output</span>
//                    </div>
//                  )}
                 
//                  <p className={cn(
//                    "text-2xl md:text-4xl font-light tracking-tight leading-[1.3]",
//                    msg.role === 'model' ? "text-white/90 italic" : "text-white font-black text-right text-glow-white"
//                  )}>
//                    {msg.content}
//                  </p>

//                  {msg.role === 'user' && (
//                     <div className="flex justify-end gap-2 pt-4 opacity-20">
//                        <div className="w-1 h-1 rounded-full bg-white" />
//                        <div className="w-10 h-[1px] bg-white mt-0.5" />
//                     </div>
//                  )}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {isPending && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
//              <div className="flex items-center gap-6">
//                 <div className="flex gap-1">
//                    {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}} />)}
//                 </div>
//                 <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em] italic">Synthesizing Neural Response...</span>
//              </div>
//           </motion.div>
//         )}
//       </div>

//       {/* --- ۴. ورودی دستور (The Command Horizon) --- */}
//       <div className="relative z-20 px-8 pb-12 lg:px-40">
//         <div className="relative group max-w-5xl mx-auto">
//           <div className="absolute -inset-1 bg-white/5 blur-3xl opacity-0 group-focus-within:opacity-100 transition-all duration-1000" />
          
//           <div className="relative flex items-center gap-6 border-b border-white/10 py-6">
//              <Command className="w-5 h-5 text-zinc-700" />
//              <input 
//                value={input}
//                onChange={(e) => setInput(e.target.value)}
//                onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
//                placeholder="Enter Neural Command..." 
//                className="flex-1 bg-transparent text-2xl font-light text-white outline-none placeholder:text-zinc-900 tracking-tight italic"
//              />
//              <button 
//                onClick={handleExecute}
//                disabled={isPending}
//                className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_40px_#fff]"
//              >
//                 <ChevronRight className="w-6 h-6" />
//              </button>
//           </div>
//           <div className="flex justify-between mt-4">
//              <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.5em]">Input Protocol Alpha</span>
//              <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.5em]">Zenith OS © 2026</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

