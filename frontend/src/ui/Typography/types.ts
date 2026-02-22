import type { ReactNode } from "react";

export type TypographTagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
export type TypographyVariant = "primary" | "secondary";
export type TypographySize = "s" | "m" | "l" | "xs";
export type TypographyWeight = "lighter" | "normal" | "bold";

export type TypographyProps = {
  variant?: TypographyVariant;
  children: ReactNode;
  tag?: TypographTagType;
  size?: TypographySize;
  weight?: TypographyWeight;
  className?: string;
  onClick?: () => void;
  uppercase?: boolean;
};
