import React from "react";
import Link from "next/link";
import { Student, MOCK_TRACKS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Compass, School, Share2 } from "lucide-react";

export interface HeaderIdentityStripProps {
  student: Student;
}

export function HeaderIdentityStrip({ student }: HeaderIdentityStripProps) {
  // Get track object
  const currentTrack = MOCK_TRACKS.find((t) => t.id === student.track);

  // Derive initials fallback for missing avatarUrl
  const getInitials = (name: string) => {
    if (!name) return "ST";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
      {/* Identity Info */}
      <div className="flex items-center gap-3">
        {/* Avatar or Fallback Initials */}
        <div className="relative shrink-0">
          {student.avatarUrl ? (
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-amber-500/40 bg-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-full border-2 border-dashed border-amber-500/50 bg-amber-500/10 flex items-center justify-center font-extrabold text-amber-400 text-sm shadow-inner">
              {getInitials(student.name)}
            </div>
          )}
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#090d16]" />
        </div>

        {/* Details */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-bold text-base text-white">{student.name}</h2>
            {student.track ? (
              <Badge variant="flame" size="sm">
                <CheckCircle2 className="h-3 w-3" /> {currentTrack?.name || student.track}
              </Badge>
            ) : (
              <Badge variant="rose" size="sm" className="animate-pulse">
                <Compass className="h-3 w-3" /> Choose a Track
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            {student.collegeName && (
              <span className="flex items-center gap-1">
                <School className="h-3.5 w-3.5 text-amber-500/80" />
                {student.collegeName}
              </span>
            )}
            {student.githubUsername && (
              <>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-slate-300">@{student.githubUsername}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Action: Share Public Profile */}
      <div className="shrink-0 ml-auto sm:ml-0">
        <Link href={`/u/${student.id}`}>
          <Button variant="outline" size="sm" className="text-xs py-1.5 px-3">
            <Share2 className="h-3.5 w-3.5 text-amber-400" />
            <span>Public Profile</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
