import React, { useState } from "react";
import { X } from "lucide-react";
import type { CreateVersionModalProps } from "./types";
import styles from "./styles.module.scss";

export const CreateVersionModal = ({
  isOpen,
  onClose,
  onCreate,
  versions,
}: CreateVersionModalProps) => {
  const [name, setName] = useState("");
  const [baseVersion, setBaseVersion] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Version name is required";
    } else if (versions.some((v) => v.name === name)) {
      newErrors.name = "Version name already exists";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onCreate(name, baseVersion || undefined);
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setBaseVersion("");
    setErrors({});
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create New Version</h2>
          <button onClick={handleClose} className={styles.closeBtn}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>
              Version Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors(errors);
                }
              }}
              placeholder="e.g., v2.1"
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Copy from Version (Optional)</label>
            <select
              value={baseVersion}
              onChange={(e) => setBaseVersion(e.target.value)}
              className={styles.select}
            >
              <option value="">Start from scratch</option>
              {versions.map((v) => (
                <option key={v.id} value={v.name}>
                  {v.name} ({v.status})
                </option>
              ))}
            </select>
            <p className={styles.hint}>
              Copy all translations from an existing version
            </p>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.btnCancel}
            >
              Cancel
            </button>
            <button type="submit" className={styles.btnSubmit}>
              Create Version
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
