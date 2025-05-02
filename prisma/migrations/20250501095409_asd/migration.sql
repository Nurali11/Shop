-- CreateTable
CREATE TABLE "Sessions" (
    "id" SERIAL NOT NULL,
    "device" JSONB NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);
