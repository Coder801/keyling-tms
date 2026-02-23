import type { Meta, StoryObj } from "@storybook/react";
import { handlers } from "../../../../.storybook/mocks/handlers";
import { CreateVersionModal } from "./CreateVersionModal";

const meta: Meta<typeof CreateVersionModal> = {
  title: "Components/Modals/CreateVersionModal",
  component: CreateVersionModal,
  parameters: {
    layout: "fullscreen",
    msw: { handlers },
  },
  argTypes: {
    onClose: { action: "onClose" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
