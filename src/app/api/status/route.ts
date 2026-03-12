import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { StatusData } from "@/components/dashboard/types";
import fs from "fs";
import path from "path";

const KV_KEY = "dashboard:status";

export async function GET(req: NextRequest) {
  // Auth: check dashboard_auth cookie
  const authCookie = req.cookies.get("dashboard_auth")?.value;
  const correct = process.env.DASHBOARD_PASSWORD;

  if (!correct || authCookie !== correct) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Try KV first
    const data = await kv.get<StatusData>(KV_KEY);
    if (data) {
      return NextResponse.json(data);
    }
  } catch {
    // KV unavailable — fall through to file fallback
    console.error("KV read failed, falling back to status.json");
  }

  // Fallback: read from public/status.json
  try {
    const filePath = path.join(process.cwd(), "public", "status.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data: StatusData = JSON.parse(raw);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "No status data available" },
      { status: 500 }
    );
  }
}
