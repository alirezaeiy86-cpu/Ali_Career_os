"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  MoreHorizontal, 
  Building2, 
  MapPin, 
  Briefcase 
} from "lucide-react";
import { cn } from "@/lib/utils";

const columns = [
  { id: "WISHLIST", title: "Wishlist", color: "bg-zinc-500/20" },
  { id: "APPLIED", title: "Applied", color: "bg-blue-500/20" },
  { id: "INTERVIEWING", title: "Interviewing", color: "bg-purple-500/20" },
  { id: "OFFER", title: "Offer", color: "bg-emerald-500/20" },
];

const jobs = [
  { id: "1", company: "Google", role: "Senior Frontend Engineer", status: "WISHLIST", location: "Remote" },
  { id: "2", company: "Vercel", role: "Product Designer", status: "APPLIED", location: "San Francisco" },
  { id: "3", company: "Linear", role: "Software Engineer", status: "INTERVIEWING", location: "Global" },
];

export default function JobsPage() {
  return (
    <div className="h-full space-y-10 pb-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Job Terminal</h1>
          <p className="text-zinc-500 text-sm mt-1">Track and manage your global career opportunities.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
          <Plus className="w-4 h-4" /> Add Opportunity
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full items-start">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col gap-4 min-h-[500px]">
            {/* Column Header */}
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", column.color.replace('/20', ''))} />
                <h3 className="text-[11px] font-black uppercase tracking-[2px] text-zinc-400">{column.title}</h3>
              </div>
              <span className="text-[10px] font-bold text-zinc-600 bg-white/5 px-2 py-0.5 rounded-md">
                {jobs.filter(j => j.status === column.id).length}
              </span>
            </div>

            {/* Job Cards Container */}
            <div className="space-y-4 p-2 rounded-[2rem] bg-white/[0.01] border border-white/[0.02] h-full min-h-[200px]">
              {jobs.filter(j => j.status === column.id).map((job) => (
                <motion.div
                  key={job.id}
                  layoutId={job.id}
                  whileHover={{ y: -5 }}
                  className="p-5 rounded-2xl bg-[#080810] border border-white/5 hover:border-purple-500/30 transition-all cursor-grab active:cursor-grabbing group shadow-xl"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                      <Building2 className="w-5 h-5 text-zinc-400" />
                    </div>
                    <button className="text-zinc-600 hover:text-white transition">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{job.role}</h4>
                  <p className="text-xs text-zinc-500 font-medium mb-4">{job.company}</p>

                  <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-600">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-600">
                      <Briefcase className="w-3 h-3" /> Full-time
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
