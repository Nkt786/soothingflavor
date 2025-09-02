# Netlify Deployment Guide for Soothing Flavor

## 🚀 Quick Deploy Steps

### 1. Connect to Netlify
1. Go to [Netlify](https://netlify.com) and sign in
2. Click "New site from Git"
3. Connect your GitHub account
4. Select the `soothingflavor` repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** `20`

### 2. Set Environment Variables
In Netlify UI → Site settings → Environment variables, add:

```
DATABASE_URL=your_postgresql_connection_string
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXT_PUBLIC_API_URL=https://your-site-name.netlify.app
```

### 3. Deploy
1. Click "Deploy site"
2. Wait for build to complete
3. Your site will be live at `https://your-site-name.netlify.app`

## 📋 Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | Secret key for authentication | `your-random-secret-key-here` |
| `NEXTAUTH_URL` | Your Netlify site URL | `https://your-site.netlify.app` |
| `NEXT_PUBLIC_API_URL` | Public API URL | `https://your-site.netlify.app` |

## 🗄️ Database Setup

### Option 1: Supabase (Recommended)
1. Create account at [Supabase](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy the connection string
5. Set as `DATABASE_URL` in Netlify

### Option 2: PlanetScale
1. Create account at [PlanetScale](https://planetscale.com)
2. Create new database
3. Get connection string
4. Set as `DATABASE_URL` in Netlify

### Option 3: Railway
1. Create account at [Railway](https://railway.app)
2. Create PostgreSQL service
3. Get connection string
4. Set as `DATABASE_URL` in Netlify

## 🔧 Database Migration

After setting up the database, run migrations:

```bash
# In Netlify Functions or locally
npx prisma migrate deploy
npx prisma generate
```

## 🛠️ Troubleshooting

### Build Fails
- Check Node.js version is 20
- Ensure all environment variables are set
- Check build logs for specific errors

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Ensure database is accessible from Netlify
- Check if database requires SSL

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set
- Ensure `NEXTAUTH_URL` matches your site URL
- Check NextAuth configuration

### API Routes Not Working
- Ensure `NEXT_PUBLIC_API_URL` is set correctly
- Check if API routes are properly configured
- Verify database connection for API routes

## 📁 File Structure

```
├── netlify.toml          # Netlify configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
└── src/                  # Application source code
    ├── app/              # Next.js app directory
    ├── components/       # React components
    ├── lib/              # Utility functions
    └── middleware.ts     # Next.js middleware
```

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch triggers automatic deployment
- Preview deployments are created for pull requests
- Build status is shown in GitHub

## 📊 Monitoring

- **Build logs:** Available in Netlify dashboard
- **Function logs:** Check Netlify Functions tab
- **Database:** Monitor your database provider's dashboard
- **Analytics:** Enable Netlify Analytics in site settings

## 🚀 Performance Tips

1. **Enable Netlify CDN:** Automatic with Netlify
2. **Optimize images:** Use Next.js Image component
3. **Database optimization:** Use connection pooling
4. **Caching:** Implement proper caching strategies

## 📞 Support

If you encounter issues:
1. Check Netlify build logs
2. Verify environment variables
3. Test database connection
4. Review Next.js documentation
5. Check Prisma documentation

## 🎉 Success!

Once deployed, your Soothing Flavor application will be live and accessible to users worldwide!
