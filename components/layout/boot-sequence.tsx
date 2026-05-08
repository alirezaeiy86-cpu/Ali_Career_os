"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap, ShieldCheck, Cpu, Activity } from "lucide-react";

export const BootSequence = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [log, setLog] = useState("INITIALIZING NEURAL LINK...");

  useEffect(() => {
    const sequence = [
      { t: 800, m: "DECRYPTING IDENTITY BIOMETRICS..." },
      { t: 1600, m: "SYNCHRONIZING WITH GLOBAL NODES..." },
      { t: 2400, m: "NEURAL INTERFACE: OPTIMAL" },
      { t: 3000, m: "ACCESS GRANTED. WELCOME COMMANDER." }
    ];

    sequence.forEach((s) => {
      setTimeout(() => setLog(s.m), s.t);
    });

    setTimeout(() => setLoading(false), 3500);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div 
          key="loader"
          exit={{ opacity: 0, filter: "blur(20px)" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono"
        >
          {/* افکت نوری پس‌زمینه */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent 70%)]" />
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-12"
          >
            <div className="w-24 h-24 rounded-[2rem] border border-white/10 flex items-center justify-center bg-white/5 relative">
              <Zap className="w-10 h-10 text-white fill-white animate-pulse" />
              {/* خطوط اسکنر متحرک */}
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-purple-500 shadow-[0_0_15px_#9333ea] z-20" 
              />
            </div>
          </motion.div>

          <div className="space-y-4 text-center z-10">
             <div className="flex items-center gap-3 justify-center">
                <Activity className="w-3 h-3 text-purple-500 animate-bounce" />
                <p className="text-[10px] font-black text-white uppercase tracking-[0.6em]">{log}</p>
             </div>
             <div className="w-64 h-[1px] bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent" 
                />
             </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
