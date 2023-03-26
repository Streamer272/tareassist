import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { useState } from "react";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBCdtYqw8Rg4_kDiFqCZ5_lJ73LI2pluQY",
  authDomain: "tareassist.firebaseapp.com",
  projectId: "tareassist",
  storageBucket: "tareassist.appspot.com",
  messagingSenderId: "120287266227",
  appId: "1:120287266227:web:e560b2bf9c5b3fba89b7c6",
};

export function useFirebase() {
  const app = initializeApp(FIREBASE_CONFIG);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  const schoolsCollection = collection(db, "schools");
  const classesCollection = collection(db, "classes");
  const homeworkCollection = collection(db, "homework");
  const submissionsCollection = collection(db, "submissions");

  return {
    app,
    db,
    auth,
    storage,
    schoolsCollection,
    classesCollection,
    homeworkCollection,
    submissionsCollection,
  };
}

export function useUser() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const { auth } = useFirebase();

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return user;
}
