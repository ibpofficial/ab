import React from "react";
import Link from "next/link";
import { Student, MOCK_CHALLENGE_DAYS, MOCK_SUBMISSIONS } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, CheckCircle2, GitCommit, ExternalLink } from "lucide-react";

export interface TodayTaskCardProps {
  student: Student;
}

export function TodayTaskCard({ student }: TodayTaskCardProps) {
  // Determine current day number (e.g. completedDays + 1, capped at 60)
  const currentDayNum = Math.min(60, Math.max(1, student.completedDays + 1));
  const currentChallenge =
    MOCK_CHALLENGE_DAYS.find((d) => d.dayNumber === currentDayNum) ||
    MOCK_CHALLENGE_DAYS[0];

  // Check if today's submission exists
  const todaySubmission = MOCK_SUBMISSIONS.find(
    (s) => s.studentId === student.id && s.dayNumber === currentDayNum
  );
  const isTodayCompleted = todaySubmission?.status === "on-time";

  return (
    <Card className="p-5 sm:p-6 bg-slate-900/80 border-slate-800 space-y-4">
      {/* Top Tag Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="flame" size="md">
            <Calendar className="h-3.5 w-3.5" />
            <span>Today&apos;s Challenge (Day {currentDayNum}/60)</span>
          </Badge>
        </div>

        {isTodayCompleted ? (
          <Badge variant="emerald" size="sm">
            <CheckCircle2 className="h-3 w-3" /> Submitted & Verified
          </Badge>
        ) : (
          <span className="text-[11px] font-semibold text-amber-400/90 animate-pulse">
            ● Due Tonight at 11:59 PM IST
          </span>
        )}
      </div>

      {/* Title & Brief */}
      <div>
        <h3 className="text-xl font-extrabold text-white mb-1.5">
          {currentChallenge.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {currentChallenge.taskBrief}
        </p>
      </div>

      {/* Submission CTA or Done State */}
      <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {isTodayCompleted ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="h-4 w-4" />
              <span>Great job! Day {currentDayNum} commit shipped to GitHub.</span>
            </div>
            <Link href={`/day/${currentDayNum}`}>
              <Button variant="secondary" size="sm" className="text-xs">
                <span>View Submission</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <GitCommit className="h-4 w-4 text-emerald-400" />
              <span>Requires 1 GitHub commit + 1 LinkedIn post link</span>
            </div>

            <Link href={`/day/${currentDayNum}`} className="w-full sm:w-auto">
              <Button variant="primary" size="md" fullWidth className="py-3 px-6 shadow-md shadow-amber-600/30">
                <span>Start today&apos;s challenge</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </>
        )}
      </div>
    </Card>
  );
}
