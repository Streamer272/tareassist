import { ChildrenProps } from "../App";

export function Centered(props: ChildrenProps) {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen">
      {props.children}
    </div>
  );
}
