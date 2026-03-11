"use client";

import { AgentActivityEntry } from "./types";

const resultColors: Record<string, string> = {
  pass: "text-green-400",
  "in-progress": "text-bio",
  review: "text-yellow-500",
  fail: "text-coral",
};

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function AgentFeed({
  activity,
}: {
  activity: AgentActivityEntry[];
}) {
  if (activity.length === 0) {
    return (
      <p className="text-sm text-foam/40 italic">No agent activity in the last 24h.</p>
    );
  }

  return (
    <div className="space-y-1">
      {activity.map((entry, i) => (
        <div
          key={`${entry.taskId}-${entry.timestamp}-${i}`}
          className="flex items-start gap-3 py-2 border-b border-ocean-light/10 last:border-0"
        >
          <span className="font-mono text-xs text-foam/30 w-12 flex-shrink-0 pt-0.5">
            {formatTime(entry.timestamp)}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-bio/70">{entry.taskId}</span>
              <span className="text-xs text-foam/30">{entry.action}</span>
              <span className={`text-xs font-mono ${resultColors[entry.result] || "text-foam/40"}`}>
                {entry.result}
              </span>
            </div>
            <p className="text-xs text-foam/50 mt-0.5 leading-tight">{entry.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
