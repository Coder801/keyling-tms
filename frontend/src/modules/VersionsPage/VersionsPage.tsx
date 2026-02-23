import { useNavigate } from "react-router";
import { Copy, Edit, CheckCircle, Clock } from "lucide-react";
import { useGetVersionsQuery, usePublishVersionMutation } from "@/services/versionsApi";
import { toast } from "sonner";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { Typography } from "@/ui/Typography";
import styles from "./styles.module.scss";

export const VersionsPage = () => {
  const navigate = useNavigate();
  const { data: versions = [], isLoading } = useGetVersionsQuery();
  const [publishVersion] = usePublishVersionMutation();

  const sortedVersions = [...versions].reverse();

  const handlePublish = async (id: string) => {
    try {
      const version = versions.find((v) => v.id === id);
      await publishVersion(id).unwrap();
      toast.success(`Version ${version?.name} published successfully`);
    } catch {
      toast.error("Failed to publish version");
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
              Translation Versions
            </Typography>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Card noPadding overflowHidden>
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
              {isLoading ? (
                <tr>
                  <td colSpan={4} className={styles.emptyCell}>
                    Loading...
                  </td>
                </tr>
              ) : (
                sortedVersions.map((version) => (
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
                        {version.status.charAt(0).toUpperCase() +
                          version.status.slice(1)}
                      </span>
                    </td>
                    <td className={styles.dateCell}>
                      {new Date(version.createdDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" },
                      )}
                    </td>
                    <td className={styles.actionsCell}>
                      <div className={styles.actionsRow}>
                        <Button
                          variant="ghost"
                          onClick={() => navigate("/editor")}
                          title="Edit translations"
                        >
                          <Edit />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => toast.info("Duplicate coming soon")}
                          title="Duplicate version"
                        >
                          <Copy />
                        </Button>
                        {version.status === "draft" && (
                          <Button
                            onClick={() => handlePublish(version.id)}
                            className={styles.publishBtn}
                          >
                            Publish
                          </Button>
                        )}
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
