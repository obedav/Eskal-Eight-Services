# ESKAL EIGHT SERVICES - Installation Checklist

## 📋 Pre-Installation Requirements

- [ ] PHP 8.0 or higher installed
- [ ] MySQL 5.7 or higher installed
- [ ] Node.js 16+ and npm installed
- [ ] Composer installed
- [ ] Apache/Nginx web server
- [ ] Git (optional, for version control)

---

## 🔧 Backend Setup

### Step 1: Install Dependencies
```bash
cd backend
composer install
```
**Expected result:** All PHP dependencies installed in `vendor/` folder

- [ ] Dependencies installed successfully
- [ ] No error messages

### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file:
```env
DB_HOST=localhost
DB_NAME=eskal_eight_db
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD_HERE

JWT_SECRET=CHANGE_THIS_TO_RANDOM_STRING
JWT_EXPIRY=3600

FRONTEND_URL=http://localhost:3000
```

- [ ] .env file created
- [ ] Database credentials set
- [ ] JWT_SECRET changed to random string
- [ ] Frontend URL configured

**Generate random JWT secret:**
```bash
php -r "echo bin2hex(random_bytes(32));"
```

### Step 3: Create Database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE eskal_eight_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

- [ ] Database created successfully

### Step 4: Run Migration
```bash
mysql -u root -p eskal_eight_db < database/migrations/001_create_users_table.sql
```

**Verify migration:**
```bash
mysql -u root -p eskal_eight_db -e "DESCRIBE users;"
```

- [ ] Users table created
- [ ] Default admin user inserted

### Step 5: Configure Web Server

#### Apache
Ensure `mod_rewrite` is enabled:
```bash
sudo a2enmod rewrite
sudo service apache2 restart
```

Create virtual host pointing to `backend/public/`

- [ ] mod_rewrite enabled
- [ ] Virtual host configured
- [ ] .htaccess file exists in public/

#### Nginx
Add server block pointing to `backend/public/index.php`

- [ ] Server block configured
- [ ] PHP-FPM configured

### Step 6: Test Backend API
```bash
curl http://localhost/api/health
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-10-19 12:00:00"
  }
}
```

- [ ] API responds correctly
- [ ] Health check passes

**Test authentication endpoint:**
```bash
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eskaleight.com","password":"Admin@123"}'
```

- [ ] Login endpoint works
- [ ] JWT token received

---

## 💻 Frontend Setup

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

- [ ] All npm packages installed
- [ ] No critical errors
- [ ] node_modules/ folder created

