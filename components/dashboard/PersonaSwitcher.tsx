import React from "react";
import { UserCheck, Sparkles } from "lucide-react";
import { MOCK_STUDENTS, Student } from "@/lib/mock-data";

export interface PersonaSwitcherProps {
  currentStudentId: string;
  onSelectStudent: (studentId: string) => void;
}

export function PersonaSwitcher({
  currentStudentId,
  onSelectStudent,
}: PersonaSwitcherProps) {
  return (
    <div className="w-full bg-slate-950 border-b border-amber-500/30 px-3 py-2 text-xs">
      <div className="mx-auto max-w-5xl flex flex-col xs:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>QA Persona Preview Bar:</span>
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
                    ? "bg-amber-500 text-slate-950 font-extrabold shadow-sm"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
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
