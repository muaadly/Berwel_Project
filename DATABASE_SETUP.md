# Database Setup Guide

## Step 1: Create Environment File

Create a `.env` file in the root directory with the following content:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/berwel_music_library"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (you'll need to add these)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

## Step 2: Database Options

### Option A: Local PostgreSQL
1. Install PostgreSQL locally
2. Create a database named `berwel_music_library`
3. Update the DATABASE_URL with your credentials

### Option B: Vercel Postgres (Recommended for Production)
1. Go to Vercel Dashboard
2. Create a new Postgres database
3. Copy the connection string to your DATABASE_URL

### Option C: Railway (Alternative)
1. Go to Railway.app
2. Create a new PostgreSQL database
3. Copy the connection string

## Step 3: Run Database Migrations

After setting up your database, run:

```bash
npx prisma migrate dev --name init
```

## Step 4: Generate Prisma Client

```bash
npx prisma generate
```

## Step 5: Seed Database (Optional)

Run the seed script to populate with initial data:

```bash
npx prisma db seed
``` 