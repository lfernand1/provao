-- DropForeignKey
ALTER TABLE "UsersList" DROP CONSTRAINT "UsersList_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "UsersList" ADD CONSTRAINT "UsersList_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
