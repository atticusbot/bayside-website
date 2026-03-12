import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { StatusData, Task } from "@/components/dashboard/types";

const KV_KEY = "dashboard:status";

interface UpdateTaskPayload {
  action: "update-task";
  projectId: string;
  taskId: string;
  updates: Partial<Pick<Task, "status" | "contentPreview" | "contentFull" | "title" | "description" | "blockerNote" | "assignee">>;
}

interface AddTaskPayload {
  action: "add-task";
  projectId: string;
  task: Task;
}

type Payload = UpdateTaskPayload | AddTaskPayload;

export async function POST(req: NextRequest) {
  // Auth: check x-api-key header
  const apiKey = req.headers.get("x-api-key");
  const expected = process.env.DASHBOARD_API_KEY;

  if (!expected || apiKey !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: Payload = await req.json();

  if (!body.action || !body.projectId) {
    return NextResponse.json(
      { error: "Missing required fields: action, projectId" },
      { status: 400 }
    );
  }

  const data = await kv.get<StatusData>(KV_KEY);
  if (!data) {
    return NextResponse.json(
      { error: "No status data in KV. Run seed-kv first." },
      { status: 500 }
    );
  }

  const project = data.projects.find((p) => p.id === body.projectId);
  if (!project) {
    return NextResponse.json(
      { error: `Project '${body.projectId}' not found` },
      { status: 404 }
    );
  }

  if (body.action === "update-task") {
    const task = project.tasks.find((t) => t.id === body.taskId);
    if (!task) {
      return NextResponse.json(
        { error: `Task '${body.taskId}' not found in project '${body.projectId}'` },
        { status: 404 }
      );
    }
    Object.assign(task, body.updates);
    data.updatedAt = new Date().toISOString();
    await kv.set(KV_KEY, data);
    return NextResponse.json({ ok: true, task });
  }

  if (body.action === "add-task") {
    if (!body.task || !body.task.id) {
      return NextResponse.json(
        { error: "Missing required field: task (with id)" },
        { status: 400 }
      );
    }
    project.tasks.push(body.task);
    data.updatedAt = new Date().toISOString();
    await kv.set(KV_KEY, data);
    return NextResponse.json({ ok: true, task: body.task });
  }

  return NextResponse.json(
    { error: `Unknown action: ${(body as { action: string }).action}` },
    { status: 400 }
  );
}
