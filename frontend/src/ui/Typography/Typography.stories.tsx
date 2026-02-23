import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "UI/Typography",
  component: Typography,
  argTypes: {
    tag: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
    },
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
    },
    size: {
      control: "radio",
      options: ["xs", "s", "m", "l"],
    },
    weight: {
      control: "radio",
      options: ["lighter", "normal", "bold"],
    },
    uppercase: { control: "boolean" },
    onClick: { action: "onClick" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Paragraph: Story = {
  args: {
    children: "Paragraph text example",
    tag: "p",
    variant: "primary",
    size: "m",
    weight: "normal",
  },
};

export const Heading1: Story = {
  args: {
    children: "Heading 1",
    tag: "h1",
    variant: "primary",
    weight: "bold",
  },
};

export const Heading2: Story = {
  args: {
    children: "Heading 2",
    tag: "h2",
    variant: "primary",
    weight: "bold",
  },
};

export const Heading3: Story = {
  args: {
    children: "Heading 3",
    tag: "h3",
    variant: "primary",
    weight: "normal",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary text — subdued color for captions",
    tag: "p",
    variant: "secondary",
    size: "s",
  },
};

export const Uppercase: Story = {
  args: {
    children: "uppercase label",
    tag: "p",
    uppercase: true,
    size: "xs",
    weight: "bold",
  },
};

export const Clickable: Story = {
  args: {
    children: "Clickable typography",
    tag: "p",
    variant: "primary",
    size: "m",
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
};
