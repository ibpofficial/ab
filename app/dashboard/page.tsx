"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { PersonaSwitcher } from "@/components/dashboard/PersonaSwitcher";
import { HeaderIdentityStrip } from "@/components/dashboard/HeaderIdentityStrip";
import { StreakCenterpiece } from "@/components/dashboard/StreakCenterpiece";
import { TodayTaskCard } from "@/components/dashboard/TodayTaskCard";
import { ProgressGridSection } from "@/components/dashboard/ProgressGridSection";
import { AchievementsSection } from "@/components/dashboard/AchievementsSection";
import { SecondaryDayBrowser } from "@/components/dashboard/SecondaryDayBrowser";
import { UpgradeAccountModal } from "@/components/auth/UpgradeAccountModal";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { MOCK_STUDENTS, Student, Submission } from "@/lib/mock-data";
import { Loader2 } from "lucide-react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const studentParam = searchParams.get("student");
  const { user, student: authStudent, loading: authLoading, setOverrideStudentId } = useAuth();

  const [selectedStudentId, setSelectedStudentId] = useState<string>("student-2");
  const [liveSubmissions, setLiveSubmissions] = useState<Submission[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState<boolean>(true);

  // Dev QA persona override sync
  useEffect(() => {
    if (studentParam && MOCK_STUDENTS.some((s) => s.id === studentParam)) {
      setSelectedStudentId(studentParam);
      setOverrideStudentId(studentParam);
    }
  }, [studentParam, setOverrideStudentId]);

  const handleSelectStudent = (id: string) => {
    setSelectedStudentId(id);
    setOverrideStudentId(id);
  };

  // Fetch live submissions from Firestore for active student
  useEffect(() => {
    let isMounted = true;
    async function fetchSubmissions() {
      const activeUid = user?.uid || selectedStudentId;
      setSubmissionsLoading(true);

      try {
        const q = query(
          collection(db, "submissions"),
          where("studentId", "==", activeUid)
        );
        const querySnap = await getDocs(q);
        const fetched: Submission[] = [];
        querySnap.forEach((doc) => fetched.push(doc.data() as Submission));

        if (isMounted) {
          setLiveSubmissions(fetched);
        }
      } catch (err) {
        console.warn("Firestore submissions query notice:", err);
      } finally {
        if (isMounted) setSubmissionsLoading(false);
      }
    }

    fetchSubmissions();
    return () => {
      isMounted = false;
    };
  }, [user, selectedStudentId]);

  // Active student object (instant default fallback for 0ms paint, hydration in background)
  const activeStudent: Student =
    process.env.NODE_ENV !== "production"
      ? authStudent || MOCK_STUDENTS.find((s) => s.id === selectedStudentId) || MOCK_STUDENTS[1]
      : authStudent || {
          id: user?.uid || "anon",
          name: user?.displayName || "Student Builder",
          avatarUrl: user?.photoURL || "",
          track: "web-dev",
          cohortStartDate: new Date().toISOString().split("T")[0],
          currentStreak: 0,
          longestStreak: 0,
          completedDays: 0,
          totalDays: 60,
        };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Dev-only QA Persona Switcher Bar */}
      {process.env.NODE_ENV !== "production" && (
        <PersonaSwitcher
          currentStudentId={selectedStudentId}
          onSelectStudent={handleSelectStudent}
        />
      )}

      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Contextual Anonymous Account Upgrade Prompt */}
        <UpgradeAccountModal />

        {/* 1. Header Identity Strip */}
        <HeaderIdentityStrip student={activeStudent} />

        {/* 2. Wider 2-Column Hero Grid: Streak Centerpiece + Today's Task */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <StreakCenterpiece student={activeStudent} />
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <TodayTaskCard student={activeStudent} />
          </div>
        </div>

        {/* 3. Progress & 60-Cell Contribution Grid */}
        <ProgressGridSection student={activeStudent} submissions={liveSubmissions} />

        {/* 4. Standing & Achievements */}
        <AchievementsSection student={activeStudent} />

        {/* 5. Secondary Day Browser */}
        <SecondaryDayBrowser />
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 p-8">
          <Loader2 className="h-8 w-8 text-orange-600 animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
