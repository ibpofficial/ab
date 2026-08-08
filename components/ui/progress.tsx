import React from "react";
import { twMerge } from "tailwind-merge";

export interface ProgressBarProps {
  value: number; // 0 - 100
  max?: number;
  showText?: boolean;
  className?: string;
  barClassName?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showText = false,
  className,
  barClassName,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full space-y-1.5">
      {showText && (
        <div className="flex justify-between text-xs text-slate-400 font-medium">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={twMerge(
          "w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/50",
          className
        )}
      >
        <div
          className={twMerge(
            "h-full flame-gradient rounded-full transition-all duration-500 ease-out shadow-sm shadow-amber-500/50",
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export interface ProgressRingProps {
  current: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({
  current,
  total,
  size = 54,
  strokeWidth = 5,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(1, Math.max(0, current / total));
  const strokeDashoffset = circumference - percentage * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(31, 41, 61, 0.8)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#flameGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4500" />
            <stop offset="50%" stopColor="#ff6b00" />
            <stop offset="100%" stopColor="#ffc700" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-[11px] font-bold text-slate-200">
        {current}/{total}
      </div>
    </div>
  );
}
