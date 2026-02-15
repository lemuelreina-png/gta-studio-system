-- CreateTable
CREATE TABLE "Intake" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "instagram" TEXT,
    "designSummary" TEXT NOT NULL,
    "placement" TEXT NOT NULL,
    "sizeEstimate" TEXT,
    "appointmentDate" DATETIME,
    "appointmentTime" TEXT,
    "depositStatus" TEXT NOT NULL DEFAULT 'NOT_PAID',
    "depositAmount" REAL,
    "notes" TEXT,
    "referenceImagePath" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
