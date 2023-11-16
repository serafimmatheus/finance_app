-- CreateEnum
CREATE TYPE "ShoppingType" AS ENUM ('un', 'kg');

-- CreateTable
CREATE TABLE "shoppings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "ShoppingType" NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "shoppings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shoppings" ADD CONSTRAINT "shoppings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
