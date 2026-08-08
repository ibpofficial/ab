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
    <Card className="relative overflow-hidden p-5 bg-gradient-to-r from-amber-500/20 via-orange-600/10 to-slate-900 border border-amber-500/30 shadow-xl rounded-xl text-white">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors p-1"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm text-white">
                Claim Your Public Streak Profile URL
              </h3>
              <Badge variant="flame" size="sm" className="rounded-md">
                Anonymous Mode
              </Badge>
            </div>
            <p className="text-xs text-slate-300 font-medium max-w-xl">
              Sign in with Google to lock in your streak history and activate your shareable <code className="text-amber-300 font-mono">/u/yourname</code> resume link.
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <Button
            variant="google"
            size="sm"
            onClick={handleLink}
            disabled={isLinking}
            className="text-xs py-2 px-4 shadow-md text-slate-100 border-slate-700"
          >
            <LogIn className="h-3.5 w-3.5 text-amber-400" />
            <span>{isLinking ? "Linking..." : "Sign in with Google"}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
