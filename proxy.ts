import { Roles } from "@/constants/roles";
import { userService } from "@/service/user.service";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let role: string | null = null;

  const { data } = await userService.getSession();

  //* Not authenticated
  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  role = data.user.role;

  //* ADMIN rules
  if (role === Roles.admin) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/provider-dashboard")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  //* PROVIDER rules
  if (role === Roles.provider) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }
  }

  //* CUSTOMER rules
  if (role === Roles.customer) {
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/provider-dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/dashboard",
    "/dashboard/:path*",
    // "/admin-dashboard",
    "/admin-dashboard/:path*",
    // "/provider-dashboard",
    "/provider-dashboard/:path*",
  ],
};
