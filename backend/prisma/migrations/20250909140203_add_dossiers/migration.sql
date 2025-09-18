-- CreateEnum
CREATE TYPE "public"."DossierStatus" AS ENUM ('DRAFT', 'PENDING_PAYMENT', 'PAID', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."CompanyDossier" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "public"."DossierStatus" NOT NULL DEFAULT 'DRAFT',
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "associates" JSONB,
    "companyName" TEXT,
    "activities" JSONB,
    "proposedNames" JSONB,
    "headquarters" TEXT,
    "capital" INTEGER,
    "selectedBank" TEXT,
    "uploadedFiles" JSONB,
    "paymentIntentId" TEXT,
    "paymentStatus" TEXT,
    "amountPaid" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyDossier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TourismDossier" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "public"."DossierStatus" NOT NULL DEFAULT 'DRAFT',
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "ownerInfo" JSONB,
    "propertyDetails" JSONB,
    "complianceAnswers" JSONB,
    "uploadedFiles" JSONB,
    "uploadedPhotos" JSONB,
    "paymentIntentId" TEXT,
    "paymentStatus" TEXT,
    "amountPaid" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TourismDossier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CompanyDossier" ADD CONSTRAINT "CompanyDossier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TourismDossier" ADD CONSTRAINT "TourismDossier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
