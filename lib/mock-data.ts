export interface Student {
  id: string;
  name: string;
  avatarUrl?: string;
  track?: string;
  headline?: string;
  bio?: string;
  cohortStartDate: string;
  currentStreak: number;
  longestStreak: number;
  completedDays: number;
  totalDays: number;
  lastSubmissionDate?: string | null;
  collegeName?: string;
  githubUsername?: string;
  linkedinProfile?: string;
  milestoneBadges?: string[];
  percentileRank?: string;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalEnrolled: number;
  tag: string;
}

export interface ChallengeDay {
  dayNumber: number;
  title: string;
  description: string;
  taskBrief: string;
  resources: { name: string; url: string }[];
  trackId: string;
}

export interface Submission {
  id: string;
  studentId: string;
  dayNumber: number;
  githubUrl: string;
  linkedinUrl: string;
  submittedAt: string;
  status: "on-time" | "late" | "missed";
  notes?: string;
  featured?: boolean;
}

export const MOCK_TRACK_STACKS: Record<string, string[]> = {
  "web-dev": ["Next.js 14", "TypeScript", "Tailwind CSS", "React", "Node.js", "Firebase"],
  "dsa-cpp": ["C++", "Java", "Python", "Data Structures", "Algorithms", "Graph Theory"],
  "ml-ai": ["Python", "PyTorch", "Scikit-Learn", "TensorFlow", "OpenCV", "LLMs"],
  "mobile-dev": ["React Native", "Expo", "Flutter", "TypeScript", "Mobile UI", "Firebase"],
};

export const MOCK_MILESTONES = [
  { id: "7-day", title: "7-Day Pioneer", days: 7, icon: "Flame", description: "Maintained a 7-day continuous commit streak" },
  { id: "14-day", title: "14-Day Builder", days: 14, icon: "Award", description: "Built in public for 2 full consecutive weeks" },
  { id: "30-day", title: "30-Day Master", days: 30, icon: "Zap", description: "Halfway through the 60-day challenge journey" },
  { id: "60-day", title: "60-Day Legend", days: 60, icon: "Crown", description: "Completed the full 60-day public streak challenge" },
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: "student-1",
    name: "Aarav Sharma",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    track: "web-dev",
    headline: undefined, // Empty headline -> tests track default fallback
    bio: undefined,      // Empty bio -> tests graceful placeholder state
    cohortStartDate: "2026-08-08",
    currentStreak: 0,
    longestStreak: 0,
    completedDays: 0,
    totalDays: 60,
    lastSubmissionDate: null,
    collegeName: "IIT Delhi",
    githubUsername: "aarav-codes",
    linkedinProfile: "aarav-sharma-dev",
    milestoneBadges: [],
    percentileRank: "Top 5% Cohort Starter",
  },
  {
    id: "student-2",
    name: "Priya Patel",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    track: "web-dev",
    headline: "Full-Stack Web Dev & Open Source Builder",
    bio: "Building daily web applications, exploring Next.js App Router, TypeScript, and Firebase. Currently in final year at BITS Pilani.",
    cohortStartDate: "2026-07-16",
    currentStreak: 7,
    longestStreak: 15,
    completedDays: 23,
    totalDays: 60,
    lastSubmissionDate: "2026-08-07",
    collegeName: "BITS Pilani",
    githubUsername: "priyapatel-tech",
    linkedinProfile: "priyapatel-builds",
    milestoneBadges: ["7-day", "14-day"],
    percentileRank: "Top 12% Active Builders",
  },
  {
    id: "student-3",
    name: "Rohan Verma",
    avatarUrl: "", // Empty avatar edge case -> tests initials fallback ("RV")
    track: "",     // No track selected edge case -> tests "Choose a Track" prompt badge
    headline: undefined,
    bio: undefined,
    cohortStartDate: "2026-08-08",
    currentStreak: 0,
    longestStreak: 0,
    completedDays: 0,
    totalDays: 60,
    lastSubmissionDate: null,
    collegeName: "VIT Vellore",
    githubUsername: "rohanverma",
    milestoneBadges: [],
    percentileRank: "New Builder",
  },
];

