"use server";

import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { geminiModel } from "@/lib/gemini";

export const startInterviewSession = async (message: string, history: any[]) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  // استخراج رزومه برای اینکه سوالات شخصی‌سازی شده باشد
  const resume = await db.resume.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });

  const systemInstruction = `
    You are an elite Tech Lead from a FAANG company. 
    Interviewing: ${session.user.name}.
    Context: Use their resume data if available: ${JSON.stringify(resume?.content)}.
    Tone: Professional, challenging, and observant. 
    Task: Ask one high-level technical or behavioral question at a time. 
    Evaluation: After the user answers, provide a brief "CRITICAL ANALYSIS" in one sentence before asking the next question.
  `;

  const chat = geminiModel.startChat({
    history: [
      { role: "user", parts: [{ text: systemInstruction }] },
      { role: "model", parts: [{ text: "Neural Link Established. System ready for interrogation." }] },
      ...history
    ],
  });

  const result = await chat.sendMessage(message);
  return { text: result.response.text() };
};
