/*
  Warnings:

  - Added the required column `star` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "star" DOUBLE PRECISION NOT NULL;
