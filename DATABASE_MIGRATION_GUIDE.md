# Database Migration Guide

## 🎯 **Complete Database Setup for Berwel Music Library**

### **What We've Built:**
- ✅ **PostgreSQL Database** with Prisma ORM
- ✅ **User Management** - Store registered users
- ✅ **Likes System** - Track song and maloof likes
- ✅ **Comments System** - Store and manage comments
- ✅ **Admin Panel** - View users and activity statistics
- ✅ **API Routes** - RESTful endpoints for all operations
- ✅ **Seed Script** - Populate database with existing data

---

## **Step 1: Database Setup**

### **Option A: Vercel Postgres (Recommended for Production)**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project or select existing
3. Go to Storage → Create Database → Postgres
4. Copy the connection string

### **Option B: Local PostgreSQL**
1. Install PostgreSQL locally
2. Create database: `createdb berwel_music_library`
3. Connection string: `postgresql://username:password@localhost:5432/berwel_music_library`

### **Option C: Railway (Alternative)**
1. Go to [Railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Copy the connection string

---

## **Step 2: Environment Configuration**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="your-postgres-connection-string-here"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (existing)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

---

## **Step 3: Database Migration**

Run these commands in order:

```bash
# 1. Generate Prisma client
npx prisma generate

# 2. Create and apply database migrations
npx prisma migrate dev --name init

# 3. Seed database with existing song/maloof data
pnpm db:seed
```

---

## **Step 4: Update Components**

The components need to be updated to use the new database API instead of localStorage. Here's what needs to be changed:

### **Files to Update:**
1. `components/song-detail.tsx` - Use database API for likes/comments
2. `components/maloof-detail.tsx` - Use database API for likes/comments
3. `components/auth-provider.tsx` - Create users in database on sign-in

### **Key Changes:**
- Replace localStorage functions with API calls
- Update user ID handling (use database user ID)
- Add proper error handling
- Implement real-time updates

---

## **Step 5: Test the System**

### **Test User Registration:**
1. Sign in with Google
2. Check `/admin` page to see user created
3. Verify user appears in database

### **Test Likes System:**
1. Like a song
2. Check like count updates
3. Verify like persists across sessions

### **Test Comments System:**
1. Add a comment
2. Edit/delete comment
3. Verify comments persist

### **Test Admin Panel:**
1. Visit `/admin`
2. View user statistics
3. Check activity tracking

---

## **Step 6: Deployment**

### **Vercel Deployment:**
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### **Environment Variables for Production:**
```env
DATABASE_URL="your-production-postgres-url"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

---

## **Database Schema Overview**

### **Tables Created:**
- `users` - Registered users
- `songs` - Song data
- `maloof_entries` - Maloof entry data
- `song_likes` - Song likes (many-to-many)
- `song_comments` - Song comments
- `maloof_likes` - Maloof likes (many-to-many)
- `maloof_comments` - Maloof comments

### **Key Features:**
- ✅ **User Authentication** - Google OAuth integration
- ✅ **Like System** - Track user likes with proper relationships
- ✅ **Comment System** - Full CRUD operations
- ✅ **Admin Panel** - User management and statistics
- ✅ **Data Persistence** - All data stored in PostgreSQL
- ✅ **Scalability** - Ready for production use

---

## **Benefits of This Migration:**

### **Before (localStorage):**
- ❌ Data lost when browser clears
- ❌ No cross-device sync
- ❌ No user management
- ❌ No admin features
- ❌ Limited scalability

### **After (Database):**
- ✅ **Persistent Data** - All data stored permanently
- ✅ **Cross-Device Sync** - Works on all devices
- ✅ **User Management** - Track registered users
- ✅ **Admin Panel** - View users and activity
- ✅ **Production Ready** - Scalable and secure
- ✅ **Real-time Updates** - Instant like/comment updates

---

## **Next Steps:**

1. **Set up database** using one of the options above
2. **Configure environment variables**
3. **Run migrations and seed data**
4. **Update components** to use new API
5. **Test thoroughly**
6. **Deploy to production**

This migration will transform your music library from a simple localStorage app into a full-featured, production-ready web application! 🎵✨ 