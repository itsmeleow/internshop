/*
  Warnings:

  - Added the required column `externalUrl` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN "externalUrl" TEXT;
UPDATE "Job" SET "externalUrl" = 'https://example.com' WHERE "externalUrl" IS NULL;
ALTER TABLE "Job" ALTER COLUMN "externalUrl" SET NOT NULL;
