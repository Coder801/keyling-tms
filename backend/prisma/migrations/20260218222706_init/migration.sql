-- CreateTable
CREATE TABLE "Translation" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Translation_key_language_version_key" ON "Translation"("key", "language", "version");

-- CreateIndex
CREATE UNIQUE INDEX "Version_name_key" ON "Version"("name");
