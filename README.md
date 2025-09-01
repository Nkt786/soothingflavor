# Soothing Flavor - Health & Wellness Platform

A modern, responsive web application built with Next.js 15, TypeScript, and Tailwind CSS, designed to provide healthy meal plans, wellness coaching, and nutritious products.

## 🚀 Features

### Core Functionality
- **Home Page** - Landing page with hero section, features, and testimonials
- **About Page** - Company story, mission, and values
- **Products Catalog** - E-commerce functionality with shopping cart
- **Meal Plans** - Detailed meal planning with nutritional information
- **Blog** - Health and wellness articles
- **Health Coaching** - Personalized coaching services and packages

### Technical Features
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **TypeScript** - Full type safety and better development experience
- **Next.js 15** - Latest features with App Router and Turbopack
- **Authentication Ready** - NextAuth.js integration for user management
- **Database Ready** - Prisma ORM with PostgreSQL support
- **Image Optimization** - Next.js Image component for performance
- **Error Handling** - Comprehensive error boundaries and fallbacks

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM, PostgreSQL
- **State Management**: Zustand
- **UI Components**: Custom component library with Radix UI primitives
- **Icons**: Lucide React
- **Build Tool**: Turbopack

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog page
│   ├── health-coaching/   # Health coaching page
│   ├── meal-plans/        # Meal plans pages
│   ├── products/          # Products page
│   └── api/               # API routes
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components
│   ├── commerce/          # E-commerce components
│   └── marketing/         # Marketing components
├── lib/                    # Utility functions and configurations
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Database client
│   └── store/             # State management
└── types/                  # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd soothingflavor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3001"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 📱 Available Pages

- **Home** (`/`) - Landing page with hero section
- **About** (`/about`) - Company information and mission
- **Products** (`/products`) - Product catalog with cart
- **Meal Plans** (`/meal-plans`) - Available meal plans
- **Individual Meal Plans** (`/meal-plans/[slug]`) - Detailed meal plan information
- **Blog** (`/blog`) - Health and wellness articles
- **Health Coaching** (`/health-coaching`) - Coaching services

## 🛒 E-commerce Features

- Product catalog with categories
- Shopping cart functionality
- Product search and filtering
- Responsive product cards
- Add to cart with quantity management

## 🍽️ Meal Planning Features

- Multiple meal plan types (Weight Loss, Athletic, Maintenance, Keto)
- Detailed nutritional information
- Calorie and macro breakdowns
- Meal suggestions for each plan
- Pricing and subscription options

## 🔐 Authentication

The app is configured with NextAuth.js and supports:
- Google OAuth
- Email authentication
- JWT sessions
- Role-based access control

## 🎨 Customization

### Styling
- Uses Tailwind CSS for consistent design
- Custom color scheme with green/blue gradients
- Responsive breakpoints for all devices
- Dark mode ready (can be easily implemented)

### Components
- Modular component architecture
- Reusable UI components
- Consistent design patterns
- Easy to extend and modify

## 📊 Performance

- **Image Optimization** - Next.js Image component with automatic optimization
- **Code Splitting** - Automatic route-based code splitting
- **Static Generation** - Pre-rendered pages for better SEO
- **Bundle Analysis** - Optimized JavaScript bundles

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Code Quality

- ESLint configuration for code quality
- Prettier for consistent formatting
- TypeScript for type safety
- Husky for pre-commit hooks (can be added)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Configuration

### Next.js Config
- Turbopack enabled for faster development
- Image domains configured
- Environment variables loaded
- API routes configured

### Database
- Prisma schema with comprehensive models
- Seed data for development
- Migration support for production

## 📈 Future Enhancements

- [ ] User dashboard and profile management
- [ ] Order management system
- [ ] Payment integration (Stripe)
- [ ] Real-time chat support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Dark mode toggle

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
- All contributors and supporters

---
available commands 
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
**Built with ❤️ for healthy living and wellness**
"# soothing_flavor" 
