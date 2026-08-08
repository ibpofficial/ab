"use client";

import React from "react";
import Link from "next/link";
import { Student, MOCK_TRACKS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { CheckCircle2, Compass, School, Share2, LogIn } from "lucide-react";

export interface HeaderIdentityStripProps {
  student: Student;
}

export function HeaderIdentityStrip({ student }: HeaderIdentityStripProps) {
  const { isAnonymous, linkAnonymousToGoogle } = useAuth();
  const currentTrack = MOCK_TRACKS.find((t) => t.id === student.track);

  const getInitials = (name: string) => {
    if (!name) return "ST";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-900">
      {/* Identity Info */}
      <div className="flex items-center gap-3">
        {/* Avatar or Fallback Initials */}
        <div className="relative shrink-0">
          {student.avatarUrl ? (
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-orange-400/60 bg-slate-100 shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-xl border-2 border-orange-400/60 bg-orange-50 flex items-center justify-center font-black text-orange-700 text-sm shadow-xs">
              {getInitials(student.name)}
            </div>
          )}
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
        </div>

        {/* Details */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-extrabold text-base text-slate-900">{student.name}</h2>
            {student.track ? (
              <Badge variant="flame" size="sm" className="rounded-lg">
                <CheckCircle2 className="h-3 w-3 text-orange-600" /> {currentTrack?.name || student.track}
              </Badge>
            ) : (
              <Badge variant="rose" size="sm" className="rounded-lg animate-pulse">
                <Compass className="h-3 w-3" /> Choose a Track
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            {student.collegeName && (
              <span className="flex items-center gap-1 text-slate-700">
                <School className="h-3.5 w-3.5 text-orange-600" />
                {student.collegeName}
              </span>
            )}
            {student.githubUsername && (
              <>
                <span className="text-slate-300">•</span>
                <span className="font-mono text-slate-600">@{student.githubUsername}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Action: Login with Google / Share Public Profile */}
      <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
        {isAnonymous && (
          <Button
            variant="google"
            size="sm"
            onClick={linkAnonymousToGoogle}
            className="text-xs py-1.5 px-3 border-slate-300 text-slate-800"
          >
            <LogIn className="h-3.5 w-3.5 text-orange-600" />
            <span>Claim Google Account</span>
          </Button>
        )}

        <Link href={`/u/${student.id}`}>
          <Button variant="outline" size="sm" className="text-xs py-1.5 px-3 rounded-xl border-slate-300 text-slate-800">
            <Share2 className="h-3.5 w-3.5 text-orange-600" />
            <span>Public Profile</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
