import type { Translation, Version } from "@/types";

export type VersionComparisonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  translations: Translation[];
  versions: Version[];
};
