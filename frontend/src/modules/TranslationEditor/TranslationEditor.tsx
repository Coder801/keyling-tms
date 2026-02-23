import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Search, Plus, AlertCircle, Check, GitCompare } from "lucide-react";
import type { Translation } from "@/types";
import type { TranslationEditorProps } from "./types";
import { useGetTranslationsQuery } from "@/services/translationsApi";
import { useGetVersionsQuery } from "@/services/versionsApi";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { Typography } from "@/ui/Typography";
import styles from "./styles.module.scss";

export const TranslationEditor = ({
  languages,
  onAddTranslation,
  onCompareVersions,
}: TranslationEditorProps) => {
  const navigate = useNavigate();
  const { data: versions = [] } = useGetVersionsQuery();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].code);
  const [selectedVersion, setSelectedVersion] = useState(
    versions[versions.length - 1].name,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allTranslations = [], isLoading } = useGetTranslationsQuery({
    version: selectedVersion,
  });

  const filteredTranslations = useMemo(() => {
    return allTranslations.filter(
      (t) =>
        t.language === selectedLanguage &&
        t.key.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allTranslations, selectedLanguage, searchQuery]);

  const translatedCount = filteredTranslations.filter(
    (t) => t.status === "translated",
  ).length;

  const completionPercentage =
    filteredTranslations.length > 0
      ? Math.round((translatedCount / filteredTranslations.length) * 100)
      : 0;

  const getLangStats = (langCode: string) => {
    const langTranslations = allTranslations.filter(
      (t) => t.language === langCode,
    );
    const translated = langTranslations.filter(
      (t) => t.status === "translated",
    ).length;
    const completion =
      langTranslations.length > 0
        ? Math.round((translated / langTranslations.length) * 100)
        : 0;
    return { completion };
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarNav}>
          <Button variant="link" onClick={() => navigate("/")}>
            ← Dashboard
          </Button>
          <Typography tag="h2" weight="normal" className={styles.sidebarTitle}>
            Filters
          </Typography>
        </div>

        <div className={styles.sidebarSection}>
          <label className={styles.sidebarLabel}>Version</label>
          <select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            className={styles.versionSelect}
          >
            {versions.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.sidebarSection}>
          <label className={styles.sidebarLabelLg}>Language</label>
          <div className={styles.langList}>
            {languages.map((lang) => {
              const { completion } = getLangStats(lang.code);
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
                    <span className={styles.langPercent}>{completion}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={`${styles.progressFill} ${completion === 100 ? styles.progressFillComplete : ""}`}
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.statsBox}>
          <div className={styles.statsInner}>
            <Typography size="xs" className={styles.statsHint}>Current Progress</Typography>
            <p className={styles.statsPercent}>{completionPercentage}%</p>
            <Typography size="xs" className={styles.statsLabel}>
              {translatedCount} of {filteredTranslations.length} keys
            </Typography>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.mainHeader}>
          <div className={styles.mainHeaderTop}>
            <div>
              <Typography tag="h1" weight="normal" className={styles.mainTitle}>
                Translation Editor
              </Typography>
              <Typography size="xs" className={styles.mainSubtitle}>
                {selectedLanguage} • {selectedVersion}
              </Typography>
            </div>
            <div className={styles.headerActions}>
              <Button variant="secondary" onClick={onCompareVersions}>
                <GitCompare />
                Compare Versions
              </Button>
              <Button variant="secondary" onClick={onAddTranslation}>
                <Plus />
                Add Key
              </Button>
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

        <div className={styles.tableArea}>
          <div className={styles.tableContainer}>
            <Card noPadding overflowHidden>
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
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className={styles.emptyCell}>
                        Loading...
                      </td>
                    </tr>
                  ) : filteredTranslations.length === 0 ? (
                    <tr>
                      <td colSpan={4} className={styles.emptyCell}>
                        No translations found
                      </td>
                    </tr>
                  ) : (
                    filteredTranslations.map((translation: Translation) => {
                      const isMissing = !translation.value.trim();
                      return (
                        <tr
                          key={translation.id}
                          className={`${styles.row} ${isMissing ? styles.rowMissing : ""}`}
                        >
                          <td className={styles.keyCell}>
                            <code className={styles.keyCode}>
                              {translation.key}
                            </code>
                          </td>
                          <td className={styles.valueCell}>
                            <span className={styles.valueInput}>
                              {translation.value}
                            </span>
                          </td>
                          <td className={styles.dateCell}>
                            {new Date(
                              translation.lastUpdated,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                          <td className={styles.statusCell}>
                            {isMissing ? (
                              <span
                                className={`${styles.statusBadge} ${styles.statusMissing}`}
                              >
                                <AlertCircle />
                                Missing
                              </span>
                            ) : (
                              <span
                                className={`${styles.statusBadge} ${styles.statusDone}`}
                              >
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
