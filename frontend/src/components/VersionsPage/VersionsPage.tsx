import { useState } from "react";
import { Copy, Edit, CheckCircle, Clock } from "lucide-react";
import type { VersionsPageProps } from "./types";
import styles from "./styles.module.scss";

export const VersionsPage = ({
  versions,
  onEdit,
  onDuplicate,
  onPublish,
  onNavigate,
}: VersionsPageProps) => {
  const [sortedVersions] = useState([...versions].reverse());

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <button
              onClick={() => onNavigate("dashboard")}
              className={styles.backBtn}
            >
              ← Back to Dashboard
            </button>
            <h1 className={styles.title}>Translation Versions</h1>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Version</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Created Date</th>
                <th className={styles.thRight}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {sortedVersions.map((version) => (
                <tr key={version.id} className={styles.row}>
                  <td className={styles.versionCell}>
                    <span className={styles.versionName}>{version.name}</span>
                  </td>
                  <td className={styles.statusCell}>
                    <span
                      className={`${styles.statusBadge} ${
                        version.status === "published"
                          ? styles.statusPublished
                          : styles.statusDraft
                      }`}
                    >
                      {version.status === "published" ? (
                        <CheckCircle />
                      ) : (
                        <Clock />
                      )}
                      {version.status.charAt(0).toUpperCase() + version.status.slice(1)}
                    </span>
                  </td>
                  <td className={styles.dateCell}>
                    {new Date(version.createdDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className={styles.actionsCell}>
                    <div className={styles.actionsRow}>
                      <button
                        onClick={() => onEdit(version.id)}
                        className={styles.iconBtn}
                        title="Edit translations"
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={() => onDuplicate(version.id)}
                        className={styles.iconBtn}
                        title="Duplicate version"
                      >
                        <Copy />
                      </button>
                      {version.status === "draft" && (
                        <button
                          onClick={() => onPublish(version.id)}
                          className={styles.publishBtn}
                        >
                          Publish
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
