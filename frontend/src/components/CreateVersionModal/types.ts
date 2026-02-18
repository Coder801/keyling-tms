import type { Version } from "@/types";

export type CreateVersionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, baseVersion?: string) => void;
  versions: Version[];
};
