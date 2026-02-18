import type { Page } from "@/types";

export type DashboardProps = {
  onCreateVersion: () => void;
  onNavigate: (page: Page) => void;
};
