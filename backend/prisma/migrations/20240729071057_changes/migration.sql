/*
  Warnings:

  - A unique constraint covering the columns `[assetId]` on the table `IssuedPoints` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assetId` to the `IssuedPoints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `IssuedPoints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionHash` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IssuedPoints" ADD COLUMN     "assetId" TEXT NOT NULL,
ADD COLUMN     "transactionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "transactionHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "IssuedPoints_assetId_key" ON "IssuedPoints"("assetId");
