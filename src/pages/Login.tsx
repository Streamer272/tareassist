import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Centered } from "../layouts/Centered";
import { useFirebase, useUser } from "../hooks/useFirebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
  const { auth } = useFirebase();
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // PROD
    // if (user) navigate("/");
  }, [user]);

  function logIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <Centered className="bg-background" start>
      <div className="flex items-center justify-start flex-col w-fit h-full">
        <div className="h-20 flex-shrink-0" />
        <div className="flex items-center justify-center w-full rounded-3xl bg-half mx-4">
          <img src="/images/intro-light.png" alt="Introduction" />
        </div>
        <div className="h-12 flex-shrink-0" />
        <div className="flex items-center justify-center flex-col bg-white rounded-3xl w-full h-fit py-8 bg-surface">
          <p className="text-3xl font-bold">Log in</p>
          <div className="h-6 flex-shrink-0" />
          <button
            onClick={logIn}
            className="flex items-center justify-center border-4 border-black border-solid rounded-full py-2 px-3"
          >
            <img src="/images/google.png" alt="Google" className="w-8 h-8" />
            <div className="w-2 flex-shrink-0" />
            Log in with Google
          </button>
        </div>
      </div>
    </Centered>
  );
}
