import { type ReactNode } from "react";

export type ModalSize = "sm" | "lg";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: ModalSize;
  scrollable?: boolean;
};
