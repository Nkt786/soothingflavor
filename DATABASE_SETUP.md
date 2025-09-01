# 🗄️ Database Setup Guide for Production

This guide will help you set up your production database for the Soothing Flavor project.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository ready
- Project running locally

## 🚀 Step-by-Step Database Setup

### **Step 1: Choose Your Production Database**

#### **Option A: Vercel Postgres (Recommended)**
```bash
# 1. Go to Vercel Dashboard
# 2. Create new project
# 3. Add Postgres database
# 4. Copy connection string
```

#### **Option B: Supabase (Great Alternative)**
```bash
# 1. Go to supabase.com
# 2. Create new project
# 3. Get connection string from Settings > Database
```

#### **Option C: PlanetScale (MySQL)**
```bash
# 1. Go to planetscale.com
# 2. Create new database
# 3. Get connection string
```

### **Step 2: Set Up Environment Variables**

Create `.env.local` for development:
```env
# Development (SQLite)
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3001"
NODE_ENV="development"
```

For production, you'll need:
```env
# Production (PostgreSQL)
DATABASE_URL="postgresql://username:password@host:port/database"
NEXTAUTH_SECRET="your-production-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"
NODE_ENV="production"
```

### **Step 3: Database Migration Commands**

#### **For Development (SQLite):**
```bash
# Use SQLite for local development
npm run db:dev
npm run db:seed:simple
```

#### **For Production (PostgreSQL):**
```bash
# Generate Prisma client
npm run db:generate

# Run migrations on production
npm run db:migrate:deploy

# Seed production database
npm run db:seed:simple
```

### **Step 4: Vercel Deployment Setup**

#### **A. Create Vercel Postgres Database:**
1. Go to [vercel.com](https://vercel.com)
2. Create new project from GitHub
3. In project settings, go to "Storage"
4. Create new Postgres database
5. Copy the connection string

#### **B. Set Environment Variables on Vercel:**
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-project.vercel.app"
```

#### **C. Deploy with Database:**
```bash
# Push to GitHub
git add .
git commit -m "Add production database setup"
git push origin main

# Vercel will automatically deploy
```

### **Step 5: Database Verification**

#### **Check Database Connection:**
```bash
# Test local development
npm run db:studio

# Test production (after deployment)
# Go to Vercel dashboard > Storage > View your database
```

#### **Verify Tables Created:**
- Users
- Categories
- Products
- Inventory
- Orders
- OrderItems
- AuditLogs

### **Step 6: Production Database Commands**

#### **After Deployment:**
```bash
# Run migrations on production
npx prisma migrate deploy

# Seed production data
npx prisma db seed

# View production database
npx prisma studio --schema=./prisma/schema.prisma
```

## 🔧 Troubleshooting

### **Common Issues:**

#### **1. Migration Errors:**
```bash
# Reset database (development only)
npx prisma migrate reset

# Force push schema
npx prisma db push --force-reset
```

#### **2. Connection Issues:**
- Check DATABASE_URL format
- Verify database credentials
- Ensure database is accessible

#### **3. Seed Data Issues:**
```bash
# Clear and reseed
npx prisma db seed --force
```

## 📊 Database Schema Overview

### **Core Tables:**
- **Users** - Admin and staff accounts
- **Categories** - Product categories
- **Products** - Product catalog
- **Inventory** - Stock management
- **Orders** - Customer orders
- **OrderItems** - Order details
- **AuditLogs** - Activity tracking

### **Demo Data Included:**
- Admin users (admin@demo.local, manager@demo.com, staff@demo.com)
- Sample categories (Vegan Sweets, Nut Butters, etc.)
- Sample products with inventory
- Demo orders

## 🚀 Quick Start Commands

```bash
# Development setup
npm run db:dev
npm run db:seed:simple
npm run dev

# Production deployment
npm run db:generate
npm run db:migrate:deploy
npm run db:seed:simple
```

## 📝 Environment Variables Reference

| Variable | Development | Production |
|----------|-------------|------------|
| DATABASE_URL | `file:./prisma/dev.db` | `postgresql://...` |
| NEXTAUTH_SECRET | `dev-secret` | `production-secret` |
| NEXTAUTH_URL | `http://localhost:3001` | `https://your-domain.com` |
| NODE_ENV | `development` | `production` |

## 🔐 Security Notes

- Never commit `.env` files to Git
- Use strong NEXTAUTH_SECRET in production
- Regularly rotate database credentials
- Enable database backups in production

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test database connection
4. Review Prisma migration status

---

**Your database is now ready for production! 🎉**
