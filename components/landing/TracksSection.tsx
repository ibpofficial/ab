import React from "react";
import Link from "next/link";
import { Globe, Code2, Cpu, Smartphone, Users, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_TRACKS } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Code2,
  Cpu,
  Smartphone,
};

export function TracksSection() {
  return (
    <section id="tracks" className="py-14 sm:py-20 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Curated Curriculums
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Choose your <span className="flame-text">60-day track</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
              Select one specialized track. Daily challenges are tailored to your chosen domain.
            </p>
          </div>

          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="shrink-0 rounded-xl">
              <span>View All Tracks</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Tracks Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {MOCK_TRACKS.map((track) => {
            const Icon = iconMap[track.icon] || Globe;

            return (
              <Card
                key={track.id}
                className="flex flex-col justify-between p-6 bg-slate-900/80 border-slate-800 rounded-xl hover:border-amber-500/40 group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="flame" size="sm" className="rounded-lg">
                      {track.tag}
                    </Badge>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {track.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {track.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                    <Users className="h-3.5 w-3.5 text-amber-400" />
                    <span>{track.totalEnrolled.toLocaleString()} Students</span>
                  </div>

                  <Link
                    href={`/dashboard?track=${track.id}`}
                    className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                  >
                    <span>Select Track</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
