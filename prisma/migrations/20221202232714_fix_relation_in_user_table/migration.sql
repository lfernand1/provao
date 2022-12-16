-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_commonCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_admCategoryId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "commonCategoryId" DROP NOT NULL,
ALTER COLUMN "admCategoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_commonCategoryId_fkey" FOREIGN KEY ("commonCategoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_admCategoryId_fkey" FOREIGN KEY ("admCategoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
