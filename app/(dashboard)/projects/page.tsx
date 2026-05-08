import { auth } from "@/auth";
import ProjectHub from "@/components/layout/project-hub-client";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";


export default async function ProjectHubPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // ۱. گرفتن تمام پروژه‌های کاربر از دیتابیس در زمان لود صفحه
  const initialProjects = await db.project.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  // ۲. پاس دادن دیتا به کامپوننت کلاینت
  return <ProjectHub initialData={initialProjects} />;
}
