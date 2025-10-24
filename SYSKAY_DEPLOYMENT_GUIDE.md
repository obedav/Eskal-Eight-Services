# Syskay Hosting Deployment Guide - Eskal Eight Services

Complete step-by-step guide to deploy your application with:
- **Backend (PHP)** → Syskay Shared Hosting
- **Frontend (React)** → Vercel

---

## 📋 What You Already Have
- ✅ Domain from Syskay
- ✅ Hosting from Syskay
- ✅ GitHub repository: `obedav/Eskal-Eight-Services`

---

## 🚀 Part 1: Deploy Backend to Syskay Hosting

### Step 1: Access Your Syskay cPanel
1. Go to [Syskay Client Area](https://syskay.com/clientarea.php)
2. Login with your credentials
3. Navigate to "Services" → "My Services"
4. Click "Login to cPanel"

### Step 2: Create MySQL Database
1. In cPanel, find **"MySQL Databases"**
2. Create a new database:
   - Database Name: `eskaleight_db` (or your preferred name)
   - Click "Create Database"
3. Create a database user:
   - Username: `eskaleight_user`
   - Password: Generate a strong password (save it!)
   - Click "Create User"
4. Add user to database:
   - Select the user and database you created
   - Grant **ALL PRIVILEGES**
   - Click "Make Changes"

**📝 Save these details - you'll need them:**
```
Database Host: localhost
Database Name: eskaleight_db (or with your cPanel prefix, e.g., cpaneluser_eskaleight_db)
Database User: eskaleight_user (or cpaneluser_eskaleight_user)
Database Password: [your generated password]
```

### Step 3: Import Database Schema
1. In cPanel, open **"phpMyAdmin"**
2. Select your database from the left sidebar
3. Click **"Import"** tab
4. Click **"Choose File"**
5. Upload: `backend/database/schema.sql` (from your local project)
6. Click **"Go"** to import
7. Verify tables are created

### Step 4: Upload Backend Files

**Option A: Using File Manager (Easiest)**
1. In cPanel, open **"File Manager"**
2. Navigate to `public_html/` folder
3. Create a new folder: `api` (this will be your backend)
4. Enter the `api` folder
5. Upload all files from your local `backend/` directory:
   - Click "Upload"
   - Select all files from `C:\Users\obeda\Desktop\ESKAL-EIGHT-SERVICES\backend`
   - Wait for upload to complete

**Option B: Using FTP (Recommended for large files)**
1. In cPanel, find **"FTP Accounts"**
2. Use the main FTP account or create a new one
3. Download FileZilla from: https://filezilla-project.org/
4. Connect using:
   - Host: ftp.yourdomain.com
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21
5. Navigate to `/public_html/api/`
6. Upload all files from `backend/` folder

**Option C: Using Git (Advanced)**
1. In cPanel, open **"Terminal"** (if available)
2. Navigate to public_html:
   ```bash
   cd public_html
   ```
3. Clone your repository:
   ```bash
   git clone https://github.com/obedav/Eskal-Eight-Services.git temp
   mv temp/backend api
   rm -rf temp
   ```

### Step 5: Configure Backend Environment
1. In File Manager, navigate to `public_html/api/`
2. Find the `.env.example` file
3. Right-click → "Copy"
4. Rename copy to `.env`
5. Right-click `.env` → "Edit"
6. Update with your details:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=eskaleight_db
DB_USER=eskaleight_user
DB_PASSWORD=your_database_password_here

# App Configuration
APP_NAME="ESKAL EIGHT SERVICES"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
APP_VERSION=1.0.0

# JWT Secret (generate random string)
JWT_SECRET=your-super-secret-random-string-here-make-it-long-and-complex

# Payment Gateway Keys
PAYSTACK_SECRET_KEY=sk_live_your_paystack_secret_key
FLUTTERWAVE_SECRET_KEY=FLWSECK-your_flutterwave_secret_key

# Email Configuration (use your domain email)
MAIL_HOST=mail.yourdomain.com
MAIL_PORT=587
MAIL_USERNAME=noreply@yourdomain.com
MAIL_PASSWORD=your_email_password
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="Eskal Eight Services"
MAIL_ENCRYPTION=tls

# CORS Configuration
CORS_ORIGIN=https://yourdomain.vercel.app
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_HEADERS=Content-Type,Authorization,X-Requested-With
CORS_CREDENTIALS=true

# Security
SESSION_LIFETIME=120
UPLOAD_MAX_SIZE=10485760
```

7. Click "Save Changes"

### Step 6: Install Composer Dependencies
1. In cPanel, open **"Terminal"** (if available)
2. Navigate to your backend:
   ```bash
   cd public_html/api
   ```
3. Install dependencies:
   ```bash
   composer install --optimize-autoloader --no-dev
   ```

**If Terminal is not available:**
- Contact Syskay support to run: `composer install` in your `/public_html/api` directory
- Or upload the `vendor/` folder from your local machine (after running `composer install` locally)

### Step 7: Set Correct Permissions
In File Manager:
1. Select `storage/` folder → Right-click → "Permissions"
   - Set to: **755** (or **775** if 755 doesn't work)
   - Check "Recurse into subdirectories"
   - Click "Change Permissions"

2. Select `storage/logs/` folder → Set to **755**
3. Select `storage/uploads/` folder → Set to **755**

### Step 8: Configure Root .htaccess
1. Navigate to `public_html/`
2. Edit `.htaccess` (or create if doesn't exist)
3. Add this at the top:

```apache
# Redirect API requests to backend
<IfModule mod_rewrite.c>
    RewriteEngine On

    # API routes
    RewriteCond %{REQUEST_URI} ^/api
    RewriteRule ^api/(.*)$ /api/public/$1 [L]
</IfModule>
```

### Step 9: Test Your Backend
Open your browser and test:

```
https://yourdomain.com/api/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-24 12:00:00"
}
```

If you see this, your backend is working! 🎉

**If you get errors:**
- Check error logs: cPanel → "Errors" or `storage/logs/`
- Verify database connection in `.env`
- Ensure `vendor/` folder exists
- Check file permissions

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com/signup)
2. Sign up with GitHub
3. Authorize Vercel

### Step 2: Import Your Project
1. Click "Add New..." → "Project"
2. Select: `obedav/Eskal-Eight-Services`
3. Configure:
   - **Framework**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 3: Set Environment Variables
Add these in Vercel:

```bash
REACT_APP_API_URL=https://yourdomain.com/api
REACT_APP_NAME=Eskal Eight Services
REACT_APP_ENVIRONMENT=production
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_live_your_public_key
REACT_APP_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_your_public_key
```

**IMPORTANT**: Replace `yourdomain.com` with your actual Syskay domain!

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. You'll get a URL: `https://eskal-eight-services.vercel.app`

