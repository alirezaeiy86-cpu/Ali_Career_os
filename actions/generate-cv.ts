"use server";

import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { geminiModel } from "@/lib/gemini";


export const generateSmartCV = async () => {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const [skillsData, projects] = await Promise.all([
      db.resume.findFirst({ 
        where: { userId: session.user.id }, 
        orderBy: { createdAt: 'desc' } 
      }),
      db.project.findMany({ 
        where: { userId: session.user.id } 
      })
    ]);

    const prompt = `
      You are an elite Career Architect. Based on these GitHub projects: ${projects.map(p => p.name).join(", ")} 
      and these skills: ${JSON.stringify(skillsData?.content)}, 
      generate a high-impact professional summary and a refined list of experiences.
      Return ONLY a JSON object: { "summary": "...", "skills": [], "experience": [] }
    `;

    const result = await geminiModel.generateContent(prompt);
    const cvData = JSON.parse(result.response.text());

    return { success: true, data: cvData };
  } catch (error) {
    console.error("CV_GEN_ERROR:", error);
    return { error: "Failed to synthesize CV data." };
  }
};


export const polishCVSection = async (section: string, content: string) => {
  if (!content || content.length < 5) return { error: "Content too short" };

  try {
    const prompt = `
      You are an expert Executive Resume Writer. 
      Rewrite the following ${section} to be extremely professional, achievement-oriented, and suitable for a Senior Global role.
      Keep it concise but powerful.
      Original Content: "${content}"
      Return ONLY the polished text.
    `;

    const result = await geminiModel.generateContent(prompt);
    const polishedText = result.response.text();

    return { success: true, text: polishedText };
  } catch (error) {
    console.error("POLISH_ERROR:", error);
    return { error: "AI Engine is busy. Try again." };
  }
};

// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@/auth";
// import { geminiModel } from "@/lib/gemini";

// export const generateSmartCV = async () => {
//   const session = await auth();
//   if (!session?.user?.id) return { error: "Unauthorized" };

//   try {
//     
//     const [skillsData, projects] = await Promise.all([
//       db.resume.findFirst({ where: { userId: session.user.id }, orderBy: { createdAt: 'desc' } }),
//       db.project.findMany({ where: { userId: session.user.id } })
//     ]);

//     const prompt = `
//       Create an elite-level Master CV in JSON format.
//       Name: ${session.user.name}
//       Skills extracted: ${JSON.stringify(skillsData?.content)}
//       Projects from GitHub: ${projects.map(p => `${p.name}: ${p.techStack.join(",")}`).join(" | ")}
      
//       Return JSON: { "summary": string, "experience": [], "education": [], "skills": [], "impactMetrics": [] }
//     `;

//     const result = await geminiModel.generateContent(prompt);
//     const cvData = JSON.parse(result.response.text());

//     return { success: true, data: cvData };
//   } catch (error) {
//     return { error: "Failed to synthesize document." };
//   }
// };
