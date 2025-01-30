import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Retrieve the token from cookies
  console.log(token);

  const protectedRoutes = ["/employee-dashboard", "/employees", "/transactions", "/reports", "/settings"];

  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    console.log(req.url);
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if no token
  }

  return NextResponse.next(); // Allow access if token exists
}

export const config = {
  matcher: ["/employee-dashboard", "/employees", "/transactions", "/reports", "/settings"], // Protected routes
};
