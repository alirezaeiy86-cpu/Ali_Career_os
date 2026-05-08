"use server";

import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export const updateProfile = async (values: { name?: string, title?: string, image?: string | null }) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return { error: "Access Denied: Terminal Unauthorized" };

  try {
    let finalImageUrl = values.image;

    // جادوی اصلی: اگر تصویر به صورت Base64 است، آن را آپلود کن
    if (values.image && values.image.startsWith("data:image")) {
      const uploadedUrl = await uploadImage(values.image);
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      } else {
        return { error: "Neural Image Linkage Failed." };
      }
    }

    // بروزرسانی هسته مرکزی دیتابیس
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: values.name,
        // اگر فیلد title را در اسکیما داری:
        // title: values.title, 
        image: finalImageUrl,
      },
    });

    revalidatePath("/settings"); // بروزرسانی آنی حافظه کش سیستم
    
    return { 
      success: "Neural Identity Synchronized.",
      user: updatedUser 
    };

  } catch (error) {
    console.error("PROFILE_UPDATE_ERROR:", error);
    return { error: "Core Update Protocol Interrupted." };
  }
};

// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@/auth";
// import { revalidatePath } from "next/cache";

// export const updateProfile = async (values: { 
//   name?: string; 
//   title?: string; 
//   bio?: string;
//   image?: string;
// }) => {
//   const session = await auth();
//   if (!session?.user?.id) return { error: "Access Denied" };

//   try {
//     await db.user.update({
//       where: { id: session.user.id },
//       data: { ...values }
//     });

//     revalidatePath("/settings"); // بروزرسانی فوری کش
//     return { success: "Neural Identity Synchronized" };
//   } catch (error) {
//     return { error: "Database Sync Failed" };
//   }
// };
