import { ReactNode } from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const rickAndMortyTheme = createTheme({
  primaryColor: "lime",

  colors: {
    lime: [
      "#f2ffe6",
      "#e1ffb3",
      "#ccff80",
      "#b6ff4d",
      "#a0ff1a",
      "#87e600",
      "#66b300",
      "#4d8000",
      "#334d00",
      "#1a2600",
    ],
    portalGreen: [
      "#e0ffe5",
      "#b3ffcc",
      "#80ffb3",
      "#4dff99",
      "#1aff80",
      "#00e673",
      "#00b35a",
      "#008040",
      "#004d26",
      "#00260d",
    ],
    toxicPurple: [
      "#f0e6ff",
      "#d9b3ff",
      "#c080ff",
      "#a64dff",
      "#8c1aff",
      "#7300e6",
      "#5900b3",
      "#400080",
      "#26004d",
      "#130026",
    ],
    gearGray: [
      "#f2f2f2",
      "#d9d9d9",
      "#bfbfbf",
      "#a6a6a6",
      "#8c8c8c",
      "#737373",
      "#595959",
      "#404040",
      "#262626",
      "#0d0d0d",
    ],
  },

  defaultRadius: "md",

  fontFamily: "Inter, Roboto, sans-serif",

  headings: {
    fontFamily: "Orbitron, Inter, sans-serif",
    sizes: {
      h1: { fontSize: "2.8rem" },
      h2: { fontSize: "2.4rem" },
      h3: { fontSize: "2rem" },
    },
  },
  components: {
    Button: {
      styles: () => ({
        root: {
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        },
      }),
    },
    Badge: {
      styles: () => ({
        root: {
          textTransform: "uppercase",
          fontSize: "0.75rem",
          fontWeight: "bold",
        },
      }),
    },
  },
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={rickAndMortyTheme} forceColorScheme="dark">
      {children}
    </MantineProvider>
  );
}
