export type LayoutProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

export function Centered(props: LayoutProps) {
  return (
    <div
      className={`flex items-center justify-center flex-col w-screen min-h-screen ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </div>
  );
}
