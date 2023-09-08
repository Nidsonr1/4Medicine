/*
  Warnings:

  - You are about to drop the column `agreementId` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the `Agreement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_agreementId_fkey";

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "agreementId";

-- DropTable
DROP TABLE "Agreement";
