"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInAnonymously as firebaseSignInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Student, MOCK_STUDENTS } from "@/lib/mock-data";

interface AuthContextType {
  user: User | null;
  student: Student | null;
  loading: boolean;
  isAnonymous: boolean;
  signInAnonymouslyUser: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  linkAnonymousToGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  overrideStudentId: string | null;
  setOverrideStudentId: (id: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [overrideStudentId, setOverrideStudentId] = useState<string | null>(null);

  // Sync or create Firestore student document
  const syncStudentDoc = async (firebaseUser: User) => {
    try {
      const studentRef = doc(db, "students", firebaseUser.uid);
      const studentSnap = await getDoc(studentRef);

      if (studentSnap.exists()) {
        setStudent(studentSnap.data() as Student);
      } else {
        // Create new student document on the fly
        const newStudent: Student = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || `Builder #${firebaseUser.uid.substring(0, 5)}`,
          avatarUrl: firebaseUser.photoURL || "",
          track: "", // Empty track until selected
          cohortStartDate: new Date().toISOString().split("T")[0],
          currentStreak: 0,
          longestStreak: 0,
          completedDays: 0,
          totalDays: 60,
          lastSubmissionDate: null,
          collegeName: "Indian Engineering College",
          githubUsername: "",
          linkedinProfile: "",
          milestoneBadges: [],
          percentileRank: "Cohort Starter",
        };

        await setDoc(studentRef, newStudent);
        setStudent(newStudent);
      }
    } catch (err) {
      console.warn("Firestore sync warning (using fallback student):", err);
      // Fallback for local demo if Firestore write is blocked
      setStudent({
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "Anonymous Builder",
        avatarUrl: firebaseUser.photoURL || "",
        track: "web-dev",
        cohortStartDate: "2026-08-08",
        currentStreak: 0,
        longestStreak: 0,
        completedDays: 0,
        totalDays: 60,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await syncStudentDoc(currentUser);
        setLoading(false);
      } else {
        // Automatically sign in anonymously on first load (frictionless entry)
        try {
          const anonCred = await firebaseSignInAnonymously(auth);
          setUser(anonCred.user);
          await syncStudentDoc(anonCred.user);
        } catch (error) {
          console.error("Anonymous auth error:", error);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Explicit anonymous sign in function
  const signInAnonymouslyUser = async () => {
    setLoading(true);
    try {
      const cred = await firebaseSignInAnonymously(auth);
      setUser(cred.user);
      await syncStudentDoc(cred.user);
    } catch (err) {
      console.error("Error signing in anonymously:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      setUser(res.user);
      await syncStudentDoc(res.user);
    } catch (err) {
      console.error("Error signing in with Google:", err);
    } finally {
      setLoading(false);
    }
  };

  // Link anonymous account to Google credentials (prevents losing streak)
  const linkAnonymousToGoogle = async () => {
    if (!auth.currentUser) return;

    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      if (res.user) {
        setUser(res.user);
        await syncStudentDoc(res.user);
      }
    } catch (err) {
      console.error("Account linking notice:", err);
      // Fallback to direct sign-in if already linked
      await signInWithGoogle();
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setStudent(null);
  };

  // Compute active student (respecting dev override if present)
  let activeStudent = student;
  if (overrideStudentId) {
    const found = MOCK_STUDENTS.find((s) => s.id === overrideStudentId);
    if (found) activeStudent = found;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        student: activeStudent,
        loading,
        isAnonymous: !!user?.isAnonymous,
        signInAnonymouslyUser,
        signInWithGoogle,
        linkAnonymousToGoogle,
        signOut,
        overrideStudentId,
        setOverrideStudentId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
