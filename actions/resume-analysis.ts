
"use server"

// "use server";

import { db } from "@/lib/prisma";
import { auth } from "@/auth";

//import pdf  from "pdf-parse"
import { OpenAI } from "openai";
import {GoogleGenerativeAI} from "@google/generative-ai"
//@ts-ignore
import pdf from "pdf-parse-fork";
import test from "node:test";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({model:"gemini-3.1-flash-lite-preview",
    generationConfig:{
        responseMimeType:"application/json"
    }
},{apiVersion:'v1beta'}); 

export const analyzeResume = async (formData: FormData) => {
    // if(typeof global.DOMMatrix === "undefined"){
    //     (global as any).DOMMatrix = class DOMMatrix{
    //         constructor(){}
    //     };
    // }
    // const pdf = require("pdf-parse");
    
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized access." };

  const file = formData.get("file") as File;
  if (!file) return { error: "No file uploaded." };

  try {
    // 
    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfData = await pdf(buffer);
    const rawText = pdfData.text;
    console.log("PDF Text Extracted", rawText);

     const prompt = `
      You are an expert Career Architect. Analyze the following resume text and perform two tasks:
      1. Rate the resume from 0-100 and identify strengths, improvements, and skill matrix.
      2. Create a 3-step personalized career roadmap to help this user reach a senior global position.

      Return ONLY a JSON object with this exact structure:
      {
        "analysis": {
          "score": number,
          "strengths": string[],
          "improvements": string[],
          "aiFeedback": string,
          "chartData": [{"subject": string, "A": number, "fullMark": 100}]
        },
        "roadmap": [
          {"title": string, "desc": string, "status": "completed" | "current" | "upcoming"}
        ]
      }

      Resume Text: ${rawText}
    `;
    
    const result = await model.generateContent(prompt);
    const respons = await result.response;
    const text = respons.text();
    console.log("Thi is from AI :",text);
  
    let rawJsonResponse = text.replace(/```json|```/g,"").trim();

    const data = JSON.parse(text || "{}");

    // ۳. Save in database
    // const resume = await db.resume.create({
    //   data: {
    //     userId: session.user.id,
    //     title: file.name,
    //     rawText: rawText,
    //     content: analysis,
    //     aiScore: analysis.score,
        
    //   }
    // });
    

    // return { success: true, data: resume };

     const finalResult = await db.$transaction(async (tx) => {
      if (!session.user?.id){
        throw new Error("User dont exist")
      }
      const newResume = await tx.resume.create({
        data: {
          userId: session.user.id,
          title: file.name,
          content: data.analysis,
          aiScore: data.analysis.score,
        },
      });

      await tx.roadmap.upsert({
        where: { userId: session.user.id },
        update: { steps: data.roadmap },
        create: {
          userId: session.user.id,
          steps: data.roadmap,
        },
      });

      return newResume;
    });

    return { success: true, id: finalResult.id ,data: { id: finalResult.id }};

  } catch (error) {
    console.error("AI_ANALYSIS_ERROR:", error);
    return { error: "Failed to analyze resume. System core error." };
  }
};

