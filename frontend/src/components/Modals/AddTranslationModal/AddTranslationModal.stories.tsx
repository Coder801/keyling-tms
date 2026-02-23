import type { Meta, StoryObj } from "@storybook/react";
import { handlers } from "../../../../.storybook/mocks/handlers";
import { languages } from "@/data/mockData";
import { AddTranslationModal } from "./AddTranslationModal";

const meta: Meta<typeof AddTranslationModal> = {
  title: "Components/Modals/AddTranslationModal",
  component: AddTranslationModal,
  parameters: {
    layout: "fullscreen",
    msw: { handlers },
  },
  argTypes: {
    onClose: { action: "onClose" },
    onAdd: { action: "onAdd" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    languages,
  },
};

export const SingleLanguage: Story = {
  args: {
    isOpen: true,
    languages: [{ code: "EN", name: "English", flag: "🇬🇧" }],
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    languages,
  },
};
