# ESKAL EIGHT SERVICES - Login System Setup Guide

## Overview
This guide will help you set up the complete authentication system for the ESKAL EIGHT SERVICES platform.

---

## Backend Setup

### 1. Install Dependencies

First, navigate to the backend directory and install PHP dependencies:

```bash
cd backend
composer install
```

Required packages:
- `firebase/php-jwt` - For JWT token handling
- `vlucas/phpdotenv` - For environment variables

### 2. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure your database and JWT settings:

```env
DB_HOST=localhost
DB_NAME=eskal_eight_db
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRY=3600
```

### 3. Create Database

Create your MySQL database:

```sql
CREATE DATABASE eskal_eight_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Run Database Migration

Execute the users table migration:

```bash
mysql -u root -p eskal_eight_db < database/migrations/001_create_users_table.sql
```

This will create the `users` table and insert a default admin user:
- **Email:** admin@eskaleight.com
- **Password:** Admin@123

### 5. Configure Apache/Nginx

#### Apache (.htaccess already included)
Make sure `mod_rewrite` is enabled:

```bash
sudo a2enmod rewrite
sudo service apache2 restart
```

Point your virtual host to `backend/public` directory.

#### Example Apache VHost:
```apache
<VirtualHost *:80>
    ServerName api.eskaleight.local
    DocumentRoot "C:/path/to/ESKAL-EIGHT-SERVICES/backend/public"

    <Directory "C:/path/to/ESKAL-EIGHT-SERVICES/backend/public">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### 6. Test Backend API

Test if the API is running:

```bash
curl http://localhost/api/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-10-19 12:00:00"
  }
}
```

---

## Frontend Setup

### 1. Install Dependencies

Navigate to the frontend directory and install Node packages:

```bash
cd frontend
npm install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
REACT_APP_API_URL=http://localhost/api
```

### 3. Update App.jsx with Auth Routes

Make sure your `App.jsx` includes the authentication routes:

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

// Protected Routes
import ProtectedRoute from './components/routes/ProtectedRoute';
import AdminRoute from './components/routes/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Client Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            {/* Add more client routes */}
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* Add more admin routes */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
```

### 4. Start Development Server

```bash
npm start
```

The app should open at `http://localhost:3000`

---

## Authentication Flow

### Registration Flow
1. User fills registration form
2. Frontend validates input
3. POST request to `/api/auth/register`
4. Backend creates user with hashed password
5. JWT token generated and returned
6. User auto-logged in
7. Redirected to appropriate dashboard

### Login Flow
1. User enters email and password
2. Frontend validates input
3. POST request to `/api/auth/login`
4. Backend verifies credentials
5. JWT token generated
6. Token stored in localStorage
7. User redirected based on role:
   - Admin/Super Admin → `/admin/dashboard`
   - Client → `/client/dashboard`

### Protected Routes
- `ProtectedRoute`: Requires authentication
- `AdminRoute`: Requires authentication + admin role

---

## API Endpoints

### Public Endpoints

#### POST /api/auth/register
Register a new user

**Request:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "08012345678",
  "password": "SecurePass123",
  "confirm_password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "role": "client"
    }
  }
}
```

#### POST /api/auth/login
Login user

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "role": "client"
    }
  }
}
```

### Protected Endpoints

#### GET /api/auth/verify
Verify JWT token validity

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "user": { ... }
  }
}
```

#### GET /api/auth/me
Get current user profile

#### PUT /api/auth/profile
Update user profile

#### POST /api/auth/change-password
Change user password

---

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('client', 'admin', 'super_admin') DEFAULT 'client',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    email_verified TINYINT(1) DEFAULT 0,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Testing the Login System

### 1. Test Registration
```bash
curl -X POST http://localhost/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "test@example.com",
    "password": "Test@123",
    "confirm_password": "Test@123"
  }'
```

### 2. Test Login
```bash
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@eskaleight.com",
    "password": "Admin@123"
  }'
```

### 3. Test Protected Endpoint
```bash
curl -X GET http://localhost/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Security Best Practices

1. **JWT Secret**: Change `JWT_SECRET` in production to a strong random string
2. **Password**: Default admin password should be changed immediately
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure allowed origins properly in `backend/config/cors.php`
5. **Rate Limiting**: Implement rate limiting for login attempts
6. **Input Validation**: All inputs are sanitized and validated

---

## Troubleshooting

### CORS Issues
If you encounter CORS errors:
1. Check `backend/config/cors.php`
2. Ensure your frontend URL is in `$allowedOrigins`
3. Verify Apache/Nginx headers

### Database Connection Failed
1. Check database credentials in `.env`
2. Ensure MySQL is running
3. Verify database exists

### JWT Token Invalid
1. Check `JWT_SECRET` in `.env`
2. Ensure token hasn't expired
3. Verify Authorization header format: `Bearer token`

### Routes Not Working
1. Ensure mod_rewrite is enabled (Apache)
2. Check `.htaccess` in `backend/public`
3. Verify virtual host configuration

---

## Default Credentials

**Admin Account:**
- Email: admin@eskaleight.com
- Password: Admin@123

**⚠️ IMPORTANT:** Change this password immediately after first login!

---

## Next Steps

1. ✅ Set up database
2. ✅ Configure environment files
3. ✅ Test API endpoints
4. ✅ Start frontend development server
5. ⏭️ Create dashboard components
6. ⏭️ Implement quote request system
7. ⏭️ Add payment integration

---

## File Structure Reference

```
backend/
├── app/
│   ├── Controllers/
│   │   └── AuthController.php       ← Authentication logic
│   ├── Models/
│   │   └── User.php                 ← User model
│   ├── Middleware/
│   │   └── AuthMiddleware.php       ← JWT verification
│   └── Helpers/
│       ├── JWT.php                  ← Token handling
│       └── Router.php               ← Routing system
├── routes/
│   └── auth.php                     ← Auth routes
├── database/
│   └── migrations/
│       └── 001_create_users_table.sql
└── public/
    └── index.php                    ← Entry point

frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   └── routes/
│   │       ├── ProtectedRoute.jsx
│   │       └── AdminRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx          ← Auth state management
│   ├── services/
│   │   ├── api.js                   ← Axios instance
│   │   └── authService.js           ← Auth API calls
│   └── pages/
│       ├── Login.jsx
│       └── Register.jsx
```

---

## Support

For issues or questions:
1. Check this documentation
2. Review error logs in `backend/storage/logs/`
3. Contact development team

---

**Happy Coding! 🚀**
