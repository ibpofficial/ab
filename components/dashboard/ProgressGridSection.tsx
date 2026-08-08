"use client";

import React from "react";
import Link from "next/link";
import { Student, Submission } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, Clock, Lock, ShieldCheck } from "lucide-react";

export interface ProgressGridSectionProps {
  student: Student;
  submissions?: Submission[];
}

export function ProgressGridSection({ student, submissions = [] }: ProgressGridSectionProps) {
  const currentDayNum = Math.min(60, Math.max(1, student.completedDays + 1));

  // Build 60-day grid cells using passed-in live submissions
  const dayCells = Array.from({ length: 60 }, (_, i) => {
    const day = i + 1;
    const submission = submissions.find(
      (s) => s.dayNumber === day
    );

    let status: "done" | "missed" | "today" | "upcoming" = "upcoming";
    if (submission?.status === "on-time" || day <= student.completedDays) {
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

  return (
    <Card className="p-6 bg-white border border-slate-200 shadow-sm space-y-5 rounded-xl text-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-orange-600" />
            <span>60-Day Public Commit Heatmap</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Each cell represents a daily commit proof. Green = Shipped, Orange = Active Today, Gray = Upcoming.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs font-bold text-slate-700">
            {student.completedDays}/60 Days
          </span>
          <span className="text-[11px] text-slate-500 font-medium ml-1.5">
            ({Math.round((student.completedDays / 60) * 100)}%)
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar value={student.completedDays} max={60} />

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-1.5">
          <div className="h-3.5 w-3.5 rounded-sm bg-emerald-500 border border-emerald-600" />
          <span>Shipped ({student.completedDays})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3.5 w-3.5 rounded-sm flame-gradient" />
          <span>Today (Day {currentDayNum})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3.5 w-3.5 rounded-sm bg-rose-100 border border-rose-300" />
          <span>Missed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3.5 w-3.5 rounded-sm bg-slate-100 border border-slate-200" />
          <span>Upcoming</span>
        </div>
      </div>

      {/* 60-Cell Grid */}
      <div className="grid grid-cols-6 xs:grid-cols-10 sm:grid-cols-12 md:grid-cols-15 gap-1.5 pt-2">
        {dayCells.map((cell) => {
          let bgClass = "bg-slate-100 border-slate-200 text-slate-400 hover:border-slate-300";
          if (cell.status === "done") {
            bgClass = "bg-emerald-500 border-emerald-600 text-white font-extrabold shadow-xs";
          } else if (cell.status === "missed") {
            bgClass = "bg-rose-100 border-rose-300 text-rose-700 font-bold";
          } else if (cell.status === "today") {
            bgClass = "flame-gradient border-orange-600 text-white font-extrabold shadow-sm animate-pulse-subtle";
          }

          return (
            <Link key={cell.day} href={`/day/${cell.day}`}>
              <div
                className={`h-9 w-full rounded-lg border flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer ${bgClass}`}
                title={`Day ${cell.day}: ${cell.status}`}
              >
                <span className="text-[11px] leading-none">{cell.day}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
