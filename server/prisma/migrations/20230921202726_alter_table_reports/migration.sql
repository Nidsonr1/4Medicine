/*
  Warnings:

  - You are about to drop the `doctorsReports` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `doctor_id` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "doctorsReports" DROP CONSTRAINT "doctorsReports_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "doctorsReports" DROP CONSTRAINT "doctorsReports_report_id_fkey";

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "doctor_id" TEXT NOT NULL,
ADD COLUMN     "sharedBy" TEXT[];

-- DropTable
DROP TABLE "doctorsReports";

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
