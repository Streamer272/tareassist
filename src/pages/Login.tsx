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
    if (user) navigate("/");
  }, [user]);

  function logIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <Centered>
      <div className="fixed top-0 left-0 w-screen h-screen z-0 bg-sandwich bg-cover bg-no-repeat bg-center blur-md" />

      <div className="flex items-center justify-center flex-col h-full flex-grow z-10">
        <div className="flex items-center justify-center w-full rounded-3xl bg-bg-half py-2 px-8">
          <img src="/images/intro.png" alt="Introduction" />
        </div>
        <div className="h-8 flex-shrink-0" />
        <div className="flex items-center justify-center flex-col bg-white rounded-3xl w-[35rem] h-[12rem]">
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
      <div className="h-full flex-grow" />
    </Centered>
  );
}
