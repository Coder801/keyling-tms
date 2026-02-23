import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import { handlers, mockVersions } from "../../../.storybook/mocks/handlers";
import { VersionsPage } from "./VersionsPage";

const meta: Meta<typeof VersionsPage> = {
  title: "Modules/VersionsPage",
  component: VersionsPage,
  parameters: {
    layout: "fullscreen",
    msw: { handlers },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [http.get("/api/versions", () => HttpResponse.json([]))],
    },
  },
};

export const OnlyPublished: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/versions", () =>
          HttpResponse.json(
            mockVersions.filter((v) => v.status === "published"),
          ),
        ),
      ],
    },
  },
};