### Step 5: Update Backend CORS
1. Go back to your Syskay cPanel
2. Edit `public_html/api/.env`
3. Update CORS_ORIGIN:
```bash
CORS_ORIGIN=https://eskal-eight-services.vercel.app
```

### Step 6: Add Custom Domain to Vercel (Optional)
If you want to use your Syskay domain for frontend:
1. In Vercel → Settings → Domains
2. Add: `app.yourdomain.com` or `yourdomain.com`
3. Update DNS in Syskay cPanel:
   - Add CNAME record pointing to Vercel

---

## 🌐 Part 3: Configure Domain (Optional)

### Option A: Use Subdomain for Frontend
```
Main Site: yourdomain.com → Syskay (could be landing page)
API: yourdomain.com/api → Backend on Syskay
App: app.yourdomain.com → Frontend on Vercel
```

### Option B: Use Main Domain for Frontend
```
Frontend: yourdomain.com → Vercel
API: api.yourdomain.com → Syskay backend
```

To set this up:
1. In Syskay cPanel → "Zone Editor"
2. Add subdomain:
   - Type: A Record
   - Name: `api`
   - Points to: Your Syskay server IP
3. Upload backend to `public_html/` instead of `public_html/api/`

---

## ✅ Deployment Checklist

### Pre-Deployment:
- [ ] Database created and user assigned
- [ ] Database schema imported
- [ ] All backend files uploaded
- [ ] `.env` file configured with correct credentials
- [ ] Composer dependencies installed
- [ ] File permissions set (755 for storage/)

### Backend Testing:
- [ ] `/api/health` endpoint returns healthy status
- [ ] Database connection working
- [ ] Error logs are empty
- [ ] Test user registration
- [ ] Test login functionality

### Frontend Deployment:
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] API_URL points to correct backend
- [ ] Build succeeds
- [ ] Frontend loads in browser

