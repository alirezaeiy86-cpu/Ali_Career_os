"use server";

import { signIn } from "@/auth"; // This is from your setting of your auth
import { LoginSchema } from "@/lib/validations/auth";
import { AuthError } from "next-auth";
import * as z from "zod";
import {redirect} from "next/navigation"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": return { error: "Invalid credentials!" };
        default: return { error: "Something went wrong!" };
      }
    }
    throw error;
  }

  redirect("/dashboard");
};

