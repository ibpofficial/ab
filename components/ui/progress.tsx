import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
}

export function ProgressBar({
  value,
  max = 60,
  className,
  barClassName,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={twMerge(
        "w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner",
        className
      )}
    >
      <div
        className={twMerge(
          "h-full flame-gradient transition-all duration-500 rounded-full shadow-xs",
          barClassName
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
