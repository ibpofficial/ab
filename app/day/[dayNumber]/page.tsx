"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { ChallengeDay, Submission, MOCK_CHALLENGE_DAYS } from "@/lib/mock-data";
import { computeStreakStats } from "@/lib/streak";
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
  Edit2,
  Share2,
  Loader2,
  BookOpen,
} from "lucide-react";

export default function ChallengeDayPage() {
  const { user, student, loading: authLoading } = useAuth();
  const [dayNum, setDayNum] = useState<number>(12); // Default to Day 12

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const match = pathname.match(/\/day\/(\d+)/);
      if (match && match[1]) {
        setDayNum(parseInt(match[1], 10));
      }
    }
  }, []);

  // Synchronously initialize challenge from bundled mock data for 0ms initial paint
  const getInitialChallenge = (num: number): ChallengeDay => {
    return (
      MOCK_CHALLENGE_DAYS.find((d) => d.dayNumber === num) || {
        dayNumber: num,
        title: `Day ${num}: Challenge Task Brief`,
        description: "Daily challenge brief.",
        taskBrief: "Implement daily challenge requirements, write clean code, push to GitHub, and post proof link on LinkedIn.",
        resources: [{ name: "Next.js App Router Guide", url: "https://nextjs.org/docs" }],
        trackId: "web-dev",
      }
    );
  };

  const [challenge, setChallenge] = useState<ChallengeDay>(getInitialChallenge(dayNum));
  const [localSubmission, setLocalSubmission] = useState<Submission | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  // Form input states
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [linkedinUrl, setLinkedinUrl] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Synchronously update challenge state when dayNum prop changes
  useEffect(() => {
    setChallenge(getInitialChallenge(dayNum));
  }, [dayNum]);

  // Background fetch of Challenge Day and Submission data from Firestore
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      if (!user) return;

      try {
        // 1. Fetch Challenge Day from Firestore if updated
        const dayDocRef = doc(db, "challengeDays", String(dayNum));
        const daySnap = await getDoc(dayDocRef);

        if (daySnap.exists() && isMounted) {
          setChallenge(daySnap.data() as ChallengeDay);
        }

        // 2. Fetch Submission from Firestore
        const subDocRef = doc(db, "submissions", `${user.uid}_${dayNum}`);
        const subSnap = await getDoc(subDocRef);

        if (subSnap.exists() && isMounted) {
          const subData = subSnap.data() as Submission;
          setLocalSubmission(subData);
          setGithubUrl(subData.githubUrl || "");
          setLinkedinUrl(subData.linkedinUrl || "");
        } else if (isMounted) {
          setLocalSubmission(null);
        }
      } catch (err) {
        console.warn("Firestore read notice (using client fallback):", err);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [user, dayNum]);

  // Handle Submission Write to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!user) {
      setErrorMsg("You must be logged in to submit.");
      return;
    }

    if (!githubUrl.trim() || !linkedinUrl.trim()) {
      setErrorMsg("Please provide both your GitHub commit link and LinkedIn post link.");
      return;
    }

    setIsSubmitting(true);

    try {
      const studentCompletedDays = student?.completedDays || 0;
      const maxUnlockedDay = Math.min(60, Math.max(1, studentCompletedDays + 1));
      const status = dayNum === maxUnlockedDay ? "on-time" : "late";

      const submissionId = `${user.uid}_${dayNum}`;
      const newSubmission: Submission = {
        id: submissionId,
        studentId: user.uid,
        dayNumber: dayNum,
        githubUrl: githubUrl.trim(),
        linkedinUrl: linkedinUrl.trim(),
        submittedAt: new Date().toISOString(),
        status,
      };

      // 1. Write Submission to Firestore
      await setDoc(doc(db, "submissions", submissionId), newSubmission);
      setLocalSubmission(newSubmission);

      // 2. Fetch User's Submissions & Recalculate Streak Stats
      const subsQuery = query(
        collection(db, "submissions"),
        where("studentId", "==", user.uid)
      );
      const subsSnap = await getDocs(subsQuery);
      const allSubmissions: Submission[] = [];
      subsSnap.forEach((d) => allSubmissions.push(d.data() as Submission));

      const freshStats = computeStreakStats(allSubmissions);

      // 3. Update cached stats in students/{uid} doc
      const studentRef = doc(db, "students", user.uid);
      await updateDoc(studentRef, {
        currentStreak: freshStats.currentStreak,
        longestStreak: freshStats.longestStreak,
        completedDays: freshStats.completedDays,
        lastSubmissionDate: new Date().toISOString(),
      });

      setIsSubmitting(false);
      setIsEditing(false);
      setShowConfirmation(true);
    } catch (err: any) {
      console.error("Error submitting task:", err);
      setErrorMsg(err.message || "Failed to submit. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleToggleFeatured = async () => {
    if (!user || !localSubmission) return;

    try {
      const newFeatured = !localSubmission.featured;
      const subRef = doc(db, "submissions", localSubmission.id);
      await updateDoc(subRef, { featured: newFeatured });
      setLocalSubmission({ ...localSubmission, featured: newFeatured });
    } catch (err) {
      console.error("Error toggling featured status:", err);
    }
  };

  const studentCompletedDays = student?.completedDays || 0;
  const maxUnlockedDay = Math.min(60, Math.max(1, studentCompletedDays + 1));
  const isToday = dayNum === maxUnlockedDay;
  const isPast = dayNum < maxUnlockedDay;
  const isSubmitted = !!localSubmission && localSubmission.status !== "missed";
  const isMissedPastDay = isPast && (!localSubmission || localSubmission.status === "missed");

  const githubWarning = githubUrl.length > 5 && !githubUrl.includes("github.com");
  const linkedinWarning = linkedinUrl.length > 5 && !linkedinUrl.includes("linkedin.com");

  const activeChallenge = challenge;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-700 hover:text-slate-900">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>

          <div className="flex items-center gap-1">
            {dayNum > 1 && (
              <Link href={`/day/${dayNum - 1}`}>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-xl">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <span className="text-xs font-mono font-bold text-slate-700 px-2">
              Day {dayNum} of 60
            </span>
            {dayNum < 60 && (
              <Link href={`/day/${dayNum + 1}`}>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-xl">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* 1. Day Context Header */}
        <Card className="p-5 bg-white border-slate-200 space-y-3 rounded-xl shadow-xs text-slate-900">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="flame" size="md" className="rounded-lg">
              <Calendar className="h-3.5 w-3.5" />
              <span>Day {dayNum} Challenge</span>
            </Badge>

            {/* Status Indicator */}
            {isSubmitted ? (
              <Badge variant="emerald" size="sm" className="rounded-lg">
                <CheckCircle2 className="h-3 w-3" /> Verified Submission ({localSubmission?.status})
              </Badge>
            ) : isToday ? (
              <Badge variant="flame" size="sm" className="rounded-lg">
                <Flame className="h-3 w-3 text-orange-600" /> Active Today
              </Badge>
            ) : (
              <Badge variant="rose" size="sm" className="rounded-lg">
                <AlertCircle className="h-3 w-3" /> Late Submission Window
              </Badge>
            )}
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {activeChallenge.title}
          </h1>

          <p className="text-xs text-slate-600 font-medium">
            Track: <span className="text-orange-700 font-bold">Full-Stack Web Dev</span> • Part of your 60-day public commit streak.
          </p>
        </Card>

        {/* 2. Task Content */}
        <Card className="p-6 bg-white border-slate-200 space-y-4 rounded-xl shadow-xs text-slate-900">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-orange-600" />
              <span>Task Requirements & Curriculum Brief</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
              {activeChallenge.taskBrief}
            </p>
          </div>

          {/* Resources List */}
          {activeChallenge.resources && activeChallenge.resources.length > 0 && (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold text-slate-700">Curated Learning Resources:</div>
              <div className="flex flex-wrap gap-2">
                {activeChallenge.resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-orange-300 text-xs text-orange-700 font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>{res.name}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* 3. Submission Form / Completed Summary */}
        {isSubmitted && !isEditing ? (
          /* Already Submitted Summary Card */
          <Card className="p-6 bg-emerald-50/80 border-emerald-200 space-y-4 rounded-xl text-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Day {dayNum} Verified Submission</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Feature this toggle button (Owner Only) */}
                {user && localSubmission && user.uid === localSubmission.studentId && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleToggleFeatured}
                    className={`text-xs py-1 px-3 rounded-xl ${
                      localSubmission?.featured
                        ? "bg-amber-100 text-amber-800 border-amber-300 font-bold"
                        : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    <span>{localSubmission?.featured ? "★ Featured on Profile" : "☆ Feature this"}</span>
                  </Button>
                )}

                {/* Edit Button (Owner Only) */}
                {user && localSubmission && user.uid === localSubmission.studentId && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-xs py-1 px-3 rounded-xl border-emerald-300 text-emerald-800 bg-white"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>Edit</span>
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800 font-mono truncate">
                  <GitCommit className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{localSubmission?.githubUrl}</span>
                </div>
                <a
                  href={localSubmission?.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-700 hover:underline shrink-0 text-[11px] font-bold ml-2"
                >
                  View Commit ↗
                </a>
              </div>

              <div className="p-3 rounded-xl bg-white border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800 font-mono truncate">
                  <Share2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span className="truncate">{localSubmission?.linkedinUrl}</span>
                </div>
                <a
                  href={localSubmission?.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-700 hover:underline shrink-0 text-[11px] font-bold ml-2"
                >
                  View Post ↗
                </a>
              </div>
            </div>
          </Card>
        ) : (
          /* Submission Form (Today or Missed Past Day) */
          <Card className="p-6 bg-white border-slate-200 shadow-xs space-y-4 rounded-xl text-slate-900">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-600" />
                <span>{isMissedPastDay ? "Late Submission Form" : "Submit Day " + dayNum + " Proof"}</span>
              </h3>
              {isMissedPastDay ? (
                <p className="text-xs text-orange-700 font-medium">
                  Submit your late proof below to update your verified streak record.
                </p>
              ) : (
                <p className="text-xs text-slate-600 font-normal">
                  Paste your public GitHub commit SHA link and LinkedIn post link to verify today&apos;s streak.
                </p>
              )}
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: GitHub URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <GitCommit className="h-4 w-4 text-emerald-600" />
                  <span>GitHub Repository / Commit URL *</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username/repo/commit/sha"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                />
                {githubWarning && (
                  <p className="text-[11px] text-amber-400 italic font-medium">
                    💡 Tip: URL should typically start with github.com
                  </p>
                )}
              </div>

              {/* Field 2: LinkedIn URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Share2 className="h-4 w-4 text-blue-600" />
                  <span>LinkedIn Activity / Post URL *</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://linkedin.com/posts/yourname_abtalks60"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                />
                {linkedinWarning && (
                  <p className="text-[11px] text-orange-700 italic font-medium">
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
                  className="py-3 text-sm font-extrabold shadow-md shadow-orange-600/20 rounded-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      <span>Saving to Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Flame className="h-4 w-4 fill-white" />
                      <span>Submit Day {dayNum} Proof</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* 4. Post-Submit Confirmation Modal / Card */}
        {showConfirmation && (
          <Card className="p-6 bg-gradient-to-r from-orange-50 via-white to-amber-50 border border-orange-200 text-center space-y-4 shadow-sm rounded-xl text-slate-900">
            <div className="h-14 w-14 rounded-xl flame-gradient flex items-center justify-center mx-auto text-white shadow-md">
              <Flame className="h-8 w-8 fill-white" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900">Day {dayNum} Verified</h3>
              <p className="text-xs text-slate-600 font-medium">
                Your commit proof was recorded. Streak updated to{" "}
                <strong className="text-slate-900">
                  {studentCompletedDays + (localSubmission?.status === "on-time" ? 1 : 0)} Days
                </strong>
                !
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <Link href="/dashboard">
                <Button variant="primary" size="md" className="py-2.5 px-6 rounded-xl">
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
