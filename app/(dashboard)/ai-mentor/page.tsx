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
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
    <div className="h-[calc(100vh-60px)] flex flex-col bg-black text-white selection:bg-white/20 font-sans relative overflow-hidden">
      
      {/* --- ۱. محیط بصری (Cinematic Background) --- */}
      <div className="absolute inset-0 neural-canvaس pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-600/5 blur-[120px] rounded-full" />
      {[...Array(20)].map((_, i) => (
        <div key={i} className="floating-node" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 10}s` }} />
      ))}

      {/* --- ۲. نوار وضعیت فوق لوکس (HUD) --- */}
      <div className="relative z-10 px-8 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-sm font-black tracking-[0.5em] uppercase text-glow-white">Neural Interface</h1>
            <p className="text-[12px] text-zinc-600 font-bold uppercase mt-1">Authorized Command Center v9.8.2</p>
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex items-center gap-3">
            <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Link: Optimal</span>
          </div>
          <div className="flex items-center gap-3 border-l border-white/10 pl-10">
            <ShieldCheck className="w-3 h-3 text-purple-500" />
            <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Security: Level 5</span>
          </div>
        </div>
      </div>

      {/* --- ۳. محتوای گفتگو (The Neural Stream) --- */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 lg:px-40 py-20 space-y-24 relative z-10 custom-scrollbar scroll-smooth"
      >
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center space-y-12">
               <div className="w-32 h-32 rounded-full border border-white/5 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.05] transition-all" />
                  <Sparkles className="w-8 h-8 text-zinc-700 group-hover:text-white transition-all duration-1000" />
               </div>
               <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[2em]">Initiate Trajectory</p>
            </motion.div>
          )}

          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              key={i} 
              className={cn("flex flex-col", msg.role === 'model' ? "items-start" : "items-end")}
            >
              <div className="max-w-4xl space-y-4">
                 {msg.role === 'model' && (
                   <div className="flex items-center gap-3 opacity-20">
                      <Terminal className="w-3 h-3" />
                      <span className="text-[8px] font-black uppercase tracking-[0.4em]">Core Logic Output</span>
                   </div>
                 )}
                 
                 <p className={cn(
                   "text-2xl md:text-4xl font-light tracking-tight leading-[1.3]",
                   msg.role === 'model' ? "text-white/90 italic" : "text-white font-black text-right text-glow-white"
                 )}>
                   {msg.content}
                 </p>

                 {msg.role === 'user' && (
                    <div className="flex justify-end gap-2 pt-4 opacity-20">
                       <div className="w-1 h-1 rounded-full bg-white" />
                       <div className="w-10 h-[1px] bg-white mt-0.5" />
                    </div>
                 )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isPending && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
             <div className="flex items-center gap-6">
                <div className="flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}} />)}
                </div>
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em] italic">Synthesizing Neural Response...</span>
             </div>
          </motion.div>
        )}
      </div>

      {/* --- ۴. ورودی دستور (The Command Horizon) --- */}
      <div className="relative z-20 px-8 pb-12 lg:px-40">
        <div className="relative group max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-white/5 blur-3xl opacity-0 group-focus-within:opacity-100 transition-all duration-1000" />
          
          <div className="relative flex items-center gap-6 border-b border-white/10 py-6">
             <Command className="w-5 h-5 text-zinc-700" />
             <input 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
               placeholder="Enter Neural Command..." 
               className="flex-1 bg-transparent text-2xl font-light text-white outline-none placeholder:text-zinc-900 tracking-tight italic"
             />
             <button 
               onClick={handleExecute}
               disabled={isPending}
               className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_40px_#fff]"
             >
                <ChevronRight className="w-6 h-6" />
             </button>
          </div>
          <div className="flex justify-between mt-4">
             <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.5em]">Input Protocol Alpha</span>
             <span className="text-[7px] font-black text-zinc-800 uppercase tracking-[0.5em]">Zenith OS © 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}



// "use client";

// import { useState, useTransition, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Send, Bot, Sparkles, Zap, Terminal, 
//   Activity, Cpu, ShieldAlert, CpuIcon,
//   Mic, Share2, Maximize2
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { sendMessageToMentor } from "@/actions/mentor-chat";
// import { toast } from "sonner";

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
//       } else {
//         toast.error(res.error);
//       }
//     });
//   };

//   return (
//     <div className="h-[calc(100vh-140px)] flex flex-col gap-6 relative overflow-hidden">
      
//       {/* --- HUD HEADER: لوکس و متراکم --- */}
//       <div className="flex justify-between items-center bg-[#050508]/80 border border-white/5 p-8 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative">
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        
//         <div className="flex items-center gap-6 relative z-10">
//           <div className="w-16 h-16 rounded-2xl bg-black border border-purple-500/20 flex items-center justify-center relative overflow-hidden group">
//              <div className="absolute inset-0 bg-purple-600/10 animate-pulse" />
//              <Bot className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
//              <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/30 animate-scan" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">Zenith <span className="text-purple-600">Intelligence</span></h1>
//             <div className="flex items-center gap-3">
//                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
//                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em]">Core Interface: v6.0.4</span>
//             </div>
//           </div>
//         </div>

//         <div className="hidden lg:flex gap-6">
//            {[
//              { label: "Neural Load", val: "14.2%", icon: Activity },
//              { label: "Sync", val: "Stable", icon: CpuIcon }
//            ].map((stat, i) => (
//              <div key={i} className="flex flex-col items-end border-r border-white/5 pr-6 last:border-0">
//                 <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">{stat.label}</span>
//                 <span className="text-sm font-bold text-zinc-300 italic">{stat.val}</span>
//              </div>
//            ))}
//         </div>
//       </div>

//       {/* --- CHAT HUB: هولوگرافیک متراکم --- */}
//       <div 
//         ref={scrollRef}
//         className="flex-1 hologram-effect rounded-[4rem] p-12 overflow-y-auto space-y-10 relative custom-scrollbar scroll-smooth"
//       >
//         <div className="absolute inset-0 bg-[url('https://vercel.app')] opacity-[0.03] pointer-events-none" />
        
//         {messages.length === 0 && (
//           <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-20">
//              <Terminal className="w-20 h-20 text-zinc-600" />
//              <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Command... Initialize Neural Link</p>
//           </div>
//         )}

//         <AnimatePresence>
//           {messages.map((msg, i) => (
//             <motion.div 
//               initial={{ opacity: 0, y: 30, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               key={i} 
//               className={cn("flex items-end gap-6", msg.role === 'model' ? "justify-start" : "justify-end flex-row-reverse")}
//             >
//               {msg.role === 'model' && (
//                 <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center shadow-lg shadow-purple-500/5">
//                    <Sparkles className="w-5 h-5 text-purple-400" />
//                 </div>
//               )}
              
//               <div className={cn(
//                 "max-w-[70%] p-8 rounded-[3rem] text-[13px] leading-relaxed relative group",
//                 msg.role === 'model' 
//                   ? "bg-[#08080c] border border-white/5 text-zinc-300 rounded-bl-none shadow-2xl" 
//                   : "bg-white text-black font-bold rounded-br-none shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
//               )}>
//                 {msg.content}
                
//                 {msg.role === 'model' && (
//                   <div className="absolute -top-3 left-8 px-3 py-1 bg-black border border-white/10 rounded-full flex items-center gap-2">
//                      <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" />
//                      <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Neural Logic</span>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {isPending && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start pl-16">
//             <div className="flex gap-2 p-4 bg-white/5 rounded-full border border-white/5">
//                {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}} />)}
//             </div>
//           </motion.div>
//         )}
//       </div>

//       {/* --- COMMAND INPUT: THE VOID BAR --- */}
//       <div className="relative group">
//         <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-400/20 to-purple-600/20 rounded-full blur-2xl opacity-40 group-focus-within:opacity-100 transition-all duration-1000" />
//         <div className="relative bg-[#050508]/80 backdrop-blur-2xl border border-white/10 rounded-full p-3 flex items-center gap-4">
//            <button className="p-5 text-zinc-600 hover:text-white transition-colors"><Mic className="w-5 h-5" /></button>
//            <input 
//              value={input}
//              onChange={(e) => setInput(e.target.value)}
//              onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
//              placeholder="EXECUTE STRATEGIC INQUIRY..." 
//              className="flex-1 bg-transparent border-none outline-none text-[11px] font-black uppercase tracking-[0.4em] text-white placeholder:text-zinc-800 ml-4"
//            />
//            <button 
//              onClick={handleExecute}
//              disabled={isPending}
//              className="p-5 bg-white text-black rounded-full hover:bg-purple-600 hover:text-white transition-all active:scale-90 shadow-2xl group/btn"
//            >
//               <Send className={cn("w-5 h-5 transition-transform", !isPending && "group-hover:translate-x-1 group-hover:-translate-y-1")} />
//            </button>
//         </div>
//       </div>

//     </div>
//   );
// }
