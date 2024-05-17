/*
  Warnings:

  - Changed the type of `company` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Company" AS ENUM ('IKEA', 'LIDDY', 'CARESSA', 'MARCOS');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "company",
ADD COLUMN     "company" "Company" NOT NULL;
