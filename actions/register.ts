"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma"; // نام فایل دیتابیس خودت را چک کن (db یا prisma)
import { RegisterSchema } from "@/lib/validations/auth";
import {uploadImage} from "@/lib/cloudinary";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // ۱. اعتبارسنجی فیلدها با Zod
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid identity parameters!" };
  }

  // استخراج داده‌ها (مطمئن شو در RegisterSchema فیلد image وجود دارد)
  const { email, password, name, image } = validatedFields.data;

  try {
    let imageUrl = null;
    console.log("Image Data From :",image);
    if(image){

      imageUrl = await uploadImage(image);
      console.log("Cloudinary URL: ",imageUrl);
    }
    // ۲. هش کردن پسورد با الگوریتم امن
    const hashedPassword = await bcrypt.hash(password, 10);

    // ۳. چک کردن وجود کاربر از قبل
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { error: "Neural link already established with this email." };
    }

    // ۴. ایجاد کاربر جدید در هسته سیستم
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: imageUrl, // اگر تصویر نبود، نال ست شود
      },
    });

    return { success: "Authorization successful." };
  } catch (error: any) {
    console.error("DATABASE_ERROR:", error); // این را در ترمینال چک کن
    return { error: "Core sync failed. Check database connection." };
  }
};

