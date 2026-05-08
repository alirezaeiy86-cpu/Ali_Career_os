import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // ۱. تعریف مسیرها
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAuthRoute = nextUrl.pathname === "/login" || nextUrl.pathname === "/register";
  const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");

  // ۲. اجازه بده درخواست‌های API مربوط به Auth رد شوند
  if (isApiAuthRoute) return;

  // ۳. منطق صفحات لاگین و ثبت‌نام
  if (isAuthRoute) {
    if (isLoggedIn) {
      // اگر لاگین کرده، نباید دوباره به صفحه لاگین برود؛ بفرستش داشبورد
      return Response.redirect(new URL("/dashboard", nextUrl));
    }
    // اگر لاگین نکرده، اجازه بده صفحه لاگین باز شود (اینجا نباید ریدایرکت شود)
    return; 
  }

  // ۴. محافظت از داشبورد
  if (!isLoggedIn && isDashboardPage) {
    // اگر لاگین نیست و می‌خواهد برود داشبورد، بفرستش لاگین
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
});

// این بخش تعیین می‌کند میدل‌ور روی چه صفحاتی اجرا شود
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

