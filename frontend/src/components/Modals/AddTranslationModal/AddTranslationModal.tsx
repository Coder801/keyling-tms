import React, { useState } from "react";
import type { AddTranslationModalProps } from "./types";
import { useGetVersionsQuery } from "@/services/versionsApi";
import { Modal } from "@/ui/Modal";
import { Button } from "@/ui/Button";
import styles from "./styles.module.scss";

export const AddTranslationModal = ({
  isOpen,
  onClose,
  onAdd,
  languages,
}: AddTranslationModalProps) => {
  const { data: versions = [] } = useGetVersionsQuery();
  const [key, setKey] = useState("");
  const [language, setLanguage] = useState(languages[0]?.code || "");
  const [value, setValue] = useState("");
  const [version, setVersion] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const latestVersion = versions[versions.length - 1]?.name || "";
  const currentVersion = version || latestVersion;

  const validateKey = (k: string): string | null => {
    if (!k.trim()) return "Key is required";
    if (k.includes(".")) return "Dots are not allowed in keys (flat structure only)";
    if (!/^[a-z_]+$/.test(k)) return "Key must contain only lowercase letters and underscores";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const keyError = validateKey(key);
    if (keyError) newErrors.key = keyError;
    if (!value.trim()) newErrors.value = "Value is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd(key, language, value, currentVersion);
    handleClose();
  };

  const handleClose = () => {
    setKey("");
    setValue("");
    setLanguage(languages[0]?.code || "");
    setVersion("");
    setErrors({});
    onClose();
  };

  const handleKeyChange = (newKey: string) => {
    setKey(newKey);
    if (errors.key) {
      const error = validateKey(newKey);
      if (error) {
        setErrors({ ...errors, key: error });
      } else {
        const { key: _, ...rest } = errors;
        setErrors(rest);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Translation">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>
            Translation Key <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => handleKeyChange(e.target.value)}
            placeholder="e.g., button_submit"
            className={`${styles.input} ${errors.key ? styles.inputError : ""}`}
          />
          {errors.key && <p className={styles.errorText}>{errors.key}</p>}
          <p className={styles.hint}>
            Use lowercase letters and underscores only. No dots allowed.
          </p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Version <span className={styles.required}>*</span>
          </label>
          <select
            value={currentVersion}
            onChange={(e) => setVersion(e.target.value)}
            className={styles.select}
          >
            {versions.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name} ({v.status})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Language <span className={styles.required}>*</span>
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={styles.select}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name} ({lang.code})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Translation Value <span className={styles.required}>*</span>
          </label>
          <textarea
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (errors.value && e.target.value.trim()) {
                const { value: _, ...rest } = errors;
                setErrors(rest);
              }
            }}
            placeholder="Enter translation..."
            rows={3}
            className={`${styles.textarea} ${errors.value ? styles.textareaError : ""}`}
          />
          {errors.value && <p className={styles.errorText}>{errors.value}</p>}
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">
            Add Translation
          </Button>
        </div>
      </form>
    </Modal>
  );
};
