# 💡 PRODUCT NOTES: ABTalks 60 Platform Implementation Writeup

## 📌 Manual Firebase Console Setup Instructions
To complete live Firebase Auth integration for project `zenzy-92b56`, ensure the following providers are toggled on in the Firebase Console:
1. Navigate to **Firebase Console → Authentication → Sign-in method**.
2. Enable **Anonymous Auth**.
3. Enable **Google Sign-In**.
4. Save configuration.

---

## 🏆 Full 3-Phase Build Summary

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
- **Challenge Day (`/day/12`)**:
  - Rich non-placeholder Day 12 brief (*Next.js Server Actions & Form Validation with Zod*) and clickable resources.
  - Interactive submission form with GitHub commit SHA & LinkedIn post URL inputs + soft domain validation.
  - State handling: Already-submitted summary view, locked-future state, missed-day late submission option.
  - Post-submit confirmation ("Day 12 Shipped 🔥") returning to `/dashboard`.

---

## 🗺️ Route Map
- `/`: Landing Page
- `/dashboard`: Student Dashboard
- `/day/12`: Day 12 Challenge & Submission Form
- `/u/student-2`: Verified Public Streak Profile
