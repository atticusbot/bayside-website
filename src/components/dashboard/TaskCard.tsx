"use client";

import { useState } from "react";
import { Task } from "./types";

const tierColors: Record<Task["tier"], { dot: string; border: string }> = {
  green: { dot: "bg-green-500", border: "border-green-500/20" },
  yellow: { dot: "bg-yellow-500", border: "border-yellow-500/20" },
  red: { dot: "bg-coral", border: "border-coral/20" },
};

function timeInState(task: Task): string | null {
  let since: string | null = null;
  if (task.status === "done" || task.status === "queued") return null;
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

function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  for (const line of lines) {
    const key = i++;
    if (line.startsWith("### ")) {
      elements.push(
        <h4 key={key} className="text-xs font-bold text-foam/80 mt-2 mb-1">
          {line.slice(4)}
        </h4>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h3 key={key} className="text-sm font-bold text-foam/90 mt-2 mb-1">
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h2 key={key} className="text-sm font-bold text-foam mt-2 mb-1">
          {line.slice(2)}
        </h2>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <li key={key} className="text-xs text-foam/70 ml-3 list-disc">
          <InlineMarkdown text={line.slice(2)} />
        </li>
      );
    } else if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, "");
      elements.push(
        <li key={key} className="text-xs text-foam/70 ml-3 list-decimal">
          <InlineMarkdown text={text} />
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={key} className="h-1" />);
    } else {
      elements.push(
        <p key={key} className="text-xs text-foam/70">
          <InlineMarkdown text={line} />
        </p>
      );
    }
  }

  return <div>{elements}</div>;
}

function InlineMarkdown({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foam/90">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="px-1 py-0.5 rounded bg-ocean-light/30 text-bio font-mono text-[10px]"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

interface TaskCardProps {
  task: Task;
  projectId: string;
  onRefetch?: () => void;
}

export default function TaskCard({ task, projectId, onRefetch }: TaskCardProps) {
  const colors = tierColors[task.tier];
  const elapsed = timeInState(task);
  const isReview = task.status === "review";
  const isDone = task.status === "done";
  const hasFeedback = task.feedback && task.feedback.length > 0;

  const [confirming, setConfirming] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const borderClass = isReview
    ? "border-yellow-500/40"
    : task.status === "queued"
      ? "border-foam/20"
      : colors.border;

  async function handleConfirm() {
    setConfirming(true);
    setActionError(null);
    try {
      const res = await fetch("/api/dashboard-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "confirm",
          taskId: task.id,
          projectId,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Request failed");
      }
      onRefetch?.();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed");
    } finally {
      setConfirming(false);
    }
  }

  async function handleSubmitFeedback() {
    if (!feedback.trim()) return;
    setSubmittingFeedback(true);
    setActionError(null);
    try {
      const res = await fetch("/api/dashboard-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "iterate",
          taskId: task.id,
          projectId,
          feedback: feedback.trim(),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Request failed");
      }
      setShowFeedback(false);
      setFeedback("");
      onRefetch?.();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed");
    } finally {
      setSubmittingFeedback(false);
    }
  }

  return (
    <div className={`rounded border ${borderClass} bg-ocean-dark/60 p-2.5`}>
      <div className="flex items-center gap-1.5 mb-1">
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${colors.dot} flex-shrink-0`} />
        <span className="font-mono text-[10px] text-foam/50">{task.id}</span>
        {isReview && hasFeedback && !isDone && (
          <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded-full ml-auto">
            Feedback sent
          </span>
        )}
        {isDone && (
          <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full ml-auto">
            Confirmed
          </span>
        )}
        {task.status === "queued" && (
          <span className="text-[10px] bg-foam/10 text-foam/50 px-1.5 py-0.5 rounded-full ml-auto">
            Queued
          </span>
        )}
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

      {/* Feedback history */}
      {hasFeedback && (
        <div className="mt-2 space-y-1">
          <p className="text-[10px] text-foam/40 uppercase tracking-wider">Feedback</p>
          {task.feedback!.map((fb, i) => (
            <div key={i} className="rounded bg-yellow-500/5 border border-yellow-500/20 px-2 py-1">
              <p className="text-[10px] text-foam/60">{fb}</p>
            </div>
          ))}
        </div>
      )}

      {/* Review-specific: content preview + actions */}
      {isReview && (
        <div className="mt-2.5 space-y-2">
          {/* Content preview */}
          {task.contentPreview && (
            <div className="rounded bg-ocean-mid/60 border border-ocean-light/20 p-2 max-h-48 overflow-y-auto">
              <SimpleMarkdown
                content={
                  showFullContent && task.contentFull
                    ? task.contentFull
                    : task.contentPreview
                }
              />
              {task.contentFull && task.contentFull.length > (task.contentPreview?.length || 0) && (
                <button
                  onClick={() => setShowFullContent(!showFullContent)}
                  className="text-[10px] text-bio hover:text-bio/80 mt-1.5 underline"
                >
                  {showFullContent ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-1.5">
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="flex-1 px-2.5 py-1.5 rounded text-[11px] font-medium bg-green-500/20 text-green-400 hover:bg-green-500/30 disabled:opacity-50 transition-colors"
            >
              {confirming ? "Confirming…" : "Confirm \u2705"}
            </button>
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="flex-1 px-2.5 py-1.5 rounded text-[11px] font-medium bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 disabled:opacity-50 transition-colors"
            >
              Iterate 🔄
            </button>
          </div>

          {/* Feedback input */}
          {showFeedback && (
            <div className="space-y-1.5">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What needs to change?"
                rows={3}
                className="w-full rounded bg-ocean-mid/60 border border-ocean-light/30 focus:border-yellow-500/60 p-2 text-xs text-foam/80 placeholder:text-foam/30 outline-none resize-none"
              />
              <button
                onClick={handleSubmitFeedback}
                disabled={submittingFeedback || !feedback.trim()}
                className="w-full px-2.5 py-1.5 rounded text-[11px] font-medium bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 disabled:opacity-50 transition-colors"
              >
                {submittingFeedback ? "Sending…" : "Submit Feedback"}
              </button>
            </div>
          )}

          {/* Error display */}
          {actionError && (
            <p className="text-[10px] text-coral">{actionError}</p>
          )}
        </div>
      )}
    </div>
  );
}
