/*
  Warnings:

  - You are about to alter the column `title` on the `specialties` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(100)`.
  - You are about to drop the `doctorSpecialty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "doctorSpecialty" DROP CONSTRAINT "doctorSpecialty_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "doctorSpecialty" DROP CONSTRAINT "doctorSpecialty_specialtyId_fkey";

-- AlterTable
ALTER TABLE "specialties" ALTER COLUMN "title" SET DATA TYPE VARCHAR(100);

-- DropTable
DROP TABLE "doctorSpecialty";

-- CreateTable
CREATE TABLE "doctor_specialties" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "specialtyId" TEXT NOT NULL,

    CONSTRAINT "doctor_specialties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_doctor_specialty_doctorId" ON "doctor_specialties"("doctorId");

-- CreateIndex
CREATE INDEX "idx_doctor_specialty_specialtyId" ON "doctor_specialties"("specialtyId");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_specialties_doctorId_specialtyId_key" ON "doctor_specialties"("doctorId", "specialtyId");

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
