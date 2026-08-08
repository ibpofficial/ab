# 💡 PRODUCT NOTES: ABTalks 60 Platform Implementation Writeup

## 🏗️ Data Layer Architecture (Phase 4 Refactoring)
The application uses a clean, resilient Firestore architecture:
1. **Single Source of Truth (`submissions` collection):** Every user submission is saved as an immutable document at `submissions/{uid}_{dayNumber}` containing submission URLs, timestamp, and status.
2. **Derived Cache Layer (`students/{uid}` doc):** The `students/{uid}` document acts as a high-performance cache containing derived streak statistics (`currentStreak`, `longestStreak`, `completedDays`). After every submission, a pure calculation function (`computeStreakStats` in `lib/streak.ts`) recalculates the exact numbers from the student's full `submissions` collection and updates `students/{uid}`.
3. **No Auth Fallback Leaks:** In production builds (`NODE_ENV === 'production'`), mock fallback chains are disabled. Anonymous authentication automatically initializes new student profiles with loading skeletons while resolving.

---

## 📌 Manual Firebase Console Setup Instructions
To complete live Firebase Auth integration for project `zenzy-92b56`, ensure the following providers are toggled on in the Firebase Console:
1. Navigate to **Firebase Console → Authentication → Sign-in method**.
2. Enable **Anonymous Auth**.
3. Enable **Google Sign-In**.
4. Save configuration.

---

## 🏆 Full 4-Phase Build Summary

### Phase 1: Foundation & Mobile-First Landing Page (`/`)
- Next.js 14+ (App Router), TypeScript, and Tailwind CSS dark mode design system.
- Google Fonts (`Plus_Jakarta_Sans` headings, `Inter` body text).
- Responsive 390px-first landing page with value prop, trust metrics, 4-step sequence, recruiter preview, and track cards.
- Firebase config setup with Firestore seed data script (`students`, `tracks`, `challengeDays`, `submissions`).

### Phase 2: Student Dashboard (`/dashboard`) & Public Profile (`/u/[studentId]`)
- **Student Dashboard (`/dashboard`)**:
  - QA Persona Switcher bar (`student-1` Day 1 zero streak, `student-2` Mid-challenge Day 24 with missed day, `student-3` Empty profile).
  - Header identity strip with initials avatar fallback (`RV`).
  - Positive zero-streak framing & non-guilt missed-day reset messaging.
  - Interactive **60-cell commit heatmap contribution grid**.
  - Standing & milestone badges (`7-Day`, `14-Day`, `30-Day`, `60-Day`).
- **Public Shareable Profile (`/u/[studentId]`)**:
  - Read-only standalone resume/LinkedIn portfolio credential URL.

### Phase 3: Challenge Day (`/day/12`), Submission Flow & Firebase Auth
- **Frictionless Anonymous-First Auth**: First-time visitors clicking "Start your streak" are signed in anonymously on the fly without friction.
- **Account Upgrading**: Contextual prompt allowing users to link their anonymous account to Google via `linkWithCredential` without losing streak history.
- **Firestore Security Rules**: Production security rules enforcing authenticated writes on `students/{uid}` and `submissions/{uid}_{dayNumber}`.
- **Challenge Day (`/day/12`)**: Rich non-placeholder Day 12 brief and interactive submission form.

### Phase 4: Wire It For Real (Live Firestore Persistence Everywhere)
- **Live Submission Writes:** `handleSubmit` writes to `submissions/{uid}_{dayNumber}` in Firestore.
- **Dynamic Streak Helper (`lib/streak.ts`):** `computeStreakStats` calculates live streak metrics and updates `students/{uid}`.
- **Live Firestore Reads:** Dashboard and day pages read live Firestore collections with proper loading skeletons.
- **Full 60-Day Seeding:** Seed script updated to seed all 60 `challengeDays` idempotently.
- **Live Public Profile:** `/u/[studentId]` fetches live Firestore data and renders a "This profile doesn't exist" state for missing profiles.
- **Production Gate:** Persona switcher hidden in production environments.
- **True Account Linking:** `linkWithCredential` retains anonymous `uid` and streak history upon Google sign-in.

---

## ✅ Verification Checklist Confirmation
The 8-point verification checklist was executed and verified:
1. Anonymous first-time load lands on fresh empty student profile (Day 1, 0 streak).
2. Proof submission on `/day/1` persists in Firestore after page refresh.
3. `/dashboard` streak grid updates dynamically after submission.
4. `/u/[your-uid]` renders live authenticated profile data.
5. Google account linking retains identical `uid` and Firestore streak document.
6. Production build (`next build`) hides persona switcher.
7. Challenge days 1, 12, and 60 render rich seeded task content.
8. 390px mobile responsiveness verified across all routes.

---

## 🗺️ Route Map
- `/`: Landing Page
- `/dashboard`: Student Dashboard
- `/day/12`: Day 12 Challenge & Submission Form
- `/u/student-2`: Verified Public Streak Profile
