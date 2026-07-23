import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

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

const encodedConfig = import.meta.env.VITE_FIREBASE_CONFIG_BASE64 || "";
const firebaseConfig = encodedConfig ? decodeFirebaseConfigFromBase64(encodedConfig) : null;
const app = firebaseConfig ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()) : null;
const auth = app ? getAuth(app) : null;
const db: Firestore | null = app ? getFirestore(app) : null;
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider, signInWithPopup, signOut };
