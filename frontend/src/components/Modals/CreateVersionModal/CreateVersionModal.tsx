import React, { useState } from "react";
import type { CreateVersionModalProps } from "./types";
import { useGetVersionsQuery, useCreateVersionMutation } from "@/services/versionsApi";
import { Modal } from "@/ui/Modal";
import { Button } from "@/ui/Button";
import { toast } from "sonner";
import styles from "./styles.module.scss";

export const CreateVersionModal = ({ isOpen, onClose }: CreateVersionModalProps) => {
  const { data: versions = [] } = useGetVersionsQuery();
  const [createVersion, { isLoading }] = useCreateVersionMutation();
  const [name, setName] = useState("");
  const [baseVersion, setBaseVersion] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      await createVersion({ name }).unwrap();
      toast.success(`Version ${name} created successfully`);
      handleClose();
    } catch {
      toast.error("Failed to create version");
    }
  };

  const handleClose = () => {
    setName("");
    setBaseVersion("");
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Version">
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
              if (errors.name) setErrors({});
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
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Version"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
