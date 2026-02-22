import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { VersionComparisonModalProps } from "./types";
import { useGetTranslationsQuery } from "@/services/translationsApi";
import { useGetVersionsQuery } from "@/services/versionsApi";
import { Modal } from "@/ui/Modal";
import styles from "./styles.module.scss";

type ComparisonStatus = "same" | "different" | "added" | "removed";

const ROW_CLASS: Record<ComparisonStatus, string> = {
  same:      styles.rowSame,
  different: styles.rowDiff,
  added:     styles.rowAdded,
  removed:   styles.rowRemoved,
};

const DOT_CLASS: Record<ComparisonStatus, string> = {
  same:      styles.keyDotSame,
  different: styles.keyDotDiff,
  added:     styles.keyDotAdded,
  removed:   styles.keyDotRemoved,
};

export const VersionComparisonModal = ({
  isOpen,
  onClose,
}: VersionComparisonModalProps) => {
  const { data: versions = [] } = useGetVersionsQuery(undefined, { skip: !isOpen });
  const [leftVersion, setLeftVersion] = useState("");
  const [rightVersion, setRightVersion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const resolvedLeft = leftVersion || versions[0]?.name || "";
  const resolvedRight = rightVersion || versions[versions.length - 1]?.name || "";

  const { data: leftTranslations = [] } = useGetTranslationsQuery(
    { version: resolvedLeft, language: selectedLanguage },
    { skip: !isOpen || !resolvedLeft },
  );
  const { data: rightTranslations = [] } = useGetTranslationsQuery(
    { version: resolvedRight, language: selectedLanguage },
    { skip: !isOpen || !resolvedRight },
  );

  const allKeys = new Set([
    ...leftTranslations.map((t) => t.key),
    ...rightTranslations.map((t) => t.key),
  ]);

  const comparisons = Array.from(allKeys)
    .map((key) => {
      const left = leftTranslations.find((t) => t.key === key);
      const right = rightTranslations.find((t) => t.key === key);

      let status: ComparisonStatus = "same";
      if (!left) status = "added";
      else if (!right) status = "removed";
      else if (left.value !== right.value) status = "different";

      return { key, left, right, status };
    })
    .sort((a, b) => a.key.localeCompare(b.key));

  const stats = {
    same:      comparisons.filter((c) => c.status === "same").length,
    different: comparisons.filter((c) => c.status === "different").length,
    added:     comparisons.filter((c) => c.status === "added").length,
    removed:   comparisons.filter((c) => c.status === "removed").length,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Version Comparison" size="lg" scrollable>
      <div className={styles.controls}>
        <div className={styles.controlsRow}>
          <select
            value={resolvedLeft}
            onChange={(e) => setLeftVersion(e.target.value)}
            className={styles.select}
          >
            {versions.map((v) => (
              <option key={v.id} value={v.name}>{v.name}</option>
            ))}
          </select>

          <ArrowRight className={styles.arrow} />

          <select
            value={resolvedRight}
            onChange={(e) => setRightVersion(e.target.value)}
            className={styles.select}
          >
            {versions.map((v) => (
              <option key={v.id} value={v.name}>{v.name}</option>
            ))}
          </select>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className={styles.selectNarrow}
          >
            <option value="EN">🇬🇧 EN</option>
            <option value="UK">🇺🇦 UK</option>
            <option value="DE">🇩🇪 DE</option>
            <option value="FR">🇫🇷 FR</option>
            <option value="ES">🇪🇸 ES</option>
          </select>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <div className={`${styles.statDot} ${styles.statDotSame}`} />
            Unchanged: {stats.same}
          </div>
          <div className={styles.statItem}>
            <div className={`${styles.statDot} ${styles.statDotDiff}`} />
            Modified: {stats.different}
          </div>
          <div className={styles.statItem}>
            <div className={`${styles.statDot} ${styles.statDotAdded}`} />
            Added: {stats.added}
          </div>
          <div className={styles.statItem}>
            <div className={`${styles.statDot} ${styles.statDotRemoved}`} />
            Removed: {stats.removed}
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Key</th>
              <th className={styles.th}>{resolvedLeft}</th>
              <th className={styles.th}>{resolvedRight}</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {comparisons.map(({ key, left, right, status }) => (
              <tr key={key} className={ROW_CLASS[status]}>
                <td className={styles.keyCell}>
                  <div className={`${styles.keyDot} ${DOT_CLASS[status]}`} />
                  <code className={styles.keyCode}>{key}</code>
                </td>
                <td className={styles.valueCell}>
                  {left ? (
                    <span className={`${styles.valueText} ${status === "removed" ? styles.valueRemoved : ""}`}>
                      {left.value || <span className={styles.valueEmpty}>empty</span>}
                    </span>
                  ) : (
                    <span className={styles.valueMissing}>—</span>
                  )}
                </td>
                <td className={styles.valueCell}>
                  {right ? (
                    <span className={`${styles.valueText} ${status === "added" ? styles.valueAdded : ""}`}>
                      {right.value || <span className={styles.valueEmpty}>empty</span>}
                    </span>
                  ) : (
                    <span className={styles.valueMissing}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <button onClick={onClose} className={styles.btnClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};
