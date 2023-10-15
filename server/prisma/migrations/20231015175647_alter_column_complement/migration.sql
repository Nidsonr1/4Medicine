-- AlterTable
ALTER TABLE "patients" ALTER COLUMN "complement" DROP NOT NULL,
ALTER COLUMN "complement" SET DEFAULT '';
