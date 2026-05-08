"use server";
import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
  Trophy, Zap, ChevronUp, BrainCircuit, 
  CheckCircle2, AlertCircle, ArrowUpRight 
} from "lucide-react";
import { SkillRadar } from "@/components/skill-radar"; 

export default async function AnalysisReport({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) redirect("/login");
  const {id} = await params;


  // Get Data from database
  if (!session.user?.id) return;
  const resume = await db.resume.findUnique({
    
    where: { 
        id: id,
        userId: session.user.id
    },
  });

  if (!resume) redirect("/dashboard");

  // تبدیل JSON ذخیره شده به فرمت قابل استفاده
  const analysis = resume.content as any; 

  // آماده‌سازی دیتا برای نمودار رادار (اگر AI دیتا داده باشد، وگرنه دیفالت)
  const chartData = analysis?.chartData || [
    { subject: 'Technical', A: analysis?.score || 10, fullMark: 100 },
    { subject: 'Soft Skills', A: 70, fullMark: 100 },
    { subject: 'Experience', A: 85, fullMark: 100 },
    { subject: 'Keywords', A: 60, fullMark: 100 },
    { subject: 'Impact', A: 75, fullMark: 100 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      
      {/* --- Score Card --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 p-8 rounded-[3rem] bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(147,51,234,0.3)] relative overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">Neural Score</p>
          <h2 className="text-7xl font-black text-white italic">{resume.aiScore}</h2>
          <div className="mt-4 flex items-center gap-2 bg-black/20 px-4 py-1.5 rounded-full border border-white/10">
            <ChevronUp className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Verified by AI</span>
          </div>
        </div>

        {/* Radar Chart Component (Client) */}
        <div className="lg:col-span-3 p-8 rounded-[3rem] bg-[#080810] border border-white/5 flex flex-col md:flex-row items-center gap-10">
          <div className="w-full h-[250px]">
            <SkillRadar data={chartData} />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Skill Matrix</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Our neural engine analyzed <span className="text-white">{resume.title}</span>. 
              The matrix shows high density in your professional core.
            </p>
          </div>
        </div>
      </div>

      {/* --- Dynamic Strengths & Weaknesses --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strengths */}
        <div className="p-8 rounded-[3rem] bg-[#05050a] border border-emerald-500/10 relative overflow-hidden">
          <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-6">
            <Trophy className="w-5 h-5 text-emerald-500" /> Key Strengths
          </h3>
          <div className="space-y-4">
            {analysis?.strengths?.map((item: string) => (
              <div key={item} className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 transition-all hover:bg-emerald-500/10">
                <span className="text-zinc-300 text-sm font-medium">{item}</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </div>
            )) || <p className="text-zinc-600 text-xs italic">No data analyzed yet.</p>}
          </div>
        </div>

        {/* Improvements */}
        <div className="p-8 rounded-[3rem] bg-[#05050a] border border-orange-500/10 relative overflow-hidden">
          <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-6">
            <Zap className="w-5 h-5 text-orange-500" /> Improvement Protocol
          </h3>
          <div className="space-y-4">
            {analysis?.improvements?.map((item: string) => (
              <div key={item} className="flex items-center justify-between p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 transition-all hover:bg-orange-500/10">
                <span className="text-zinc-300 text-sm font-medium">{item}</span>
                <AlertCircle className="w-4 h-4 text-orange-500" />
              </div>
            )) || <p className="text-zinc-600 text-xs italic">All systems optimized.</p>}
          </div>
        </div>
      </div>

      {/* --- AI Mentor Message --- */}
      <div className="p-1 rounded-[3rem] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent border border-white/5">
        <div className="bg-black/40 backdrop-blur-3xl p-10 rounded-[2.9rem] flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center shadow-[0_0_30px_#9333ea]">
            <BrainCircuit className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-black text-xl tracking-tighter uppercase">Neural Recommendations</h4>
            <p className="text-zinc-400 text-sm italic mt-2">
              "{analysis?.aiFeedback || "Upload more projects to increase your accuracy."}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


// "use client";

// import { motion } from "framer-motion";
// import { 
//   Trophy, Target, Zap, 
//   ChevronUp, BrainCircuit, 
//   CheckCircle2, AlertCircle,
//   ArrowUpRight
// } from "lucide-react";
// import { 
//   Radar, RadarChart, PolarGrid, 
//   PolarAngleAxis, ResponsiveContainer 
// } from "recharts";

// // دیتای تستی برای نمایش لوکس (این از دیتابیس می‌آید)
// const data = [
//   { subject: 'Technical', A: 120, fullMark: 150 },
//   { subject: 'Soft Skills', A: 98, fullMark: 150 },
//   { subject: 'Leadership', A: 86, fullMark: 150 },
//   { subject: 'Experience', A: 99, fullMark: 150 },
//   { subject: 'Keywords', A: 85, fullMark: 150 },
// ];

// export default function AnalysisReport() {
//   return (
//     <div className="max-w-7xl mx-auto space-y-10 pb-20">
      
//       {/* --- Top Bar: Score Card --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="lg:col-span-1 p-8 rounded-[3rem] bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(147,51,234,0.3)] relative overflow-hidden"
//         >
//           <div className="absolute inset-0 bg-[url('https://vercel.app')] opacity-20" />
//           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">Neural Score</p>
//           <h2 className="text-7xl font-black text-white italic">82</h2>
//           <div className="mt-4 flex items-center gap-2 bg-black/20 px-4 py-1.5 rounded-full border border-white/10">
//             <ChevronUp className="w-4 h-4 text-emerald-400" />
//             <span className="text-[10px] font-bold text-white uppercase tracking-wider">Top 5% Globally</span>
//           </div>
//         </motion.div>

//         {/* Radar Chart: Skill Breakdown */}
//         <div className="lg:col-span-3 p-8 rounded-[3rem] bg-[#080810] border border-white/5 flex flex-col md:flex-row items-center gap-10">
//           <div className="w-full h-[250px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
//                 <PolarGrid stroke="#27272a" />
//                 <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10, fontWeight: 'bold' }} />
//                 <Radar
//                   name="Skills"
//                   dataKey="A"
//                   stroke="#9333ea"
//                   fill="#9333ea"
//                   fillOpacity={0.5}
//                 />
//               </RadarChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="space-y-4">
//             <h3 className="text-xl font-bold text-white">Skill Matrix</h3>
//             <p className="text-zinc-500 text-sm leading-relaxed">
//               Your profile shows exceptional strength in <span className="text-white">Technical Architecture</span>, but has minor gaps in Leadership keywords.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* --- AI Insights: Strengths & Weaknesses --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
//         {/* Strengths Card */}
//         <div className="p-8 rounded-[3rem] bg-[#05050a] border border-emerald-500/10 relative group overflow-hidden">
//           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//             <CheckCircle2 className="w-24 h-24 text-emerald-500" />
//           </div>
//           <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-6">
//             <Trophy className="w-5 h-5 text-emerald-500" /> Key Strengths
//           </h3>
//           <div className="space-y-4">
//             {["Advanced Cloud Computing", "Neural Network Design", "Strategic Planning"].map((item) => (
//               <div key={item} className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
//                 <span className="text-zinc-300 text-sm font-medium">{item}</span>
//                 <ArrowUpRight className="w-4 h-4 text-emerald-500" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Action Needed Card */}
//         <div className="p-8 rounded-[3rem] bg-[#05050a] border border-orange-500/10 relative group overflow-hidden">
//           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//             <BrainCircuit className="w-24 h-24 text-orange-500" />
//           </div>
//           <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-6">
//             <Zap className="w-5 h-5 text-orange-500" /> Improvement Protocol
//           </h3>
//           <div className="space-y-4">
//             {["Quantify Achievements", "Add Leadership Keywords", "Github Link Verification"].map((item) => (
//               <div key={item} className="flex items-center justify-between p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10">
//                 <span className="text-zinc-300 text-sm font-medium">{item}</span>
//                 <AlertCircle className="w-4 h-4 text-orange-500" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* --- AI Mentor Message --- */}
//       <div className="p-1 rounded-[3rem] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent">
//         <div className="bg-black/40 backdrop-blur-3xl p-10 rounded-[2.9rem] flex flex-col md:flex-row items-center gap-8 border border-white/5">
//           <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center shadow-[0_0_30px_#9333ea]">
//             <BrainCircuit className="w-8 h-8 text-white" />
//           </div>
//           <div className="flex-1 space-y-2 text-center md:text-left">
//             <h4 className="text-white font-black text-xl uppercase tracking-tighter">Zenith AI Analysis</h4>
//             <p className="text-zinc-400 text-sm italic">
//               "Your career trajectory is impressive. To reach <span className="text-white">FAANG-level</span> roles, I recommend focusing on System Design documentation and increasing your project impact metrics."
//             </p>
//           </div>
//           <button className="px-10 py-4 bg-white text-black font-black text-[10px] uppercase tracking-[3px] rounded-2xl hover:bg-purple-500 hover:text-white transition-all shadow-2xl">
//             Download Optimized Version
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
