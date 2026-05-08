"use client";

import { motion } from "framer-motion";
import { Zap,ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod"

import { LoginSchema } from "@/lib/validations/auth";
import { login } from "@/actions/login";


export default function LoginPage() {

    const [isPending,startTransition]=useTransition();

    const {register,handleSubmit,formState:{errors}}=useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{email:"",password:""}
    });

    const onSubmit=(values:z.infer<typeof LoginSchema>)=>{
        startTransition(()=>{
            login(values).then((data)=>{
                if (data?.error){
                    toast.error(data.error);
                }
            });
        });
    }
    
  return (
    <div className="min-h-screen w-full bg-[#020205] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] relative z-10"
      >
       
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(147,51,234,0.3)] mb-4">
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white">Welcome Back</h1>
          <p className="text-zinc-500 text-sm mt-2">Enter your credentials to access Zenith OS</p>
        </div>

        <div className="bg-[#080810]/60 backdrop-blur-2xl border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
              <input 
              disabled={isPending}
              {...register("email")}
                type="email" 
                placeholder="name@example.com"
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 ml-1">Password</label>
                <Link href="#" className="text-[10px] text-purple-500 hover:text-purple-400 font-bold uppercase tracking-tighter">Forgot?</Link>
              </div>
              <input 
              {...register("password")}
              disabled={isPending}
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all"
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-[2px] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all"
            >
              {isPending?"Authentication...":"Sign In to System"}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-[#080810] px-3 text-zinc-600 font-bold">Or continue with</span></div>
          </div>


          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.08] transition text-xs font-bold text-white">
             Github
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.08] transition text-xs font-bold text-white">
              Google
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-zinc-500 text-sm">
          Don't have an account? <Link href="/register" className="text-purple-500 font-bold hover:underline">Create System Access</Link>
        </p>
      </motion.div>
    </div>
  );
}
