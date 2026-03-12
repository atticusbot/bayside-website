import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { StatusData, Task } from "@/components/dashboard/types";

const KV_KEY = "dashboard:status";

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

  // Read state from KV
  let data: StatusData | null = null;
  try {
    data = await kv.get<StatusData>(KV_KEY);
  } catch {
    console.error("KV read failed");
  }

  // Update state if KV data exists
  if (data) {
    const project = data.projects.find((p) => p.id === body.projectId);
    const task = project?.tasks.find((t) => t.id === body.taskId);

    if (project && task) {
      if (body.action === "confirm") {
        task.status = "done";
        task.completedAt = new Date().toISOString();

        // Remove from tylerNeeded
        data.tylerNeeded = data.tylerNeeded.filter(
          (t) => !(t.taskId === body.taskId && t.project === project.name)
        );

        // Task cascading: spawn successor tasks from templates
        if (task.spawns && task.spawns.length > 0 && data.taskTemplates) {
          for (const templateId of task.spawns) {
            const template = data.taskTemplates[templateId];
            if (template) {
              const newTask: Task = {
                ...template,
                status: "queued",
                startedAt: null,
                completedAt: null,
              };
              project.tasks.push(newTask);
            }
          }
        }
      } else if (body.action === "iterate") {
        // Keep in review, append feedback
        if (!task.feedback) {
          task.feedback = [];
        }
        task.feedback.push(body.feedback!.trim());
      }

      data.updatedAt = new Date().toISOString();

      try {
        await kv.set(KV_KEY, data);
      } catch {
        console.error("KV write failed");
      }
    }
  }

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

  return NextResponse.json({ ok: true });
}
