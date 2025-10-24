# ESKAL EIGHT SERVICES

**Delivering Quality, Efficiency & Trust**

A comprehensive multi-service ecommerce platform for procurement, logistics, construction, tech services and technical services.

---

## 🌟 Features

### Authentication System

- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Role-based access control (Client, Admin, Super Admin)
- ✅ Password reset functionality
- ✅ Profile management
- ✅ Protected routes

### Services Offered

1. **Procurement & Supplies** - Sourcing and delivering goods, materials, and equipment
2. **Logistics & Haulage** - Transportation and fleet management
3. **Construction & Civil Works** - Building and infrastructure projects
4. **Engineering & Technical Services** - Installation and maintenance
5. **Consultancy & Project Management** - Professional advisory services
6. **General Contracts** - Enterprise and government services

### Tech Stack

**Frontend:**

- React 18
- React Router v6
- Axios
- Tailwind CSS
- Context API for state management

**Backend:**

- PHP 8.0+
- MySQL
- JWT Authentication
- RESTful API architecture
- PDO for database operations

**Payment Integration:**

- Paystack
- Flutterwave

---

## 📦 Installation

### Prerequisites

- PHP 8.0 or higher
- MySQL 5.7 or higher
- Node.js 16+ and npm
- Composer
- Apache/Nginx with mod_rewrite

### Quick Start

See [QUICK_START.md](QUICK_START.md) for a 5-minute setup guide.

### Detailed Setup

See [LOGIN_SETUP_GUIDE.md](LOGIN_SETUP_GUIDE.md) for comprehensive documentation.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/eskal-eight-services.git
cd eskal-eight-services
```

### 2. Backend Setup

```bash
cd backend
composer install
cp .env.example .env
# Edit .env with your database credentials
mysql -u root -p
CREATE DATABASE eskal_eight_db;
exit
mysql -u root -p eskal_eight_db < database/migrations/001_create_users_table.sql
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit REACT_APP_API_URL if needed
npm start
```

### 4. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost/api

### 5. Default Login

```
Email: admin@eskaleight.com
Password: Admin@123
```

**⚠️ Change the default password immediately!**

---

## 📁 Project Structure

```
ESKAL-EIGHT-SERVICES/
│
├── frontend/                   # React Application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── auth/         # Login, Register forms
│   │   │   ├── common/       # Shared components
│   │   │   └── routes/       # Route protection
│   │   ├── pages/            # Page components
│   │   ├── context/          # React Context (Auth)
│   │   ├── services/         # API calls
│   │   └── utils/            # Helper functions
│   └── package.json
│
├── backend/                    # PHP API
│   ├── app/
│   │   ├── Controllers/       # Request handlers
│   │   ├── Models/           # Database models
│   │   ├── Middleware/       # Auth, CORS, etc.
│   │   ├── Services/         # Business logic
│   │   ├── Helpers/          # Utility classes
│   │   └── Exceptions/       # Custom exceptions
│   ├── config/               # Configuration files
│   ├── database/
│   │   └── migrations/       # SQL migrations
│   ├── routes/               # API routes
│   ├── public/               # Entry point
│   └── composer.json
│
├── QUICK_START.md             # Quick installation guide
├── LOGIN_SETUP_GUIDE.md       # Detailed documentation
└── README.md                  # This file
```

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint                    | Description               | Auth Required |
| ------ | --------------------------- | ------------------------- | ------------- |
| POST   | `/api/auth/register`        | Register new user         | No            |
| POST   | `/api/auth/login`           | Login user                | No            |
| POST   | `/api/auth/forgot-password` | Request password reset    | No            |
| POST   | `/api/auth/reset-password`  | Reset password with token | No            |
| GET    | `/api/auth/verify`          | Verify JWT token          | Yes           |
| GET    | `/api/auth/me`              | Get current user          | Yes           |
| PUT    | `/api/auth/profile`         | Update profile            | Yes           |
| POST   | `/api/auth/change-password` | Change password           | Yes           |

### Example Login Request

```bash
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@eskaleight.com",
    "password": "Admin@123"
  }'
