"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma";
import { auth } from "@/auth";

export const updateSecurity = async (currentPass: string, newPass: string) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized access." };

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user || !user.password) return { error: "User profile corrupted." };

  const passwordsMatch = await bcrypt.compare(currentPass, user.password);
  if (!passwordsMatch) return { error: "Current System Key is incorrect." };

  const hashedPassword = await bcrypt.hash(newPass, 10);

  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword }
  });

  return { success: "Neural Access Key Re-encrypted." };
};
