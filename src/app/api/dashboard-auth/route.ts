import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.DASHBOARD_PASSWORD;

  if (!correct) {
    return NextResponse.json(
      { error: "Dashboard password not configured" },
      { status: 500 }
    );
  }

  if (password !== correct) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  };
  // Set cookie for both /dashboard and /api/dashboard-action paths
  res.cookies.set("dashboard_auth", correct, { ...cookieOpts, path: "/dashboard" });
  res.cookies.set("dashboard_auth", correct, { ...cookieOpts, path: "/api/dashboard-action" });

  return res;
}
