export interface Task {
  id: string;
  title: string;
  status: "queued" | "ready" | "in-progress" | "review" | "done";
  tier: "green" | "yellow" | "red";
  description: string;
  assignee: string;
  depends: string[];
  output: string;
  startedAt: string | null;
  completedAt: string | null;
  blockerNote: string | null;
  contentPreview?: string;
  contentFull?: string;
  spawns?: string[];
  feedback?: string[];
}

export interface Blocker {
  taskId: string;
  description: string;
  severity: "red" | "yellow";
}

export interface Project {
  id: string;
  name: string;
  phase: string;
  tasks: Task[];
  blockers: Blocker[];
}

export interface AgentActivityEntry {
  timestamp: string;
  project: string;
  taskId: string;
  action: string;
  result: string;
  detail: string;
}

export interface TylerNeededEntry {
  taskId: string;
  project: string;
  type: "blocked" | "review";
  description: string;
  waitingSince: string;
}

export interface StatusData {
  updatedAt: string;
  projects: Project[];
  agentActivity: AgentActivityEntry[];
  tylerNeeded: TylerNeededEntry[];
  taskTemplates?: Record<string, Omit<Task, 'status' | 'completedAt' | 'startedAt'>>;
}
