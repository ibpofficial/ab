import React from "react";
import { Flame, Sparkles, RefreshCw, Trophy, ArrowUpRight } from "lucide-react";
import { Student } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface StreakCenterpieceProps {
  student: Student;
}

export function StreakCenterpiece({ student }: StreakCenterpieceProps) {
  const isZeroStreak = student.currentStreak === 0;

  // Determine if student suffered a recent streak break/missed day
  const hasMissedDayGap =
    student.completedDays > 0 &&
    student.longestStreak > student.currentStreak &&
    !isZeroStreak;

  return (
    <Card className="relative overflow-hidden p-6 bg-slate-900/90 border-amber-500/30 streak-card-glow">
      {/* Background ambient glow */}
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Flame Motif + Count */}
        <div className="flex items-center gap-4">
          <div
            className={`h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${
              isZeroStreak
                ? "bg-slate-800 border border-slate-700 text-slate-400"
                : "flame-gradient flame-glow text-white animate-pulse-subtle"
            }`}
          >
            <Flame
              className={`h-9 w-9 ${
                isZeroStreak ? "text-slate-500" : "fill-white text-amber-200"
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isZeroStreak ? "Journey Begins" : "Current Commit Streak"}
              </span>
              {!isZeroStreak && (
                <Badge variant="emerald" size="sm">
                  🔥 Active
                </Badge>
              )}
            </div>

            {/* Zero Streak Positive Framing */}
            {isZeroStreak ? (
              <div className="space-y-0.5">
                <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <span>Day 1 — Let&apos;s go!</span>
                </h3>
                <p className="text-xs text-amber-400 font-medium flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  Your streak starts today. Ship your first commit below!
                </p>
              </div>
            ) : (
              /* Active Streak Display */
              <div className="space-y-0.5">
                <h3 className="text-3xl font-extrabold text-white flex items-baseline gap-2">
                  <span className="flame-text text-4xl">{student.currentStreak}</span>
                  <span className="text-lg text-slate-300 font-bold">Days Continuous</span>
                </h3>
                {hasMissedDayGap ? (
                  <p className="text-xs text-amber-400/90 font-medium flex items-center gap-1">
                    <RefreshCw className="h-3.5 w-3.5 text-amber-400" />
                    Streak reset — every builder has an off day. Restart today!
                  </p>
                ) : (
                  <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    Great momentum! You&apos;re building an unshakeable habit.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Stats (Longest Streak & Milestone) */}
        <div className="flex items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
          <div className="px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center min-w-[110px]">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center gap-1">
              <Trophy className="h-3 w-3 text-amber-400" /> Longest
            </div>
            <div className="text-lg font-extrabold text-white">
              {student.longestStreak} <span className="text-xs font-normal text-slate-400">Days</span>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center min-w-[110px]">
            <div className="text-[10px] uppercase font-bold text-slate-400">
              Completed
            </div>
            <div className="text-lg font-extrabold text-emerald-400">
              {student.completedDays}/60
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
