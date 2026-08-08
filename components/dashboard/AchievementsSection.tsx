import React from "react";
import { Student, MOCK_MILESTONES } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Lock, CheckCircle2 } from "lucide-react";

export interface AchievementsSectionProps {
  student: Student;
}

export function AchievementsSection({ student }: AchievementsSectionProps) {
  return (
    <Card className="p-6 bg-white border border-slate-200 shadow-sm space-y-4 rounded-xl text-slate-900">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-orange-600" />
          <span>Milestone Badges & Achievements</span>
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          {student.milestoneBadges?.length || 0} of {MOCK_MILESTONES.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {MOCK_MILESTONES.map((milestone) => {
          const isUnlocked =
            (student.milestoneBadges || []).includes(milestone.id) ||
            student.completedDays >= milestone.days;

          return (
            <div
              key={milestone.id}
              className={`p-4 rounded-xl border flex flex-col items-center text-center space-y-2 transition-all ${
                isUnlocked
                  ? "bg-slate-50 border-orange-200 shadow-xs"
                  : "bg-slate-50/50 border-slate-200 opacity-60"
              }`}
            >
              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center text-lg font-black ${
                  isUnlocked
                    ? "flame-gradient text-white shadow-xs"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {isUnlocked ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <Lock className="h-5 w-5" />
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900">{milestone.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {milestone.description}
                </p>
              </div>

              <div className="pt-1">
                {isUnlocked ? (
                  <Badge variant="emerald" size="sm" className="rounded-md">
                    Unlocked
                  </Badge>
                ) : (
                  <Badge variant="outline" size="sm" className="rounded-md">
                    {milestone.days} Days Goal
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
