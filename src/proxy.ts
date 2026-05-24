import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { type NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect non-authenticated users away from protected routes
  if (!user && request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Redirect authenticated users away from auth routes
  if (user && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
