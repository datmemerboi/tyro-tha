import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return <MantineProvider forceColorScheme="dark">{children}</MantineProvider>;
}
