import type { Meta, StoryObj } from "@storybook/react";
import { handlers } from "../../../.storybook/mocks/handlers";
import { Dashboard } from "./Dashboard";

const meta: Meta<typeof Dashboard> = {
  title: "Modules/Dashboard",
  component: Dashboard,
  parameters: {
    layout: "fullscreen",
    msw: { handlers },
  },
  argTypes: {
    onCreateVersion: { action: "onCreateVersion" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCreateVersionAction: Story = {
  args: {
    onCreateVersion: () => alert("Create version clicked"),
  },
};
