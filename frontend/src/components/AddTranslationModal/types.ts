import type { Language, Version } from "@/types";

export type AddTranslationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (key: string, language: string, value: string, version: string) => void;
  languages: Language[];
  versions: Version[];
};
