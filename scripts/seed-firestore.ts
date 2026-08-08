import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { MOCK_STUDENTS, MOCK_TRACKS, MOCK_CHALLENGE_DAYS, MOCK_SUBMISSIONS } from "../lib/mock-data";

export async function seedFirestore() {
  console.log("🌱 Starting Firestore Database Seeding...");

  try {
    // 1. Seed Students
    for (const student of MOCK_STUDENTS) {
      await setDoc(doc(db, "students", student.id), student);
      console.log(`✓ Seeded student: ${student.name} (${student.id})`);
    }

    // 2. Seed Tracks
    for (const track of MOCK_TRACKS) {
      await setDoc(doc(db, "tracks", track.id), track);
      console.log(`✓ Seeded track: ${track.name} (${track.id})`);
    }

    // 3. Seed Challenge Days (First 10 for quick seed)
    for (const challengeDay of MOCK_CHALLENGE_DAYS.slice(0, 10)) {
      await setDoc(doc(db, "challengeDays", challengeDay.dayNumber.toString()), challengeDay);
    }
    console.log(`✓ Seeded ${MOCK_CHALLENGE_DAYS.length} Challenge Days`);

    // 4. Seed Submissions
    for (const submission of MOCK_SUBMISSIONS) {
      await setDoc(doc(db, "submissions", submission.id), submission);
    }
    console.log(`✓ Seeded ${MOCK_SUBMISSIONS.length} Submissions`);

    console.log("🎉 Firestore Seeding Complete!");
  } catch (error) {
    console.error("❌ Error seeding Firestore:", error);
  }
}

// Execute if run directly
if (typeof window === "undefined" && require.main === module) {
  seedFirestore();
}
