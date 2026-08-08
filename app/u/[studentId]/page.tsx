"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_STUDENTS, MOCK_SUBMISSIONS, MOCK_MILESTONES, MOCK_TRACKS } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { UpgradeAccountModal } from "@/components/auth/UpgradeAccountModal";
import { useAuth } from "@/lib/auth-context";
import { Flame, CheckCircle2, Copy, Share2, ShieldCheck, Trophy, ArrowLeft, School, GitCommit, Sparkles } from "lucide-react";


export default function PublicStreakProfilePage() {
  const params = useParams();
  const studentId = (params?.studentId as string) || "student-2";

  const [copied, setCopied] = useState(false);

  const student =
    MOCK_STUDENTS.find((s) => s.id === studentId) || MOCK_STUDENTS[1];
  const currentTrack = MOCK_TRACKS.find((t) => t.id === student.track);

  // Derive initials fallback
  const getInitials = (name: string) => {
    if (!name) return "ST";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  // Build 60-day grid cells
  const currentDayNum = Math.min(60, Math.max(1, student.completedDays + 1));
  const dayCells = Array.from({ length: 60 }, (_, i) => {
    const day = i + 1;
    const submission = MOCK_SUBMISSIONS.find(
      (s) => s.studentId === student.id && s.dayNumber === day
    );

    let status: "done" | "missed" | "today" | "upcoming" = "upcoming";
    if (submission?.status === "on-time") status = "done";
    else if (submission?.status === "missed") status = "missed";
    else if (day === currentDayNum) status = "today";
    else if (day < currentDayNum) status = "missed";

    return { day, status };
  });

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : `https://abtalks.dev/u/${student.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f3f4f6] flex flex-col justify-between p-4 sm:p-8">
      {/* Minimal Header / Back link */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between pb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-xs">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="emerald" size="sm">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified Public Profile
          </Badge>
        </div>
      </div>

      {/* Main Profile Card */}
      <main className="max-w-3xl mx-auto w-full space-y-6">
        <UpgradeAccountModal />

        {/* Profile Card Header */}
        <Card className="p-6 bg-slate-900/90 border-amber-500/30 streak-card-glow relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              {/* Avatar or Initials */}
              {student.avatarUrl ? (
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-amber-500/60 bg-slate-800 shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-16 w-16 rounded-full border-2 border-amber-500/60 bg-amber-500/10 flex items-center justify-center font-black text-amber-400 text-xl shadow-lg">
                  {getInitials(student.name)}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-extrabold text-white">{student.name}</h1>
                  <Badge variant="emerald" size="sm">
                    <CheckCircle2 className="h-3 w-3" /> Verified Student
                  </Badge>
                </div>

                <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-2">
                  {student.collegeName && (
                    <span className="flex items-center gap-1">
                      <School className="h-3.5 w-3.5 text-amber-400" />
                      {student.collegeName}
                    </span>
                  )}
                  <span className="text-slate-600">•</span>
                  <span>{currentTrack?.name || "60-Day Tech Challenge"}</span>
                </p>
              </div>
            </div>

            {/* Streak Counter Motif */}
            <div className="flex items-center gap-2">
              <div className="p-3.5 rounded-2xl flame-gradient flame-glow text-white flex items-center gap-2.5 shadow-xl">
                <Flame className="h-7 w-7 fill-white text-amber-200 animate-pulse-subtle" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-100 opacity-90">Verified Streak</div>
                  <div className="text-xl font-black">{student.currentStreak} Days</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Current Streak</div>
              <div className="text-lg font-black text-amber-400">{student.currentStreak} Days</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Longest Streak</div>
              <div className="text-lg font-black text-white">{student.longestStreak} Days</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Completed</div>
              <div className="text-lg font-black text-emerald-400">{student.completedDays}/60</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Overall Challenge Completion</span>
              <span className="text-amber-400">{Math.round((student.completedDays / 60) * 100)}%</span>
            </div>
            <ProgressBar value={student.completedDays} max={60} />
          </div>

          {/* 60-Cell Heatmap Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span>Verified 60-Day Commit Heatmap</span>
              <span className="text-[11px] text-slate-400 font-mono">
                {student.completedDays} Shipped Commits
              </span>
            </div>

            <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-15 gap-1.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              {dayCells.map((cell) => {
                let bgClass = "bg-slate-800/80 border-slate-700/50 text-slate-500";
                if (cell.status === "done") bgClass = "bg-emerald-500/80 border-emerald-400/50 text-emerald-950 font-extrabold";
                else if (cell.status === "missed") bgClass = "bg-rose-500/30 border-rose-500/40 text-rose-300";
                else if (cell.status === "today") bgClass = "flame-gradient text-white font-extrabold shadow-md";

                return (
                  <div
                    key={cell.day}
                    title={`Day ${cell.day}: ${cell.status}`}
                    className={`h-7 w-full rounded-md border flex items-center justify-center text-[10px] ${bgClass}`}
                  >
                    {cell.day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badges Section */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span>Earned Achievements & Badges</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {MOCK_MILESTONES.map((milestone) => {
                const isUnlocked = (student.milestoneBadges || []).includes(milestone.id) || student.completedDays >= milestone.days;

                return (
                  <div
                    key={milestone.id}
                    className={`p-3 rounded-xl border flex flex-col items-center text-center text-xs ${
                      isUnlocked
                        ? "bg-slate-950 border-amber-500/40 text-white"
                        : "bg-slate-950/40 border-slate-800 text-slate-600 opacity-60"
                    }`}
                  >
                    <div className="font-bold text-white mb-0.5">{milestone.title}</div>
                    <div className="text-[10px] text-amber-400">
                      {isUnlocked ? "✓ Unlocked" : `${milestone.days} Days`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Copy Resume Profile URL Button */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Paste this verified link into your resume header or LinkedIn bio.</span>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleCopyLink}
              className="w-full sm:w-auto py-2.5 px-5 shadow-lg shadow-amber-600/30"
            >
              <Copy className="h-4 w-4" />
              <span>{copied ? "Link Copied to Clipboard! ✓" : "Copy Profile Link"}</span>
            </Button>
          </div>
        </Card>
      </main>

      {/* Minimal Footer Tagline */}
      <footer className="max-w-3xl mx-auto w-full text-center py-6 text-xs text-slate-500">
        ABTalks 60 • Verified Public Streak Credential Page
      </footer>
    </div>
  );
}
