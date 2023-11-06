/*
  Warnings:

  - Made the column `cell` on table `doctors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "doctors" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "phone" SET DEFAULT 'null',
ALTER COLUMN "cell" SET NOT NULL,
ALTER COLUMN "cell" DROP DEFAULT;
