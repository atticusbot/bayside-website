"use client";

import { useState } from "react";
import { Project } from "./types";
import TaskCard from "./TaskCard";

function lastActivity(project: Project): string {
  const timestamps = project.tasks
    .flatMap((t) => [t.startedAt, t.completedAt])
    .filter(Boolean) as string[];
  if (timestamps.length === 0) return "No activity yet";
  timestamps.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const last = new Date(timestamps[0]);
  const now = new Date();
  const diffMs = now.getTime() - last.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ${diffMins % 60}m ago`;
  return `${Math.floor(diffHrs / 24)}d ago`;
}

const columns = [
  { key: "ready", label: "Ready" },
  { key: "in-progress", label: "In Progress" },
  { key: "review", label: "Review" },
  { key: "done", label: "Done" },
] as const;

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  const done = project.tasks.filter((t) => t.status === "done").length;
  const total = project.tasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="rounded-lg border border-ocean-light/40 bg-ocean-mid/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foam">{project.name}</h3>
            <p className="text-xs text-foam/50 mt-0.5">{project.phase}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-mono text-bio">
              {done}/{total}
            </p>
            <p className="text-xs text-foam/40">{lastActivity(project)}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-ocean-light/30 overflow-hidden">
            <div
              className="h-full rounded-full bg-bio transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-mono text-foam/50 w-8 text-right">{pct}%</span>
          <svg
            className={`w-4 h-4 text-foam/40 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-ocean-light/20">
          {/* Kanban columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {columns.map((col) => {
              const tasks = project.tasks.filter((t) => t.status === col.key);
              return (
                <div key={col.key}>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-xs font-semibold text-foam/50 uppercase tracking-wider">
                      {col.label}
                    </h4>
                    <span className="text-xs font-mono text-foam/30">{tasks.length}</span>
                  </div>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                    {tasks.length === 0 && (
                      <p className="text-xs text-foam/20 italic py-2">None</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
