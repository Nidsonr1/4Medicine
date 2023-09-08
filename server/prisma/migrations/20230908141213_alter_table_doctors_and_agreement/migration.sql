/*
  Warnings:

  - You are about to drop the column `doctor_id` on the `Agreement` table. All the data in the column will be lost.
  - Added the required column `agreementId` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agreement" DROP CONSTRAINT "Agreement_doctor_id_fkey";

-- AlterTable
ALTER TABLE "Agreement" DROP COLUMN "doctor_id";

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "agreementId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_agreementId_fkey" FOREIGN KEY ("agreementId") REFERENCES "Agreement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
