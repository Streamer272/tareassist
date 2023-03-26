export type LayoutProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
  row?: boolean;
};

export function Centered(props: LayoutProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        props.row ? "flex-row" : "flex-col"
      } w-screen min-h-screen ${props.className ?? ""}`}
    >
      {props.children}
    </div>
  );
}