### Step 2: Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
REACT_APP_API_URL=http://localhost/api
REACT_APP_PAYSTACK_PUBLIC_KEY=your-key-here
REACT_APP_FLUTTERWAVE_PUBLIC_KEY=your-key-here
```

- [ ] .env.local created
- [ ] API URL configured correctly

### Step 3: Start Development Server
```bash
npm start
```

**Expected result:** App opens at http://localhost:3000

- [ ] Development server starts
- [ ] No compilation errors
- [ ] Browser opens automatically

### Step 4: Test Frontend

Visit these URLs:

- [ ] http://localhost:3000 - Home page loads
- [ ] http://localhost:3000/services - Services page loads
- [ ] http://localhost:3000/login - Login page loads
- [ ] http://localhost:3000/register - Register page loads

---

## ✅ Functionality Tests

### Test 1: User Registration
1. Go to `/register`
2. Fill in all fields
3. Submit form

**Expected:**
- [ ] Form submits successfully
- [ ] No validation errors
- [ ] Redirected to dashboard
- [ ] User token stored

### Test 2: User Login
1. Go to `/login`
2. Use: `admin@eskaleight.com` / `Admin@123`
3. Submit form

**Expected:**
- [ ] Login successful
- [ ] Token received
- [ ] Redirected to `/admin/dashboard`
- [ ] Dashboard displays correctly

### Test 3: Protected Routes
1. Logout (clear localStorage)
2. Try to visit `/client/dashboard`

**Expected:**
- [ ] Redirected to `/login`
- [ ] Route protection works

### Test 4: Admin Access
1. Login as regular user
2. Try to visit `/admin/dashboard`

**Expected:**
- [ ] Redirected to client dashboard
- [ ] Admin route protection works

### Test 5: Password Reset Flow
1. Go to `/forgot-password`
2. Enter email
3. Submit

**Expected:**
- [ ] Success message shown
- [ ] No errors

### Test 6: Quote Request
1. Login as client
2. Go to `/request-quote`
3. Fill form
4. Submit

**Expected:**
- [ ] Form validates correctly
- [ ] Can select service
- [ ] Can upload files
- [ ] Submits successfully

### Test 7: Services Browse
1. Go to `/services`
2. Click category filters
3. View different services

**Expected:**
- [ ] All 6 services display
- [ ] Filters work
- [ ] Request quote button works

---

## 🔍 Troubleshooting Checks

### Backend Issues

#### Issue: Database Connection Failed
- [ ] MySQL is running
- [ ] Database exists
- [ ] Credentials in .env are correct
- [ ] User has permissions

#### Issue: 404 on API Routes
- [ ] mod_rewrite enabled (Apache)
- [ ] .htaccess exists in public/
- [ ] Virtual host pointing to public/ folder
- [ ] URL rewriting configured (Nginx)

#### Issue: CORS Errors
- [ ] Checked allowed origins in `config/cors.php`
- [ ] Frontend URL matches .env
- [ ] CORS headers being sent

#### Issue: JWT Token Invalid
- [ ] JWT_SECRET same as when token created
- [ ] Token not expired
- [ ] Authorization header format correct

### Frontend Issues

#### Issue: Blank Page
- [ ] Check browser console for errors
- [ ] Check network tab for API calls
- [ ] Ensure API URL is correct

#### Issue: API Calls Failing
- [ ] Backend is running
- [ ] API URL in .env.local is correct
- [ ] CORS configured properly
- [ ] Network connectivity

#### Issue: Routes Not Working
- [ ] BrowserRouter configured
- [ ] Routes file imported
- [ ] No JavaScript errors

---

## 📊 Final Verification

### Backend Checklist
- [ ] Composer dependencies installed
- [ ] .env configured
- [ ] Database created and migrated
- [ ] Web server configured
- [ ] API endpoints responding
- [ ] Default admin login works

### Frontend Checklist
- [ ] NPM packages installed
- [ ] .env.local configured
- [ ] Development server runs
- [ ] All pages load
- [ ] Authentication works
- [ ] Protected routes work

### Documentation Checklist
- [ ] README.md read
- [ ] QUICK_START.md reviewed
- [ ] LOGIN_SETUP_GUIDE.md bookmarked
- [ ] IMPLEMENTATION_SUMMARY.md reviewed

---

## 🎯 Success Criteria

You're ready to proceed when:

✅ Backend API responds to health check
✅ Frontend loads without errors
✅ Can register new user
✅ Can login with admin credentials
✅ Protected routes redirect properly
✅ Services page displays all services
✅ Quote request form submits
✅ Admin and client dashboards accessible

---

## 🚀 Post-Installation Tasks

### Immediate
1. [ ] Change default admin password
2. [ ] Create a regular user account for testing
3. [ ] Test all authentication flows
4. [ ] Review brand colors on all pages

### Short Term
1. [ ] Configure payment gateways (Paystack/Flutterwave)
2. [ ] Setup email service (SMTP)
3. [ ] Implement quote management backend
4. [ ] Create additional admin pages

### Long Term
1. [ ] Add project tracking
2. [ ] Build messaging system
3. [ ] Create analytics dashboard
4. [ ] Setup automated backups

---

## 🆘 Getting Help

If you encounter issues:

1. Check error logs:
   - Backend: `backend/storage/logs/error.log`
   - Apache: `/var/log/apache2/error.log`
   - Browser: Developer Console

2. Review documentation:
   - LOGIN_SETUP_GUIDE.md (troubleshooting section)
   - QUICK_START.md
   - README.md

3. Common fixes:
   - Clear browser cache
   - Restart web server
   - Check file permissions
   - Verify .env configuration

---

## ✅ Installation Complete!

Once all items are checked, your ESKAL EIGHT SERVICES platform is ready for development!

**Next Step:** Start building the quote management system!

---

**Installation Date:** _________________

**Installed By:** _________________

**Notes:**
_____________________________________________
_____________________________________________
_____________________________________________
