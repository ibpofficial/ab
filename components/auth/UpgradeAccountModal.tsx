"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, LogIn, X, CheckCircle2 } from "lucide-react";

export function UpgradeAccountModal() {
  const { isAnonymous, linkAnonymousToGoogle } = useAuth();
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [isLinking, setIsLinking] = useState<boolean>(false);

  if (!isAnonymous || dismissed) return null;

  const handleLink = async () => {
    setIsLinking(true);
    await linkAnonymousToGoogle();
    setIsLinking(false);
  };

  return (
    <Card className="relative overflow-hidden p-5 bg-gradient-to-r from-orange-50 via-white to-amber-50 border border-orange-200 shadow-md rounded-xl text-slate-900">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 transition-colors p-1"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-orange-100 border border-orange-200 text-orange-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm text-slate-900">
                You are currently in a temporary guest session
              </h3>
              <Badge variant="flame" size="sm" className="rounded-md">
                <ShieldCheck className="h-3 w-3" /> Save Streak
              </Badge>
            </div>
            <p className="text-xs text-slate-600 font-medium max-w-xl">
              Link your Google Account to preserve your continuous 60-day commit history and claim your custom public profile link.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="google"
            size="sm"
            onClick={handleLink}
            disabled={isLinking}
            className="text-xs py-2 px-4 border-slate-300 shadow-xs"
          >
            <LogIn className="h-3.5 w-3.5 text-orange-600" />
            <span>{isLinking ? "Linking..." : "Link Google Account"}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
