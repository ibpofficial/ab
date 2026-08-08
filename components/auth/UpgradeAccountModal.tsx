import React from "react";
import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, LogIn, ArrowRight } from "lucide-react";

export function UpgradeAccountModal() {
  const { isAnonymous, linkAnonymousToGoogle } = useAuth();

  if (!isAnonymous) return null;

  return (
    <Card className="p-4 bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/40 streak-card-glow my-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="h-10 w-10 rounded-xl flame-gradient flex items-center justify-center text-white shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5 justify-center sm:justify-start">
              <span>Claim Your Public Streak Profile URL</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                Anonymous Mode
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Sign in with Google to lock in your streak history and activate your shareable `/u/yourname` resume link.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={linkAnonymousToGoogle}
          className="shrink-0 w-full sm:w-auto text-xs py-2 px-4 shadow-md shadow-amber-600/30"
        >
          <LogIn className="h-3.5 w-3.5" />
          <span>Sign in with Google</span>
          <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
        </Button>
      </div>
    </Card>
  );
}
