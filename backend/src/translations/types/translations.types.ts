export type TranslationsFilters = {
  version?: string;
  language?: string;
};

export type TranslationsResponse = {
  id: string;
  key: string;
  value: string;
  language: string;
  version: string;
  status: 'translated' | 'missing';
  lastUpdated: string;
};
