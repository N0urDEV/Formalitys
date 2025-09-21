/*
  Warnings:

  - The values [PENDING_PAYMENT,IN_PROGRESS,CANCELLED] on the enum `DossierStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."DossierStatus_new" AS ENUM ('DRAFT', 'PAID', 'COMPLETED');
ALTER TABLE "public"."CompanyDossier" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."TourismDossier" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."CompanyDossier" ALTER COLUMN "status" TYPE "public"."DossierStatus_new" USING ("status"::text::"public"."DossierStatus_new");
ALTER TABLE "public"."TourismDossier" ALTER COLUMN "status" TYPE "public"."DossierStatus_new" USING ("status"::text::"public"."DossierStatus_new");
ALTER TYPE "public"."DossierStatus" RENAME TO "DossierStatus_old";
ALTER TYPE "public"."DossierStatus_new" RENAME TO "DossierStatus";
DROP TYPE "public"."DossierStatus_old";
ALTER TABLE "public"."CompanyDossier" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
ALTER TABLE "public"."TourismDossier" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;
