"use client";

import React from "react";
import { Student } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, ShieldCheck, Flame, CheckCircle2, Lock } from "lucide-react";

export interface AchievementsSectionProps {
  student: Student;
}

export function AchievementsSection({ student }: AchievementsSectionProps) {
  const milestones = [
    {
      id: "7-day",
      title: "7-Day Continuous Streak",
      description: "First week of daily proof committed.",
      minDays: 7,
    },
    {
      id: "30-day",
      title: "30-Day Halfway Milestone",
      description: "30 consecutive days of shipping.",
      minDays: 30,
    },
    {
      id: "60-day",
      title: "60-Day Finisher Prestige",
      description: "Mastered public building streak.",
      minDays: 60,
    },
  ];

  return (
    <Card className="p-6 bg-slate-900/90 border-slate-800 space-y-4 rounded-xl text-white">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-400" />
            <span>Verified Milestone Standing & Badges</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Recruiters review these verified milestones when assessing streak consistency.
          </p>
        </div>

        <Badge variant="emerald" size="sm" className="rounded-lg">
          <ShieldCheck className="h-3 w-3" /> {student.percentileRank || "Active Builder"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {milestones.map((m) => {
          const unlocked = student.completedDays >= m.minDays;

          return (
            <div
              key={m.id}
              className={`p-4 rounded-xl border transition-all ${
                unlocked
                  ? "bg-amber-500/10 border-amber-500/30 text-white"
                  : "bg-slate-950/80 border-slate-800 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    unlocked ? "flame-gradient text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {unlocked ? <CheckCircle2 className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                </div>

                <Badge variant={unlocked ? "flame" : "neutral"} size="sm" className="rounded-md">
                  {unlocked ? "Unlocked" : `${m.minDays} Days Req.`}
                </Badge>
              </div>

              <div className="mt-3">
                <h4 className="font-extrabold text-xs text-white">{m.title}</h4>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">{m.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
