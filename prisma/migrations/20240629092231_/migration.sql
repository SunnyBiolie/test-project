/*
  Warnings:

  - You are about to drop the column `description` on the `Post` table. All the data in the column will be lost.
  - Made the column `hideLikeCounts` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `turnOffCmt` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "description",
ADD COLUMN     "caption" TEXT,
ALTER COLUMN "hideLikeCounts" SET NOT NULL,
ALTER COLUMN "turnOffCmt" SET NOT NULL;
