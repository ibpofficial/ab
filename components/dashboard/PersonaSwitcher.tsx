"use client";

import React from "react";
import { UserCheck, ShieldCheck } from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

export interface PersonaSwitcherProps {
  currentStudentId: string;
  onSelectStudent: (studentId: string) => void;
}

export function PersonaSwitcher({
  currentStudentId,
  onSelectStudent,
}: PersonaSwitcherProps) {
  const { user, isAnonymous } = useAuth();

  // If user is authenticated with a real Google account, hide demo persona switcher
  if (user && !isAnonymous) {
    return null;
  }

  return (
    <div className="w-full bg-slate-100 border-b border-orange-200 px-3 py-2 text-xs text-slate-800">
      <div className="mx-auto max-w-6xl flex flex-col xs:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-orange-700 font-semibold">
          <ShieldCheck className="h-3.5 w-3.5 text-orange-600" />
          <span>Dev QA Persona Switcher:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full xs:w-auto pb-1 xs:pb-0">
          {MOCK_STUDENTS.map((student) => {
            const isActive = student.id === currentStudentId;

            let label = "";
            if (student.id === "student-1") label = "1. Day 1 Zero Streak (Aarav)";
            else if (student.id === "student-2") label = "2. Mid-Challenge Missed Day (Priya)";
            else label = "3. Empty Profile (Rohan)";

            return (
              <button
                key={student.id}
                onClick={() => onSelectStudent(student.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all text-[11px] whitespace-nowrap flex items-center gap-1 ${
                  isActive
                    ? "bg-orange-600 text-white font-extrabold shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300"
                }`}
              >
                {isActive && <UserCheck className="h-3 w-3" />}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
