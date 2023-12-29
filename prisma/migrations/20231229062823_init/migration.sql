-- CreateEnum
CREATE TYPE "catagoryTyp" AS ENUM ('E', 'S');

-- CreateEnum
CREATE TYPE "ImmoStatus" AS ENUM ('DEC', 'RBI', 'CLO', 'ARV', 'NEW');

-- CreateEnum
CREATE TYPE "AssuType" AS ENUM ('AXA', 'DELA', 'DKV', 'AUTRE');

-- CreateEnum
CREATE TYPE "AssuStatus" AS ENUM ('DV1', 'DV2', 'OFA', 'OAC', 'PCD');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Homme', 'Femme');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('M', 'C');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('IMMO', 'ASSU');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'INACTIVE',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "maritalstatus" "MaritalStatus" NOT NULL,
    "birthday" TIMESTAMP(3),
    "mobile" TEXT,
    "email" TEXT,
    "address" TEXT,
    "notes" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "username" TEXT NOT NULL,
    "origin" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assurance" (
    "id" SERIAL NOT NULL,
    "comments" TEXT,
    "status" "AssuStatus" NOT NULL,
    "type" "AssuType" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "username" TEXT,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Assurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "type" "ProductType" NOT NULL,
    "personId" INTEGER NOT NULL,
    "assuId" INTEGER,
    "immoId" INTEGER,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "username" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rgpd" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personId" INTEGER NOT NULL,
    "signed" BOOLEAN NOT NULL DEFAULT false,
    "checksum" INTEGER NOT NULL,

    CONSTRAINT "Rgpd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solde" (
    "id" SERIAL NOT NULL,
    "denom" TEXT NOT NULL,
    "category" "catagoryTyp" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "conjoint" BOOLEAN NOT NULL DEFAULT false,
    "immoId" INTEGER NOT NULL,

    CONSTRAINT "Solde_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameter" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "visible" BOOLEAN DEFAULT false,
    "origin" TEXT,

    CONSTRAINT "Parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Immo" (
    "id" SERIAL NOT NULL,
    "anaDone" BOOLEAN NOT NULL DEFAULT false,
    "cachierCharge" TEXT,
    "debutClause" TIMESTAMP(3),
    "demandeCours" TEXT,
    "endDate" TIMESTAMP(3),
    "fileClosed" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "offerAccepted" BOOLEAN NOT NULL DEFAULT false,
    "offerDone" BOOLEAN NOT NULL DEFAULT false,
    "rechercheBien" TEXT,
    "startDate" TIMESTAMP(3),
    "immoStatus" "ImmoStatus" NOT NULL DEFAULT 'NEW',
    "maritalStatus" "MaritalStatus" NOT NULL,
    "salNet" DECIMAL(10,2) NOT NULL,
    "salNetCo" DECIMAL(10,2) NOT NULL,
    "chqRep" DECIMAL(10,2) NOT NULL,
    "chqRepCo" DECIMAL(10,2) NOT NULL,
    "autRev" DECIMAL(10,2) NOT NULL,
    "autRevCo" DECIMAL(10,2) NOT NULL,
    "prtTmp" DECIMAL(10,2) NOT NULL,
    "prtTmpCo" DECIMAL(10,2) NOT NULL,
    "autPrt" DECIMAL(10,2) NOT NULL,
    "autPrtCo" DECIMAL(10,2) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "username" TEXT,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Immo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Rgpd_personId_key" ON "Rgpd"("personId");

-- AddForeignKey
ALTER TABLE "Assurance" ADD CONSTRAINT "Assurance_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assuId_fkey" FOREIGN KEY ("assuId") REFERENCES "Assurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_immoId_fkey" FOREIGN KEY ("immoId") REFERENCES "Immo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rgpd" ADD CONSTRAINT "Rgpd_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Immo" ADD CONSTRAINT "Immo_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
