-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."CompanyDossier" ADD COLUMN     "adresseSiege" TEXT,
ADD COLUMN     "dateDepotDeclaration" TEXT,
ADD COLUMN     "discountApplied" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "discountReason" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fax" TEXT,
ADD COLUMN     "finalPrice" INTEGER,
ADD COLUMN     "formeJuridique" TEXT,
ADD COLUMN     "nationalite" TEXT,
ADD COLUMN     "numeroAffiliationCNSS" TEXT,
ADD COLUMN     "numeroArticleTaxeProfessionnelle" TEXT,
ADD COLUMN     "numeroArticleTaxeServicesCommunaux" TEXT,
ADD COLUMN     "numeroRegistreCommerce" TEXT,
ADD COLUMN     "originalPrice" INTEGER,
ADD COLUMN     "professionActivite" TEXT,
ADD COLUMN     "raisonSociale" TEXT,
ADD COLUMN     "referenceDepotDeclaration" TEXT,
ADD COLUMN     "telephone" TEXT,
ADD COLUMN     "villeRegistreCommerce" TEXT,
ADD COLUMN     "villeSiege" TEXT;

-- AlterTable
ALTER TABLE "public"."TourismDossier" ADD COLUMN     "discountApplied" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "discountReason" TEXT,
ADD COLUMN     "establishmentInfo" JSONB,
ADD COLUMN     "finalPrice" INTEGER,
ADD COLUMN     "originalPrice" INTEGER;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "loyaltyTier" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "resetPasswordExpires" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT,
ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "totalDossiersCompleted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalDossiersCreated" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."discount_history" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dossierId" INTEGER,
    "dossierType" TEXT,
    "discountPercentage" INTEGER NOT NULL,
    "discountAmount" INTEGER NOT NULL,
    "originalPrice" INTEGER NOT NULL,
    "finalPrice" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discount_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blog_posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "featuredImage" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "public"."blog_posts"("slug");

-- AddForeignKey
ALTER TABLE "public"."discount_history" ADD CONSTRAINT "discount_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blog_posts" ADD CONSTRAINT "blog_posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
