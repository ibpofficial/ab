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

export interface FeedPost {
  id: string;
  studentId: string;
  dayNumber: number;
  track: string;
  images: string[];
  caption: string;
  likes: number;
  comments: number;
  createdAt: string;
  githubUrl: string;
  linkedinUrl: string;
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
  {
    id: "student-4",
    name: "Ananya Roy",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    track: "dsa-cpp",
    headline: "C++ & Competitive Programming Competitor",
    bio: "Solving 2 algorithmic coding patterns daily. Focused on graph algorithms, segment trees, and dynamic programming.",
    cohortStartDate: "2026-07-20",
    currentStreak: 19,
    longestStreak: 19,
    completedDays: 19,
    totalDays: 60,
    lastSubmissionDate: "2026-08-07",
    collegeName: "IIT Kharagpur",
    githubUsername: "ananya-cpp",
    linkedinProfile: "ananya-roy-dsa",
    milestoneBadges: ["7-day", "14-day"],
    percentileRank: "Top 4% DSA Track",
  },
  {
    id: "student-5",
    name: "Kabir Das",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    track: "ml-ai",
    headline: "PyTorch & Computer Vision Researcher",
    bio: "Training deep neural networks, fine-tuning Vision Transformers, and shipping AI pipelines daily.",
    cohortStartDate: "2026-07-05",
    currentStreak: 34,
    longestStreak: 34,
    completedDays: 34,
    totalDays: 60,
    lastSubmissionDate: "2026-08-07",
    collegeName: "IIIT Hyderabad",
    githubUsername: "kabirdas-ai",
    linkedinProfile: "kabir-das-ml",
    milestoneBadges: ["7-day", "14-day", "30-day"],
    percentileRank: "Top 2% AI Cohort",
  },
  {
    id: "student-6",
    name: "Neha Gupta",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    track: "mobile-dev",
    headline: "React Native & Expo UI Architect",
    bio: "Building cross-platform mobile apps with fluid Gesture Handler animations and offline-first SQLite synchronization.",
    cohortStartDate: "2026-07-27",
    currentStreak: 12,
    longestStreak: 12,
    completedDays: 12,
    totalDays: 60,
    lastSubmissionDate: "2026-08-07",
    collegeName: "DTU Delhi",
    githubUsername: "nehag-mobile",
    linkedinProfile: "neha-gupta-mobile",
    milestoneBadges: ["7-day"],
    percentileRank: "Top 8% Mobile Dev",
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
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `sub-2-${i + 1}`,
    studentId: "student-2",
    dayNumber: i + 1,
    githubUrl: `https://github.com/priyapatel-tech/abtalks-60/commit/c7a${i}89f`,
    linkedinUrl: `https://linkedin.com/posts/priyapatel-builds_abtalks60-day${i + 1}`,
    submittedAt: `2026-07-${16 + i}T22:30:00Z`,
    status: "on-time" as const,
    featured: (i + 1) === 12,
  })),
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
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `sub-2-${i + 17}`,
    studentId: "student-2",
    dayNumber: i + 17,
    githubUrl: `https://github.com/priyapatel-tech/abtalks-60/commit/e9b${i}12a`,
    linkedinUrl: `https://linkedin.com/posts/priyapatel-builds_abtalks60-day${i + 17}`,
    submittedAt: `2026-08-0${i + 1}T23:15:00Z`,
    status: "on-time" as const,
    featured: (i + 17) === 22 || (i + 17) === 23,
  })),
];

