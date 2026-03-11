"use client";

import { Task } from "./types";

const tierColors: Record<Task["tier"], { dot: string; border: string }> = {
  green: { dot: "bg-green-500", border: "border-green-500/20" },
  yellow: { dot: "bg-yellow-500", border: "border-yellow-500/20" },
  red: { dot: "bg-coral", border: "border-coral/20" },
};

function timeInState(task: Task): string | null {
  let since: string | null = null;
  if (task.status === "done") return null;
  if (task.status === "in-progress" || task.status === "review") {
    since = task.startedAt;
  }
  if (!since) return null;
  const now = new Date();
  const then = new Date(since);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ${diffMins % 60}m`;
  return `${Math.floor(diffHrs / 24)}d ${diffHrs % 24}h`;
}

export default function TaskCard({ task }: { task: Task }) {
  const colors = tierColors[task.tier];
  const elapsed = timeInState(task);

  return (
    <div className={`rounded border ${colors.border} bg-ocean-dark/60 p-2.5`}>
      <div className="flex items-center gap-1.5 mb-1">
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${colors.dot} flex-shrink-0`} />
        <span className="font-mono text-[10px] text-foam/50">{task.id}</span>
      </div>
      <p className="text-xs text-foam/80 leading-tight">{task.title}</p>
      <div className="flex items-center gap-2 mt-1.5">
        <span className="text-[10px] text-foam/30">{task.assignee}</span>
        {elapsed && (
          <>
            <span className="text-[10px] text-foam/20">·</span>
            <span className="text-[10px] font-mono text-foam/30">{elapsed}</span>
          </>
        )}
      </div>
      {task.blockerNote && (
        <p className="text-[10px] text-coral/80 mt-1.5 leading-tight">
          {task.blockerNote}
        </p>
      )}
    </div>
  );
}
