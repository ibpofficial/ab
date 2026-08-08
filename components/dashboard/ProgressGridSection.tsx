import React from "react";
import Link from "next/link";
import { Student, MOCK_SUBMISSIONS } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Flame, Calendar, Info } from "lucide-react";

export interface ProgressGridSectionProps {
  student: Student;
}

export function ProgressGridSection({ student }: ProgressGridSectionProps) {
  const currentDayNum = Math.min(60, Math.max(1, student.completedDays + 1));

  // Build 60-day grid status array
  const dayCells = Array.from({ length: 60 }, (_, i) => {
    const day = i + 1;
    const submission = MOCK_SUBMISSIONS.find(
      (s) => s.studentId === student.id && s.dayNumber === day
    );

    let status: "done" | "missed" | "today" | "upcoming" = "upcoming";

    if (submission?.status === "on-time") {
      status = "done";
    } else if (submission?.status === "missed") {
      status = "missed";
    } else if (day === currentDayNum) {
      status = "today";
    } else if (day < currentDayNum) {
      status = "missed";
    }

    return { day, status };
  });

  const doneCount = dayCells.filter((c) => c.status === "done").length;
  const missedCount = dayCells.filter((c) => c.status === "missed").length;

  return (
    <Card className="p-5 sm:p-6 bg-slate-900/80 border-slate-800 space-y-5">
      {/* Progress Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <span>60-Day Streak Progress</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {student.completedDays}/60 Days
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {student.completedDays === 0
              ? "Your 60-day habit journey starts with Day 1!"
              : student.completedDays < 10
              ? "Healthy early momentum! Consistency beats intensity."
              : "Solid continuous progress toward your recruiter proof."}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500 inline-block" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-rose-500 inline-block" />
            <span>Missed</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm flame-gradient inline-block animate-pulse" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-slate-800 border border-slate-700 inline-block" />
            <span>Upcoming</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar value={student.completedDays} max={60} />

      {/* 60-Cell Contribution Grid */}
      <div>
        <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
          <span>60-Day Commit Grid</span>
          <span className="text-[11px] text-slate-400 font-mono">
            {doneCount} Done • {missedCount} Rest/Missed • {60 - doneCount - missedCount} Remaining
          </span>
        </div>

        <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-15 gap-1.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          {dayCells.map((cell) => {
            let bgClass = "bg-slate-800/80 border-slate-700/50 text-slate-500";
            let statusText = "Upcoming";

            if (cell.status === "done") {
              bgClass =
                "bg-emerald-500/80 border-emerald-400/50 text-emerald-950 font-extrabold shadow-sm shadow-emerald-500/20";
              statusText = "Completed";
            } else if (cell.status === "missed") {
              bgClass = "bg-rose-500/30 border-rose-500/40 text-rose-300";
              statusText = "Missed / Rest";
            } else if (cell.status === "today") {
              bgClass =
                "flame-gradient border-amber-400 text-white font-extrabold shadow-md shadow-amber-500/40 animate-pulse-subtle";
              statusText = "Today's Task";
            }

            return (
              <Link
                key={cell.day}
                href={`/day/${cell.day}`}
                title={`Day ${cell.day}: ${statusText}`}
                className={`h-7 w-full rounded-md border flex items-center justify-center text-[10px] transition-all hover:scale-110 hover:z-10 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${bgClass}`}
              >
                {cell.day}
              </Link>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
