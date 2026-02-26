export type LanguageStatus = 'active' | 'draft';

export type LanguageResponse = {
  id: string;
  code: string;
  name: string;
  flag: string | null;
  status: LanguageStatus;
  createdAt: string;
};
