"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Flame, LogIn, ArrowRight, Home, User, Sparkles, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const { user, isAnonymous, signInWithGoogle, linkAnonymousToGoogle } = useAuth();

  const handleAuthAction = () => {
    if (isAnonymous) {
      linkAnonymousToGoogle();
    } else if (!user) {
      signInWithGoogle();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-xs">
      <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl flame-gradient flame-glow text-white font-black text-lg transition-transform group-hover:scale-105">
              <Flame className="h-5 w-5 fill-white text-orange-100" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                ABTalks
              </span>
              <span className="text-orange-700 text-[10px] px-2 py-0.5 rounded-full bg-orange-100/90 border border-orange-200/80 font-bold tracking-wide">
                60
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-700 hover:text-slate-900">
                <Home className="h-3.5 w-3.5 mr-1 text-slate-500" />
                <span>Home</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-700 hover:text-slate-900">
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link href="/feed">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-700 hover:text-slate-900">
                <Rss className="h-3.5 w-3.5 mr-1 text-orange-600" />
                <span>Feed</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-700 hover:text-slate-900">
                <span>Settings</span>
              </Button>
            </Link>
          </nav>
        </div>

        {/* Center: Challenge Badge */}
        <div className="hidden lg:flex items-center gap-2">
          <Badge variant="flame" size="sm" className="rounded-full px-3 py-1 bg-orange-50/80 border-orange-200 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-orange-600 fill-orange-500/20" />
            <span>60 Days Public Challenge</span>
          </Badge>
        </div>

        {/* Right: Auth / Profile Button */}
        <div className="flex items-center gap-2">
          {/* Mobile Only Account Icon */}
          <div className="md:hidden flex items-center gap-2">
            {user && !isAnonymous ? (
              <Link href="/profile">
                <div className="h-8 w-8 rounded-full bg-orange-100 border border-orange-300 text-orange-700 flex items-center justify-center font-bold text-xs shadow-xs">
                  {user.displayName ? user.displayName[0].toUpperCase() : <User className="h-4 w-4" />}
                </div>
              </Link>
            ) : isAnonymous ? (
              <Button
                variant="google"
                size="sm"
                onClick={linkAnonymousToGoogle}
                className="text-[11px] font-bold px-2.5 py-1 min-h-[34px] border-slate-300 text-slate-800 rounded-lg"
              >
                <LogIn className="h-3 w-3 text-orange-600" />
                <span>Claim</span>
              </Button>
            ) : (
              <Button
                variant="google"
                size="sm"
                onClick={signInWithGoogle}
                className="text-[11px] font-bold px-2.5 py-1 min-h-[34px] border-slate-300 text-slate-800 rounded-lg"
              >
                <LogIn className="h-3 w-3 text-orange-600" />
                <span>Sign In</span>
              </Button>
            )}
          </div>

          {/* Desktop Full Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {user && !isAnonymous ? (
              <Link href="/profile">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold px-3.5 py-1.5 border-slate-200 text-slate-800 rounded-xl"
                >
                  <User className="h-3.5 w-3.5 text-orange-600" />
                  <span>{user.displayName?.split(" ")[0] || "Profile"}</span>
                </Button>
              </Link>
            ) : (
              <Button
                variant="google"
                size="sm"
                onClick={handleAuthAction}
                className="text-xs font-bold px-3.5 py-1.5 border-slate-200 text-slate-800"
              >
                <LogIn className="h-3.5 w-3.5 text-orange-600" />
                <span>{isAnonymous ? "Claim Google Account" : "Sign In with Google"}</span>
              </Button>
            )}

            <Link href="/dashboard">
              <Button size="sm" variant="primary" className="shadow-orange-600/20">
                <span>Start Streak</span>
                <ArrowRight className="h-4 w-4 ml-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
