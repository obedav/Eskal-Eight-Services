# Deployment Guide - Eskal Eight Services

This guide will walk you through deploying your full-stack application with:
- **Frontend (React)** → Vercel
- **Backend (PHP)** → Railway.app

---

## 📋 Prerequisites

- [x] GitHub account (already have - repository created)
- [ ] [Vercel account](https://vercel.com/signup) (free)
- [ ] [Railway account](https://railway.app/) (free)
- [ ] Payment gateway accounts (Paystack, Flutterwave)

---

## 🚀 Part 1: Deploy Backend to Railway

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app/)
2. Click "Login" and sign up with GitHub
3. Authorize Railway to access your repositories

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository: `obedav/Eskal-Eight-Services`
4. Railway will detect it as a PHP application

### Step 3: Configure Root Directory
1. In your Railway project, click on "Settings"
2. Under "Build & Deploy" section:
   - Set **Root Directory**: `backend`
   - Set **Start Command**: `php -S 0.0.0.0:$PORT -t public`

### Step 4: Add Database (MySQL)
1. Click "New" → "Database" → "Add MySQL"
2. Railway will create a MySQL instance
3. Click on the MySQL service to see connection details

### Step 5: Set Environment Variables
1. Click on your backend service
2. Go to "Variables" tab
3. Add the following variables:

```bash
# Database Configuration
DB_HOST=<from MySQL service>
DB_PORT=<from MySQL service>
DB_NAME=<from MySQL service>
DB_USER=<from MySQL service>
DB_PASSWORD=<from MySQL service>

# App Configuration
APP_ENV=production
APP_DEBUG=false
APP_URL=<your-railway-url>

# JWT Secret (generate a random string)
JWT_SECRET=your-secure-random-string-here

# Payment Gateways
PAYSTACK_SECRET_KEY=your-paystack-secret-key
FLUTTERWAVE_SECRET_KEY=your-flutterwave-secret-key

# Email Configuration (if using SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM_ADDRESS=noreply@eskaleight.com
MAIL_FROM_NAME="Eskal Eight Services"

# CORS (set this to your Vercel frontend URL later)
CORS_ORIGIN=*
```

### Step 6: Deploy
1. Railway will automatically deploy your backend
2. Once deployed, you'll get a URL like: `https://eskaleight-backend.up.railway.app`
3. Copy this URL - you'll need it for the frontend

### Step 7: Import Database Schema
1. Connect to your Railway MySQL database using a client (TablePlus, MySQL Workbench, etc.)
2. Import your database schema from `backend/database/schema.sql`
3. Or use Railway's built-in database browser

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com/signup)
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository: `obedav/Eskal-Eight-Services`
3. Vercel will auto-detect it as a Create React App

### Step 3: Configure Project Settings
In the import screen:
- **Framework Preset**: Create React App
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### Step 4: Set Environment Variables
Click "Environment Variables" and add:

```bash
REACT_APP_API_URL=https://your-railway-backend-url.up.railway.app/api
REACT_APP_NAME=Eskal Eight Services
REACT_APP_ENVIRONMENT=production
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
REACT_APP_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-xxxxx
```

**IMPORTANT**: Replace `https://your-railway-backend-url.up.railway.app` with your actual Railway backend URL from Part 1, Step 6.

### Step 5: Deploy
1. Click "Deploy"
2. Vercel will build and deploy your frontend
3. You'll get a URL like: `https://eskal-eight-services.vercel.app`

### Step 6: Update Backend CORS
1. Go back to Railway
2. Update the `CORS_ORIGIN` environment variable with your Vercel URL:
```bash
CORS_ORIGIN=https://eskal-eight-services.vercel.app
```
3. Railway will automatically redeploy

---

## 🔧 Part 3: Configure Custom Domain (Optional)

### For Frontend (Vercel):
1. In Vercel project → Settings → Domains
2. Add your domain (e.g., `eskaleight.com`)
3. Follow DNS instructions provided by Vercel

