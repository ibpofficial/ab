import React from "react";
import Link from "next/link";
import { MOCK_CHALLENGE_DAYS } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight, Lock, CheckCircle2 } from "lucide-react";

export function SecondaryDayBrowser() {
  const days = MOCK_CHALLENGE_DAYS.slice(0, 12);

  return (
    <Card className="p-6 bg-white border border-slate-200 shadow-sm space-y-4 rounded-xl text-slate-900">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-orange-600" />
          <span>Curriculum Day Browser</span>
        </h3>
        <span className="text-xs text-slate-500 font-medium">Browse All 60 Days</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {days.map((day) => (
          <Link key={day.dayNumber} href={`/day/${day.dayNumber}`}>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-300 hover:shadow-xs transition-all flex items-center justify-between group">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" size="sm" className="rounded-md">
                    Day {day.dayNumber}
                  </Badge>
                  <span className="text-[11px] font-bold text-slate-700 truncate max-w-[120px]">
                    {day.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1 font-medium">
                  {day.description}
                </p>
              </div>

              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
