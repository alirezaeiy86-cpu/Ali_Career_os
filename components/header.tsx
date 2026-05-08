"use client";

import { Search, Bell, Command } from "lucide-react";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { signOut } from "next-auth/react";
import { email } from "zod";
// import { User } from "next-auth";
import { useSession } from "next-auth/react";

interface UserProps{
    user?:{
        name?: string | null;
        email?: string | null;
        image?: string | null;
        
    }

}

export  const  Navbar = ({user:propUser}:UserProps) => {
    const {data:session}=useSession();
    const currentUser = propUser ||session?.user;
    
  return (
    <nav className="flex items-center justify-between px-8 h-20 bg-[#020205]/50 backdrop-blur-xl border-b border-white/[0.03] sticky top-0 z-40">
     
     
      <MobileSidebar />

      
      <div className="hidden md:flex items-center gap-3 px-4 py-2 w-96 bg-white/[0.03] border border-white/5 rounded-2xl group focus-within:border-purple-500/50 transition-all duration-500">
        <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-purple-400" />
        <input 
          type="text" 
          placeholder="Search anything..." 
          className="bg-transparent border-none outline-none text-sm text-zinc-300 w-full placeholder:text-zinc-600"
        />
        <div className="flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded-md border border-white/10">
          <Command className="w-3 h-3 text-zinc-500" />
          <span className="text-[10px] text-zinc-500 font-bold tracking-tighter">K</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-zinc-400 hover:text-white transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#020205]" />
        </button>
        
      
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="text-right hidden sm:block">
                <p className="text-[12px] font-bold text-white">{currentUser?.name}</p>
                <p className="text-[10px] text-zinc-500"></p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#020205] rounded-[11px] overflow-hidden">
                    <img src={currentUser.image || "/default-avatar.png"} alt="User" />
                </div>
            </div>
              <button className="py-2 px-3  border-none
         rounded-lg " onClick={()=>signOut()}>
          LogOut

      </button>
        </div>
      </div>
    </nav>
  );
};
