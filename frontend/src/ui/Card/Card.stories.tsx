import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  argTypes: {
    noPadding: { control: "boolean" },
    overflowHidden: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <p style={{ margin: 0, fontSize: "0.875rem" }}>
        Card content goes here. Use this as a container for grouped information.
      </p>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    noPadding: true,
    children: (
      <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #eee" }}>
        Content without card padding — useful for tables.
      </div>
    ),
  },
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <h2 style={{ margin: "0 0 1rem", fontSize: "1.125rem", fontWeight: 400 }}>
        Latest Version Overview
      </h2>
      <p style={{ margin: 0, fontSize: "0.875rem", color: "#666" }}>
        Version v1.0 • Created January 15, 2026
      </p>
    </Card>
  ),
};

export const WithTable: Story = {
  render: () => (
    <Card noPadding overflowHidden>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
        <thead>
          <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
            <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Key</th>
            <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "0.75rem 1rem" }}>button_submit</td>
            <td style={{ padding: "0.75rem 1rem" }}>Submit</td>
          </tr>
        </tbody>
      </table>
    </Card>
  ),
};

export const StatCard: Story = {
  render: () => (
    <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between" } as React.CSSProperties}>
      <div>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#666" }}>Total Versions</p>
        <p style={{ margin: "0.5rem 0 0", fontSize: "1.875rem" }}>12</p>
      </div>
      <div style={{
        width: "3rem", height: "3rem", borderRadius: "0.5rem",
        background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        📦
      </div>
    </Card>
  ),
};
