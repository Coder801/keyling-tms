import { useState } from "react";
import { Routes, Route } from "react-router";
import { Dashboard } from "@/modules/Dashboard";
import { VersionsPage } from "@/modules/VersionsPage";
import { TranslationEditor } from "@/modules/TranslationEditor";
import { LanguagesPage } from "@/modules/LanguagesPage";
import { AddTranslationModal } from "@/components/Modals/AddTranslationModal";
import { CreateVersionModal } from "@/components/Modals/CreateVersionModal";
import { VersionComparisonModal } from "@/components/Modals/VersionComparisonModal";
import { AddLanguageModal } from "@/components/Modals/AddLanguageModal";
import { languages } from "../data/mockData";
import { toast, Toaster } from "sonner";

export default function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCreateVersionModalOpen, setIsCreateVersionModalOpen] =
    useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isAddLanguageModalOpen, setIsAddLanguageModalOpen] = useState(false);

  const handleAddTranslation = (
    key: string,
    language: string,
    value: string,
    version: string,
  ) => {
    console.log("Add translation:", { key, language, value, version });
    toast.info("Translation added (API mutation coming soon)");
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              onCreateVersion={() => setIsCreateVersionModalOpen(true)}
            />
          }
        />
        <Route path="/versions" element={<VersionsPage />} />
        <Route
          path="/languages"
          element={
            <LanguagesPage
              onAddLanguage={() => setIsAddLanguageModalOpen(true)}
            />
          }
        />
        <Route
          path="/editor"
          element={
            <TranslationEditor
              languages={languages}
              onAddTranslation={() => setIsAddModalOpen(true)}
              onCompareVersions={() => setIsComparisonModalOpen(true)}
            />
          }
        />
      </Routes>

      <AddTranslationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTranslation}
        languages={languages}
      />

      <CreateVersionModal
        isOpen={isCreateVersionModalOpen}
        onClose={() => setIsCreateVersionModalOpen(false)}
      />

      <VersionComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
      />

      <AddLanguageModal
        isOpen={isAddLanguageModalOpen}
        onClose={() => setIsAddLanguageModalOpen(false)}
      />

      <Toaster position="top-right" />
    </>
  );
}
