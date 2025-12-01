// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAnuFeQvPerDCFKcZKbTxaUG4gLz1l4o-M",
    authDomain: "coinx-invest.firebaseapp.com",
    projectId: "coinx-invest",
    storageBucket: "coinx-invest.firebasestorage.app",
    messagingSenderId: "527471985259",
    appId: "1:527471985259:web:9857ba1cc8a940157ca72e",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

// Force long-polling to avoid WebChannel transport errors
export const db = initializeFirestore(app, { experimentalForceLongPolling: true });
