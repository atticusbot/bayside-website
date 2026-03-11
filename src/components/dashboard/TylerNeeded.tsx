"use client";

import { TylerNeededEntry } from "./types";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ${diffMins % 60}m ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ${diffHrs % 24}h ago`;
}

export default function TylerNeeded({
  items,
}: {
  items: TylerNeededEntry[];
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
        <p className="text-sm text-green-400">Nothing needs your attention right now.</p>
      </div>
    );
  }

  const blocked = items.filter((i) => i.type === "blocked");
  const review = items.filter((i) => i.type === "review");

  return (
    <div className="space-y-3">
      {blocked.map((item) => (
        <div
          key={item.taskId}
          className="rounded-lg border border-coral/40 bg-coral/5 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block h-2 w-2 rounded-full bg-coral flex-shrink-0" />
                <span className="font-mono text-xs text-coral">{item.taskId}</span>
                <span className="text-xs text-foam/40">·</span>
                <span className="text-xs text-foam/60">{item.project}</span>
              </div>
              <p className="text-sm text-foam/90">{item.description}</p>
            </div>
            <span className="text-xs text-coral/80 font-mono whitespace-nowrap flex-shrink-0">
              {timeAgo(item.waitingSince)}
            </span>
          </div>
        </div>
      ))}
      {review.map((item) => (
        <div
          key={item.taskId}
          className="rounded-lg border border-yellow-500/40 bg-yellow-500/5 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 flex-shrink-0" />
                <span className="font-mono text-xs text-yellow-500">{item.taskId}</span>
                <span className="text-xs text-foam/40">·</span>
                <span className="text-xs text-foam/60">{item.project}</span>
              </div>
              <p className="text-sm text-foam/90">{item.description}</p>
            </div>
            <span className="text-xs text-yellow-500/80 font-mono whitespace-nowrap flex-shrink-0">
              {timeAgo(item.waitingSince)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
