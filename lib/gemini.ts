import { GoogleGenerativeAI } from "@google/generative-ai";

// حتماً GEMINI_API_KEY را در فایل .env خودت اضافه کن
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
  generationConfig: {
    responseMimeType: "application/json", // این خط باعث می‌شود خروجی همیشه JSON تمیز باشد
  },
});
