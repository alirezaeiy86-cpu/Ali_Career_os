"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Camera, Shield, Cpu, Activity, Check, ArrowRight, Loader2, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/lib/validations/auth";
import { register } from "@/actions/register";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [stage, setStage] = useState<"idle" | "processing" | "success">("idle");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register: reg, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "" }
  });

  const onSubmit = (values: any) => {
    setStage("processing");
    startTransition(async () => {
      const response = await register({ ...values, image: imagePreview });
      if (response?.error) {
        toast.error(response.error);
        setStage("idle");
      } else {
        setStage("success");
        setTimeout(() => router.push("/login"), 3000);
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#000] flex items-center justify-center p-6 relative font-sans overflow-hidden">
      {/* Background FX: Deep Space & Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#1a0b3d_0%,#000_70%)] opacity-60" />
      <div className="absolute inset-0 bg-[url('https://vercel.app')] opacity-[0.04] pointer-events-none" />

      <motion.div layout className="w-full max-w-[560px] relative z-10">
        <AnimatePresence mode="wait">
          {stage === "idle" ? (
            <motion.div 
              key="idle" exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              className="bg-[#08080c]/80 backdrop-blur-3xl border border-white/[0.08] p-10 md:p-14 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,1)] relative"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

              <div className="flex justify-between items-start mb-12">
                <div className="space-y-2">
                  <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Initialize <br/> <span className="text-purple-600">Access.</span></h1>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em]">Protocol: Identity Matrix</p>
                </div>
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner group cursor-crosshair">
                  <Lock className="w-6 h-6 text-zinc-500 group-hover:text-purple-500 transition-colors" />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Image Upload Area: Large & Luxury */}
                <div className="flex items-center gap-8 p-6 bg-white/[0.02] rounded-[2.5rem] border border-white/5 group hover:border-purple-500/20 transition-all cursor-pointer">
                  <div className="relative w-20 h-20 rounded-[1.8rem] border-2 border-dashed border-zinc-800 overflow-hidden bg-black group-hover:border-purple-500/40 transition-all">
                    {imagePreview ? (
                      <img src={imagePreview} className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-6 h-6 text-zinc-700 absolute inset-0 m-auto" />
                    )}
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if(file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setImagePreview(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-white font-black uppercase italic tracking-widest">Biometric Data</p>
                    <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest mt-1 leading-relaxed">Neural signature for system authorization</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {["name", "email", "password"].map((field) => (
                    <div key={field} className="space-y-2">
                      <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-4">{field === "name" ? "Identity Label" : field === "email" ? "Neural Link" : "Access Key"}</label>
                      <input 
                        {...reg(field as any)}
                        type={field === "password" ? "password" : "text"}
                        placeholder={`ENTER ${field.toUpperCase()}`}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] px-8 py-5 text-sm text-white outline-none focus:border-purple-500/50 focus:bg-white/[0.04] transition-all placeholder:text-zinc-800 shadow-inner"
                      />
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full py-6 bg-white text-black font-black text-[11px] uppercase tracking-[0.5em] rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center gap-3"
                >
                  Create Matrix Identity <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>

              {/* Login Link: Luxury Styled */}
              <div className="mt-10 text-center border-t border-white/5 pt-8">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">
                  Already mapped your professional DNA? <br/>
                  <Link href="/login" className="text-white hover:text-purple-400 transition-colors mt-2 inline-block border-b border-white/20 pb-1">
                    Return to Terminal
                  </Link>
                </p>
              </div>
            </motion.div>
          ) : stage === "processing" ? (
            /* --- TERMINAL PROCESSING STAGE --- */
            <motion.div 
              key="processing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-[#050508] border border-purple-500/30 p-12 rounded-[4rem] w-full text-center"
            >
              <div className="flex flex-col items-center gap-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-600/30 blur-[60px] animate-pulse rounded-full" />
                  <Cpu className="w-20 h-20 text-purple-500 animate-pulse relative z-10" />
                </div>
                <div className="w-full space-y-6">
                  <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">
                    <span>Neural Linkage</span>
                    <span className="text-purple-500 animate-bounce">Encrypting</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5 }} className="h-full bg-purple-600 shadow-[0_0_20px_#9333ea]" />
                  </div>
                  <div className="bg-black/50 p-6 rounded-[2rem] border border-white/5 font-mono text-left">
                    <p className="text-[10px] text-purple-400/80 mb-2 tracking-tighter italic">{">"} INITIALIZING SECURITY LAYERS...</p>
                    <p className="text-[10px] text-purple-400/80 mb-2 tracking-tighter italic animate-pulse">{">"} SYNCHRONIZING WITH ZENITH NODES...</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* --- SUCCESS STAGE --- */
            <motion.div 
              key="success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white p-20 rounded-[5rem] text-center space-y-8 shadow-[0_0_100px_rgba(255,255,255,0.3)]"
            >
              <div className="w-24 h-24 bg-black rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl rotate-12">
                <Check className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-6xl font-black italic tracking-tighter uppercase text-black leading-none">Authorized</h2>
                <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-zinc-500 mt-6 leading-relaxed">Welcome to the Global Network, Commander</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// "use client";

// import { useState, useTransition } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Zap, Camera, Shield, Cpu, Activity, Terminal, Check, Globe, Lock } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { RegisterSchema } from "@/lib/validations/auth";
// import { register } from "@/actions/register";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [stage, setStage] = useState<"idle" | "processing" | "success">("idle");
//   const [logs, setLogs] = useState<string[]>([]);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const { register: reg, handleSubmit } = useForm({
//     resolver: zodResolver(RegisterSchema),
//   });

//   const addLog = (msg: string) => setLogs(prev => [...prev.slice(-4), msg]);

//   const onSubmit = (values: any) => {
//     setStage("processing");
//     addLog("> INITIALIZING NEURAL LINK...");
    
//     startTransition(async () => {
//       setTimeout(() => addLog("> ENCRYPTING BIOMETRIC DATA..."), 500);
//       setTimeout(() => addLog("> SYNCHRONIZING WITH GLOBAL NODES..."), 1200);

//       const response = await register({ ...values, image: imagePreview });

//       if (response?.error) {
//         toast.error(response.error);
//         setStage("idle");
//         setLogs([]);
//       } else {
//         addLog("> IDENTITY MATRIX SECURED.");
//         setTimeout(() => setStage("success"), 800);
//         setTimeout(() => router.push("/login"), 3500);
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#000] flex items-center justify-center p-4 relative font-mono overflow-hidden">
//       {/* افکت‌های پس‌زمینه فضا */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#120a2e_0%,#000_100%)] opacity-40" />
//       <div className="absolute inset-0 bg-[url('https://vercel.app')] opacity-[0.05]" />

//       <motion.div layout className="w-full max-w-[500px] relative z-10">
//         <AnimatePresence mode="wait">
//           {stage === "idle" ? (
//             <motion.div 
//               key="idle" exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
//               className="bg-black/40 backdrop-blur-3xl border border-white/10 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(139,92,246,0.1)]"
//             >
//               {/* بخش بالایی متراکم */}
//               <div className="flex justify-between items-start mb-10">
//                 <div className="space-y-1">
//                   <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">Initial Access</h1>
//                   <p className="text-[8px] text-purple-500 font-bold uppercase tracking-[0.5em]">Auth-Protocol: v5.2.0</p>
//                 </div>
//                 <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center relative group">
//                   <div className="absolute inset-0 bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition" />
//                   <Lock className="w-5 h-5 text-zinc-500" />
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 {/* بخش عکس فشرده و متراکم */}
//                 <div className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/5">
//                   <div className="relative w-16 h-16 rounded-full border border-purple-500/30 overflow-hidden bg-black">
//                     {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <Camera className="w-5 h-5 text-zinc-700 absolute inset-0 m-auto" />}
//                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if(file) {
//                         const reader = new FileReader();
//                         reader.onloadend = () => setImagePreview(reader.result as string);
//                         reader.readAsDataURL(file);
//                       }
//                     }} />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-[10px] text-white font-bold uppercase italic">Biometric Upload</p>
//                     <p className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1">Scan PNG/JPG identity files</p>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   {["name", "email", "password"].map((field) => (
//                     <div key={field} className="relative group">
//                       <input 
//                         {...reg(field as any)}
//                         type={field === "password" ? "password" : "text"}
//                         placeholder={field.toUpperCase()}
//                         className="w-full bg-[#08080c] border border-white/5 rounded-xl px-5 py-4 text-[10px] text-white outline-none focus:border-purple-500/50 transition-all placeholder:text-zinc-800"
//                       />
//                       <div className="absolute right-4 top-4 opacity-10 group-focus-within:opacity-100 transition-opacity">
//                         <Zap className="w-3 h-3 text-purple-500" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
//                 >
//                   Confirm Authorization
//                 </motion.button>
//               </form>
//             </motion.div>
//           ) : stage === "processing" ? (
//             /* --- حالت پردازش تِرمینالی (جزئیات غول‌آسا) --- */
//             <motion.div 
//               key="processing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//               className="bg-black border border-purple-500/30 p-10 rounded-[2rem] w-full shadow-[0_0_100px_rgba(139,92,246,0.15)]"
//             >
//               <div className="flex flex-col items-center gap-8">
//                 <div className="relative">
//                   <Cpu className="w-16 h-16 text-purple-500 animate-pulse" />
//                   <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full" />
//                 </div>
                
//                 <div className="w-full space-y-4 font-mono">
//                   <div className="flex justify-between text-[8px] text-zinc-500 uppercase tracking-[0.3em]">
//                     <span>Neural Processing</span>
//                     <span className="animate-pulse">Loading...</span>
//                   </div>
//                   <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
//                     <motion.div 
//                       initial={{ width: 0 }} animate={{ width: "100%" }}
//                       transition={{ duration: 2.5, ease: "linear" }}
//                       className="h-full bg-purple-600 shadow-[0_0_15px_#9333ea]" 
//                     />
//                   </div>
//                   <div className="bg-white/5 p-4 rounded-lg border border-white/5 min-h-[100px]">
//                     {logs.map((log, i) => (
//                       <p key={i} className="text-[9px] text-purple-400/80 mb-1">{log}</p>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             /* --- حالت موفقیت نهایی --- */
//             <motion.div 
//               key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
//               className="bg-white text-black p-12 rounded-[3rem] text-center space-y-6 shadow-[0_0_100px_rgba(255,255,255,0.4)]"
//             >
//               <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Check className="w-10 h-10 text-white" />
//               </div>
//               <h2 className="text-4xl font-black italic tracking-tighter uppercase">Authorized</h2>
//               <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Welcome to Zenith Global Network</p>
//               <div className="flex justify-center gap-2">
//                 {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-black rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}} />)}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// }


// "use client";

// import { motion } from "framer-motion";
// import { Zap , ArrowRight, UserPlus, ShieldCheck } from "lucide-react";
// import Link from "next/link";
// import { startTransition, useState , useTransition } from "react";
// import {useForm} from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod"
// import { RegisterSchema } from "@/lib/validations/auth";
// import { register } from "@/actions/register";
// import * as z from "zod";
// import { toast } from "sonner";
// import { redirect } from "next/navigation";

// export default function RegisterPage() {

//   const [isPending, StartTransitition]=useTransition();
//   const [success, setSuccess]=useState<string | undefined>("");
//   const [error, setError]=useState<string | undefined>("");
//   const {register:registerField,handleSubmit,formState:{errors}}=useForm<z.infer<typeof RegisterSchema>>({
//     resolver:zodResolver(RegisterSchema),
//     defaultValues:{name:"",email:"",password:""}
//   });

//   const onSubmit = (values:z.infer<typeof RegisterSchema>)=>{
//   startTransition(()=>{
//     register(values).then((data)=>{
//       if (data.error){
//         toast.error(data.error);
//       }else{
//         toast.success("Account initialized! Access granted.");
//         redirect("/login");
//       }
//     });
//   });
//   }
//   return (
//     <div className="min-h-screen w-full bg-[#020205] flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Background Decorative Glows */}
//       <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
//       <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />

//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-[500px] relative z-10"
//       >
//         {/* Header Section */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-[22px] flex items-center justify-center shadow-[0_0_40px_rgba(147,51,234,0.4)] mb-6 relative group">
//             <div className="absolute inset-0 bg-white/20 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity" />
//             <UserPlus className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-4xl font-black tracking-tighter text-white text-center">
//             Initialize <span className="text-purple-500">Access</span>
//           </h1>
//           <p className="text-zinc-500 text-sm mt-3 font-medium">Create your global AI-driven career profile</p>
//         </div>

//         {/* Register Card */}
//         <div className="bg-[#080810]/70 backdrop-blur-3xl border border-white/[0.05] p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
//           {/* Subtle line at the top */}
//           <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

//           <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//             {/* Full Name */}
//             <div className="space-y-2">
//               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Full Identity</label>
//               <input 
//               {...registerField("name")}
//               disabled={isPending}
//                 type="text" 
//                 placeholder="e.g. Armin Dilshad"
//                 className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all placeholder:text-zinc-700"
//               />
//             </div>

//             {/* Email */}
//             <div className="space-y-2">
//               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">System Email</label>
//               <input 
//                  {...registerField("email")}
//               disabled={isPending}
//                 type="email" 
//                 placeholder="name@zenith.com"
//                 className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all placeholder:text-zinc-700"
//               />
//             </div>

//             {/* Password Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Password</label>
//                 <input 
//                 {...registerField("password")}
                 
//               disabled={isPending}
//                   type="password" 
//                   placeholder="••••••••"
//                   className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Confirm</label>
//                 <input 
//                   type="password" 
//                   placeholder="••••••••"
//                   className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all"
//                 />
//               </div>
//             </div>

//             {/* Privacy Note */}
//             <div className="flex items-center gap-3 px-2 py-1">
//                 <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
//                 <p className="text-[10px] text-zinc-600 font-medium italic">Your data is encrypted with enterprise-grade security.</p>
//             </div>

//             <motion.button
//             disabled={isPending} 
//               whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)" }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs uppercase tracking-[3px] rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all"
//             >
//               {isPending?"Synchronizing...":"Create Account"}
//               <ArrowRight className="w-4 h-4" />
//             </motion.button>
//           </form>

//           {/* Social Links */}
//           <div className="flex flex-col items-center mt-8 gap-4">
//              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-700">Rapid Onboarding</span>
//              <div className="flex gap-4 w-full">
//                 <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/[0.03] border border-white/[0.05] rounded-xl hover:bg-white/[0.08] transition text-xs font-bold text-white">
//                   {/* <Chrome className="w-4 h-4 text-red-500" /> Google */}Google
//                 </button>
//                 <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/[0.03] border border-white/[0.05] rounded-xl hover:bg-white/[0.08] transition text-xs font-bold text-white">
//                   {/* <Github className="w-4 h-4" /> Github */} Github
//                 </button>
//              </div>
//           </div>
//         </div>

//         <p className="text-center mt-8 text-zinc-500 text-sm">
//           Already a member? <Link href="/login" className="text-purple-500 font-black hover:text-purple-400 transition-colors">Access Terminal</Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

