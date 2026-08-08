"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { MOCK_TRACKS } from "@/lib/mock-data";
import {
  User,
  School,
  GitCommit,
  Share2,
  Compass,
  CheckCircle2,
  Flame,
  ShieldCheck,
  LogOut,
  LogIn,
  Save,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Copy,
  Award,
} from "lucide-react";

export default function StudentProfileSettingsPage() {
  const { user, student, isAnonymous, linkAnonymousToGoogle, signOut, loading: authLoading } = useAuth();

  // Form states
  const [name, setName] = useState<string>("");
  const [collegeName, setCollegeName] = useState<string>("");
  const [githubUsername, setGithubUsername] = useState<string>("");
  const [linkedinProfile, setLinkedinProfile] = useState<string>("");
  const [track, setTrack] = useState<string>("web-dev");

  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync form inputs from student context
  useEffect(() => {
    if (student) {
      setName(student.name || "");
      setCollegeName(student.collegeName || "");
      setGithubUsername(student.githubUsername || "");
      setLinkedinProfile(student.linkedinProfile || "");
      setTrack(student.track || "web-dev");
    } else if (user) {
      setName(user.displayName || "");
    }
  }, [student, user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setSaveSuccess(false);

    try {
      const studentRef = doc(db, "students", user.uid);
      await updateDoc(studentRef, {
        name: name.trim(),
        collegeName: collegeName.trim(),
        githubUsername: githubUsername.trim(),
        linkedinProfile: linkedinProfile.trim(),
        track,
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating profile settings:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyPublicLink = () => {
    const uid = user?.uid || student?.id || "student-2";
    const url = typeof window !== "undefined" ? `${window.location.origin}/u/${uid}` : `https://abtalks.dev/u/${uid}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getInitials = (str: string) => {
    if (!str) return "ST";
    const parts = str.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return str.substring(0, 2).toUpperCase();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 text-orange-600 animate-spin" />
          <p className="text-xs text-slate-500 font-mono">Loading Profile Settings...</p>
        </main>
      </div>
    );
  }

  const currentTrack = MOCK_TRACKS.find((t) => t.id === track);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
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

          <Badge variant="emerald" size="sm" className="rounded-lg">
            <ShieldCheck className="h-3.5 w-3.5" /> Account Settings
          </Badge>
        </div>

        {/* 1. Identity & Public Link Header Card */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm space-y-4 rounded-xl text-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl border-2 border-orange-400/60 bg-orange-50 flex items-center justify-center font-black text-orange-700 text-xl shadow-xs">
                {getInitials(name || "Student")}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-extrabold text-slate-900">{name || "Student Builder"}</h1>
                  <Badge variant="flame" size="sm" className="rounded-lg">
                    <CheckCircle2 className="h-3 w-3" /> {currentTrack?.name || "Web Dev Track"}
                  </Badge>
                </div>

                <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-2">
                  <span>{collegeName || "Engineering Student"}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono text-slate-600">ID: {user?.uid.substring(0, 10)}...</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link href={`/u/${user?.uid || "student-2"}`}>
                <Button variant="primary" size="sm" className="rounded-xl text-xs py-2 px-4 shadow-xs">
                  <Share2 className="h-3.5 w-3.5" />
                  <span>View Public Profile</span>
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* 2. Streak & Performance Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 bg-white border-slate-200 shadow-xs text-center rounded-xl">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Current Streak</div>
            <div className="text-xl font-black text-orange-600 mt-1 flex items-center justify-center gap-1">
              <Flame className="h-5 w-5 fill-orange-600" />
              <span>{student?.currentStreak || 0} Days</span>
            </div>
          </Card>
          <Card className="p-4 bg-white border-slate-200 shadow-xs text-center rounded-xl">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Longest Streak</div>
            <div className="text-xl font-black text-slate-900 mt-1">{student?.longestStreak || 0} Days</div>
          </Card>
          <Card className="p-4 bg-white border-slate-200 shadow-xs text-center rounded-xl">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Completed</div>
            <div className="text-xl font-black text-emerald-600 mt-1">{student?.completedDays || 0}/60</div>
          </Card>
        </div>

        {/* 3. Profile Settings Form */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm space-y-4 rounded-xl text-slate-900">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <User className="h-5 w-5 text-orange-600" />
                <span>Edit Profile & Curriculum Details</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                These details will be displayed on your verified recruiter streak profile link.
              </p>
            </div>

            {saveSuccess && (
              <Badge variant="emerald" size="sm" className="rounded-lg animate-pulse">
                <CheckCircle2 className="h-3 w-3" /> Saved to Firestore!
              </Badge>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 1: Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                />
              </div>

              {/* Field 2: College Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">College / University Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IIT Delhi / BITS Pilani"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 3: GitHub Username */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <GitCommit className="h-3.5 w-3.5 text-emerald-600" />
                  <span>GitHub Username</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. aarav-sharma"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                />
              </div>

              {/* Field 4: LinkedIn URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Share2 className="h-3.5 w-3.5 text-blue-600" />
                  <span>LinkedIn Profile URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={linkedinProfile}
                  onChange={(e) => setLinkedinProfile(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                />
              </div>
            </div>

            {/* Field 5: Track Selection */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Compass className="h-3.5 w-3.5 text-orange-600" />
                <span>Selected Challenge Track *</span>
              </label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              >
                {MOCK_TRACKS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.tag})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={saving}
                className="py-3 px-6 rounded-xl font-bold shadow-xs"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Profile Changes</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>

        {/* 4. Account Security & Session Actions */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm space-y-4 rounded-xl text-slate-900">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <ShieldCheck className="h-5 w-5 text-orange-600" />
            <span>Account Security & Login Provider</span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="font-bold text-slate-800">
                {isAnonymous ? "Guest Anonymous Account" : `Linked Google Account: ${user?.email || user?.displayName}`}
              </div>
              <p className="text-slate-500 font-medium mt-0.5">
                {isAnonymous
                  ? "Claim your account with Google so your streak is never lost."
                  : "Your streak data is securely synced with your Google account."}
              </p>
            </div>

            {isAnonymous ? (
              <Button
                variant="google"
                size="sm"
                onClick={linkAnonymousToGoogle}
                className="text-xs py-2 px-4 border-slate-300 shrink-0"
              >
                <LogIn className="h-3.5 w-3.5 text-orange-600" />
                <span>Link Google Account</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="text-xs py-2 px-4 border-rose-300 text-rose-700 hover:bg-rose-50 shrink-0"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
