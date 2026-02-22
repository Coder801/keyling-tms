-- CreateTable
CREATE TABLE "TranslationHistory" (
    "id" TEXT NOT NULL,
    "translationId" TEXT NOT NULL,
    "oldValue" TEXT NOT NULL,
    "editedBy" TEXT NOT NULL,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TranslationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TranslationHistory_translationId_editedAt_idx" ON "TranslationHistory"("translationId", "editedAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "TranslationHistory" ADD CONSTRAINT "TranslationHistory_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "Translation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
