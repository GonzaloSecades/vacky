-- AlterTable
DROP INDEX "Session_sessionToken_key";
ALTER TABLE "Session" ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken");
