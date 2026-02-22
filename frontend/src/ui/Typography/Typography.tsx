import clsx from "clsx";
import { compact, join } from "lodash";

import styles from "./styles.module.scss";
import { TypographyProps } from "./types";

export const Typography = ({
  variant = "primary",
  tag = "p",
  size = "m",
  weight = "normal",
  className,
  children,
  onClick,
  uppercase,
}: TypographyProps) => {
  const combineClassName = (...strings: string[]) =>
    join(compact(strings), "-");
  const Component = tag;
  const current =
    tag === "p"
      ? styles[combineClassName("paragraph", variant, size, weight)]
      : styles[combineClassName("header", tag, variant, weight)];

  return (
    <Component
      className={clsx(current, className)}
      style={{
        textTransform: uppercase ? "uppercase" : undefined,
      }}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};
