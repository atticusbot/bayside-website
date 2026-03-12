"use client";

import { useState, useEffect, useCallback } from "react";
import { StatusData } from "@/components/dashboard/types";
import TylerNeeded from "@/components/dashboard/TylerNeeded";
import ProjectCard from "@/components/dashboard/ProjectCard";
import AgentFeed from "@/components/dashboard/AgentFeed";

function formatUpdatedAt(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
}

export default function DashboardPage() {
  const [data, setData] = useState<StatusData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/status?t=${Date.now()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: StatusData = await res.json();
      setData(json);
      setError(null);
      setLastFetch(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load status");
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  if (!data && !error) {
    return (
      <div className="min-h-screen bg-ocean-dark flex items-center justify-center">
        <p className="text-foam/40 text-sm">Loading status…</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-ocean-dark flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-coral text-sm">{error}</p>
          <button
            onClick={fetchStatus}
            className="mt-3 text-bio text-sm underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Summary stats
  const totalTasks = data.projects.reduce((s, p) => s + p.tasks.length, 0);
  const doneTasks = data.projects.reduce(
    (s, p) => s + p.tasks.filter((t) => t.status === "done").length,
    0
  );
  const inProgress = data.projects.reduce(
    (s, p) => s + p.tasks.filter((t) => t.status === "in-progress").length,
    0
  );
  const reviewCount = data.projects.reduce(
    (s, p) => s + p.tasks.filter((t) => t.status === "review").length,
    0
  );
  const queuedCount = data.projects.reduce(
    (s, p) => s + p.tasks.filter((t) => t.status === "queued").length,
    0
  );
  const blockedCount = data.tylerNeeded.filter((t) => t.type === "blocked").length;

  return (
    <div className="min-h-screen bg-ocean-dark">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-foam">Bayside Ops</h1>
            <p className="text-xs text-foam/30 font-mono mt-0.5">
              Updated {formatUpdatedAt(data.updatedAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {error && (
              <span className="text-[10px] text-coral">sync error</span>
            )}
            <div
              className={`h-2 w-2 rounded-full ${error ? "bg-coral" : "bg-green-500"} animate-pulse`}
              title={lastFetch ? `Last fetched: ${lastFetch.toLocaleTimeString()}` : ""}
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-8">
          <StatBox label="Total Tasks" value={totalTasks} />
          <StatBox label="Done" value={doneTasks} accent="text-green-400" />
          <StatBox label="In Progress" value={inProgress} accent="text-bio" />
          <StatBox label="Review" value={reviewCount} accent="text-yellow-400" />
          <StatBox label="Queued" value={queuedCount} accent="text-foam/60" />
          <StatBox label="Blocked" value={blockedCount} accent="text-coral" />
        </div>

        {/* Tyler Needed */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foam/60 uppercase tracking-wider mb-3">
            Tyler Needed
            {data.tylerNeeded.length > 0 && (
              <span className="ml-2 text-coral font-mono">{data.tylerNeeded.length}</span>
            )}
          </h2>
          <TylerNeeded items={data.tylerNeeded} />
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foam/60 uppercase tracking-wider mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <ProjectCard key={project.id} project={project} onRefetch={fetchStatus} />
            ))}
          </div>
        </section>

        {/* Agent Activity */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-foam/60 uppercase tracking-wider mb-3">
            Agent Activity
            <span className="ml-2 text-foam/30 font-mono text-xs">last 24h</span>
          </h2>
          <div className="rounded-lg border border-ocean-light/20 bg-ocean-mid/30 p-4">
            <AgentFeed activity={data.agentActivity} />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div className="rounded-lg border border-ocean-light/20 bg-ocean-mid/30 p-3">
      <p className="text-xs text-foam/40">{label}</p>
      <p className={`text-2xl font-mono font-bold ${accent || "text-foam"}`}>
        {value}
      </p>
    </div>
  );
}
