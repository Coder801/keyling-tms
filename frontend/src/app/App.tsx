import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { VersionsPage } from "@/components/VersionsPage";
import { TranslationEditor } from "@/components/TranslationEditor";
import { AddTranslationModal } from "@/components/AddTranslationModal";
import { CreateVersionModal } from "@/components/CreateVersionModal";
import { VersionComparisonModal } from "@/components/VersionComparisonModal";
import {
  versions as initialVersions,
  translations as initialTranslations,
  languages,
} from "../data/mockData";
import type { Translation, Version, Page } from "@/types";
import { toast, Toaster } from "sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [versions, setVersions] = useState<Version[]>(initialVersions);
  const [translations, setTranslations] =
    useState<Translation[]>(initialTranslations);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCreateVersionModalOpen, setIsCreateVersionModalOpen] =
    useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  const handleCreateVersion = () => {
    setIsCreateVersionModalOpen(true);
  };

  const handleCreateVersionSubmit = (name: string, baseVersion?: string) => {
    const newVersion: Version = {
      id: (versions.length + 1).toString(),
      name,
      status: "draft",
      createdDate: new Date().toISOString().split("T")[0],
    };

    setVersions([...versions, newVersion]);

    // If baseVersion is specified, copy all translations from that version
    if (baseVersion) {
      const baseTranslations = translations.filter(
        (t) => t.version === baseVersion,
      );
      const copiedTranslations = baseTranslations.map((t) => ({
        ...t,
        version: name,
        lastUpdated: newVersion.createdDate,
      }));
      setTranslations([...translations, ...copiedTranslations]);
      toast.success(
        `Version ${name} created with translations from ${baseVersion}`,
      );
    } else {
      toast.success(`Version ${name} created successfully`);
    }
  };

  const handleDuplicateVersion = (versionId: string) => {
    const versionToDuplicate = versions.find((v) => v.id === versionId);
    if (!versionToDuplicate) return;

    const newVersionName = `${versionToDuplicate.name}_copy`;
    const newVersion: Version = {
      id: (versions.length + 1).toString(),
      name: newVersionName,
      status: "draft",
      createdDate: new Date().toISOString().split("T")[0],
    };

    setVersions([...versions, newVersion]);

    // Copy all translations from the duplicated version
    const versionTranslations = translations.filter(
      (t) => t.version === versionToDuplicate.name,
    );
    const copiedTranslations = versionTranslations.map((t) => ({
      ...t,
      version: newVersionName,
      lastUpdated: newVersion.createdDate,
    }));
    setTranslations([...translations, ...copiedTranslations]);

    toast.success(`Version ${newVersionName} created`);
  };

  const handlePublishVersion = (versionId: string) => {
    setVersions(
      versions.map((v) =>
        v.id === versionId ? { ...v, status: "published" as const } : v,
      ),
    );
    const version = versions.find((v) => v.id === versionId);
    toast.success(`Version ${version?.name} published successfully`);
  };

  const handleEditVersion = () => {
    // In a real app, you might want to select this version in the editor
    setCurrentPage("editor");
    toast.info("Opening translation editor");
  };

  const handleAddTranslation = (
    key: string,
    language: string,
    value: string,
    version: string,
  ) => {
    const newTranslation: Translation = {
      key,
      value,
      language,
      version,
      lastUpdated: new Date().toISOString().split("T")[0],
      status: value.trim() ? "translated" : "missing",
    };

    setTranslations([...translations, newTranslation]);
    toast.success("Translation added successfully");
  };

  const handleSaveTranslations = (updatedTranslations: Translation[]) => {
    setTranslations(updatedTranslations);
    toast.success("Changes saved successfully");
  };

  console.log("App render - currentPage:", currentPage, "versions:", versions); // Debug log

  return (
    <>
      {currentPage === "dashboard" && (
        <Dashboard
          onCreateVersion={handleCreateVersion}
          onNavigate={setCurrentPage}
        />
      )}

      {currentPage === "versions" && (
        <VersionsPage
          versions={versions}
          onEdit={handleEditVersion}
          onDuplicate={handleDuplicateVersion}
          onPublish={handlePublishVersion}
          onNavigate={setCurrentPage}
        />
      )}

      {currentPage === "editor" && (
        <TranslationEditor
          translations={translations}
          languages={languages}
          versions={versions}
          onAddTranslation={() => setIsAddModalOpen(true)}
          onSave={handleSaveTranslations}
          onNavigate={setCurrentPage}
          onCompareVersions={() => setIsComparisonModalOpen(true)}
        />
      )}

      <AddTranslationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTranslation}
        languages={languages}
        versions={versions}
      />

      <CreateVersionModal
        isOpen={isCreateVersionModalOpen}
        onClose={() => setIsCreateVersionModalOpen(false)}
        onCreate={handleCreateVersionSubmit}
        versions={versions}
      />

      <VersionComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        translations={translations}
        versions={versions}
      />

      <Toaster position="top-right" />
    </>
  );
}
