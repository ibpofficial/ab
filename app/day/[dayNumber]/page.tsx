"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { MOCK_CHALLENGE_DAYS, MOCK_SUBMISSIONS, Submission } from "@/lib/mock-data";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  GitCommit,
  ExternalLink,
  Lock,
  Flame,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Edit2,
  Share2,
} from "lucide-react";


export default function ChallengeDayPage() {
  const { student, user } = useAuth();

  // Next.js client-side router param detection
  const [dayNum, setDayNum] = useState<number>(12); // Default to Day 12 for QA

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const match = pathname.match(/\/day\/(\d+)/);
      if (match && match[1]) {
        setDayNum(parseInt(match[1], 10));
      }
    }
  }, []);

  const activeStudentId = student?.id || "student-2";
  const studentCompletedDays = student?.completedDays || 23;
  const maxUnlockedDay = Math.min(60, Math.max(1, studentCompletedDays + 1));

  // Retrieve challenge day object
  const challenge =
    MOCK_CHALLENGE_DAYS.find((d) => d.dayNumber === dayNum) ||
    MOCK_CHALLENGE_DAYS[11]; // Fallback to Day 12

  // Check existing submission
  const [localSubmission, setLocalSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    const existing = MOCK_SUBMISSIONS.find(
      (s) => s.studentId === activeStudentId && s.dayNumber === dayNum
    );
    if (existing) {
      setLocalSubmission(existing);
    }
  }, [activeStudentId, dayNum]);

  // Form input states
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [linkedinUrl, setLinkedinUrl] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Derive status
  const isFutureLocked = dayNum > maxUnlockedDay;
  const isToday = dayNum === maxUnlockedDay;
  const isPast = dayNum < maxUnlockedDay;
  const isSubmitted = !!localSubmission && localSubmission.status !== "missed";
  const isMissedPastDay = isPast && (!localSubmission || localSubmission.status === "missed");

  // Domain soft warning check
  const githubWarning = githubUrl.length > 5 && !githubUrl.includes("github.com");
  const linkedinWarning = linkedinUrl.length > 5 && !linkedinUrl.includes("linkedin.com");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!githubUrl.trim() || !linkedinUrl.trim()) {
      setErrorMsg("Please provide both your GitHub commit link and LinkedIn post link.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newSub: Submission = {
        id: `sub-${activeStudentId}-${dayNum}`,
        studentId: activeStudentId,
        dayNumber: dayNum,
        githubUrl,
        linkedinUrl,
        submittedAt: new Date().toISOString(),
        status: isToday ? "on-time" : "late",
      };

      setLocalSubmission(newSub);
      setIsSubmitting(false);
      setIsEditing(false);
      setShowConfirmation(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f3f4f6]">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-xs">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>

          <div className="flex items-center gap-1">
            {dayNum > 1 && (
              <Link href={`/day/${dayNum - 1}`}>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <span className="text-xs font-mono font-bold text-slate-400 px-2">
              Day {dayNum} of 60
            </span>
            {dayNum < 60 && dayNum < maxUnlockedDay && (
              <Link href={`/day/${dayNum + 1}`}>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* 1. Day Context Header */}
        <Card className="p-5 bg-slate-900/90 border-slate-800 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="flame" size="md">
              <Calendar className="h-3.5 w-3.5" />
              <span>Day {dayNum} Challenge</span>
            </Badge>

            {/* Status Indicator */}
            {isFutureLocked ? (
              <Badge variant="outline" size="sm" className="text-slate-400">
                <Lock className="h-3 w-3" /> Locked Future Day
              </Badge>
            ) : isSubmitted ? (
              <Badge variant="emerald" size="sm">
                <CheckCircle2 className="h-3 w-3" /> Submitted & Verified ({localSubmission?.status})
              </Badge>
            ) : isToday ? (
              <Badge variant="flame" size="sm" className="animate-pulse">
                🔥 Today&apos;s Active Challenge
              </Badge>
            ) : (
              <Badge variant="rose" size="sm">
                ● Missed Day (Late Submission Available)
              </Badge>
            )}
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {challenge.title}
          </h1>

          <p className="text-xs text-slate-400">
            Track: <span className="text-amber-400 font-semibold">Full-Stack Web Dev</span> • Part of your 60-day commit streak.
          </p>
        </Card>

        {/* 2. Task Content */}
        <Card className="p-6 bg-slate-900/80 border-slate-800 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Task Brief & Requirements
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {challenge.taskBrief}
            </p>
          </div>

          {/* Resources List */}
          {challenge.resources && challenge.resources.length > 0 && (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-300">Curated Learning Resources:</div>
              <div className="flex flex-wrap gap-2">
                {challenge.resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 text-xs text-amber-400 font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>{res.name}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* 3. Submission Form / Completed Summary / Locked State */}
        {isFutureLocked ? (
          /* Locked State Banner */
          <Card className="p-8 bg-slate-950/70 border-dashed border-slate-800 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Day {dayNum} is Currently Locked</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Complete earlier days to unlock this challenge. Keep shipping daily to progress through your 60-day cohort!
            </p>
          </Card>
        ) : isSubmitted && !isEditing ? (
          /* Already Submitted Summary Card */
          <Card className="p-6 bg-emerald-500/10 border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <CheckCircle2 className="h-5 w-5" />
                <span>Day {dayNum} Challenge Completed!</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-xs py-1 px-3"
              >
                <Edit2 className="h-3 w-3" />
                <span>Edit Submission</span>
              </Button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300 font-mono truncate">
                  <GitCommit className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{localSubmission?.githubUrl || "https://github.com/commit/c7a89f"}</span>
                </div>
                <a
                  href={localSubmission?.githubUrl || "https://github.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:underline shrink-0 text-[11px] font-bold"
                >
                  View Commit ↗
                </a>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300 font-mono truncate">
                  <Share2 className="h-4 w-4 text-blue-400 shrink-0" />
                  <span className="truncate">{localSubmission?.linkedinUrl || "https://linkedin.com/posts/abtalks60"}</span>
                </div>
                <a
                  href={localSubmission?.linkedinUrl || "https://linkedin.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:underline shrink-0 text-[11px] font-bold"
                >
                  View Post ↗
                </a>
              </div>
            </div>
          </Card>
        ) : (
          /* Submission Form (Today or Missed Past Day) */
          <Card className="p-6 bg-slate-900/90 border-amber-500/30 streak-card-glow space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="h-5 w-5 text-amber-500" />
                <span>{isMissedPastDay ? "Late Submission Form" : "Submit Day " + dayNum + " Proof"}</span>
              </h3>
              {isMissedPastDay ? (
                <p className="text-xs text-amber-400 font-medium">
                  Life happens! Submit your late proof below to keep your challenge progress moving forward.
                </p>
              ) : (
                <p className="text-xs text-slate-300">
                  Paste your public GitHub commit SHA link and LinkedIn post link to verify today&apos;s streak.
                </p>
              )}
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: GitHub URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <GitCommit className="h-4 w-4 text-emerald-400" />
                  <span>GitHub Repository / Commit URL *</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username/repo/commit/sha"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                {githubWarning && (
                  <p className="text-[11px] text-amber-400 italic">
                    💡 Tip: URL should typically start with github.com
                  </p>
                )}
              </div>

              {/* Field 2: LinkedIn URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Share2 className="h-4 w-4 text-blue-400" />
                  <span>LinkedIn Activity / Post URL *</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://linkedin.com/posts/yourname_abtalks60"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                {linkedinWarning && (
                  <p className="text-[11px] text-amber-400 italic">
                    💡 Tip: URL should typically start with linkedin.com
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  disabled={isSubmitting}
                  className="py-3 text-sm font-extrabold shadow-lg shadow-amber-600/30"
                >
                  <Flame className="h-4 w-4 fill-amber-200" />
                  <span>{isSubmitting ? "Verifying & Saving..." : `Ship Day ${dayNum} Proof 🔥`}</span>
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* 4. Post-Submit Confirmation Modal / Card */}
        {showConfirmation && (
          <Card className="p-6 bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 text-center space-y-4 shadow-2xl animate-pulse-subtle">
            <div className="h-14 w-14 rounded-2xl flame-gradient flex items-center justify-center mx-auto text-white shadow-lg">
              <Flame className="h-8 w-8 fill-white" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white">Day {dayNum} Shipped 🔥</h3>
              <p className="text-xs text-slate-300">
                Your commit proof has been verified and logged to your 60-day streak profile!
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <Link href="/dashboard">
                <Button variant="primary" size="md" className="py-2.5 px-6">
                  <span>Return to Dashboard</span>
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
