"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Flame, LogIn, ArrowRight, ShieldCheck } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xs">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl flame-gradient flame-glow text-white font-black text-lg transition-transform group-hover:scale-105">
            <Flame className="h-5 w-5 fill-white text-orange-100" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
              ABTalks <span className="text-orange-700 text-xs px-2 py-0.5 rounded-lg bg-orange-100/80 border border-orange-200 font-bold">60</span>
            </span>
          </div>
        </Link>

        {/* Dynamic Streak Badge */}
        <div className="hidden md:flex items-center gap-2">
          <Badge variant="flame" size="sm" className="rounded-lg px-3 py-1 bg-orange-50 border-orange-200">
            <Flame className="h-3.5 w-3.5 fill-orange-600 text-orange-600" />
            <span>60 Days Public Challenge</span>
          </Badge>
        </div>

        {/* Top Navbar Actions (Including Top Login Button) */}
        <div className="flex items-center gap-2.5">
          {/* Top Login Button / Account Status */}
          {user && !isAnonymous ? (
            <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span className="truncate max-w-[120px]">{user.displayName || "Google User"}</span>
            </div>
          ) : (
            <Button
              variant="google"
              size="sm"
              onClick={handleAuthAction}
              className="text-xs font-bold px-3.5 py-1.5 border-slate-300 hover:border-slate-400 text-slate-800"
            >
              <LogIn className="h-3.5 w-3.5 text-orange-600" />
              <span>{isAnonymous ? "Claim Google Account" : "Sign In with Google"}</span>
            </Button>
          )}

          {/* Primary Dashboard CTA */}
          <Link href="/dashboard">
            <Button size="sm" variant="primary" className="shadow-orange-600/20">
              <span>Start Streak</span>
              <ArrowRight className="h-4 w-4 ml-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
