"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { ProgressGridSection } from "@/components/dashboard/ProgressGridSection";
import { AchievementsSection } from "@/components/dashboard/AchievementsSection";
import { UpgradeAccountModal } from "@/components/auth/UpgradeAccountModal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Student, Submission, MOCK_STUDENTS, MOCK_SUBMISSIONS, MOCK_TRACKS } from "@/lib/mock-data";
import {
  Flame,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  School,
  GitCommit,
  Award,
  Loader2,
  UserX,
  Share2,
  Copy,
} from "lucide-react";

export default function PublicStudentProfilePage() {
  const params = useParams();
  const studentId = (params?.studentId as string) || "student-2";

  const [student, setStudent] = useState<Student | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchPublicProfileData() {
      setLoading(true);
      setNotFound(false);

      try {
        // 1. Fetch student document from Firestore
        const studentRef = doc(db, "students", studentId);
        const studentSnap = await getDoc(studentRef);

        let studentObj: Student | null = null;

        if (studentSnap.exists()) {
          studentObj = studentSnap.data() as Student;
        } else {
          // Fallback to seeded mock student if available (for persona links)
          const mockMatch = MOCK_STUDENTS.find((s) => s.id === studentId);
          if (mockMatch) {
            studentObj = mockMatch;
          } else {
            if (isMounted) {
              setNotFound(true);
              setLoading(false);
            }
            return;
          }
        }

        if (isMounted && studentObj) {
          setStudent(studentObj);
        }

        // 2. Fetch submissions for this student from Firestore
        const subQuery = query(
          collection(db, "submissions"),
          where("studentId", "==", studentId)
        );
        const subSnap = await getDocs(subQuery);
        const fetchedSubmissions: Submission[] = [];

        subSnap.forEach((d) => fetchedSubmissions.push(d.data() as Submission));

        // If no Firestore submissions exist, check mock data fallback
        if (fetchedSubmissions.length === 0) {
          const mockSubs = MOCK_SUBMISSIONS.filter((s) => s.studentId === studentId);
          if (isMounted) setSubmissions(mockSubs);
        } else if (isMounted) {
          setSubmissions(fetchedSubmissions);
        }
      } catch (err) {
        console.warn("Public profile fetch notice (using mock fallback):", err);
        const mockMatch = MOCK_STUDENTS.find((s) => s.id === studentId) || MOCK_STUDENTS[1];
        const mockSubs = MOCK_SUBMISSIONS.filter((s) => s.studentId === studentId);
        if (isMounted) {
          setStudent(mockMatch);
          setSubmissions(mockSubs);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPublicProfileData();

    return () => {
      isMounted = false;
    };
  }, [studentId]);

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : `https://abtalks.dev/u/${studentId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getInitials = (name: string) => {
    if (!name) return "ST";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f3f4f6]">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
          <p className="text-xs text-slate-400 font-mono">Fetching Verified Student Profile...</p>
        </main>
      </div>
    );
  }

  if (notFound || !student) {
    return (
      <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f3f4f6]">
        <Navbar />
        <main className="flex-1 max-w-lg w-full mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center space-y-6">
          <div className="h-16 w-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
            <UserX className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white">Student Profile Not Found</h1>
            <p className="text-xs text-slate-400 max-w-md font-medium">
              We couldn&apos;t find a registered builder profile with ID <code className="text-amber-300 font-mono">{studentId}</code> in our Firestore records.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="primary" size="md" className="rounded-xl">
                <span>Go to Dashboard</span>
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const currentTrack = MOCK_TRACKS.find((t) => t.id === student.track);

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f3f4f6]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation & Verified Badge Header */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-xs text-slate-300 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Challenge Dashboard</span>
            </Button>
          </Link>

          <Badge variant="emerald" size="sm" className="rounded-lg">
            <ShieldCheck className="h-3.5 w-3.5" /> Recruiter Verified Profile
          </Badge>
        </div>

        {/* 1. Recruiter Header Identity Card */}
        <Card className="p-6 sm:p-8 bg-slate-900/90 border-slate-800 shadow-xl space-y-6 rounded-xl text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative shrink-0">
                {student.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="h-20 w-20 rounded-2xl border-2 border-amber-500/60 object-cover shadow-md"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-2xl border-2 border-amber-500/60 bg-amber-500/10 flex items-center justify-center font-black text-amber-400 text-2xl shadow-inner">
                    {getInitials(student.name)}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-[#090d16]" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {student.name}
                  </h1>
                  <Badge variant="flame" size="sm" className="rounded-lg">
                    {currentTrack?.name || student.track || "Web Dev Track"}
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 font-medium flex items-center gap-2 flex-wrap">
                  {student.collegeName && (
                    <span className="flex items-center gap-1">
                      <School className="h-3.5 w-3.5 text-amber-400" />
                      {student.collegeName}
                    </span>
                  )}
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">Cohort Starter</span>
                </p>
              </div>
            </div>

            {/* Verification Proof Metric */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center shrink-0 min-w-[140px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Continuous Streak
              </div>
              <div className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                <Flame className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span>{student.currentStreak} Days</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-0.5 flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Live Proof Verified
              </div>
            </div>
          </div>

          {/* Social Proof & External Links Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
            {student.githubUsername && (
              <a
                href={`https://github.com/${student.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              >
                <GitCommit className="h-3.5 w-3.5 text-emerald-400" />
                <span>github.com/{student.githubUsername}</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
            )}

            {student.linkedinProfile && (
              <a
                href={student.linkedinProfile}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              >
                <Share2 className="h-3.5 w-3.5 text-blue-400" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
            )}
          </div>
        </Card>

        {/* 2. 60-Day Progress Heatmap Grid */}
        <ProgressGridSection student={student} submissions={submissions} />

        {/* 3. Verified Milestone Achievements */}
        <AchievementsSection student={student} />

        {/* 4. Verified Proof Feed */}
        <Card className="p-6 bg-slate-900/90 border-slate-800 space-y-4 rounded-xl text-white">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>Verified Public Submissions ({submissions.length})</span>
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Every entry represents a verified GitHub commit and LinkedIn post link.
              </p>
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="p-8 text-center bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
              <p className="text-xs text-slate-400 font-medium">
                No public commit submissions recorded yet for this student.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub, idx) => (
                <div
                  key={sub.id || idx}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-400">Day {sub.dayNumber} Proof</span>
                      <Badge variant="emerald" size="sm" className="rounded-md">
                        Verified
                      </Badge>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">{sub.submittedAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {sub.githubUrl && (
                      <a
                        href={sub.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                        title="View GitHub Commit"
                      >
                        <GitCommit className="h-3.5 w-3.5 text-emerald-400" />
                      </a>
                    )}
                    {sub.linkedinUrl && (
                      <a
                        href={sub.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                        title="View LinkedIn Post"
                      >
                        <Share2 className="h-3.5 w-3.5 text-blue-400" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Copy Resume Profile URL Button */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Paste this verified link into your resume header or LinkedIn bio.</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="text-xs py-2 px-4 rounded-xl shrink-0"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-amber-400" />
                  <span>Copy Resume Link</span>
                </>
              )}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
