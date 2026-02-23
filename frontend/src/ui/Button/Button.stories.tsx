import type { Meta, StoryObj } from "@storybook/react";
import { Plus, Edit } from "lucide-react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary", "ghost", "link"],
    },
    size: {
      control: "radio",
      options: ["m", "sm"],
    },
    disabled: { control: "boolean" },
    onClick: { action: "onClick" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Create Version",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Cancel",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: <Edit size={16} />,
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "← Back to Dashboard",
    variant: "link",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus size={16} />
        Add Key
      </>
    ),
    variant: "secondary",
  },
};

export const Small: Story = {
  args: {
    children: "Publish",
    variant: "primary",
    size: "sm",
  },
};

export const Disabled: Story = {
  args: {
    children: "Creating...",
    variant: "primary",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost"><Edit size={16} /></Button>
      <Button variant="link">Link button</Button>
    </div>
  ),
};
