-- CreateEnum
CREATE TYPE "TransType" AS ENUM ('DEBIT', 'CREDIT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Brand" (
    "brandId" SERIAL NOT NULL,
    "brandRepId" INTEGER NOT NULL,
    "brandName" TEXT NOT NULL,
    "description" TEXT,
    "otherDetails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("brandId")
);

-- CreateTable
CREATE TABLE "BrandTokens" (
    "brandTokenId" SERIAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "pointName" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BrandTokens_pkey" PRIMARY KEY ("brandTokenId")
);

-- CreateTable
CREATE TABLE "IssuedPoints" (
    "issuedPointId" SERIAL NOT NULL,
    "brandTokenId" INTEGER NOT NULL,
    "assetId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "totalSupply" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IssuedPoints_pkey" PRIMARY KEY ("issuedPointId")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "transactionId" SERIAL NOT NULL,
    "issuedPointId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionType" "TransType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipientAddress" TEXT,
    "transactionHash" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("transactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_brandRepId_key" ON "Brand"("brandRepId");

-- CreateIndex
CREATE UNIQUE INDEX "BrandTokens_brandId_key" ON "BrandTokens"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "IssuedPoints_assetId_key" ON "IssuedPoints"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "IssuedPoints_transactionId_key" ON "IssuedPoints"("transactionId");

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_brandRepId_fkey" FOREIGN KEY ("brandRepId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandTokens" ADD CONSTRAINT "BrandTokens_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("brandId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssuedPoints" ADD CONSTRAINT "IssuedPoints_brandTokenId_fkey" FOREIGN KEY ("brandTokenId") REFERENCES "BrandTokens"("brandTokenId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_issuedPointId_fkey" FOREIGN KEY ("issuedPointId") REFERENCES "IssuedPoints"("issuedPointId") ON DELETE RESTRICT ON UPDATE CASCADE;
