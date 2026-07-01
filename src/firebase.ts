import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
};

function decodeFirebaseConfigFromBase64(encoded: string): FirebaseConfig {
  if (!encoded) {
    throw new Error("VITE_FIREBASE_CONFIG_BASE64 is missing.");
  }

  try {
    const normalized = encoded.replace(/\s+/g, "");
    const decoded = window.atob(normalized);
    return JSON.parse(decoded) as FirebaseConfig;
  } catch (error) {
    throw new Error("Unable to decode VITE_FIREBASE_CONFIG_BASE64.");
  }
}

const firebaseConfig = decodeFirebaseConfigFromBase64(import.meta.env.VITE_FIREBASE_CONFIG_BASE64 || "");

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider, signInWithPopup, signOut };
