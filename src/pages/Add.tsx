import { Centered } from "../layouts/Centered";
import { Guarded } from "../layouts/Guarded";

export function Landing() {
  return (
    <Guarded>
      <Centered className="bg-background" start>
      <div className="flex items-center justify-start flex-col w-fit h-full">
        <div className="h-20 flex-shrink-0" />
        <div className="flex items-center justify-center w-full rounded-3xl bg-half mx-4">
          <img src="/images/intro-light.png" alt="Introduction" />
        </div>
        <div className="h-12 flex-shrink-0" />
        <div className="flex items-center justify-center flex-col bg-white rounded-3xl w-full h-fit py-8 bg-surface">
          <p className="text-3xl font-bold">Getting Set Up</p>
          <div className="h-6 flex-shrink-0" />
        </div>
        <div>
          
        </div>
      </div>
      </Centered>
    </Guarded>
  );
}
