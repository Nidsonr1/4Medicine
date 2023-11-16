/*
  Warnings:

  - Added the required column `documentTitle` to the `exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentTitle` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exams" ADD COLUMN     "documentTitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "documentTitle" TEXT NOT NULL;
