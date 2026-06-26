/*
  Warnings:

  - You are about to drop the column `stripeSubscriptionId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionStatus` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeSessionId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OrderStatus" ADD VALUE 'PAID';
ALTER TYPE "OrderStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "stripePaymentIntentId" TEXT,
ADD COLUMN     "stripeSessionId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "stripeSubscriptionId",
DROP COLUMN "subscriptionStatus";

-- CreateIndex
CREATE UNIQUE INDEX "orders_stripeSessionId_key" ON "orders"("stripeSessionId");
