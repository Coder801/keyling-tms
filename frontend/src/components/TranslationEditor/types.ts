import type { Translation, Language, Version, Page } from "@/types";

export type TranslationEditorProps = {
  translations: Translation[];
  languages: Language[];
  versions: Version[];
  onAddTranslation: () => void;
  onSave: (updatedTranslations: Translation[]) => void;
  onNavigate: (page: Page) => void;
  onCompareVersions: () => void;
};