// Community Social Feed Posts (MOCK_FEED_POSTS)
export const MOCK_FEED_POSTS: FeedPost[] = [
  {
    id: "post-1",
    studentId: "student-5", // Kabir (AI track)
    dayNumber: 34,
    track: "ml-ai",
    images: [
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
    ],
    caption: "Day 34: Deployed a real-time Vision Transformer pipeline using PyTorch & FastAPI! Added zero-shot object detection with 45ms inference latency.",
    likes: 86,
    comments: 18,
    createdAt: "2026-08-08T07:30:00Z",
    githubUrl: "https://github.com/kabirdas-ai/vision-transformer/commit/f89a12c",
    linkedinUrl: "https://linkedin.com/posts/kabir-das-ml_abtalks60-day34",
  },
  {
    id: "post-2",
    studentId: "student-2", // Priya (Web Dev)
    dayNumber: 23,
    track: "web-dev",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=80",
    ],
    caption: "Day 23: Implemented optimistic UI mutations with React Query and Zustand store. Network latency is hidden completely on submission form actions!",
    likes: 72,
    comments: 14,
    createdAt: "2026-08-08T06:15:00Z",
    githubUrl: "https://github.com/priyapatel-tech/abtalks-60/commit/e9b612a",
    linkedinUrl: "https://linkedin.com/posts/priyapatel-builds_abtalks60-day23",
  },
  {
    id: "post-3",
    studentId: "student-4", // Ananya (DSA track)
    dayNumber: 19,
    track: "dsa-cpp",
    images: [
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    ],
    caption: "Day 19: Solved 2 hard graph problems on Tarjan's Strongly Connected Components algorithm in C++. Time complexity O(V+E) verified with custom test cases.",
    likes: 54,
    comments: 9,
    createdAt: "2026-08-08T04:45:00Z",
    githubUrl: "https://github.com/ananya-cpp/leetcode-patterns/commit/d41a99b",
    linkedinUrl: "https://linkedin.com/posts/ananya-roy-dsa_abtalks60-day19",
  },
  {
    id: "post-4",
    studentId: "student-6", // Neha (Mobile track)
    dayNumber: 12,
    track: "mobile-dev",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
    ],
    caption: "Day 12: Built a custom swipeable task card gesture in React Native with Reanimated 3 & Gesture Handler. Smooth 60fps performance on iOS & Android!",
    likes: 49,
    comments: 11,
    createdAt: "2026-08-07T21:20:00Z",
    githubUrl: "https://github.com/nehag-mobile/rn-gestures/commit/a19f44c",
    linkedinUrl: "https://linkedin.com/posts/neha-gupta-mobile_abtalks60-day12",
  },
  {
    id: "post-5",
    studentId: "student-2", // Priya (Web Dev)
    dayNumber: 12,
    track: "web-dev",
    images: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=80",
    ],
    caption: "Day 12: Built production form validation using Next.js 14 Server Actions & Zod schema validation! Instant client feedback with server-side safety.",
    likes: 68,
    comments: 15,
    createdAt: "2026-07-27T18:00:00Z",
    githubUrl: "https://github.com/priyapatel-tech/abtalks-60/commit/c7a1289f",
    linkedinUrl: "https://linkedin.com/posts/priyapatel-builds_abtalks60-day12",
  },
  {
    id: "post-6",
    studentId: "student-5", // Kabir (AI track)
    dayNumber: 30,
    track: "ml-ai",
    images: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop&q=80",
    ],
    caption: "Day 30: Unlocked 30-Day Halfway Master Milestone! Built a RAG pipeline leveraging Qdrant vector db and LlamaIndex for document Q&A.",
    likes: 92,
    comments: 22,
    createdAt: "2026-08-03T14:10:00Z",
    githubUrl: "https://github.com/kabirdas-ai/rag-pipeline/commit/c30a881",
    linkedinUrl: "https://linkedin.com/posts/kabir-das-ml_abtalks60-day30",
  },
  {
    id: "post-7",
    studentId: "student-4", // Ananya (DSA track)
    dayNumber: 14,
    track: "dsa-cpp",
    images: [
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
    ],
    caption: "Day 14: Mastered Segment Trees with Lazy Propagation. Solved range update queries in O(log N) time with zero memory leaks.",
    likes: 38,
    comments: 5,
    createdAt: "2026-08-02T19:30:00Z",
    githubUrl: "https://github.com/ananya-cpp/leetcode-patterns/commit/b14c99e",
    linkedinUrl: "https://linkedin.com/posts/ananya-roy-dsa_abtalks60-day14",
  },
  {
    id: "post-8",
    studentId: "student-6", // Neha (Mobile track)
    dayNumber: 7,
    track: "mobile-dev",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=80",
    ],
    caption: "Day 7: First week milestone unlocked! Shipped offline SQLite synchronization for Expo app, persisting drafts when offline.",
    likes: 41,
    comments: 7,
    createdAt: "2026-08-01T16:00:00Z",
    githubUrl: "https://github.com/nehag-mobile/rn-gestures/commit/f7a112b",
    linkedinUrl: "https://linkedin.com/posts/neha-gupta-mobile_abtalks60-day7",
  },
];
