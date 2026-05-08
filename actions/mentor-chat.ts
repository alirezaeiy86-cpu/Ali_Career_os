"use server";

import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { geminiModel } from "@/lib/gemini";

export const sendMessageToMentor = async (message: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "Access Denied: Terminal Unauthorized" };

  try {
    // ۱. استخراج کانتکست کاربر (رزومه و پروژه‌ها)
    const [resume, projects, history] = await Promise.all([
      db.resume.findFirst({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" } }),
      db.project.findMany({ where: { userId: session.user.id } }),
      db.chatMessage.findMany({ 
        where: { userId: session.user.id }, 
        orderBy: { createdAt: "asc" },
        take: 10 // ۱۰ پیام آخر برای حافظه
      })
    ]);

    // ۲. فرمت کردن تاریخچه برای Gemini
    const chatHistory = history.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    // ۳. دستورات سیستمی الترا لوکس
 const systemInstruction = `
نام تو Zenith است. تو یک مشاور ارشد مسیر شغلی هستی.
نام کاربر: ${session.user.name}
وضعیت رزومه: ${resume?.aiScore || "نامشخص"}
پروژه‌ها: ${projects.map(p => p.name).join(", ")}

لحن بیان: حرفه‌ای، آینده‌نگرانه و صمیمی.
زبان پاسخگویی: حتماً فارسی باشد.
وظیفه: با توجه به پروژه‌ها و امتیاز رزومه کاربر، به او مشاوره بده. از ارسال پاسخ به صورت کد یا JSON خودداری کن و مستقیماً با کاربر چت کن.
`;


    // ۴. شروع چت با حافظه
    const chat = geminiModel.startChat({
        
      history: [
        { role: "user", parts: [{ text: systemInstruction }] },
        { role: "model", parts: [{ text: "Neural Link Established. System Online." }] },
        ...chatHistory as any
      ],
    });

    const result = await chat.sendMessage(message);
    const responseText = await result.response.text();

    // ۵. ذخیره در دیتابیس (Transaction برای پایداری)
    const savedMessages = await db.chatMessage.createMany({
      data: [
        { userId: session.user.id, role: "user", content: message },
        { userId: session.user.id, role: "model", content: responseText },
      ]
    });

    return { success: true, text: responseText };

  } catch (error) {
    console.error("MENTOR_CRITICAL_ERROR:", error);
    return { error: "Neural link fractured. Re-sync required." };
  }
};
