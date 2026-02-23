import clsx from "clsx";

import styles from "./styles.module.scss";
import type { CardProps } from "./types";

export const Card = ({
  children,
  className,
  noPadding = false,
  overflowHidden = false,
}: CardProps) => {
  return (
    <div
      className={clsx(
        styles.card,
        noPadding && styles.noPadding,
        overflowHidden && styles.overflowHidden,
        className,
      )}
    >
      {children}
    </div>
  );
};
