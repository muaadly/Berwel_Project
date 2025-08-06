-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."songs" (
    "id" TEXT NOT NULL,
    "songName" TEXT NOT NULL,
    "singer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "writer" TEXT,
    "composer" TEXT,
    "recordingStatus" TEXT NOT NULL,
    "lyricsStatus" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."maloof_entries" (
    "id" TEXT NOT NULL,
    "entryName" TEXT NOT NULL,
    "entryType" TEXT NOT NULL,
    "entryRhythm" TEXT NOT NULL,
    "typeEntryImage" TEXT NOT NULL,

    CONSTRAINT "maloof_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."song_likes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "song_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."song_comments" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "song_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."maloof_likes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "maloof_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."maloof_comments" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maloof_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "song_likes_userId_songId_key" ON "public"."song_likes"("userId", "songId");

-- CreateIndex
CREATE UNIQUE INDEX "maloof_likes_userId_entryId_key" ON "public"."maloof_likes"("userId", "entryId");

-- AddForeignKey
ALTER TABLE "public"."song_likes" ADD CONSTRAINT "song_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."song_likes" ADD CONSTRAINT "song_likes_songId_fkey" FOREIGN KEY ("songId") REFERENCES "public"."songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."song_comments" ADD CONSTRAINT "song_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."song_comments" ADD CONSTRAINT "song_comments_songId_fkey" FOREIGN KEY ("songId") REFERENCES "public"."songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."maloof_likes" ADD CONSTRAINT "maloof_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."maloof_likes" ADD CONSTRAINT "maloof_likes_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "public"."maloof_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."maloof_comments" ADD CONSTRAINT "maloof_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."maloof_comments" ADD CONSTRAINT "maloof_comments_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "public"."maloof_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
