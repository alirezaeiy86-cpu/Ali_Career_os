"use client";

import { Bell, ShieldCheck, Activity, LogOut, Command } from "lucide-react";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export const Nav = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    // حذف fixed و استفاده از w-full برای قرارگیری در بالای محور محتوا
    <nav className="h-20 w-full bg-[#050508]/80 backdrop-blur-xl border-b border-white/[0.03] px-8 flex items-center justify-between shrink-0">
      
      {/* بخش سمت چپ: موبایل و وضعیت کوانتومی */}
      <div className="flex items-center gap-6">
        <div className="md:hidden">
          <MobileSidebar />
        </div>
        
        <div className="hidden sm:flex items-center gap-4 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-2xl">
           <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
           <div className="flex flex-col">
              <span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.3em]">Neural Status</span>
              <span className="text-[9px] font-bold text-white uppercase tracking-tighter">System Synchronized</span>
           </div>
        </div>
      </div>

      {/* بخش سمت راست: پروفایل الترا لوکس */}
      <div className="flex items-center gap-6">
        
        {/* میانبرهای سیستمی */}
        <div className="flex items-center gap-3 border-r border-white/5 pr-6">
           <button className="p-2 bg-white/5 rounded-xl border border-white/5 text-zinc-500 hover:text-white transition group">
              <Command className="w-4 h-4 group-active:scale-90 transition-transform" />
           </button>
           <button className="relative p-2 bg-white/5 rounded-xl border border-white/5 text-zinc-500 hover:text-purple-400 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_#9333ea]" />
           </button>
        </div>

        {/* هویت کاربر تایید شده */}
        <div className="flex items-center gap-4">
            <div className="text-right hidden lg:block">
                <p className="text-[11px] font-black text-white uppercase tracking-widest italic">
                  {user?.name || "Accessing Core..."}
                </p>
                <div className="flex items-center justify-end gap-1.5 opacity-50">
                   <ShieldCheck className="w-3 h-3 text-cyan-400" />
                   <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Verified</span>
                </div>
            </div>

            {/* آواتار با حاشیه نئونی ظریف */}
            <div className="relative p-[1px] bg-gradient-to-tr from-purple-500/40 to-cyan-500/40 rounded-xl overflow-hidden shadow-2xl">
                <div className="w-10 h-10 rounded-[11px] bg-[#020205] overflow-hidden border border-white/10">
                    <img 
                      src={user?.image || `https://dicebear.com{user?.email}`} 
                      alt="Profile" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                    />
                </div>
            </div>

            {/* دکمه خروج استراتژیک */}
            <button 
              onClick={() => signOut()}
              className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500/40 hover:bg-red-500 hover:text-white transition-all active:scale-90 group"
            >
              <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
        </div>
      </div>
    </nav>
  );
};
