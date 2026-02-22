/*
  Warnings:

  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TranslationHistory" DROP CONSTRAINT "TranslationHistory_translationId_fkey";

-- DropTable
DROP TABLE "Translation";

-- CreateTable
CREATE TABLE "Translations" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Translations_key_language_version_key" ON "Translations"("key", "language", "version");

-- AddForeignKey
ALTER TABLE "TranslationHistory" ADD CONSTRAINT "TranslationHistory_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "Translations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
