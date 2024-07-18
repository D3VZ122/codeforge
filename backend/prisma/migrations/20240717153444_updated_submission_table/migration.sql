/*
  Warnings:

  - Added the required column `language` to the `submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "submission" ADD COLUMN     "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "language" TEXT NOT NULL;
