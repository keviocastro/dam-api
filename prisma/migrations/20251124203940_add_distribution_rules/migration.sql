/*
  Warnings:

  - You are about to drop the column `endDate` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Asset` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RuleType" AS ENUM ('DATE_RANGE', 'LOCATION', 'DEVICE');

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "ruleId" TEXT;

-- CreateTable
CREATE TABLE "DistributionRule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RuleType" NOT NULL,
    "config" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DistributionRule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "DistributionRule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
