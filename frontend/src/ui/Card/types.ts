import type { ReactNode } from "react";

export type CardProps = {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  overflowHidden?: boolean;
};
