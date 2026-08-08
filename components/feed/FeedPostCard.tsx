"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FeedPost, Student, MOCK_STUDENTS, MOCK_TRACKS, MOCK_CHALLENGE_DAYS } from "@/lib/mock-data";
import { ImageCollage } from "./ImageCollage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Flame,
  GitCommit,
  Share2,
  Heart,
  MessageSquare,
  Trophy,
  Medal,
  Award,
  ArrowRight,
  School,
} from "lucide-react";

export interface FeedPostCardProps {
  post: FeedPost;
  rankIndex?: number; // 0 for #1, 1 for #2, 2 for #3
}

export function FeedPostCard({ post, rankIndex }: FeedPostCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(post.likes);

  const student: Student =
    MOCK_STUDENTS.find((s) => s.id === post.studentId) || {
      id: post.studentId,
      name: "Student Builder",
      currentStreak: 7,
      completedDays: post.dayNumber,
      totalDays: 60,
      cohortStartDate: "2026-08-08",
      longestStreak: 7,
      collegeName: "Tech University",
    };

  const track = MOCK_TRACKS.find((t) => t.id === post.track);
  const challenge = MOCK_CHALLENGE_DAYS.find((d) => d.dayNumber === post.dayNumber);

  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "ST";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const formatRelativeTime = (isoString: string) => {
    try {
      const now = new Date();
      const created = new Date(isoString);
      const diffSecs = Math.floor((now.getTime() - created.getTime()) / 1000);

      if (diffSecs < 60) return "Just now";
      if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
      if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)}h ago`;
      return `${Math.floor(diffSecs / 86400)}d ago`;
    } catch {
      return "Recently";
    }
  };

  const renderRankBadge = () => {
    if (rankIndex === 0) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 shadow-xs shrink-0">
          <Trophy className="h-3 w-3 text-amber-600 fill-amber-500" />
          <span>#1 Trending</span>
        </span>
      );
    }
    if (rankIndex === 1) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300 shadow-xs shrink-0">
          <Medal className="h-3 w-3 text-slate-500 fill-slate-400" />
          <span>#2 Trending</span>
        </span>
      );
    }
    if (rankIndex === 2) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-300 shadow-xs shrink-0">
          <Award className="h-3 w-3 text-orange-600 fill-orange-500" />
          <span>#3 Trending</span>
        </span>
      );
    }
    return null;
  };

  return (
    <Card className="p-4 sm:p-6 bg-white border-slate-200/90 shadow-xs space-y-3.5 rounded-2xl text-slate-900 transition-all hover:border-slate-300">
      {/* 1. Mobile-Optimized Header */}
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <Link href={`/u/${student.id}`} className="group relative shrink-0">
            {student.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border-2 border-orange-400/80 object-cover shadow-xs group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border-2 border-orange-400/80 bg-orange-50 flex items-center justify-center font-bold text-orange-700 text-xs shadow-xs group-hover:scale-105 transition-transform">
                {getInitials(student.name)}
              </div>
            )}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
          </Link>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link href={`/u/${student.id}`} className="font-extrabold text-xs sm:text-sm text-slate-900 hover:text-orange-700 transition-colors truncate">
                {student.name}
              </Link>
              {rankIndex !== undefined && rankIndex < 3 && renderRankBadge()}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium truncate">
              {student.collegeName && (
                <span className="flex items-center gap-1 text-slate-600 truncate">
                  <School className="h-3 w-3 text-orange-600 shrink-0" />
                  <span className="truncate">{student.collegeName}</span>
                </span>
              )}
              <span className="text-slate-300">•</span>
              <span className="shrink-0">{formatRelativeTime(post.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Streak Pill */}
        <div className="px-2 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 text-[11px] font-extrabold flex items-center gap-1 shadow-xs shrink-0">
          <Flame className="h-3.5 w-3.5 fill-orange-600 text-orange-600" />
          <span>{student.currentStreak}d</span>
        </div>
      </div>

      {/* 2. Challenge Day Context */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] sm:text-xs font-mono font-extrabold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200 shrink-0">
            Day {post.dayNumber}
          </span>
          <Badge variant="neutral" size="sm" className="rounded-md text-[10px] shrink-0">
            {track?.name || post.track}
          </Badge>
          <span className="text-xs font-bold text-slate-900 truncate">
            {challenge?.title || `Day ${post.dayNumber} Challenge`}
          </span>
        </div>
      </div>

      {/* 3. Responsive Image Collage */}
      <ImageCollage images={post.images} />

      {/* 4. Caption Text */}
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal bg-slate-50/70 p-3 rounded-xl border border-slate-100/90">
        {post.caption}
      </p>

      {/* 5. Mobile-Optimized Action Bar */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        {/* Likes & Comments */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-1.5 font-bold transition-all px-3 py-1.5 rounded-lg border min-h-[38px] active:scale-95 ${
              isLiked
                ? "bg-rose-50 border-rose-200 text-rose-600 shadow-xs"
                : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-rose-600 text-rose-600" : ""}`} />
            <span>{likesCount}</span>
          </button>

          <div className="flex items-center gap-1.5 font-bold text-slate-500">
            <MessageSquare className="h-4 w-4 text-slate-400" />
            <span className="text-xs">{post.comments}</span>
          </div>
        </div>

        {/* Proof Links & Day Navigation Button */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto sm:ml-0">
          {post.githubUrl && (
            <a
              href={post.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center active:scale-95"
              title="View GitHub Commit"
            >
              <GitCommit className="h-4 w-4 text-emerald-600" />
            </a>
          )}

          {post.linkedinUrl && (
            <a
              href={post.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center active:scale-95"
              title="View LinkedIn Post"
            >
              <Share2 className="h-4 w-4 text-blue-600" />
            </a>
          )}

          <Link href={`/day/${post.dayNumber}`}>
            <Button variant="outline" size="sm" className="text-xs py-1.5 px-3 rounded-xl border-slate-200 text-slate-800 min-h-[38px]">
              <span>Day {post.dayNumber}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
