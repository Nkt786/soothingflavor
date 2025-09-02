-- Supabase Database Setup for Soothing Flavor (Fixed)
-- Run this in Supabase SQL Editor

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  "emailVerified" TIMESTAMP,
  image TEXT,
  role TEXT DEFAULT 'USER',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(provider, "providerAccountId")
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "sessionToken" TEXT UNIQUE NOT NULL,
  "userId" TEXT NOT NULL,
  expires TIMESTAMP NOT NULL,
  FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);

-- Create verification_tokens table
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires TIMESTAMP NOT NULL,
  PRIMARY KEY(identifier, token)
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  "categoryId" TEXT,
  "priceMRP" DECIMAL(10,2) NOT NULL,
  "priceSale" DECIMAL(10,2),
  calories INTEGER,
  protein DECIMAL(5,2),
  veg BOOLEAN DEFAULT true,
  "isActive" BOOLEAN DEFAULT true,
  tags TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("categoryId") REFERENCES categories(id)
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "productId" TEXT UNIQUE NOT NULL,
  "stockQty" INTEGER DEFAULT 0,
  "reorderLevel" INTEGER DEFAULT 10,
  sku TEXT UNIQUE NOT NULL,
  unit TEXT DEFAULT 'g',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("productId") REFERENCES products(id) ON DELETE CASCADE
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "orderNumber" TEXT UNIQUE NOT NULL,
  "customerName" TEXT NOT NULL,
  "customerEmail" TEXT,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  status TEXT DEFAULT 'NEW',
  "paymentStatus" TEXT DEFAULT 'PENDING',
  subtotal DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  notes TEXT,
  "internalNotes" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "orderId" TEXT NOT NULL,
  "productId" TEXT,
  "productName" TEXT NOT NULL,
  "productSlug" TEXT,
  "productImage" TEXT,
  veg BOOLEAN,
  qty INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  "lineTotal" DECIMAL(10,2) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("orderId") REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY ("productId") REFERENCES products(id)
);

-- Create enums (without IF NOT EXISTS)
DO $$ BEGIN
    CREATE TYPE "OrderStatus" AS ENUM ('NEW', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Insert sample data
INSERT INTO categories (name, slug, description) VALUES 
('Meal Boxes', 'meal-boxes', 'Complete meal packages with protein, carbs, and vegetables'),
('Bowls', 'bowls', 'Nutritious grain bowls with fresh ingredients'),
('Wraps', 'wraps', 'Fresh and healthy wraps with whole grain tortillas'),
('Sandwiches', 'sandwiches', 'Wholesome sandwiches with fresh ingredients'),
('Salads', 'salads', 'Fresh garden salads with light dressings'),
('Juices', 'juices', 'Fresh fruit and vegetable juices'),
('Meal Plans', 'meal-plans', 'Subscription meal plans for different goals')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, description, "categoryId", "priceMRP", "priceSale", calories, protein, veg, tags, images) VALUES 
('Chicken Meal Box', 'chicken-meal-box', 'Protein-rich bowl with wholesome grains and seasonal veggies.', 
 (SELECT id FROM categories WHERE slug = 'meal-boxes'), 299, 249, 450, 35, false, 
 ARRAY['high-protein', 'non-veg', 'meal-box'], ARRAY['/images/products/chicken-meal-box.jpg']),
('Deluxe Meal Plan', 'deluxe-meal-plan', 'Premium lunch and dinner plan with freshly cooked meals.', 
 (SELECT id FROM categories WHERE slug = 'meal-plans'), 12999, 12499, 2000, 120, true, 
 ARRAY['meal-plan', 'premium', 'lunch-dinner'], ARRAY['/images/meal-plans/deluxe-meal-plan.jpg']),
('Regular Meal Plan', 'regular-meal-plan', 'Flexible meal plan offering lunch or dinner.', 
 (SELECT id FROM categories WHERE slug = 'meal-plans'), 5999, 5499, 1800, 90, true, 
 ARRAY['meal-plan', 'flexible', 'lunch-or-dinner'], ARRAY['/images/meal-plans/regular-meal-plan.jpg'])
ON CONFLICT (slug) DO NOTHING;

-- Insert sample users
INSERT INTO users (name, email, role) VALUES 
('Admin User', 'admin@demo.local', 'ADMIN'),
('Manager User', 'manager@demo.com', 'MANAGER'),
('Staff User', 'staff@demo.com', 'STAFF')
ON CONFLICT (email) DO NOTHING;
