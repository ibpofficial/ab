import React from "react";
import Link from "next/link";
import { Student, MOCK_MILESTONES } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Flame, Award, Zap, Crown, Lock, CheckCircle2, Share2, Sparkles } from "lucide-react";

export interface AchievementsSectionProps {
  student: Student;
}

const iconMap: Record<string, React.ElementType> = {
  Flame,
  Award,
  Zap,
  Crown,
};

export function AchievementsSection({ student }: AchievementsSectionProps) {
  const studentBadges = student.milestoneBadges || [];

  return (
    <Card className="p-5 sm:p-6 bg-slate-900/80 border-slate-800 space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            <span>Standing & Milestone Badges</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Unlock recruiter-verifiable badges as your streak grows.
          </p>
        </div>

        {/* Percentile Rank Stat */}
        {student.percentileRank && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{student.percentileRank}</span>
          </div>
        )}
      </div>

      {/* Badges Grid (showing unlocked vs locked teasers) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {MOCK_MILESTONES.map((milestone) => {
          const Icon = iconMap[milestone.icon] || Trophy;
          const isUnlocked =
            studentBadges.includes(milestone.id) ||
            student.completedDays >= milestone.days;

          return (
            <div
              key={milestone.id}
              className={`p-3.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                isUnlocked
                  ? "bg-slate-900/90 border-amber-500/40 streak-card-glow text-white"
                  : "bg-slate-950/60 border-slate-800/80 text-slate-500 opacity-75"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-xl flex items-center justify-center mb-2 text-sm ${
                  isUnlocked
                    ? "flame-gradient text-white shadow-md shadow-amber-500/30"
                    : "bg-slate-800/80 border border-slate-700 text-slate-600"
                }`}
              >
                {isUnlocked ? <Icon className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
              </div>

              <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-1">
                <span>{milestone.title}</span>
                {isUnlocked && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
              </div>

              <div className="text-[10px] text-slate-400">
                {isUnlocked ? "Unlocked" : `${milestone.days} Days Goal`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Shareable Streak Profile CTA Entry Point */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="space-y-0.5 text-center sm:text-left">
          <div className="text-xs font-bold text-white flex items-center gap-1.5 justify-center sm:justify-start">
            <Share2 className="h-3.5 w-3.5 text-amber-400" />
            <span>Public Shareable Streak Profile URL</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Paste your verified profile URL into your resume header or LinkedIn bio.
          </p>
        </div>

        <Link href={`/u/${student.id}`} className="shrink-0 w-full sm:w-auto">
          <Button variant="primary" size="sm" fullWidth className="text-xs py-2 px-4 shadow-md">
            <span>View Shareable Profile (/u/{student.id})</span>
          </Button>
        </Link>
      </div>
    </Card>
  );
}