export const MOCK_TRACKS: Track[] = [
  {
    id: "web-dev",
    name: "Full-Stack Web Dev",
    description: "Build modern, responsive full-stack apps with Next.js 14, Node.js, TypeScript & Tailwind CSS.",
    icon: "Globe",
    totalEnrolled: 1240,
    tag: "Most Popular",
  },
  {
    id: "dsa-cpp",
    name: "DSA & Core Algorithms",
    description: "Master 60 essential coding patterns in C++ & Java designed for top Tier-1 product tech interviews.",
    icon: "Code2",
    totalEnrolled: 890,
    tag: "High Impact",
  },
  {
    id: "ml-ai",
    name: "Machine Learning & AI",
    description: "From Python fundamentals to fine-tuning LLMs, building AI agents, and deploying RAG pipelines.",
    icon: "Cpu",
    totalEnrolled: 430,
    tag: "Trending",
  },
  {
    id: "mobile-dev",
    name: "Cross-Platform Mobile Dev",
    description: "Build native iOS & Android applications using React Native, Expo, and Firebase backends.",
    icon: "Smartphone",
    totalEnrolled: 280,
    tag: "Hands-on",
  },
];

export const MOCK_CHALLENGE_DAYS: ChallengeDay[] = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  if (day === 12) {
    return {
      dayNumber: 12,
      title: "Day 12: Next.js Server Actions & Form Validation with Zod",
      description: "Master server-side form mutations, type-safe validation schemas, and optimistic UI updates for production web applications.",
      taskBrief: "Build a production-ready submission form using Next.js Server Actions and Zod validation. Create a schema validating URL formats for GitHub repositories and LinkedIn posts, implement pending state loading indicators, and update the UI optimistically before database confirmation.",
      resources: [
        { name: "Next.js Server Actions Guide", url: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations" },
        { name: "Zod Schema Validation Docs", url: "https://zod.dev" },
        { name: "GitHub Commit SHA Standard", url: "https://docs.github.com/en/get-started/using-git/about-git-revisions" },
      ],
      trackId: "web-dev",
    };
  }

  const titles: Record<number, string> = {
    1: "Build & Deploy Portfolio Shell",
    2: "State Management & React Hooks",
    3: "REST API Endpoints with Node & Express",
    4: "Database Modeling with Prisma & PostgreSQL",
    5: "Authentication & JWT Tokens",
    6: "Tailwind Component Design Tokens",
    7: "7-Day Sprint Review & Live Deployment",
    8: "Server-Side Rendering & App Router",
    9: "Zustand & Global Store Optimization",
    10: "Form Validation with Zod & React Hook Form",
    16: "Mid-Sprint Architecture Polish",
    22: "Zustand Global Store & LocalStorage Persistence",
    23: "React Query Data Fetching & Cache Invalidation",
    24: "Firebase Firestore Seeding & Dynamic Routes",
  };

  return {
    dayNumber: day,
    title: titles[day] || `Day ${day}: Challenge Task Brief`,
    description: `Day ${day} challenge of your 60-day streak. Focus on shipping clean code and proving your work publicly.`,
    taskBrief: `Implement Day ${day} challenge requirements: write modular code, test edge cases, push to GitHub, and post proof link on LinkedIn with #ABTalks60.`,
    resources: [
      { name: "Next.js App Router Guide", url: "https://nextjs.org/docs" },
      { name: "GitHub Commit Standard", url: "https://github.com" },
    ],
    trackId: "web-dev",
  };
});

// Submissions history for Student 2 (Priya Patel, Day 24)
export const MOCK_SUBMISSIONS: Submission[] = [
  // Days 1 to 15: completed on time
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `sub-2-${i + 1}`,
    studentId: "student-2",
    dayNumber: i + 1,
    githubUrl: `https://github.com/priyapatel-tech/abtalks-60/commit/c7a${i}89f`,
    linkedinUrl: `https://linkedin.com/posts/priyapatel-builds_abtalks60-day${i + 1}`,
    submittedAt: `2026-07-${16 + i}T22:30:00Z`,
    status: "on-time" as const,
    featured: (i + 1) === 12, // Day 12 featured
  })),
  // Day 16: MISSED day (1 rest/missed day in history)
  {
    id: "sub-2-16",
    studentId: "student-2",
    dayNumber: 16,
    githubUrl: "",
    linkedinUrl: "",
    submittedAt: "",
    status: "missed" as const,
    notes: "Missed submission due to college mid-semester exams",
    featured: false,
  },
  // Days 17 to 23: completed on time (rebuilt 7-day streak)
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `sub-2-${i + 17}`,
    studentId: "student-2",
    dayNumber: i + 17,
    githubUrl: `https://github.com/priyapatel-tech/abtalks-60/commit/e9b${i}12a`,
    linkedinUrl: `https://linkedin.com/posts/priyapatel-builds_abtalks60-day${i + 17}`,
    submittedAt: `2026-08-0${i + 1}T23:15:00Z`,
    status: "on-time" as const,
    featured: (i + 17) === 22 || (i + 17) === 23, // Days 22 and 23 featured
  })),
];
