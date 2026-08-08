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
import { MOCK_STUDENTS, Student } from "@/lib/mock-data";

function DashboardContent() {
  const searchParams = useSearchParams();
  const studentParam = searchParams.get("student");
  const { student: authStudent, setOverrideStudentId } = useAuth();

  const [selectedStudentId, setSelectedStudentId] = useState<string>("student-2");

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

  const activeStudent: Student =
    authStudent || MOCK_STUDENTS.find((s) => s.id === selectedStudentId) || MOCK_STUDENTS[1];

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f3f4f6]">
      {/* Dev QA Persona Switcher Bar */}
      <PersonaSwitcher
        currentStudentId={selectedStudentId}
        onSelectStudent={handleSelectStudent}
      />

      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* Contextual Anonymous Account Upgrade Prompt */}
        <UpgradeAccountModal />

        {/* 1. Header Identity Strip */}
        <HeaderIdentityStrip student={activeStudent} />

        {/* 2. Current Streak Centerpiece */}
        <StreakCenterpiece student={activeStudent} />

        {/* 3. Today's Task Card */}
        <TodayTaskCard student={activeStudent} />

        {/* 4. Progress & 60-Cell Contribution Grid */}
        <ProgressGridSection student={activeStudent} />

        {/* 5. Standing & Achievements */}
        <AchievementsSection student={activeStudent} />

        {/* 6. Secondary Day Browser */}
        <SecondaryDayBrowser />
      </main>
    </div>
  );
}


export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#090d16] text-white p-8">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
