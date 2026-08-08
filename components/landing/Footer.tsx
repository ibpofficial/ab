import React from "react";
import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-12 pb-8 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Final CTA Banner */}
        <div className="mb-12 p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-orange-50 via-white to-amber-50 border border-orange-200 text-center relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Ready to start your 60-day streak?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Join thousands of Indian college tech students shipping real projects daily.
            </p>
            <div className="pt-2">
              <Link href="/dashboard">
                <Button size="lg" variant="primary" className="py-3.5 px-8 shadow-md shadow-orange-600/20">
                  <Flame className="h-5 w-5 fill-white" />
                  <span>Start your streak now</span>
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Minimal Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg flame-gradient flex items-center justify-center text-white shadow-xs">
              <Flame className="h-3.5 w-3.5 fill-white" />
            </div>
            <span className="font-bold text-slate-900">ABTalks 60</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium">60 days. One streak. No shortcuts.</span>
          </div>

          <div className="text-slate-500 font-medium">
            © {new Date().getFullYear()} ABTalks Challenge Platform.
          </div>
        </div>
      </div>
    </footer>
  );
}
