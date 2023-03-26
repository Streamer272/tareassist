import { MantineProvider } from "@mantine/core";

export type ChildrenProps = {
  children: JSX.Element | JSX.Element[];
};

export function App(props: ChildrenProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ fontFamily: "DM Sans" }}
    >
      {props.children}
    </MantineProvider>
  );
}
