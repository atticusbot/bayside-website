import { NextRequest, NextResponse } from "next/server";

interface ActionPayload {
  action: "confirm" | "iterate";
  taskId: string;
  projectId: string;
  feedback?: string;
}

export async function POST(req: NextRequest) {
  // Auth: check dashboard_auth cookie matches DASHBOARD_PASSWORD
  const authCookie = req.cookies.get("dashboard_auth")?.value;
  const correct = process.env.DASHBOARD_PASSWORD;

  if (!correct || authCookie !== correct) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: ActionPayload = await req.json();

  if (!body.action || !body.taskId || !body.projectId) {
    return NextResponse.json(
      { error: "Missing required fields: action, taskId, projectId" },
      { status: 400 }
    );
  }

  if (body.action !== "confirm" && body.action !== "iterate") {
    return NextResponse.json(
      { error: "action must be 'confirm' or 'iterate'" },
      { status: 400 }
    );
  }

  if (body.action === "iterate" && !body.feedback?.trim()) {
    return NextResponse.json(
      { error: "feedback is required for iterate actions" },
      { status: 400 }
    );
  }

  const entry = {
    timestamp: new Date().toISOString(),
    action: body.action,
    taskId: body.taskId,
    projectId: body.projectId,
    ...(body.feedback ? { feedback: body.feedback } : {}),
  };

  // Send to Discord webhook if configured
  const webhookUrl = process.env.DASHBOARD_WEBHOOK_URL;
  if (webhookUrl) {
    const emoji = body.action === "confirm" ? "\u2705" : "\uD83D\uDD04";
    const lines = [
      `${emoji} **Dashboard Action: ${body.action.toUpperCase()}**`,
      `**Task:** ${body.taskId} (${body.projectId})`,
    ];
    if (body.feedback) {
      lines.push(`**Feedback:** ${body.feedback}`);
    }

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: lines.join("\n") }),
      });
    } catch {
      // Non-blocking — don't fail the request if Discord is down
      console.error("Failed to send to Discord webhook");
    }
  }

  return NextResponse.json({ ok: true, entry });
}
