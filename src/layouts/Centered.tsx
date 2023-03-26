export type LayoutProps = {
  children: any | any[];
  className?: string;
  row?: boolean;
  start?: boolean;
};

export function Centered(props: LayoutProps) {
  return (
    <div
      className={`flex items-center ${
        props.start ? "justify-start" : "justify-center"
      } ${props.row ? "flex-row" : "flex-col"} w-screen min-h-screen ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </div>
  );
}
