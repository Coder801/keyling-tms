export type VersionResponse = {
  id: string;
  name: string;
  status: 'draft' | 'published';
  createdDate: string;
};
