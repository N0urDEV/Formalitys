-- DropForeignKey
ALTER TABLE "public"."CompanyDossier" DROP CONSTRAINT "CompanyDossier_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TourismDossier" DROP CONSTRAINT "TourismDossier_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."blog_posts" DROP CONSTRAINT "blog_posts_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."discount_history" DROP CONSTRAINT "discount_history_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."CompanyDossier" ADD CONSTRAINT "CompanyDossier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TourismDossier" ADD CONSTRAINT "TourismDossier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."discount_history" ADD CONSTRAINT "discount_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blog_posts" ADD CONSTRAINT "blog_posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
