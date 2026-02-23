import clsx from "clsx";

import styles from "./styles.module.scss";
import type { ButtonProps } from "./types";

export const Button = ({
  variant = "primary",
  size = "m",
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.base, styles[variant], styles[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
};
