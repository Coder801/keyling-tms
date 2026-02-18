export type TranslationStatus = "translated" | "missing";
export type Page = "dashboard" | "versions" | "editor";
export type VersionStatus = "draft" | "published";

export type Translation = {
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

export type Language = {
  code: string;
  name: string;
  flag: string;
};
