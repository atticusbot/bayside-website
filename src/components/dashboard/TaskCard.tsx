"use client";

import { useState, useEffect } from "react";
import { Task } from "./types";

const tierColors: Record<Task["tier"], { dot: string; border: string }> = {
  green: { dot: "bg-green-500", border: "border-green-500/20" },
  yellow: { dot: "bg-yellow-500", border: "border-yellow-500/20" },
  red: { dot: "bg-coral", border: "border-coral/20" },
};

const CONFIRMED_KEY = "dashboard_confirmed_tasks";
const FEEDBACK_SENT_KEY = "dashboard_feedback_sent_tasks";

function getStoredSet(key: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
  } catch {
    return new Set();
  }
}

function storeSet(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify(Array.from(set)));
}

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

function SimpleMarkdown({ content }: { content: string }) {
  // Minimal markdown renderer: headers, bold, lists, paragraphs
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
  // Handle **bold** and `code`
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
  onConfirmed?: (taskId: string) => void;
}

export default function TaskCard({ task, projectId, onConfirmed }: TaskCardProps) {
  const colors = tierColors[task.tier];
  const elapsed = timeInState(task);
  const isReview = task.status === "review";

  const [confirmed, setConfirmed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    setConfirmed(getStoredSet(CONFIRMED_KEY).has(task.id));
    setFeedbackSent(getStoredSet(FEEDBACK_SENT_KEY).has(task.id));
  }, [task.id]);

  const borderClass = isReview
    ? "border-yellow-500/40"
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
      setConfirmed(true);
      const set = getStoredSet(CONFIRMED_KEY);
      set.add(task.id);
      storeSet(CONFIRMED_KEY, set);
      onConfirmed?.(task.id);
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
      setFeedbackSent(true);
      setShowFeedback(false);
      setFeedback("");
      const set = getStoredSet(FEEDBACK_SENT_KEY);
      set.add(task.id);
      storeSet(FEEDBACK_SENT_KEY, set);
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
        {isReview && feedbackSent && !confirmed && (
          <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded-full ml-auto">
            Feedback sent
          </span>
        )}
        {confirmed && (
          <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full ml-auto">
            Confirmed
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

      {/* Review-specific: content preview + actions */}
      {isReview && !confirmed && (
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
              disabled={feedbackSent}
              className="flex-1 px-2.5 py-1.5 rounded text-[11px] font-medium bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 disabled:opacity-50 transition-colors"
            >
              {feedbackSent ? "Feedback sent" : "Iterate \uD83D\uDD04"}
            </button>
          </div>

          {/* Feedback input */}
          {showFeedback && !feedbackSent && (
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
