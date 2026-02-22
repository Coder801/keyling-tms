import { X } from "lucide-react";
import type { ModalProps } from "./types";
import styles from "./styles.module.scss";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "sm",
  scrollable = false,
}: ModalProps) => {
  if (!isOpen) return null;

  const containerClass = [
    styles.container,
    size === "lg" ? styles.containerLg : styles.containerSm,
    scrollable ? styles.containerScrollable : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.overlay}>
      <div className={containerClass}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
