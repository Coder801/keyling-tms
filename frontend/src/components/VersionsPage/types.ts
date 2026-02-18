import type { Version, Page } from "@/types";

export type VersionsPageProps = {
  versions: Version[];
  onEdit: (versionId: string) => void;
  onDuplicate: (versionId: string) => void;
  onPublish: (versionId: string) => void;
  onNavigate: (page: Page) => void;
};
