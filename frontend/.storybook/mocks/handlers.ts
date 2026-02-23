import { http, HttpResponse } from "msw";
import type { Translation, Version } from "../../src/types";

export const mockVersions: Version[] = [
  { id: "1", name: "v1.0.0", status: "published", createdDate: "2025-01-15" },
  { id: "2", name: "v2.0.0", status: "draft", createdDate: "2025-03-01" },
  { id: "3", name: "v3.0.0", status: "draft", createdDate: "2025-06-20" },
];

export const mockTranslations: Translation[] = [
  { id: "1", key: "app.title", value: "My Application", lastUpdated: "2025-01-15", status: "translated", language: "EN", version: "1" },
  { id: "2", key: "app.description", value: "A great app", lastUpdated: "2025-01-15", status: "translated", language: "EN", version: "1" },
  { id: "3", key: "nav.home", value: "Home", lastUpdated: "2025-01-15", status: "translated", language: "EN", version: "1" },
  { id: "4", key: "nav.settings", value: "", lastUpdated: "2025-01-15", status: "missing", language: "EN", version: "1" },
  { id: "5", key: "app.title", value: "Мое приложение", lastUpdated: "2025-01-15", status: "translated", language: "UK", version: "1" },
  { id: "6", key: "nav.home", value: "", lastUpdated: "2025-01-15", status: "missing", language: "UK", version: "1" },
];

export const handlers = [
  http.get("/api/versions", () => HttpResponse.json(mockVersions)),
  http.get("/api/translations", () => HttpResponse.json(mockTranslations)),
  http.post("/api/versions", async ({ request }) => {
    const body = await request.json() as { name: string };
    const newVersion: Version = {
      id: String(mockVersions.length + 1),
      name: body.name,
      status: "draft",
      createdDate: new Date().toISOString().split("T")[0],
    };
    return HttpResponse.json(newVersion, { status: 201 });
  }),
  http.patch("/api/versions/:id", ({ params }) => {
    const version = mockVersions.find((v) => v.id === params["id"]);
    if (!version) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return HttpResponse.json({ ...version, status: "published" });
  }),
];
