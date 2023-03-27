import { initializeApp } from "firebase/app";
import { getFirestore, collection, Firestore } from "firebase/firestore";
import { Auth, User, getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBCdtYqw8Rg4_kDiFqCZ5_lJ73LI2pluQY",
  authDomain: "tareassist.firebaseapp.com",
  projectId: "tareassist",
  storageBucket: "tareassist.appspot.com",
  messagingSenderId: "120287266227",
  appId: "1:120287266227:web:e560b2bf9c5b3fba89b7c6",
};

export function useFirebaseApp() {
  return initializeApp(FIREBASE_CONFIG);
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

export function useUser() {
  const user = useState<User | null | undefined>("user", () => undefined);

  onMounted(() => {
    onAuthStateChanged(useFirebaseAuth(), (user_) => {
      user.value = user_;
    });
  });

  return user;
}
