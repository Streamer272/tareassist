import { Link } from "react-router-dom";
import { Centered } from "../layouts/Centered";
import { Guarded } from "../layouts/Guarded";
import { useFirebase } from "../hooks/useFirebase";
import { signOut } from "firebase/auth";
import { useClasses } from "../hooks/useClasses";
import { useEffect } from "react";

export function Home() {
  const { auth } = useFirebase();
  const { classes, loadClasses } = useClasses();

  function logOut() {
    signOut(auth);
  }

  useEffect(() => {
    loadClasses();
  }, []);

  return (
    <Guarded>
      <Centered row>
        <div className="flex items-center justify-center flex-col w-[20vw] h-screen bg-background">
          <img
            src="/images/intro-light.png"
            alt="Introduction"
            className="w-[90%] h-fit flex-shrink-0"
          />
          <div className="h-4 flex-shrink-0" />
          <div className="flex items-start justify-start flex-col flex-grow w-full gap-y-2">
            <p className="font-bold text-3xl text-on-background ml-4">
              Classes
            </p>
            <div className="h-px flex-shrink-0" />
            {classes.map((class_) => (
              <button
                key={class_.id}
                className="flex items-center justify-center w-fit ml-6"
              >
                <p className="flex items-center justify-center text-3xl rounded-full bg-surface w-12 h-12">
                  {class_.name[0]}
                </p>
                <div className="w-3 flex-shrink-0" />
                <p className="text-on-background text-xl">{class_.name}</p>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center flex-shrink-0 w-full h-fit">
            <div className="w-4 flex-shrink-0" />
            <Link
              to="/"
              className="p-2 flex-shrink-0 rounded-full bg-surface-variant"
            >
              <span className="material-symbols-outlined flex items-center justify-center text-4xl w-10 h-10">
                add
              </span>
            </Link>
            <div className="flex-grow" />

            <button
              onClick={logOut}
              className="flex items-center justify-center py-2 px-3 h-full flex-shrink-0 rounded-full bg-surface-variant"
            >
              <span className="material-symbols-outlined text-3xl">logout</span>
              <div className="w-2 flex-shrink-0" />
              <p className="text-xl">Log out</p>
            </button>
            <div className="w-4 flex-shrink-0" />
          </div>
          <div className="h-4 flex-shrink-0" />
        </div>
        <div className="w-full h-screen bg-surface">
          <p>hello world!</p>
        </div>
      </Centered>
    </Guarded>
  );
}
