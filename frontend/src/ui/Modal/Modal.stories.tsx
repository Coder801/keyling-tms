import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "lg"] },
    isOpen: { control: "boolean" },
    scrollable: { control: "boolean" },
    onClose: { action: "onClose" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Example Modal",
    children: <p style={{ padding: "1rem" }}>Modal content goes here.</p>,
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    size: "lg",
    title: "Large Modal",
    children: <p style={{ padding: "1rem" }}>Large modal content.</p>,
  },
};

export const Scrollable: Story = {
  args: {
    isOpen: true,
    size: "lg",
    scrollable: true,
    title: "Scrollable Modal",
    children: (
      <div style={{ padding: "1rem" }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        ))}
      </div>
    ),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: "Closed Modal",
    children: <p>This should not be visible.</p>,
  },
};
