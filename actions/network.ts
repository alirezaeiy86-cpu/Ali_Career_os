"use server";
import { auth } from "@/auth";

export const getNetworkNodes = async () => {
  const session = await auth();
  if (!session) return { error: "Access Denied" };

  // در اینجا بعداً از API لینکدین یا دیتابیس خودمان دیتا می‌گیریم
  return {
    nodes: [
      { id: 1, name: "Google", type: "company", strength: 0.8, logo: "G" },
      { id: 2, name: "OpenAI", type: "company", strength: 0.4, logo: "AI" },
      { id: 3, name: "Sarah Chen", type: "person", role: "Senior Architect", strength: 0.9 },
      { id: 4, name: "Alex Rivera", type: "person", role: "CTO at Stealth Startup", strength: 0.6 },
    ]
  };
};
