import type { Language } from "@/types";

export type TranslationEditorProps = {
  languages: Language[];
  onAddTranslation: () => void;
  onCompareVersions: () => void;
};
