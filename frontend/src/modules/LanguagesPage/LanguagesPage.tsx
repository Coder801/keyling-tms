import { useNavigate } from "react-router";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useGetLanguagesQuery,
  useUpdateLanguageMutation,
  useDeleteLanguageMutation,
} from "@/services/languagesApi";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { Typography } from "@/ui/Typography";
import type { LanguagesPageProps } from "./types";
import styles from "./styles.module.scss";

export const LanguagesPage = ({ onAddLanguage }: LanguagesPageProps) => {
  const navigate = useNavigate();
  const { data: languages = [], isLoading } = useGetLanguagesQuery();
  const [updateLanguage] = useUpdateLanguageMutation();
  const [deleteLanguage] = useDeleteLanguageMutation();

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "active" ? "draft" : "active";
    try {
      await updateLanguage({ id, status: nextStatus }).unwrap();
      toast.success(`Language moved to ${nextStatus}`);
    } catch {
      toast.error("Failed to update language");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteLanguage(id).unwrap();
      toast.success(`Language "${name}" deleted`);
    } catch {
      toast.error("Failed to delete language");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <Button variant="link" onClick={() => navigate("/")}>
              ← Back to Dashboard
            </Button>
            <Typography tag="h1" weight="normal" className={styles.title}>
              Languages
            </Typography>
          </div>
          <Button onClick={onAddLanguage}>Add Language</Button>
        </div>
      </div>

      <div className={styles.content}>
        <Card noPadding overflowHidden>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Language</th>
                <th className={styles.th}>Code</th>
                <th className={styles.th}>Status</th>
                <th className={styles.thRight}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className={styles.emptyCell}>Loading...</td>
                </tr>
              ) : languages.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.emptyCell}>
                    No languages yet. Add one to get started.
                  </td>
                </tr>
              ) : (
                languages.map((lang) => (
                  <tr key={lang.id} className={styles.row}>
                    <td className={styles.langCell}>
                      {lang.flag && (
                        <span className={styles.flag}>{lang.flag}</span>
                      )}
                      <span className={styles.langName}>{lang.name}</span>
                    </td>
                    <td className={styles.codeCell}>
                      <code className={styles.code}>{lang.code}</code>
                    </td>
                    <td className={styles.statusCell}>
                      <span
                        className={`${styles.statusBadge} ${
                          lang.status === "active"
                            ? styles.statusActive
                            : styles.statusDraft
                        }`}
                      >
                        {lang.status === "active" ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <div className={styles.actionsRow}>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleToggleStatus(lang.id, lang.status)}
                        >
                          {lang.status === "active" ? "Move to Draft" : "Activate"}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(lang.id, lang.name)}
                          title="Delete language"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
