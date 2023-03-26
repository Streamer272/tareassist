type Props = {
  children: JSX.Element | JSX.Element[];
};

export function App(props: Props) {
  return <div>{props.children}</div>;
}
