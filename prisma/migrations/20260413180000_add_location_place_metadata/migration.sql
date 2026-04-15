-- CreateEnum
CREATE TYPE "LocationPriceSentiment" AS ENUM ('FREE', 'CHEAP', 'MID_RANGE', 'EXPENSIVE');

-- CreateEnum
CREATE TYPE "LocationPlaceCategory" AS ENUM ('TRANSPORTATION', 'ACCOMMODATION', 'FOOD', 'LANDSCAPE', 'LANDMARK', 'SHOPPING', 'ENTERTAINMENT', 'GENERIC');

-- AlterTable
ALTER TABLE "Location"
ADD COLUMN     "placeId" TEXT,
ADD COLUMN     "placeTypes" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "placeCategory" "LocationPlaceCategory",
ADD COLUMN     "appreciation" INTEGER,
ADD COLUMN     "priceSentiment" "LocationPriceSentiment",
ADD COLUMN     "notes" TEXT;

-- AddConstraint
ALTER TABLE "Location" ADD CONSTRAINT "Location_appreciation_range_check" CHECK ("appreciation" IS NULL OR ("appreciation" >= 1 AND "appreciation" <= 5));
