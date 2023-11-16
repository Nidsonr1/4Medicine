/*
  Warnings:

  - You are about to drop the column `doctor_id` on the `exams` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "exams" DROP CONSTRAINT "exams_doctor_id_fkey";

-- AlterTable
ALTER TABLE "exams" DROP COLUMN "doctor_id";
