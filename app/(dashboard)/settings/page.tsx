"use client";

import { useState, useTransition, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Lock, Palette, Camera, ShieldCheck, 
  Cpu, Zap, CheckCircle2, Moon, Sun, 
  Fingerprint, KeyRound, Eye, EyeOff, AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { updateProfile } from "@/actions/update-profile";
import { updateSecurity } from "@/actions/update-security";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPass, setShowPass] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "",
    title: "Senior Product Architect",
  });

  const [securityData, setSecurityData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // هندل کردن آپلود تصویر
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onUpdateProfile = () => {
    startTransition(async () => {
      const res = await updateProfile({ ...profileData, image: imagePreview });
      if (res.success) { toast.success(res.success); update(); }
      else toast.error(res.error);
    });
  };

  const onUpdateSecurity = () => {
    if (securityData.new !== securityData.confirm) return toast.error("Keys do not match.");
    startTransition(async () => {
      const res = await updateSecurity(securityData.current, securityData.new);
      if (res.success) { 
        toast.success(res.success);
        setSecurityData({ current: "", new: "", confirm: "" });
      } else toast.error(res.error);
    });
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-24 font-sans">
      
      {/* --- ۱. HEADER --- */}
      <div className="flex justify-between items-end border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <Fingerprint className="w-4 h-4 text-purple-500" />
             <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.6em]">System Control Panel</span>
          </div>
          <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic leading-none">Settings<span className="text-zinc-800">.</span></h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- ۲. NAVIGATION SIDEBAR --- */}
        <aside className="lg:col-span-3 space-y-3">
          {[
            { id: "profile", label: "Neural Identity", icon: User },
            { id: "security", label: "Access Protocol", icon: ShieldCheck, color: "text-red-500" },
            { id: "appearance", label: "Visual Interface", icon: Palette },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] transition-all duration-500 group relative overflow-hidden",
                activeTab === tab.id 
                  ? "bg-white text-black shadow-2xl" 
                  : "text-zinc-600 hover:text-zinc-300 hover:bg-white/5"
              )}
            >
              <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-black" : tab.color || "group-hover:text-purple-500")} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">{tab.label}</span>
              {activeTab === tab.id && <motion.div layoutId="nav-pill" className="absolute left-0 w-1.5 h-8 bg-black rounded-full" />}
            </button>
          ))}
        </aside>

        {/* --- ۳. CONTENT AREA --- */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            
            {/* Identity Tab */}
            {activeTab === "profile" && (
              <motion.div key="id" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="bg-[#08080c] p-12 rounded-[4rem] border border-white/5 flex items-center gap-12 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000"><Cpu size={120}/></div>
                   <div className="relative">
                      <div className="w-40 h-40 rounded-[3rem] bg-gradient-to-tr from-cyan-400 via-purple-600 to-white p-[2.5px] shadow-2xl">
                         <div className="w-full h-full bg-black rounded-[2.8rem] overflow-hidden relative">
                            <img src={imagePreview || session?.user?.image || "https://pravatar.cc"} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                         </div>
                      </div>
                      <label className="absolute -bottom-2 -right-2 p-4 bg-white text-black rounded-2xl cursor-pointer hover:bg-purple-600 hover:text-white transition-all shadow-xl active:scale-90">
                         <Camera className="w-5 h-5" />
                         <input type="file" className="hidden" onChange={handleImage} accept="image/*" />
                      </label>
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-2xl font-black text-white uppercase italic">Neural Signature</h3>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.4em]">Authorized Profile Management</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-6">Legal Label</label>
                      <input value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full bg-white/[0.02] border border-white/5 rounded-[2.5rem] px-10 py-6 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-6">Global Rank</label>
                      <input value={profileData.title} onChange={e => setProfileData({...profileData, title: e.target.value})} className="w-full bg-white/[0.02] border border-white/5 rounded-[2.5rem] px-10 py-6 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
                   </div>
                </div>
                <button onClick={onUpdateProfile} disabled={isPending} className="w-full py-7 bg-white text-black font-black uppercase text-[11px] tracking-[0.5em] rounded-[3rem] hover:bg-purple-600 hover:text-white transition-all active:scale-[0.98]">
                   {isPending ? "SYNCHRONIZING..." : "UPDATE IDENTITY MATRIX"}
                </button>
              </motion.div>
            )}

            {/* Access Protocol (Security) */}
            {activeTab === "security" && (
              <motion.div key="sec" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                 <div className="p-12 rounded-[4rem] bg-red-500/[0.01] border border-red-500/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5"><KeyRound size={120} className="text-red-500"/></div>
                    <div className="flex items-center gap-6 mb-12">
                       <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                          <Lock className="w-7 h-7 text-red-500" />
                       </div>
                       <div>
                          <h3 className="text-3xl font-black text-white uppercase italic leading-none">Access Protocol</h3>
                          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] mt-2">Rotate your neural access keys</p>
                       </div>
                    </div>

                    <div className="space-y-8 relative z-10">
                       <div className="space-y-3">
                          <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-6">Current Key</label>
                          <div className="relative">
                            <input type={showPass ? "text" : "password"} value={securityData.current} onChange={e => setSecurityData({...securityData, current: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-10 py-6 text-sm text-white outline-none focus:border-red-500/40 transition-all" />
                            <button onClick={() => setShowPass(!showPass)} className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors">
                               {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-6">New Neural Key</label>
                             <input type="password" value={securityData.new} onChange={e => setSecurityData({...securityData, new: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-10 py-6 text-sm text-white outline-none focus:border-emerald-500/40 transition-all" />
                          </div>
                          <div className="space-y-3">
                             <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-6">Confirm New Key</label>
                             <input type="password" value={securityData.confirm} onChange={e => setSecurityData({...securityData, confirm: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-10 py-6 text-sm text-white outline-none focus:border-emerald-500/40 transition-all" />
                          </div>
                       </div>

                       <div className="flex items-start gap-4 p-6 bg-red-500/5 rounded-[2.5rem] border border-red-500/10">
                          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                             Warning: Changing your access key will terminate all existing neural links across secondary devices. <span className="text-red-500 underline">Proceed with caution.</span>
                          </p>
                       </div>
                    </div>

                    <button onClick={onUpdateSecurity} disabled={isPending} className="mt-12 w-full py-7 bg-red-600 text-white font-black uppercase text-[11px] tracking-[0.6em] rounded-[3rem] hover:bg-red-500 hover:shadow-[0_0_50px_rgba(220,38,38,0.3)] transition-all">
                       {isPending ? "ENCRYPTING..." : "DEPLOY NEW ACCESS CODE"}
                    </button>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   User, 
//   Lock, 
//   Palette, 
//   Bell, 
//   ShieldCheck, 
//   Camera,
//   Save,
//   Check
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";

// const tabs = [
//   { id: "profile", label: "Profile", icon: User },
//   { id: "security", label: "Security", icon: Lock },
//   { id: "appearance", label: "Appearance", icon: Palette },
// ];

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [isSaving, setIsSaving] = useState(false);

//   const handleSave = () => {
//     setIsSaving(true);
//     setTimeout(() => {
//       setIsSaving(false);
//       toast.success("Settings synchronized successfully!");
//     }, 1500);
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-10 pb-20">
//       {/* --- Header --- */}
//       <div className="flex justify-between items-end border-b border-white/5 pb-8">
//         <div>
//           <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Settings</h1>
//           <p className="text-zinc-500 text-sm mt-1">Manage your neural identity and system preferences.</p>
//         </div>
//         <button 
//           onClick={handleSave}
//           disabled={isSaving}
//           className="group relative px-8 py-3 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest overflow-hidden transition-all active:scale-95 disabled:opacity-50"
//         >
//           <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
//           <span className="relative flex items-center gap-2 group-hover:text-white">
//             {isSaving ? <span className="animate-pulse">Syncing...</span> : <><Save className="w-3 h-3" /> Save Changes</>}
//           </span>
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//         {/* --- Vertical Tabs --- */}
//         <div className="space-y-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={cn(
//                 "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 relative",
//                 activeTab === tab.id ? "text-white bg-white/5" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
//               )}
//             >
//               <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-purple-500" : "")} />
//               <span className="text-sm font-bold tracking-tight">{tab.label}</span>
//               {activeTab === tab.id && (
//                 <motion.div layoutId="active-tab" className="absolute left-0 w-1 h-6 bg-purple-500 rounded-full" />
//               )}
//             </button>
//           ))}
//         </div>

//         {/* --- Content Area --- */}
//         <div className="md:col-span-3">
//           <AnimatePresence mode="wait">
//             {activeTab === "profile" && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
//                 className="space-y-8 bg-[#080810]/50 p-8 rounded-[3rem] border border-white/5"
//               >
//                 {/* Avatar Upload */}
//                 <div className="flex items-center gap-8 pb-8 border-b border-white/5">
//                   <div className="relative group">
//                     <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-purple-600 to-indigo-600 p-[1px]">
//                       <div className="w-full h-full bg-[#020205] rounded-[1.9rem] flex items-center justify-center overflow-hidden">
//                         <img src="https://pravatar.cc" alt="Avatar" />
//                       </div>
//                     </div>
//                     <button className="absolute bottom-0 right-0 p-2 bg-white text-black rounded-xl shadow-xl hover:scale-110 transition">
//                       <Camera className="w-4 h-4" />
//                     </button>
//                   </div>
//                   <div>
//                     <h3 className="text-white font-bold">Profile Picture</h3>
//                     <p className="text-zinc-500 text-xs mt-1">Recommended size: 400x400px. PNG or JPG.</p>
//                   </div>
//                 </div>

//                 {/* Form Fields */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
//                     <input type="text" defaultValue="Armin Dilshad" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Professional Title</label>
//                     <input type="text" defaultValue="Senior Product Engineer" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Professional Bio</label>
//                   <textarea rows={4} className="w-full bg-white/[0.03] border border-white/5 rounded-3xl px-5 py-4 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
//                 </div>
//               </motion.div>
//             )}

//             {activeTab === "appearance" && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//                 className="p-8 rounded-[3rem] bg-[#080810]/50 border border-white/5"
//               >
//                 <h3 className="text-white font-bold mb-6">Interface Theme</h3>
//                 <div className="grid grid-cols-3 gap-4">
//                   {['Deep Blue', 'Purple Neon', 'Matrix Green'].map((theme, i) => (
//                     <div key={theme} className={cn(
//                       "p-4 rounded-2xl border cursor-pointer transition-all",
//                       i === 1 ? "border-purple-500 bg-purple-500/10" : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
//                     )}>
//                       <div className={cn("w-full h-20 rounded-lg mb-3 bg-gradient-to-br", i === 1 ? "from-purple-500 to-indigo-600" : "from-zinc-800 to-zinc-950")} />
//                       <p className="text-xs font-bold text-center text-white">{theme}</p>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }
