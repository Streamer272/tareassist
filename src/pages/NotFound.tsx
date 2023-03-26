import { Link } from "react-router-dom";
import { Centered } from "../layouts/Centered";

export function NotFound() {
  return (
    <Centered className="flex-row" row>
      <div className="flex items-start justify-center flex-col w-full ml-20 gap-y-1">
        <img src="/images/intro-dark.png" alt="Introduction" />
        <div className="h-16 flex-shrink-0" />
        <p className="text-6xl font-bold">404</p>
        <div className="h-4 flex-shrink-0" />
        <p className="text-3xl font-bold">Sorry, something went wrong</p>
        <p className="text-2xl font-bold">
          Please enjoy a sandwich while we figure it out, or go{" "}
          <Link to="/" className="underline">
            home
          </Link>
        </p>
        <div className="h-20 flex-shrink-0" />
      </div>
      <div className="w-full">
        <img src="/images/sandwich1.png" alt="Sandwich" />
      </div>
    </Centered>
  );
}
