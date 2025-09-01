# Soothing Flavor - Health & Wellness Platform

A modern, responsive web application built with Next.js 15, TypeScript, and Tailwind CSS, designed to provide healthy meal plans, wellness coaching, and nutritious products.

## 🚀 Features

### Core Functionality
- **Home Page** - Landing page with hero section, features, and testimonials
- **About Page** - Company story, mission, and values
- **Products Catalog** - E-commerce functionality with shopping cart
- **Meal Plans** - Detailed meal planning with nutritional information
- **Admin Dashboard** - Complete order and inventory management system
- **Order Management** - Track orders, manage inventory, and view analytics

### Technical Features
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **TypeScript** - Full type safety and better development experience
- **Next.js 15** - Latest features with App Router and Turbopack
- **Authentication Ready** - NextAuth.js integration for user management
- **Database Ready** - Prisma ORM with SQLite (dev) / PostgreSQL (production)
- **Image Optimization** - Next.js Image component for performance
- **Error Handling** - Comprehensive error boundaries and fallbacks
- **Admin Panel** - Role-based access control (Admin, Manager, Staff)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: NextAuth.js (JWT sessions)
- **Database**: Prisma ORM, SQLite (dev), PostgreSQL (production)
- **State Management**: Zustand for cart, React Query for server state
- **UI Components**: Custom component library with Radix UI primitives
- **Icons**: Lucide React
- **Build Tool**: Turbopack

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (storefront)/      # Customer-facing pages
│   │   ├── about/         # About page
│   │   ├── products/      # Product catalog
│   │   ├── meal-plans/    # Meal plans pages
│   │   ├── checkout/      # Checkout process
│   │   └── contact/       # Contact page
│   ├── admin/             # Admin dashboard
│   │   ├── products/      # Product management
│   │   ├── orders/        # Order management
│   │   ├── inventory/     # Inventory tracking
│   │   └── dashboard/     # Analytics and KPIs
│   └── api/               # API routes
│       ├── admin/         # Admin API endpoints
│       ├── orders/        # Order management APIs
│       └── auth/          # Authentication APIs
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── admin/             # Admin-specific components
│   ├── commerce/          # E-commerce components
│   └── marketing/         # Marketing components
├── lib/                    # Utility functions and configurations
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Database client
│   └── store/             # State management (Zustand)
└── context/                # React contexts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nkt786/soothingflavor.git
   cd soothingflavor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   # Database
   DATABASE_URL="file:./prisma/dev.db"
   
   # NextAuth Configuration
   NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
   NEXTAUTH_URL="http://localhost:3001"
   
   # Development
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed:simple
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 📱 Available Pages

### Customer Pages
- **Home** (`/`) - Landing page with hero section
- **About** (`/about`) - Company information and mission
- **Products** (`/products`) - Product catalog with cart
- **Meal Plans** (`/meal-plans`) - Available meal plans
- **Checkout** (`/checkout`) - Shopping cart and order process
- **Contact** (`/contact`) - Contact information

### Admin Pages
- **Admin Dashboard** (`/admin`) - Main admin panel
- **Products Management** (`/admin/products`) - Add/edit products
- **Orders Management** (`/admin/orders`) - View and manage orders
- **Inventory Tracking** (`/admin/inventory`) - Stock management
- **Analytics** (`/admin/dashboard`) - KPIs and charts

## 🛒 E-commerce Features

- Product catalog with categories and filtering
- Shopping cart with persistent state
- Product search and filtering
- Responsive product cards
- Add to cart with quantity management
- Checkout process
- Order tracking

## 🍽️ Meal Planning Features

- Multiple meal plan types (Weight Loss, Athletic, Maintenance, Keto)
- Detailed nutritional information
- Calorie and macro breakdowns
- Meal suggestions for each plan
- Pricing and subscription options

## 🔐 Authentication & Admin Access

### Demo Accounts (Created by seed script)
- **Admin**: `admin@demo.local` / `admin123`
- **Manager**: `manager@demo.com` / `manager123`
- **Staff**: `staff@demo.com` / `staff123`

### Features
- Role-based access control (Admin, Manager, Staff)
- JWT session management
- Protected admin routes
- User management system

## 🎨 Customization

### Styling
- Uses Tailwind CSS for consistent design
- Custom color scheme with green/blue gradients
- Responsive breakpoints for all devices
- Dark mode ready (can be easily implemented)
- shadcn/ui components for consistent UI

### Components
- Modular component architecture
- Reusable UI components
- Consistent design patterns
- Easy to extend and modify

## 📊 Performance & Features

- **Image Optimization** - Next.js Image component with automatic optimization
- **Code Splitting** - Automatic route-based code splitting
- **Static Generation** - Pre-rendered pages for better SEO
- **Bundle Analysis** - Optimized JavaScript bundles
- **Admin Analytics** - Real-time KPIs and charts
- **Inventory Management** - Stock tracking and alerts

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 3001)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run linting

# Database
npm run db:studio       # Open Prisma Studio
npm run db:migrate      # Run migrations
npm run db:seed:simple  # Seed with sample data

# Utilities
npm run clean           # Clean build files
npm run dev:free        # Kill port 3001 and start dev
```

### Code Quality

- ESLint configuration for code quality
- TypeScript for type safety
- Prettier for consistent formatting
- Husky for pre-commit hooks (can be added)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect repository to Vercel
3. Configure environment variables:
   ```env
   DATABASE_URL="postgresql://your-production-db-url"
   NEXTAUTH_SECRET="your-production-secret"
   NEXTAUTH_URL="https://your-domain.vercel.app"
   ```
4. Deploy automatically

### Database Migration for Production
```bash
# For PostgreSQL (production)
npx prisma migrate deploy
npm run db:seed:simple
```

### Other Platforms
- Netlify (requires static export config)
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Configuration

### Next.js Config
- Turbopack enabled for faster development
- Image domains configured
- Environment variables loaded
- API routes configured
- Vercel deployment optimized

### Database
- Prisma schema with comprehensive models
- SQLite for development
- PostgreSQL for production
- Seed data for development
- Migration support for production

## 📈 Admin Dashboard Features

- **Real-time KPIs** - Orders, revenue, inventory alerts
- **Order Management** - View, update, and track orders
- **Product Management** - Add, edit, and manage products
- **Inventory Tracking** - Stock levels and movement history
- **Analytics Charts** - Sales trends and performance metrics
- **User Management** - Role-based access control

## 📈 Future Enhancements

- [x] Admin dashboard with analytics
- [x] Order management system
- [x] Inventory tracking
- [x] Role-based authentication
- [ ] Payment integration (Stripe)
- [ ] Real-time chat support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Email notifications
- [ ] SMS alerts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Prisma team for the excellent ORM
- shadcn/ui for the beautiful component library
- All contributors and supporters

---

**Built with ❤️ for healthy living and wellness** 
   
 #   S o o t h i n g   F l a v o r   -   L i v e   D e p l o y m e n t   T e s t  
 