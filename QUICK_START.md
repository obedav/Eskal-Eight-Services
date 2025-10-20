# ESKAL EIGHT SERVICES - Quick Start Guide

## 🚀 Quick Installation (5 Minutes)

### Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
composer install

# 3. Setup environment
cp .env.example .env
# Edit .env with your database credentials

# 4. Create database
mysql -u root -p
CREATE DATABASE eskal_eight_db;
exit

# 5. Run migration
mysql -u root -p eskal_eight_db < database/migrations/001_create_users_table.sql

# 6. Test API
curl http://localhost/api/health
```

### Frontend Setup

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env.local
# Edit REACT_APP_API_URL if needed

# 4. Start development server
npm start
```

## ✅ Quick Test

1. Open browser: `http://localhost:3000/login`
2. Login with default admin:
   - Email: `admin@eskaleight.com`
   - Password: `Admin@123`

## 📁 What Was Created

### Backend Files
- ✅ `backend/app/Models/User.php` - User model with auth methods
- ✅ `backend/app/Controllers/AuthController.php` - Login/register logic
- ✅ `backend/app/Helpers/Router.php` - Simple routing system
- ✅ `backend/routes/auth.php` - Authentication routes
- ✅ `backend/public/index.php` - API entry point
- ✅ `backend/database/migrations/001_create_users_table.sql` - Users table

### Frontend Files
- ✅ `frontend/src/components/auth/LoginForm.jsx` - Login UI
- ✅ `frontend/src/components/auth/RegisterForm.jsx` - Registration UI
- ✅ `frontend/src/context/AuthContext.jsx` - Auth state management
- ✅ `frontend/src/pages/Login.jsx` - Login page
- ✅ `frontend/src/pages/Register.jsx` - Register page
- ✅ `frontend/src/components/routes/ProtectedRoute.jsx` - Route protection
- ✅ `frontend/src/components/routes/AdminRoute.jsx` - Admin route protection

## 🎨 Brand Colors (Already Configured)

```css
Primary (Deep Blue):    #0B1F3F
Secondary (Sky Blue):   #1E90FF
Background (White):     #FFFFFF
Text (Gray):            #4B4B4B
```

## 🔑 API Endpoints

### Public
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Request password reset

### Protected (Requires JWT)
- `GET /api/auth/verify` - Verify token
- `GET /api/auth/me` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

## 🔒 Security Features

✅ JWT token authentication
✅ Password hashing (bcrypt)
✅ CORS protection
✅ Input sanitization
✅ SQL injection prevention (prepared statements)
✅ XSS protection
✅ Role-based access control

## 📝 Next Steps

1. Change default admin password
2. Configure payment gateways (Paystack/Flutterwave)
3. Setup email service
4. Build dashboard components
5. Implement quote request system

## 🆘 Need Help?

See detailed documentation: `LOGIN_SETUP_GUIDE.md`

## 📊 User Roles

- **client** - Regular customers
- **admin** - Company administrators
- **super_admin** - System administrators

## 🎯 Default Admin Account

**⚠️ Change immediately after first login!**

```
Email: admin@eskaleight.com
Password: Admin@123
```

---

**Ready to build! 🎉**
