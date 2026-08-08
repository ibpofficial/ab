"use client";

import React from "react";
import Link from "next/link";
import { Student } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, ArrowRight, TrendingUp, CheckCircle2, Award } from "lucide-react";

export interface StreakCenterpieceProps {
  student: Student;
}

export function StreakCenterpiece({ student }: StreakCenterpieceProps) {
  const isZeroStreak = student.currentStreak === 0;

  return (
    <Card className="p-6 bg-slate-900/90 border-amber-500/30 streak-card-glow relative overflow-hidden space-y-4 rounded-xl text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Streak Visual Motif */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-xl flame-gradient flex items-center justify-center text-white shadow-lg">
            <Flame className="h-9 w-9 fill-white animate-pulse-subtle" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Verified Streak Status
              </span>
              {isZeroStreak ? (
                <Badge variant="flame" size="sm" className="rounded-lg">
                  <TrendingUp className="h-3 w-3 text-amber-400" /> Day 1 Unlocked
                </Badge>
              ) : (
                <Badge variant="emerald" size="sm" className="rounded-lg">
                  <CheckCircle2 className="h-3 w-3" /> Streak Active
                </Badge>
              )}
            </div>

            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
              <span>{student.currentStreak} Days</span>
              <span className="text-xs font-normal text-slate-400">
                (Longest: <strong className="text-slate-200 font-bold">{student.longestStreak} Days</strong>)
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0">
          <Link href={`/day/${student.completedDays + 1}`}>
            <Button size="md" variant="primary" className="py-3 px-6 rounded-xl shadow-lg shadow-amber-600/30">
              <span>{isZeroStreak ? "Start Day 1 Challenge" : "Continue Day " + (student.completedDays + 1) + " Task"}</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Messaging / Positive framing */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-medium leading-relaxed">
        {isZeroStreak ? (
          <span className="flex items-center gap-1.5 text-slate-200">
            <Award className="h-4 w-4 text-amber-400 shrink-0" />
            <span>Welcome to your 60-day challenge! Complete today&apos;s task brief to ignite your continuous commit streak.</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-slate-200">
            <TrendingUp className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Great momentum! You have completed <strong className="text-white">{student.completedDays} of 60</strong> daily tasks. Keep shipping to maintain your public recruiter URL.</span>
          </span>
        )}
      </div>
    </Card>
  );
}
