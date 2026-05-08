"use server";

import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { geminiModel } from "@/lib/gemini";

export const analyzeProject = async (repoUrl: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Session not found" };

    console.log("Starting analysis for:", repoUrl); // برای دیباگ

    const prompt = `
  Analyze this GitHub repository strictly: ${repoUrl}.
  You must return a valid JSON object with these EXACT fields (0-100 score):
  {
    "score": number,
    "architecture": number,
    "performance": number,
    "cleanCode": number,
    "readability": number,
    "review": "A detailed 2-sentence technical review",
    "techStack": ["Tag1", "Tag2"]
  }
 `;

    const result = await geminiModel.generateContent(prompt);
    
    // اینجا خیلی مهم است: چک کن که آیا جمینای پاسخی داده یا نه
    if (!result.response) {
       console.error("Gemini Response is empty");
       return { error: "No response from AI" };
    }

    const text = result.response.text();
    console.log("Raw AI Response:", text); // چاپ خروجی هوش مصنوعی در ترمینال

    const analysis = JSON.parse(text);

    const project = await db.project.create({
      data: {
        userId: session.user.id,
        name: repoUrl.split("/").pop() || "Project",
        repoUrl: repoUrl,
        techStack: analysis.techStack || [],
        aiImpact: analysis
      }
    });

    return { success: true, data: project };

  } catch (error: any) {
    // این خط تمام جزئیات ارور را در ترمینال VS Code به تو نشان می‌دهد
    console.error("DETAILED_ERROR_LOG:", error.message || error);
    return { error: error.message || "Internal Server Error" };
  }
};
