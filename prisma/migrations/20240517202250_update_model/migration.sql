-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;
