"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Student, ChallengeDay, MOCK_CHALLENGE_DAYS } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Calendar, ArrowRight, Flame, CheckCircle2, Clock } from "lucide-react";

export interface TodayTaskCardProps {
  student: Student;
}

export function TodayTaskCard({ student }: TodayTaskCardProps) {
  const currentDayNum = Math.min(60, Math.max(1, student.completedDays + 1));
  const [task, setTask] = useState<ChallengeDay | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchTodayTask() {
      try {
        const dayDocRef = doc(db, "challengeDays", String(currentDayNum));
        const daySnap = await getDoc(dayDocRef);

        if (daySnap.exists() && isMounted) {
          setTask(daySnap.data() as ChallengeDay);
        } else if (isMounted) {
          const fallback =
            MOCK_CHALLENGE_DAYS.find((d) => d.dayNumber === currentDayNum) ||
            MOCK_CHALLENGE_DAYS[0];
          setTask(fallback);
        }
      } catch (err) {
        console.warn("Firestore today task fetch notice:", err);
        if (isMounted) {
          const fallback =
            MOCK_CHALLENGE_DAYS.find((d) => d.dayNumber === currentDayNum) ||
            MOCK_CHALLENGE_DAYS[0];
          setTask(fallback);
        }
      }
    }

    fetchTodayTask();
    return () => {
      isMounted = false;
    };
  }, [currentDayNum]);

  const activeTask = task || {
    dayNumber: currentDayNum,
    title: `Day ${currentDayNum}: Daily Task Brief`,
    description: "Build daily challenge requirement.",
    taskBrief: "Complete today's task requirements, push to GitHub, and post proof link on LinkedIn.",
    resources: [],
    trackId: "web-dev",
  };

  return (
    <Card className="p-6 bg-slate-900/90 border-slate-800 space-y-4 rounded-xl text-white">
      <div className="flex items-center justify-between gap-2">
        <Badge variant="flame" size="sm" className="rounded-lg">
          <Calendar className="h-3.5 w-3.5" />
          <span>Day {currentDayNum} Challenge</span>
        </Badge>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Clock className="h-3.5 w-3.5 text-amber-400" />
          <span>Active Window Open</span>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-white tracking-tight">
          {activeTask.title}
        </h3>
        <p className="text-xs text-slate-300 mt-1 line-clamp-2 font-normal leading-relaxed">
          {activeTask.taskBrief}
        </p>
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        <span className="text-xs text-slate-400 font-medium">
          Estimated Time: <strong className="text-slate-200 font-bold">45-60 mins</strong>
        </span>

        <Link href={`/day/${currentDayNum}`}>
          <Button size="sm" variant="primary" className="rounded-xl shadow-md">
            <span>View Task & Submit</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
