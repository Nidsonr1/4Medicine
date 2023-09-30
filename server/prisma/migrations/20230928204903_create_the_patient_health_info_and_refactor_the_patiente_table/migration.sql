/*
  Warnings:

  - You are about to drop the column `birthdate` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `bloodType` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `civilStatus` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `fatherName` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `patients` table. All the data in the column will be lost.
  - Added the required column `dateOfBirth` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patients" DROP COLUMN "birthdate",
DROP COLUMN "bloodType",
DROP COLUMN "civilStatus",
DROP COLUMN "color",
DROP COLUMN "fatherName",
DROP COLUMN "motherName",
ADD COLUMN     "dateOfBirth" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PatientHealthInfo" (
    "id" TEXT NOT NULL,
    "condition" TEXT[],
    "allergies" TEXT[],
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "PatientHealthInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PatientHealthInfo" ADD CONSTRAINT "PatientHealthInfo_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
