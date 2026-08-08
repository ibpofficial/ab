"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Flame, LogIn, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/90 bg-[#090d16]/95 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl flame-gradient flame-glow text-white font-black text-lg transition-transform group-hover:scale-105">
            <Flame className="h-5 w-5 fill-white text-amber-200 animate-pulse-subtle" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              ABTalks <span className="text-amber-400 text-xs px-2 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 font-bold">60</span>
            </span>
          </div>
        </Link>

        {/* Dynamic Streak Badge */}
        <div className="hidden md:flex items-center gap-2">
          <Badge variant="flame" size="sm" className="rounded-lg px-3 py-1">
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span>60 Days Public Challenge</span>
          </Badge>
        </div>

        {/* Top Navbar Actions (Including Top Login Button) */}
        <div className="flex items-center gap-2.5">
          {/* Top Login Button / Account Status */}
          {user && !isAnonymous ? (
            <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span className="truncate max-w-[120px]">{user.displayName || "Google User"}</span>
            </div>
          ) : (
            <Button
              variant="google"
              size="sm"
              onClick={handleAuthAction}
              className="text-xs font-bold px-3.5 py-1.5 border-slate-700 hover:border-amber-500/50"
            >
              <LogIn className="h-3.5 w-3.5 text-amber-400" />
              <span>{isAnonymous ? "Claim Google Account" : "Sign In with Google"}</span>
            </Button>
          )}

          {/* Primary Dashboard CTA */}
          <Link href="/dashboard">
            <Button size="sm" variant="primary" className="shadow-amber-600/30">
              <span>Start Streak</span>
              <ArrowRight className="h-4 w-4 ml-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
