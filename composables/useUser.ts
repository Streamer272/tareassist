import { User, onAuthStateChanged } from "firebase/auth";

export function useUser() {
  const user = useState<User | null | undefined>("user", () => undefined);

  onMounted(() => {
    onAuthStateChanged(useFirebaseAuth(), (user_) => {
      user.value = user_;
    });
  });

  return user;
}
