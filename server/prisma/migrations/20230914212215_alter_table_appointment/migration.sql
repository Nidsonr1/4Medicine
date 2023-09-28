/*
  Warnings:

  - You are about to drop the column `date` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `hour` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `description` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "date",
DROP COLUMN "hour",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
