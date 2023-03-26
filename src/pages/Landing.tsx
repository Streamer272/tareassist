import { Centered } from "../layouts/Centered";
import { Guarded } from "../layouts/Guarded";

export function Landing() {
  return (
    <Guarded>
      <Centered>
        <h1>Landing</h1>
      </Centered>
    </Guarded>
  );
}
