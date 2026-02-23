import { useNavigate } from "react-router";
import { Languages, FileText, TrendingUp, GitBranch } from "lucide-react";
import { languages } from "@/data/mockData";
import { useGetTranslationsQuery } from "@/services/translationsApi";
import { useGetVersionsQuery } from "@/services/versionsApi";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { Typography } from "@/ui/Typography";
import type { DashboardProps } from "./types";
import styles from "./styles.module.scss";

export const Dashboard = ({ onCreateVersion }: DashboardProps) => {
  const navigate = useNavigate();
  const { data: versions = [] } = useGetVersionsQuery();
  const latestVersion = versions[versions.length - 1];

  const { data: translations = [] } = useGetTranslationsQuery(
    { version: latestVersion?.name },
    { skip: !latestVersion },
  );

  const totalKeys = new Set(translations.map((t) => t.key)).size;

  const getLanguageCompletion = (langCode: string) => {
    const langTranslations = translations.filter(
      (t) => t.language === langCode,
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
          <Typography tag="h1" weight="normal" className={styles.title}>
            Translation Management
          </Typography>
          <Button onClick={onCreateVersion}>
            Create New Version
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <div className={styles.statInfo}>
              <Typography size="xs" className={styles.statLabel}>Total Versions</Typography>
              <p className={styles.statValue}>{versions.length}</p>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
              <GitBranch />
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statInfo}>
              <Typography size="xs" className={styles.statLabel}>Languages</Typography>
              <p className={styles.statValue}>{languages.length}</p>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
              <Languages />
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statInfo}>
              <Typography size="xs" className={styles.statLabel}>Translation Keys</Typography>
              <p className={styles.statValue}>{totalKeys}</p>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconPurple}`}>
              <FileText />
            </div>
          </Card>

          <Card className={styles.statCard}>
            <div className={styles.statInfo}>
              <Typography size="xs" className={styles.statLabel}>Latest Version</Typography>
              <p className={styles.statValue}>{latestVersion?.name ?? "—"}</p>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconOrange}`}>
              <TrendingUp />
            </div>
          </Card>
        </div>

        {latestVersion && (
          <>
            <Card className={styles.overviewCard}>
              <div className={styles.overviewHeader}>
                <Typography tag="h2" weight="normal" className={styles.overviewTitle}>
                  Latest Version Overview
                </Typography>
                <span
                  className={`${styles.versionBadge} ${
                    latestVersion.status === "published"
                      ? styles.versionBadgePublished
                      : styles.versionBadgeDraft
                  }`}
                >
                  {latestVersion.status.charAt(0).toUpperCase() +
                    latestVersion.status.slice(1)}
                </span>
              </div>
              <Typography size="xs" className={styles.overviewMeta}>
                Version {latestVersion.name} • Created{" "}
                {new Date(latestVersion.createdDate).toLocaleDateString()}
              </Typography>
              <Button
                variant="link"
                onClick={() => navigate("/versions")}
              >
                View all versions →
              </Button>
            </Card>

            <Card>
              <Typography tag="h2" weight="normal" className={styles.completionTitle}>
                Language Completion ({latestVersion.name})
              </Typography>
              <div className={styles.completionList}>
                {languages.map((lang) => {
                  const completion = getLanguageCompletion(lang.code);
                  return (
                    <div key={lang.code} className={styles.langRow}>
                      <div className={styles.langHeader}>
                        <div className={styles.langInfo}>
                          <span className={styles.langFlag}>{lang.flag}</span>
                          <div>
                            <Typography size="xs">{lang.name}</Typography>
                            <Typography size="xs" className={styles.langCode}>{lang.code}</Typography>
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
            </Card>
          </>
        )}

        <div className={styles.actionsGrid}>
          <button
            onClick={() => navigate("/editor")}
            className={styles.actionCard}
          >
            <FileText style={{ color: "#2563eb" }} />
            <Typography tag="h3" weight="normal" className={styles.actionTitle}>
              Translation Editor
            </Typography>
            <Typography size="xs" className={styles.actionDesc}>
              Edit and manage translation keys and values
            </Typography>
          </button>

          <button
            onClick={() => navigate("/versions")}
            className={styles.actionCard}
          >
            <GitBranch style={{ color: "#16a34a" }} />
            <Typography tag="h3" weight="normal" className={styles.actionTitle}>
              Version Management
            </Typography>
            <Typography size="xs" className={styles.actionDesc}>
              View, edit, and publish translation versions
            </Typography>
          </button>
        </div>
      </div>
    </div>
  );
};
