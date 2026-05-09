import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;


  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAuthRoute = nextUrl.pathname === "/login" || nextUrl.pathname === "/register";
  const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");


  if (isApiAuthRoute) return;

  
  if (isAuthRoute) {
    if (isLoggedIn) {

      return Response.redirect(new URL("/dashboard", req.url));
    }
    
    return; 
  }


  if (!isLoggedIn && isDashboardPage) {
  //محافظت از دشبورد 
    return Response.redirect(new URL("/login", req.url));
  }

  return;
});


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

