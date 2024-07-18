/*
  Warnings:

  - Added the required column `problem_id` to the `submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "submission" ADD COLUMN     "problem_id" TEXT NOT NULL;
