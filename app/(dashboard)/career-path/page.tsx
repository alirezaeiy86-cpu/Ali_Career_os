import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import RoadmapClient from "./roadmap-client";

export default async function RoadmapPage() {
  const session = await auth();
  if (!session) redirect("/login");
  

  const roadmapData = await db.roadmap.findUnique({
    where: { userId: session.user.id! }
  });

  // ا
  const steps = (roadmapData?.steps as any[]) || [];

  return <RoadmapClient steps={steps} user={session.user} />;
}
