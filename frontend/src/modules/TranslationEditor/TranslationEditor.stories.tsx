import type { Meta, StoryObj } from "@storybook/react";
import { handlers } from "../../../.storybook/mocks/handlers";
import { languages } from "@/data/mockData";
import { TranslationEditor } from "./TranslationEditor";

const meta: Meta<typeof TranslationEditor> = {
  title: "Modules/TranslationEditor",
  component: TranslationEditor,
  parameters: {
    layout: "fullscreen",
    msw: { handlers },
  },
  argTypes: {
    onAddTranslation: { action: "onAddTranslation" },
    onCompareVersions: { action: "onCompareVersions" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    languages,
  },
};

export const SingleLanguage: Story = {
  args: {
    languages: [{ code: "EN", name: "English", flag: "🇬🇧" }],
  },
};
