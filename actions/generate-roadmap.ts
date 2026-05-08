"use server";

import { OpenAI } from "openai";
import { auth } from "@/auth";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateRoadmap = async (targetRole: string, currentSkills: string[]) => {
  const session = await auth();
  if (!session) return { error: "Access Denied" };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Create a 3-step career roadmap. Return a JSON array: [{step: 1, title, description, resources: []}]"
        },
        { 
          role: "user", 
          content: `Target Role: ${targetRole}. Current Skills: ${currentSkills.join(", ")}` 
        }
      ],
      response_format: { type: "json_object" }
    });

    return { success: true, roadmap: JSON.parse(response.choices[0].message.content || "[]") };
  } catch (error) {
    return { error: "AI Engine fail." };
  }
};
