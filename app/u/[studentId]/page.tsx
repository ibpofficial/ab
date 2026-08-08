"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { ProgressGridSection } from "@/components/dashboard/ProgressGridSection";
import { AchievementsSection } from "@/components/dashboard/AchievementsSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import {
  Student,
  Submission,
  MOCK_STUDENTS,
  MOCK_SUBMISSIONS,
  MOCK_TRACKS,
  MOCK_TRACK_STACKS,
  MOCK_CHALLENGE_DAYS,
} from "@/lib/mock-data";
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
  Edit2,
  Save,
  Star,
  BookOpen,
  Code2,
} from "lucide-react";

export default function PublicStudentProfilePage() {
  const params = useParams();
  const studentId = (params?.studentId as string) || "student-2";
  const { user } = useAuth();
  const isOwner = user?.uid === studentId;

  const [student, setStudent] = useState<Student | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Inline Intro Edit Mode States
  const [isEditingIntro, setIsEditingIntro] = useState<boolean>(false);
  const [editHeadline, setEditHeadline] = useState<string>("");
  const [editBio, setEditBio] = useState<string>("");
  const [editGithub, setEditGithub] = useState<string>("");
  const [editLinkedin, setEditLinkedin] = useState<string>("");
  const [isSavingIntro, setIsSavingIntro] = useState<boolean>(false);

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
          setEditHeadline(studentObj.headline || "");
          setEditBio(studentObj.bio || "");
          setEditGithub(studentObj.githubUsername || "");
          setEditLinkedin(studentObj.linkedinProfile || "");
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
          setEditHeadline(mockMatch.headline || "");
          setEditBio(mockMatch.bio || "");
          setEditGithub(mockMatch.githubUsername || "");
          setEditLinkedin(mockMatch.linkedinProfile || "");
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

  const handleSaveIntro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student || !user) return;

    setIsSavingIntro(true);
    try {
      const studentRef = doc(db, "students", student.id);
      const updatedFields = {
        headline: editHeadline.trim(),
        bio: editBio.trim(),
        githubUsername: editGithub.trim(),
        linkedinProfile: editLinkedin.trim(),
      };

      await updateDoc(studentRef, updatedFields);
      setStudent({ ...student, ...updatedFields });
      setIsEditingIntro(false);
    } catch (err) {
      console.error("Error saving profile intro:", err);
    } finally {
      setIsSavingIntro(false);
    }
  };

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
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 text-orange-600 animate-spin" />
          <p className="text-xs text-slate-500 font-mono">Fetching Verified Student Profile...</p>
        </main>
      </div>
    );
  }

  if (notFound || !student) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1 max-w-lg w-full mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center space-y-6">
          <div className="h-16 w-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
            <UserX className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900">Student Profile Not Found</h1>
            <p className="text-xs text-slate-500 max-w-md font-medium">
              We couldn&apos;t find a registered builder profile with ID <code className="text-orange-600 font-mono">{studentId}</code> in our Firestore records.
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
  const trackStack = MOCK_TRACK_STACKS[student.track || "web-dev"] || MOCK_TRACK_STACKS["web-dev"];

  // Selection Logic for Featured Builds
  // 1. First pick explicitly featured submissions
  const explicitFeatured = submissions.filter((s) => s.featured && s.status !== "missed");
  let featuredBuilds: Submission[] = [...explicitFeatured];

  // 2. Fallback to recent on-time submissions if less than 3
  if (featuredBuilds.length < 3) {
    const remainingOnTime = submissions.filter(
      (s) => s.status === "on-time" && !featuredBuilds.some((fb) => fb.id === s.id)
    );
    // Sort by day number descending
    remainingOnTime.sort((a, b) => b.dayNumber - a.dayNumber);
    featuredBuilds = [...featuredBuilds, ...remainingOnTime].slice(0, 3);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-xs">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Challenge Dashboard</span>
            </Button>
          </Link>

          <Badge variant="emerald" size="sm" className="rounded-lg">
            <ShieldCheck className="h-3.5 w-3.5" /> Recruiter Verified Proof Profile
          </Badge>
        </div>

        {/* 1. SECTION 1: Bio Header (README-style Intro Block) */}
        <Card className="p-6 sm:p-8 bg-white border-slate-200 shadow-sm space-y-6 rounded-xl text-slate-900 relative">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="relative shrink-0">
                {student.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="h-20 w-20 rounded-2xl border-2 border-orange-400/60 object-cover shadow-xs"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-2xl border-2 border-orange-400/60 bg-orange-50 flex items-center justify-center font-black text-orange-700 text-2xl shadow-xs">
                    {getInitials(student.name)}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {student.name}
                  </h1>
                  <Badge variant="flame" size="sm" className="rounded-lg">
                    {currentTrack?.name || student.track || "Web Dev Track"}
                  </Badge>
                </div>

                {/* One-Line Headline */}
                <p className="text-sm font-bold text-orange-700">
                  {student.headline || `${currentTrack?.name || "Full-Stack Web Dev"} Builder`}
                </p>

                {/* College Info */}
                {student.collegeName && (
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <School className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                    <span>{student.collegeName}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Owner-Only Edit Controls */}
            {isOwner && !isEditingIntro && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingIntro(true)}
                className="text-xs py-1.5 px-3 border-slate-300 shrink-0"
              >
                <Edit2 className="h-3.5 w-3.5 text-orange-600" />
                <span>Edit Intro</span>
              </Button>
            )}
          </div>

          {/* Owner Inline Editor Form OR Read-only Bio */}
          {isOwner && isEditingIntro ? (
            <form onSubmit={handleSaveIntro} className="space-y-4 pt-4 border-t border-slate-100 bg-slate-50 p-4 rounded-xl">
              <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <Edit2 className="h-3.5 w-3.5 text-orange-600" />
                <span>Edit Profile Intro & Links</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Headline</label>
                  <input
                    type="text"
                    placeholder="e.g. Full-Stack Web Dev & Open Source Builder"
                    value={editHeadline}
                    onChange={(e) => setEditHeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">GitHub Username</label>
                  <input
                    type="text"
                    placeholder="e.g. aarav-codes"
                    value={editGithub}
                    onChange={(e) => setEditGithub(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">Bio (1-3 Sentences)</label>
                <textarea
                  rows={2}
                  placeholder="What are you building or interested in?"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">LinkedIn Profile URL / Handle</label>
                <input
                  type="text"
                  placeholder="e.g. https://linkedin.com/in/yourname"
                  value={editLinkedin}
                  onChange={(e) => setEditLinkedin(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button type="submit" variant="primary" size="sm" disabled={isSavingIntro}>
                  {isSavingIntro ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                  <span>Save Intro</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingIntro(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            /* Bio Statement or Placeholder */
            <div className="pt-4 border-t border-slate-100 space-y-3">
              {student.bio ? (
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                  &quot;{student.bio}&quot;
                </p>
              ) : (
                <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                  This builder hasn&apos;t added a bio statement yet.
                </p>
              )}

              {/* Direct GitHub & LinkedIn Links */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {student.githubUsername && (
                  <a
                    href={`https://github.com/${student.githubUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-colors"
                  >
                    <GitCommit className="h-3.5 w-3.5 text-emerald-600" />
                    <span>github.com/{student.githubUsername}</span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </a>
                )}

                {student.linkedinProfile && (
                  <a
                    href={
                      student.linkedinProfile.startsWith("http")
                        ? student.linkedinProfile
                        : `https://linkedin.com/in/${student.linkedinProfile}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-colors"
                  >
                    <Share2 className="h-3.5 w-3.5 text-blue-600" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </a>
                )}
              </div>

              {/* Derived Tech Stack Tags */}
              <div className="pt-2 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Tech Stack:
                </span>
                {trackStack.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* 2. SECTION 2: Featured Builds (Visual Anchor for Recruiters) */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm space-y-4 rounded-xl text-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500 fill-amber-400" />
                <span>Featured Builds & Shipping Proof</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Top verified project submissions with direct clickable links to code & public posts.
              </p>
            </div>

            <Badge variant="flame" size="sm" className="rounded-lg">
              {featuredBuilds.length} Featured
            </Badge>
          </div>

          {featuredBuilds.length === 0 ? (
            /* Empty Featured Builds State */
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <Code2 className="h-8 w-8 text-slate-400 mx-auto" />
              <h4 className="font-bold text-sm text-slate-800">No builds shipped yet — check back soon</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                This student hasn&apos;t featured any challenge submissions yet. Check out the consistency heatmap below!
              </p>
            </div>
          ) : (
            /* 3 Featured Build Cards */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featuredBuilds.map((sub) => {
                const dayChallenge =
                  MOCK_CHALLENGE_DAYS.find((d) => d.dayNumber === sub.dayNumber) || {
                    title: `Day ${sub.dayNumber} Challenge`,
                    description: "Daily challenge project brief.",
                  };

                return (
                  <div
                    key={sub.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-orange-700">
                          Day {sub.dayNumber}
                        </span>
                        {sub.featured && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                            <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" /> Featured
                          </span>
                        )}
                      </div>

                      <h4 className="font-extrabold text-xs text-slate-900 line-clamp-2">
                        {dayChallenge.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 font-normal">
                        {dayChallenge.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex flex-col gap-1.5">
                      {sub.githubUrl && (
                        <a
                          href={sub.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-[11px] font-mono text-slate-800 font-bold flex items-center justify-between transition-colors shadow-xs"
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <GitCommit className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">View Commit SHA</span>
                          </span>
                          <ExternalLink className="h-3 w-3 text-slate-400 shrink-0" />
                        </a>
                      )}

                      {sub.linkedinUrl && (
                        <a
                          href={sub.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-400 text-[11px] font-mono text-slate-800 font-bold flex items-center justify-between transition-colors shadow-xs"
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <Share2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                            <span className="truncate">View LinkedIn Post</span>
                          </span>
                          <ExternalLink className="h-3 w-3 text-slate-400 shrink-0" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* 3. SECTION 3: Demoted Consistency Signal & Heatmap Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="text-xs font-bold text-slate-600 flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-600" />
              <span>
                Consistency: Day {student.completedDays} of 60 • Current Streak:{" "}
                <strong className="text-slate-900">{student.currentStreak} Days</strong>
              </span>
            </div>

            {student.percentileRank && (
              <Badge variant="outline" size="sm" className="text-[11px] rounded-lg">
                {student.percentileRank}
              </Badge>
            )}
          </div>

          {/* 60-Day Progress Heatmap Grid */}
          <ProgressGridSection student={student} submissions={submissions} />

          {/* Verified Milestone Achievements */}
          <AchievementsSection student={student} />
        </div>

        {/* 4. SECTION 4: Footer CTA & Challenge Backlink */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm space-y-4 rounded-xl text-slate-900">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-extrabold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                <Award className="h-4 w-4 text-orange-600" />
                <span>Verified Builder Portfolio Link</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Part of a public 60-day build-in-public challenge for student developers —{" "}
                <Link href="/" className="text-orange-700 font-bold hover:underline">
                  abtalks.dev
                </Link>
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="text-xs py-2 px-4 rounded-xl shrink-0 border-slate-300 text-slate-800"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Copied Link!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-orange-600" />
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
