import React, { ReactNode } from "react";
import { render } from "@testing-library/react";

import ThemeProvider from "../src/components/ThemeProvider";

export function renderWithTheme(ui: ReactNode) {
  return render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    ),
  });
}
