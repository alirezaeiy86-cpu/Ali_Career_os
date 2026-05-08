"use client";

import { motion } from "framer-motion";
import { Providers } from "@/components/providers/session-provider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-[#020205] relative overflow-hidden flex items-center justify-center">
      
    <div className="h-full">
       
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[150px] rounded-full" />
   
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://vercel.app')] pointer-events-none" />
      </div>

     
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full"
      >
        <Providers>{children}</Providers>
      
      </motion.div>

     
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <p className="text-[10px] uppercase tracking-[4px] text-zinc-600 font-bold">
          Zenith OS Global Security Environment
        </p>
      </div> */}
    </div>
    </section>
  );
}
