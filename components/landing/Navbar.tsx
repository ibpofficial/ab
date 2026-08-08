import React from "react";
import Link from "next/link";
import { Flame, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl flame-gradient flame-glow text-white font-black text-lg transition-transform group-hover:scale-105">
            <Flame className="h-5 w-5 fill-white text-amber-200 animate-pulse-subtle" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
              ABTalks <span className="text-amber-500 text-xs px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 font-bold">60</span>
            </span>
          </div>
        </Link>

        {/* Dynamic Streak Badge */}
        <div className="hidden xs:flex items-center gap-2">
          <Badge variant="flame" size="sm">
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span>60 Days Challenge</span>
          </Badge>
        </div>

        {/* Nav Actions */}
        <div className="flex items-center gap-3">
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
