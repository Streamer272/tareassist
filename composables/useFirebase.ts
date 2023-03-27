import { getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBCdtYqw8Rg4_kDiFqCZ5_lJ73LI2pluQY",
  authDomain: "tareassist.firebaseapp.com",
  projectId: "tareassist",
  storageBucket: "tareassist.appspot.com",
  messagingSenderId: "120287266227",
  appId: "1:120287266227:web:e560b2bf9c5b3fba89b7c6",
};

export function useInitFirebase() {
  return initializeApp(FIREBASE_CONFIG);
}

export function useFirebaseApp() {
  return getApp();
}

export function useFirebaseAuth() {
  return getAuth();
}

export function useFirebaseStorage() {
  return getStorage();
}

export function useFirebaseDb() {
  return getFirestore();
}
