import React, { useState } from "react";
import Link from "next/link";
import { MOCK_CHALLENGE_DAYS } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight, Search, ArrowRight } from "lucide-react";

export function SecondaryDayBrowser() {
  const [selectedDay, setSelectedDay] = useState(1);
  const currentChallenge = MOCK_CHALLENGE_DAYS[selectedDay - 1];

  return (
    <Card className="p-5 bg-slate-900/80 border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Calendar className="h-4 w-4 text-amber-400" />
          <span>Browse 60-Day Challenge Library</span>
        </h3>
        <span className="text-[11px] text-slate-400 font-mono">Day {selectedDay} / 60</span>
      </div>

      {/* Day Selector Slider / Pill Grid */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {Array.from({ length: 60 }).map((_, idx) => {
          const day = idx + 1;
          const isSelected = day === selectedDay;

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`h-8 min-w-[34px] px-2 rounded-lg text-xs font-bold transition-all shrink-0 ${
                isSelected
                  ? "bg-amber-500 text-slate-950 font-extrabold shadow-sm"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              D{day}
            </button>
          );
        })}
      </div>

      {/* Selected Day Preview Card */}
      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs">
        <div>
          <div className="font-bold text-white">{currentChallenge.title}</div>
          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
            {currentChallenge.description}
          </div>
        </div>

        <Link href={`/day/${selectedDay}`} className="shrink-0">
          <button className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 text-xs font-semibold flex items-center gap-1 transition-colors">
            <span>View Brief</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </Link>
      </div>
    </Card>
  );
}
