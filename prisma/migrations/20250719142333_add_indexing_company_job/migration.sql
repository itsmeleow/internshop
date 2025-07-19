-- AlterTable
ALTER TABLE "User" ADD COLUMN     "appliedJobs" TEXT[];

-- CreateIndex
CREATE INDEX "Company_atsType_idx" ON "Company"("atsType");

-- CreateIndex
CREATE INDEX "Job_companyId_idx" ON "Job"("companyId");

-- CreateIndex
CREATE INDEX "Job_location_idx" ON "Job"("location");

-- CreateIndex
CREATE INDEX "Job_timeType_idx" ON "Job"("timeType");
