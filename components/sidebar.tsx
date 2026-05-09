


"use client";
import {signIn , signOut, useSession} from "next-auth/react"
import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  LayoutDashboard, Cpu, Compass, 
  Layers, Briefcase, Settings, 
  Sparkles, Zap, ChevronRight, 
  LogOut,AtomIcon,Building
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Mentor", href: "/ai-mentor", icon:AtomIcon  },
  { name: "CV Builder", href: "/cv-builder", icon:Building },
  { name: "AI Analyst", href: "/ai-analyst", icon:  Cpu},
  { name: "Career Path", href: "/career-path", icon: Compass },
  { name: "Interview Couch", href: "/interview", icon: Cpu },

  { name: "Project Hub", href: "/projects", icon: Layers },
  // { name: "Network", href: "/network", icon: Layers },
  { name: "Job Engine", href: "/jobs", icon: Briefcase },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <aside 
      onMouseMove={handleMouseMove}
      className="fixed inset-y-0 left-0 w-72 bg-[#030306] border-r border-white/[0.02] flex flex-col z-50 group/sidebar"
    >
      
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover/sidebar:opacity-100 transition duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(147, 51, 234, 0.07),
              transparent 80%
            )
          `,
        }}
      />

   
      <div className="p-10 mb-4 z-10">
        <Link href="/dashboard" className="flex items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-purple-600/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative w-full h-full bg-[#0a0a0f] border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-linear-to-tr from-purple-500/20 to-transparent" />
               <Sparkles className="w-6 h-6 text-white" />
               <div className="absolute inset-0 shimmer opacity-20" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white">ZENITH</span>
            <span className="text-[9px] tracking-[0.4em] text-zinc-600 font-bold uppercase">System Core</span>
          </div>
        </Link>
      </div>


      <nav className="flex-1 px-4 space-y-1 z-10">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredPath(item.href)}
              onMouseLeave={() => setHoveredPath(null)}
              className={cn(
                "relative flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-500",
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-200"
              )}
            >
             
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-linear-to-r from-purple-600/[0.08] to-transparent border-l-2 border-purple-500 rounded-2xl shadow-[15px_0_30px_-10px_rgba(147,51,234,0.3)]"
                />
              )}
              
              <item.icon className={cn(
                "w-5 h-5 transition-all duration-500",
                isActive ? "text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" : "group-hover:text-zinc-300"
              )} />
              
              <span className="text-[13px] font-bold tracking-wide">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
      

     
      <div className="p-6 mt-auto z-10">
        <div className="p-1 rounded-[2.5rem] bg-linear-to-b from-white/[0.08] to-transparent">
          <div className="bg-[#08080c] p-6 rounded-[2.3rem] relative overflow-hidden group/card">
            <div className="absolute inset-0 shimmer opacity-10" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-purple-500 fill-purple-500" />
              </div>
              <h4 className="text-[13px] font-black text-white uppercase tracking-wider mb-1">Zenith Intelligence</h4>
              <p className="text-[10px] text-zinc-500 mb-4">Master your career with AI-driven insights.</p>
              <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-[2px] rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-95">
                Go Unlimited
              </button>
            </div>
          </div>
        </div>
      </div>

    
    </aside>
  );
};


import { useMotionTemplate } from "framer-motion";
