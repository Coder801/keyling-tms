import { Languages, FileText, TrendingUp, GitBranch } from "lucide-react";
import { languages, versions, translations } from "@/data/mockData";
import type { DashboardProps } from "./types";
import styles from "./styles.module.scss";

export const Dashboard = ({ onCreateVersion, onNavigate }: DashboardProps) => {
  const totalKeys = new Set(translations.map((t) => t.key)).size;
  const latestVersion = versions[versions.length - 1];

  const getLanguageCompletion = (langCode: string, versionName: string) => {
    const langTranslations = translations.filter(
      (t) => t.language === langCode && t.version === versionName,
    );
    const translated = langTranslations.filter(
      (t) => t.status === "translated",
    ).length;
    const total = langTranslations.length;
    return total > 0 ? Math.round((translated / total) * 100) : 0;
  };

  const getProgressClass = (completion: number) => {
    if (completion === 100) return styles.progressFillFull;
    if (completion >= 50) return styles.progressFillMid;
    return styles.progressFillLow;
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Translation Management</h1>
          <button onClick={onCreateVersion} className={styles.btnCreate}>
            Create New Version
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Total Versions</p>
              <p className={styles.statValue}>{versions.length}</p>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
              <GitBranch />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Languages</p>
              <p className={styles.statValue}>{languages.length}</p>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
              <Languages />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Translation Keys</p>
              <p className={styles.statValue}>{totalKeys}</p>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconPurple}`}>
              <FileText />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Latest Version</p>
              <p className={styles.statValue}>{latestVersion.name}</p>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconOrange}`}>
              <TrendingUp />
            </div>
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.overviewHeader}>
            <h2 className={styles.overviewTitle}>Latest Version Overview</h2>
            <span
              className={`${styles.versionBadge} ${
                latestVersion.status === "published"
                  ? styles.versionBadgePublished
                  : styles.versionBadgeDraft
              }`}
            >
              {latestVersion.status.charAt(0).toUpperCase() + latestVersion.status.slice(1)}
            </span>
          </div>
          <p className={styles.overviewMeta}>
            Version {latestVersion.name} • Created{" "}
            {new Date(latestVersion.createdDate).toLocaleDateString()}
          </p>
          <button
            onClick={() => onNavigate("versions")}
            className={styles.viewLink}
          >
            View all versions →
          </button>
        </div>

        <div className={styles.completionCard}>
          <h2 className={styles.completionTitle}>
            Language Completion ({latestVersion.name})
          </h2>
          <div className={styles.completionList}>
            {languages.map((lang) => {
              const completion = getLanguageCompletion(lang.code, latestVersion.name);
              return (
                <div key={lang.code} className={styles.langRow}>
                  <div className={styles.langHeader}>
                    <div className={styles.langInfo}>
                      <span className={styles.langFlag}>{lang.flag}</span>
                      <div>
                        <p className={styles.langName}>{lang.name}</p>
                        <p className={styles.langCode}>{lang.code}</p>
                      </div>
                    </div>
                    <span className={styles.langPercent}>{completion}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={`${styles.progressFill} ${getProgressClass(completion)}`}
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.actionsGrid}>
          <button
            onClick={() => onNavigate("editor")}
            className={styles.actionCard}
          >
            <FileText style={{ color: "#2563eb" }} />
            <h3 className={styles.actionTitle}>Translation Editor</h3>
            <p className={styles.actionDesc}>
              Edit and manage translation keys and values
            </p>
          </button>

          <button
            onClick={() => onNavigate("versions")}
            className={styles.actionCard}
          >
            <GitBranch style={{ color: "#16a34a" }} />
            <h3 className={styles.actionTitle}>Version Management</h3>
            <p className={styles.actionDesc}>
              View, edit, and publish translation versions
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
