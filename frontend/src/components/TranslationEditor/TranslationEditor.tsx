import { useState, useMemo } from "react";
import { Search, Plus, Save, AlertCircle, Check, GitCompare } from "lucide-react";
import type { Translation } from "@/types";
import type { TranslationEditorProps } from "./types";
import styles from "./styles.module.scss";

export const TranslationEditor = ({
  translations,
  languages,
  versions,
  onAddTranslation,
  onSave,
  onNavigate,
  onCompareVersions,
}: TranslationEditorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].code);
  const [selectedVersion, setSelectedVersion] = useState(
    versions[versions.length - 1].name,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [editedTranslations, setEditedTranslations] = useState<Record<string, string>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const filteredTranslations = useMemo(() => {
    return translations.filter(
      (t) =>
        t.language === selectedLanguage &&
        t.version === selectedVersion &&
        t.key.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [translations, selectedLanguage, selectedVersion, searchQuery]);

  const handleValueChange = (key: string, value: string) => {
    setEditedTranslations((prev) => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    const updatedTranslations = translations.map((t) => {
      const editedKey = `${t.key}_${t.language}_${t.version}`;
      if (editedTranslations[editedKey] !== undefined) {
        return {
          ...t,
          value: editedTranslations[editedKey],
          status: editedTranslations[editedKey].trim()
            ? ("translated" as const)
            : ("missing" as const),
          lastUpdated: new Date().toISOString().split("T")[0],
        };
      }
      return t;
    });
    onSave(updatedTranslations);
    setEditedTranslations({});
    setHasUnsavedChanges(false);
  };

  const getCurrentValue = (translation: Translation) => {
    const editedKey = `${translation.key}_${translation.language}_${translation.version}`;
    return editedTranslations[editedKey] !== undefined
      ? editedTranslations[editedKey]
      : translation.value;
  };

  const translatedCount = filteredTranslations.filter((t) => {
    return getCurrentValue(t).trim() !== "";
  }).length;

  const completionPercentage =
    filteredTranslations.length > 0
      ? Math.round((translatedCount / filteredTranslations.length) * 100)
      : 0;

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarNav}>
          <button
            onClick={() => onNavigate("dashboard")}
            className={styles.backBtn}
          >
            ← Dashboard
          </button>
          <h2 className={styles.sidebarTitle}>Filters</h2>
        </div>

        <div className={styles.sidebarSection}>
          <label className={styles.sidebarLabel}>Version</label>
          <select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            className={styles.versionSelect}
          >
            {versions.map((v) => (
              <option key={v.id} value={v.name}>{v.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.sidebarSection}>
          <label className={styles.sidebarLabelLg}>Language</label>
          <div className={styles.langList}>
            {languages.map((lang) => {
              const langTranslations = translations.filter(
                (t) => t.language === lang.code && t.version === selectedVersion,
              );
              const langTranslated = langTranslations.filter(
                (t) => t.status === "translated",
              ).length;
              const langCompletion =
                langTranslations.length > 0
                  ? Math.round((langTranslated / langTranslations.length) * 100)
                  : 0;

              return (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`${styles.langBtn} ${selectedLanguage === lang.code ? styles.langBtnActive : ""}`}
                >
                  <div className={styles.langHeader}>
                    <div className={styles.langInfo}>
                      <span className={styles.langFlag}>{lang.flag}</span>
                      <span className={styles.langCode}>{lang.code}</span>
                    </div>
                    <span className={styles.langPercent}>{langCompletion}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={`${styles.progressFill} ${langCompletion === 100 ? styles.progressFillComplete : ""}`}
                      style={{ width: `${langCompletion}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.statsBox}>
          <div className={styles.statsInner}>
            <p className={styles.statsHint}>Current Progress</p>
            <p className={styles.statsPercent}>{completionPercentage}%</p>
            <p className={styles.statsLabel}>
              {translatedCount} of {filteredTranslations.length} keys
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.mainHeader}>
          <div className={styles.mainHeaderTop}>
            <div>
              <h1 className={styles.mainTitle}>Translation Editor</h1>
              <p className={styles.mainSubtitle}>
                {selectedLanguage} • {selectedVersion}
              </p>
            </div>
            <div className={styles.headerActions}>
              <button onClick={onCompareVersions} className={styles.btnOutline}>
                <GitCompare />
                Compare Versions
              </button>
              <button onClick={onAddTranslation} className={styles.btnOutline}>
                <Plus />
                Add Key
              </button>
              <button
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
                className={hasUnsavedChanges ? styles.btnSave : styles.btnSaveDisabled}
              >
                <Save />
                Save Changes
              </button>
            </div>
          </div>

          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by key..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {hasUnsavedChanges && (
          <div className={styles.unsavedBanner}>
            <AlertCircle />
            You have unsaved changes
          </div>
        )}

        <div className={styles.tableArea}>
          <div className={styles.tableContainer}>
            <div className={styles.tableCard}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th className={styles.th}>Key</th>
                    <th className={styles.th}>Value</th>
                    <th className={styles.th}>Last Updated</th>
                    <th className={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {filteredTranslations.length === 0 ? (
                    <tr>
                      <td colSpan={4} className={styles.emptyCell}>
                        No translations found
                      </td>
                    </tr>
                  ) : (
                    filteredTranslations.map((translation) => {
                      const currentValue = getCurrentValue(translation);
                      const isMissing = currentValue.trim() === "";
                      const editedKey = `${translation.key}_${translation.language}_${translation.version}`;
                      const isEdited = editedTranslations[editedKey] !== undefined;

                      return (
                        <tr
                          key={`${translation.key}_${translation.language}_${translation.version}`}
                          className={`${styles.row} ${isMissing ? styles.rowMissing : ""}`}
                        >
                          <td className={styles.keyCell}>
                            <code className={styles.keyCode}>{translation.key}</code>
                          </td>
                          <td className={styles.valueCell}>
                            <input
                              type="text"
                              value={currentValue}
                              onChange={(e) => handleValueChange(editedKey, e.target.value)}
                              placeholder="Enter translation..."
                              className={`${styles.valueInput} ${isMissing ? styles.valueInputError : ""} ${isEdited ? styles.valueInputEdited : ""}`}
                            />
                          </td>
                          <td className={styles.dateCell}>
                            {new Date(translation.lastUpdated).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                          <td className={styles.statusCell}>
                            {isMissing ? (
                              <span className={`${styles.statusBadge} ${styles.statusMissing}`}>
                                <AlertCircle />
                                Missing
                              </span>
                            ) : (
                              <span className={`${styles.statusBadge} ${styles.statusDone}`}>
                                <Check />
                                Done
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
