
// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "@/lib/prisma";
// import authConfig from "./auth.config";

// export const {
//   handlers,
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   callbacks: {
//     async session({ token, session }) {
//       if (token.sub && session.user) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//   },
//   adapter: PrismaAdapter(db),
//   session: { strategy: "jwt" },
//   ...authConfig,
// });

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/prisma";
import authConfig from "./auth.config";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/lib/validations/auth";

export const { 
  handlers, auth, signIn, signOut 
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" ,
    maxAge: 30 * 60,
  },
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await db.user.findUnique({ where: { email } });

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    
  },
  trustHost:true
});


// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import Credentials from "next-auth/providers/credentials";
// import { db } from "@/lib/prisma";
// import authConfig from "./auth.config";
// import bcrypt from "bcryptjs";
// import { LoginSchema } from "@/lib/validations/auth";

// export const { 
//   handlers, auth, signIn, signOut 
// } = NextAuth({
//   adapter: PrismaAdapter(db),
//   session: { 
//     strategy: "jwt",
//     maxAge: 30 * 60, // اگر کاربر ۳۰ دقیقه فعالیت نکند، سشن منقضی می‌شود
//   },
//   // --- جادوی Session-Only اینجاست ---
//   cookies: {
//     sessionToken: {
//       name: `next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: process.env.NODE_ENV === "production",
//         // با حذف فیلد maxAge از اینجا، کوکی به Session Cookie تبدیل می‌شود
//         // و با بستن کل مرورگر، پاک خواهد شد.
//       },
//     },
//   },
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const validatedFields = LoginSchema.safeParse(credentials);

//         if (validatedFields.success) {
//           const { email, password } = validatedFields.data;
//           const user = await db.user.findUnique({ where: { email } });

//           if (!user || !user.password) return null;

//           const passwordsMatch = await bcrypt.compare(password, user.password);
//           if (passwordsMatch) return user;
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ token, session }) {
//       if (token.sub && session.user) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       // برای سرعت بیشتر، اطلاعات پایه را به توکن اضافه می‌کنیم
//       if (user) {
//         token.sub = user.id;
//       }
//       return token;
//     }
//   },
// });
