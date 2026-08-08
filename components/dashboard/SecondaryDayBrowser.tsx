"use client";

import React from "react";
import Link from "next/link";
import { MOCK_CHALLENGE_DAYS } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, ArrowRight, Code } from "lucide-react";

export function SecondaryDayBrowser() {
  const days = MOCK_CHALLENGE_DAYS.slice(0, 6);

  return (
    <Card className="p-6 bg-white border-slate-200 space-y-4 rounded-xl text-slate-900 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Compass className="h-5 w-5 text-orange-600" />
            <span>Curriculum Day Browser</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Preview upcoming daily project briefs across the 60-day roadmap.
          </p>
        </div>

        <Link href="/day/1">
          <Badge variant="flame" size="sm" className="rounded-lg">
            <span>Explore All 60 Days</span>
            <ArrowRight className="h-3 w-3" />
          </Badge>
        </Link>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3">
        {days.map((day) => (
          <Link key={day.dayNumber} href={`/day/${day.dayNumber}`}>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition-all group space-y-1.5 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-orange-700">
                  Day {day.dayNumber}
                </span>
                <Code className="h-3.5 w-3.5 text-slate-400 group-hover:text-orange-600 transition-colors" />
              </div>

              <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-orange-700 transition-colors line-clamp-1">
                {day.title}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-2 font-normal">
                {day.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
