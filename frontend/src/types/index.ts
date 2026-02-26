export type TranslationStatus = "translated" | "missing";
export type VersionStatus = "draft" | "published";

export type Translation = {
  id: string;
  key: string;
  value: string;
  lastUpdated: string;
  status: TranslationStatus;
  language: string;
  version: string;
};

export type Version = {
  id: string;
  name: string;
  status: VersionStatus;
  createdDate: string;
};

export type LanguageStatus = "active" | "draft";

export type Language = {
  id: string;
  code: string;
  name: string;
  flag: string | null;
  status: LanguageStatus;
  createdAt: string;
};
