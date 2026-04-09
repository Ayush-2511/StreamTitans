import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'fake-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'fake-auth-domain',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'fake-project-id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'fake-storage',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'fake-sender',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'fake-app-id'
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  console.warn("Firebase initialization warning:", e);
}

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;