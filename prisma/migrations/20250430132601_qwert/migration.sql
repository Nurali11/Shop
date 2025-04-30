/*
  Warnings:

  - You are about to drop the column `xolati` on the `Product` table. All the data in the column will be lost.
  - Added the required column `status` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('New', 'Used');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "xolati",
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- DropEnum
DROP TYPE "Xolati";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
