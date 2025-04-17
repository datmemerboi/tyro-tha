import { Badge } from "@mantine/core";
import { ReactElement } from "react";

interface StatusBadgeProps {
  type: "status" | "species" | "gender";
  color?: string;
  children: string | ReactElement;
}

const BADGE_COLORS_BASED_ON_TYPE = {
  status: "portalGreen",
  species: "toxicPurple",
  gender: "lime",
};

export default function StatusBadge({
  type,
  color,
  children,
}: StatusBadgeProps) {
  if (type !== "gender" && type !== "species" && type !== "status") {
    return (
      <Badge color={"gray"} size="xl">
        {children}
      </Badge>
    );
  }

  const computedColor: string = color
    ? color
    : BADGE_COLORS_BASED_ON_TYPE[type];

  return (
    <Badge color={computedColor} size="xl">
      {children}
    </Badge>
  );
}
