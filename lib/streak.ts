import { Submission } from "@/lib/mock-data";

export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  completedDays: number;
}

/**
 * Pure function to derive streak statistics from actual submission records.
 * - completedDays: total count of completed submissions (on-time + late)
 * - longestStreak: longest consecutive sequence of on-time submissions
 * - currentStreak: consecutive on-time submissions up to the most recent submission
 */
export function computeStreakStats(submissions: Submission[]): StreakStats {
  if (!submissions || submissions.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      completedDays: 0,
    };
  }

  // Filter valid completed submissions
  const validSubmissions = submissions.filter(
    (s) => s.status === "on-time" || s.status === "late"
  );
  const completedDays = validSubmissions.length;

  // Get sorted unique completed day numbers for on-time submissions
  const onTimeDays = Array.from(
    new Set(
      submissions
        .filter((s) => s.status === "on-time")
        .map((s) => s.dayNumber)
    )
  ).sort((a, b) => a - b);

  if (onTimeDays.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      completedDays,
    };
  }

  // Calculate longest streak
  let longestStreak = 0;
  let currentRun = 0;
  let prevDay: number | null = null;

  for (const day of onTimeDays) {
    if (prevDay === null || day === prevDay + 1) {
      currentRun += 1;
    } else {
      currentRun = 1;
    }
    if (currentRun > longestStreak) {
      longestStreak = currentRun;
    }
    prevDay = day;
  }

  // Calculate current active streak (consecutive on-time days up to max submitted day)
  let currentStreak = 0;
  const maxSubmittedDay = Math.max(...onTimeDays);

  let checkDay = maxSubmittedDay;
  while (onTimeDays.includes(checkDay)) {
    currentStreak += 1;
    checkDay -= 1;
  }

  return {
    currentStreak,
    longestStreak,
    completedDays,
  };
}
