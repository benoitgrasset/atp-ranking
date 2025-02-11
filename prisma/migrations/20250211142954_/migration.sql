-- CreateTable
CREATE TABLE "player2" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ranking" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "rankedAt" TIMESTAMP(3) NOT NULL,
    "birthDate" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "player2_pkey" PRIMARY KEY ("id")
);