### For Backend (Railway):
1. In Railway project → Settings → Domains
2. Click "Generate Domain" or add custom domain
3. Update frontend `REACT_APP_API_URL` in Vercel

---

## ✅ Part 4: Verify Deployment

### Test Backend:
```bash
curl https://your-railway-backend-url.up.railway.app/health
```
Should return:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-24 12:00:00"
}
```

### Test Frontend:
1. Visit your Vercel URL
2. Try to register/login
3. Check browser console for any API connection errors

---

## 🔄 Continuous Deployment

Both platforms are now set up for automatic deployments:

- **Push to `main` branch** → Both frontend and backend auto-deploy
- **Pull requests** → Vercel creates preview deployments
- **Rollback** → Available in both platforms

---

## 📊 Monitoring & Logs

### Railway Logs:
1. Click on your service
2. Go to "Deployments" tab
3. Click on a deployment to see logs

### Vercel Logs:
1. Go to your project
2. Click "Deployments"
3. Click on a deployment to see build and runtime logs

---

## 🛠️ Troubleshooting

### Backend Issues:

**Database connection errors:**
```bash
# Check Railway MySQL is running
# Verify environment variables are correct
# Check logs for specific error messages
```

**500 errors:**
```bash
# Check Railway logs
# Ensure all Composer dependencies installed
# Verify .env variables are set
```

### Frontend Issues:

**API connection errors:**
```bash
# Verify REACT_APP_API_URL is correct
# Check CORS settings in backend
# Open browser dev tools → Network tab
```

**Build failures:**
```bash
# Check Vercel build logs
# Ensure all npm dependencies in package.json
# Verify no hardcoded localhost URLs
```

---

## 💰 Cost Breakdown

### Free Tier Limits:

**Railway (Free Plan):**
- $5 credit per month
- ~500 hours of usage
- 1GB RAM
- MySQL database included

**Vercel (Hobby - Free):**
- 100GB bandwidth
- Unlimited deployments
- Automatic HTTPS
- Global CDN

### When to Upgrade:
- Railway: If you exceed $5/month usage (typically 1000+ users)
- Vercel: If you exceed 100GB bandwidth

---

## 🔐 Security Checklist

- [ ] Change all default passwords
- [ ] Set strong JWT_SECRET
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS only (both platforms handle this)
- [ ] Set proper CORS_ORIGIN (not *)
- [ ] Review file upload limits
- [ ] Enable rate limiting in production
- [ ] Regular database backups (Railway provides this)

---

## 📝 Environment Variables Reference

### Backend (.env):
```bash
# Database
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

# App
APP_ENV=production
APP_DEBUG=false
APP_URL=
JWT_SECRET=

# Payments
PAYSTACK_SECRET_KEY=
FLUTTERWAVE_SECRET_KEY=

# Email
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME=

# CORS
CORS_ORIGIN=
```

### Frontend (Vercel):
```bash
REACT_APP_API_URL=
REACT_APP_NAME=
REACT_APP_ENVIRONMENT=
REACT_APP_PAYSTACK_PUBLIC_KEY=
REACT_APP_FLUTTERWAVE_PUBLIC_KEY=
```

---

## 🎯 Quick Start Commands

### Local Development:
```bash
# Backend
cd backend
composer install
php -S localhost:8000 -t public

# Frontend
cd frontend
npm install
npm start
```

### Production URLs:
- Frontend: https://eskal-eight-services.vercel.app
- Backend: https://your-app.up.railway.app
- API Docs: https://your-app.up.railway.app/api

---

## 📞 Support

- Railway: https://railway.app/help
- Vercel: https://vercel.com/support
- GitHub Issues: https://github.com/obedav/Eskal-Eight-Services/issues

---

**Created:** 2025-10-24
**Last Updated:** 2025-10-24
**Version:** 1.0.0
