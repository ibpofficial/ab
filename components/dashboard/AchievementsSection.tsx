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
    <Card className="p-6 bg-white border-slate-200 space-y-4 rounded-xl text-slate-900 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Award className="h-5 w-5 text-orange-600" />
            <span>Verified Milestone Standing & Badges</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
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
                  ? "bg-orange-50/60 border-orange-200 text-slate-900"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    unlocked ? "flame-gradient text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {unlocked ? <CheckCircle2 className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                </div>

                <Badge variant={unlocked ? "flame" : "neutral"} size="sm" className="rounded-md">
                  {unlocked ? "Unlocked" : `${m.minDays} Days Req.`}
                </Badge>
              </div>

              <div className="mt-3">
                <h4 className="font-extrabold text-xs text-slate-900">{m.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">{m.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
