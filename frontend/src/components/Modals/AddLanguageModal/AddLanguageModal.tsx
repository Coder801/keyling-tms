import React, { useState } from "react";
import type { AddLanguageModalProps } from "./types";
import { useCreateLanguageMutation, useGetLanguagesQuery } from "@/services/languagesApi";
import { Modal } from "@/ui/Modal";
import { Button } from "@/ui/Button";
import { toast } from "sonner";
import styles from "./styles.module.scss";

export const AddLanguageModal = ({ isOpen, onClose }: AddLanguageModalProps) => {
  const { data: existingLanguages = [] } = useGetLanguagesQuery();
  const [createLanguage, { isLoading }] = useCreateLanguageMutation();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [flag, setFlag] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!code.trim()) {
      errs.code = "Code is required";
    } else if (!/^[A-Za-z]{2,5}$/.test(code.trim())) {
      errs.code = "Code must be 2–5 letters (e.g. EN, ZH-TW)";
    } else if (existingLanguages.some((l) => l.code === code.trim().toUpperCase())) {
      errs.code = "This language code already exists";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    try {
      await createLanguage({
        name: name.trim(),
        code: code.trim().toUpperCase(),
        flag: flag.trim() || undefined,
      }).unwrap();
      toast.success(`Language "${name}" added as draft`);
      handleClose();
    } catch {
      toast.error("Failed to create language");
    }
  };

  const handleClose = () => {
    setName("");
    setCode("");
    setFlag("");
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Language">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>
            Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => { const { name: _, ...rest } = prev; return rest; });
            }}
            placeholder="e.g. English"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>
              Code <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (errors.code) setErrors((prev) => { const { code: _, ...rest } = prev; return rest; });
              }}
              placeholder="e.g. EN"
              maxLength={5}
              className={`${styles.input} ${errors.code ? styles.inputError : ""}`}
            />
            {errors.code && <p className={styles.errorText}>{errors.code}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Flag emoji</label>
            <input
              type="text"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              placeholder="e.g. 🇬🇧"
              className={styles.input}
            />
            <p className={styles.hint}>Optional</p>
          </div>
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Language"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
