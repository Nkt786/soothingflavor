# SoothingFlavor Admin Dashboard

A comprehensive admin dashboard for managing products, inventory, orders, and business operations.

## Features

### 🔐 Authentication & Authorization
- **NextAuth.js** with credential-based authentication
- **Role-Based Access Control (RBAC)** with three levels:
  - **Admin**: Full access to all features
  - **Manager**: Products, inventory, orders, meal plans (cannot delete users)
  - **Staff**: Read inventory, update order status, stock in/out operations

### 📊 Dashboard Overview
- **Key Performance Indicators (KPIs)**:
  - Today's orders count
  - Revenue metrics
  - Pending approvals
  - Low stock alerts
- **Interactive Charts**:
  - Orders trend (7D/30D)
  - Revenue trends
  - Top categories performance
  - Stock movements visualization
- **Need Attention List**: Highlights critical items requiring immediate action

### 🛍️ Products Management
- **Data Table** with search, filtering, and pagination
- **CRUD Operations**: Add, edit, duplicate, archive, delete products
- **Bulk Actions**: Activate/deactivate multiple products, export CSV
- **Product Form** with organized tabs:
  - Basics (name, description, category)
  - Pricing (MRP, sale price)
  - Nutrition (calories, protein)
  - Images (upload and preview)
  - Visibility settings
- **Auto-generated slugs** and **tag management**

### 📦 Inventory Management
- **Stock Overview**: Current levels, reorder points, SKU tracking
- **Stock Movements**: Record stock in/out with reasons and notes
- **Movement Reasons**:
  - Purchase/Stock In
  - Order Fulfillment
  - Customer Returns
  - Wastage/Loss
  - Manual Adjustments
- **Low Stock Alerts** and **negative stock warnings**
- **Movement History** tracking with audit trail

### 🚚 Orders Management
- **Order Lifecycle Management**:
  - NEW → ACCEPTED → PREPARING → OUT_FOR_DELIVERY → DELIVERED
  - DECLINED/CANCELLED (with stock restoration)
- **Status Overview Cards** showing counts for each status
- **Order Details Drawer** with comprehensive information:
  - Customer details and contact info
  - Order items with images and pricing
  - Status timeline
  - Internal notes
  - Available actions based on current status
- **Automatic Inventory Adjustments** on status changes
- **Search and Filter** by status, customer, order number

### 🗓️ Meal Plans (Planned)
- Weekly and monthly meal plan creation
- Calendar-like editor interface
- Product assignment to specific days
- Publish/unpublish functionality

### 📋 Audit Logging
- **Comprehensive Tracking** of all administrative actions
- **User Activity Logs**: Who did what and when
- **Change History**: Before/after states for modifications
- **Export Capabilities** for compliance and reporting

## Technical Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **TanStack Table** for data tables
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation
- **Lucide React** for icons

### Backend
- **Next.js API Routes** for backend logic
- **Prisma ORM** for database operations
- **PostgreSQL/SQLite** database support
- **NextAuth.js** for authentication
- **bcryptjs** for password hashing

### Database Models
```prisma
User (Admin/Manager/Staff roles)
Product (with inventory relationship)
Inventory (stock tracking)
InventoryMovement (stock changes)
Order (with items)
OrderItem (order contents)
Category (product classification)
AuditLog (action tracking)
```

## Getting Started

### 1. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed:admin
```

### 2. Demo Accounts
After seeding, you can login with:

- **Admin**: `admin@demo.com` / `admin123`
- **Manager**: `manager@demo.com` / `manager123`
- **Staff**: `staff@demo.com` / `staff123`

### 3. Development
```bash
npm run dev
```

Navigate to `/admin` to access the dashboard.

## API Endpoints

### Dashboard
- `GET /api/admin/dashboard/kpis` - Dashboard KPIs
- `GET /api/admin/dashboard/attention` - Items needing attention
- `GET /api/admin/dashboard/charts` - Chart data

### Products
- `GET /api/admin/products` - List products
- `POST /api/admin/products` - Create product
- `GET /api/admin/products/[id]` - Get product
- `PATCH /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `GET /api/admin/categories` - List categories

### Inventory
- `GET /api/admin/inventory` - List inventory
- `POST /api/admin/inventory/movements` - Record stock movement
- `GET /api/admin/inventory/movements` - Get movement history

### Orders
- `GET /api/admin/orders` - List orders
- `PATCH /api/admin/orders/[id]/status` - Update order status

## Security Features

### Authentication
- JWT-based sessions with NextAuth.js
- Secure password hashing with bcryptjs
- Protected admin routes

### Authorization
- Server-side role verification
- Client-side UI adaptation based on user role
- Never trust client-side role information

### Data Validation
- Zod schemas for all form inputs
- Server-side validation for all API endpoints
- Input sanitization and type checking

## UI/UX Features

### Responsive Design
- Mobile-first approach
- Responsive tables and forms
- Touch-friendly interface elements

### Theme Consistency
- Mint/emerald color scheme matching brand
- Consistent spacing and typography
- Professional, clean aesthetic

### User Experience
- Loading states and skeletons
- Toast notifications for feedback
- Optimistic updates where appropriate
- Keyboard navigation support
- Screen reader accessibility

## Future Enhancements

### Planned Features
- **Meal Plans Management**: Weekly/monthly planning interface
- **Customer Management**: Customer database and analytics
- **Advanced Reporting**: Sales analytics, inventory reports
- **Export Functionality**: CSV/PDF exports for all data
- **Bulk Operations**: Mass updates and imports
- **Notification System**: Real-time alerts and updates

### Technical Improvements
- **Real-time Updates**: WebSocket integration for live data
- **Offline Support**: Service worker for offline functionality
- **Advanced Search**: Full-text search with filters
- **Performance Optimization**: Virtual scrolling for large datasets
- **Mobile App**: React Native companion app

## Contributing

### Development Guidelines
- Follow TypeScript best practices
- Use consistent naming conventions
- Implement proper error handling
- Write comprehensive tests
- Document new features

### Code Structure
```
src/
├── app/(admin)/admin/     # Admin routes
├── components/admin/       # Admin-specific components
├── lib/                   # Utilities and configurations
└── types/                 # TypeScript type definitions
```

## Support

For technical support or feature requests, please contact the development team or create an issue in the project repository.

---

**Built with ❤️ for SoothingFlavor**
