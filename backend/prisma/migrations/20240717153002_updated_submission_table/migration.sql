/*
  Warnings:

  - Added the required column `status` to the `submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testcases` to the `submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "submission" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "testcases" TEXT NOT NULL;