```

### Example Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "user": {
      "id": 1,
      "first_name": "Admin",
      "last_name": "User",
      "email": "admin@eskaleight.com",
      "role": "super_admin",
      "status": "active"
    }
  }
}
```

---

## 🎨 Brand Colors

```css
Primary (Deep Blue):    #0B1F3F
Secondary (Sky Blue):   #1E90FF
Background (White):     #FFFFFF
Text (Gray):            #4B4B4B
```

These colors represent:

- **Trust & Reliability** (Deep Blue)
- **Innovation & Clarity** (Sky Blue)
- **Professionalism** (Clean design)

---

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ CORS protection
- ✅ Input sanitization and validation
- ✅ SQL injection prevention (prepared statements)
- ✅ XSS protection
- ✅ Role-based access control
- ✅ Secure HTTP headers

---

## 👥 User Roles

1. **Client** - Regular customers

   - Request quotes
   - View projects
   - Make payments
   - Track orders

2. **Admin** - Company administrators

   - Manage quotes
   - Track projects
   - View payments
   - Manage clients

3. **Super Admin** - System administrators
   - All admin privileges
   - Manage users
   - System settings
   - Analytics

---

## 📝 Environment Variables

### Backend (.env)

```env
DB_HOST=localhost
DB_NAME=eskal_eight_db
DB_USER=root
DB_PASSWORD=

JWT_SECRET=your-secret-key-change-this
JWT_EXPIRY=3600

FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)

```env
REACT_APP_API_URL=http://localhost/api
REACT_APP_PAYSTACK_PUBLIC_KEY=your-key
REACT_APP_FLUTTERWAVE_PUBLIC_KEY=your-key
```

---

## 🧪 Testing

### Backend API Test

```bash
# Health check
curl http://localhost/api/health

# Register user
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

### Frontend

1. Navigate to http://localhost:3000
2. Click "Register" to create an account
3. Login with credentials
4. Access protected routes

---

## 🐛 Troubleshooting

### Database Connection Failed

- Check MySQL is running
- Verify database credentials in `.env`
- Ensure database exists

### CORS Errors

- Check allowed origins in `backend/config/cors.php`
- Verify frontend URL in backend `.env`

### JWT Token Invalid

- Check `JWT_SECRET` matches in backend `.env`
- Ensure token hasn't expired
- Verify `Authorization: Bearer {token}` format

### Routes Not Working (404)

- Enable Apache `mod_rewrite`
- Check `.htaccess` in `backend/public/`
- Verify virtual host configuration

---

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md) - Get up and running in 5 minutes
- [Login Setup Guide](LOGIN_SETUP_GUIDE.md) - Comprehensive authentication documentation
- [API Documentation](docs/API.md) - Complete API reference (coming soon)
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment guide (coming soon)

---

## 🗺️ Roadmap

### Phase 1: Authentication ✅

- [x] User registration
- [x] User login
- [x] Password reset
- [x] Profile management
- [x] Role-based access

### Phase 2: Core Features (In Progress)

- [ ] Service catalog
- [ ] Quote request system
- [ ] Project management
- [ ] Payment integration
- [ ] File upload/management

### Phase 3: Advanced Features

- [ ] Real-time notifications
- [ ] Email integration
- [ ] SMS notifications
- [ ] Analytics dashboard
- [ ] Report generation

### Phase 4: Enhancement

- [ ] Mobile app
- [ ] Advanced search
- [ ] API documentation
- [ ] Automated testing
- [ ] Performance optimization

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software owned by ESKAL EIGHT SERVICES.

---

## 📞 Contact

**ESKAL EIGHT SERVICES**

- Website: https://eskaleight.com
- Email: info@eskaleight.com
- Phone: +234 XXX XXX XXXX

---

## 🙏 Acknowledgments

- React team for the amazing framework
- PHP community for robust backend tools
- Tailwind CSS for beautiful styling
- All contributors and supporters

---

**Built with ❤️ by the ESKAL EIGHT SERVICES Development Team**
#
