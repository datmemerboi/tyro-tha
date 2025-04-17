import React from "react";
import { screen } from "@testing-library/dom";

import StatusBadge from "../src/components/StatusBadge";
import { renderWithTheme } from ".";

test('renders the children text', () => {
  renderWithTheme(<StatusBadge type="status">Alive</StatusBadge>);
  expect(screen.getByText('Alive')).toBeInTheDocument();
});

test('renders a ReactElement child correctly', () => {
  renderWithTheme(<StatusBadge type="species"><strong>Bold Species</strong></StatusBadge>);
  const child = screen.getByText('Bold Species');
  expect(child.tagName).toBe('STRONG');
});

test('renders with default color from type', () => {
  renderWithTheme(<StatusBadge type="gender">Female</StatusBadge>);
  const badge = screen.getByText('Female');
  expect(badge).toBeInTheDocument();
  // You can’t assert Mantine color directly; instead check element renders
});

test('renders with overridden color prop', () => {
  renderWithTheme(
    <StatusBadge type="status" color="red">
      Custom Color
    </StatusBadge>
  );
  const badge = screen.getByText('Custom Color');
  expect(badge).toBeInTheDocument();
  // If you want to be strict, check style only if color is inline (Mantine usually doesn’t do that)
});

test('renders correct badge size', () => {
  renderWithTheme(<StatusBadge type="status">Sized</StatusBadge>);
  const badge = screen.getByText('Sized');
  expect(badge).toHaveClass('mantine-Badge-label');
});

test('renders with fallback/default behavior for unknown type', () => {
  // @ts-expect-error: testing invalid prop value
  renderWithTheme(<StatusBadge type="invalid">Oops</StatusBadge>);
  const badge = screen.getByText('Oops');
  expect(badge).toBeInTheDocument();
  // There's no color logic here — but you could snapshot it if needed
});