### Post-Deployment:
- [ ] Update CORS_ORIGIN in backend
- [ ] Test complete user flow (register → login → use features)
- [ ] Verify payment integration
- [ ] Test file uploads
- [ ] Check email sending
- [ ] Monitor error logs

---

## 🔐 Security Best Practices

### On Syskay Hosting:
1. **Protect .env file:**
   Add to `public_html/api/.htaccess`:
   ```apache
   <Files .env>
       Order allow,deny
       Deny from all
   </Files>
   ```

2. **Disable directory listing:**
   Already in your `.htaccess` with `Options -Indexes`

3. **Keep vendor/ secure:**
   Add to `.htaccess`:
   ```apache
   <IfModule mod_rewrite.c>
       RewriteRule ^vendor/ - [F,L]
   </IfModule>
   ```

4. **Regular backups:**
   - Use cPanel "Backup" feature weekly
   - Download database backups

5. **Update PHP version:**
   - In cPanel → "Select PHP Version"
   - Use PHP 8.0 or higher

---

## 📊 Monitoring & Maintenance

### Check Logs:
1. **Error Logs:** cPanel → "Errors"
2. **Application Logs:** `public_html/api/storage/logs/`
3. **Access Logs:** cPanel → "Raw Access"

### Regular Tasks:
- **Weekly:** Check error logs
- **Monthly:** Database backup
- **Quarterly:** Update dependencies (`composer update`)

---

## 🛠️ Troubleshooting

### Common Issues:

**1. 500 Internal Server Error**
```bash
# Check PHP version (needs 8.0+)
# Check .htaccess syntax
# View error logs in cPanel
# Verify file permissions
```

**2. Database Connection Failed**
```bash
# Verify credentials in .env
# Check database exists in phpMyAdmin
# Confirm user has privileges
# Try "localhost" vs "127.0.0.1"
```

**3. Composer not installed**
```bash
# Contact Syskay support
# Or upload vendor/ folder from local
```

**4. CORS Errors**
```bash
# Update CORS_ORIGIN in .env
# Clear browser cache
# Check backend logs
```

**5. File Upload Issues**
```bash
# Check storage/ permissions (755)
# Verify php.ini upload limits
# In cPanel → "MultiPHP INI Editor"
# Increase upload_max_filesize and post_max_size
```

---

## 💡 Performance Tips

### On Syskay:
1. **Enable OPcache:**
   - cPanel → "MultiPHP INI Editor"
   - Enable `opcache.enable=1`

2. **Optimize Composer:**
   ```bash
   composer install --optimize-autoloader --no-dev --classmap-authoritative
   ```

3. **Enable Gzip Compression:**
   Add to `.htaccess`:
   ```apache
   <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
   </IfModule>
   ```

### On Vercel:
- Vercel automatically handles optimization
- Uses global CDN
- Automatic HTTPS

---

## 📁 Final Directory Structure on Syskay

```
public_html/
├── api/                          # Your backend
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── public/
│   │   ├── index.php            # Entry point
│   │   └── .htaccess
│   ├── routes/
│   ├── storage/
│   ├── vendor/
│   ├── .env                     # Your config (KEEP SECURE!)
│   └── composer.json
├── .htaccess                     # Root htaccess
└── (other files)
```

---

## 🎯 Quick Reference

### Your URLs:
```
Backend API: https://yourdomain.com/api
Frontend App: https://eskal-eight-services.vercel.app
Health Check: https://yourdomain.com/api/health
phpMyAdmin: https://yourdomain.com:2083/phpMyAdmin
cPanel: https://yourdomain.com:2083
```

### Important Files:
```
Backend Config: public_html/api/.env
Backend Entry: public_html/api/public/index.php
Error Logs: public_html/api/storage/logs/
Root Redirect: public_html/.htaccess
```

---

## 📞 Support Contacts

- **Syskay Support:** https://syskay.com/submitticket.php
- **Vercel Support:** https://vercel.com/support
- **Documentation:** This file!

---

## 🎉 You're Done!

Once everything is deployed:
1. Visit your Vercel frontend URL
2. Test registration and login
3. Verify all features work
4. Share your app with users!

**Deployment Date:** 2025-10-24
**Version:** 1.0.0
**Stack:** React (Vercel) + PHP (Syskay) + MySQL

---

**Need Help?** Check the troubleshooting section or contact Syskay support!
