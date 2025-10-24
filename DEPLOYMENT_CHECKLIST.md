# Deployment Checklist - Eskal Eight Services

Quick reference checklist for deploying to Syskay + Vercel.

---

## 📦 Pre-Deployment Preparation

### Local Setup:
- [ ] All features tested locally
- [ ] No console errors in browser
- [ ] API endpoints working
- [ ] Database migrations ready
- [ ] Payment integration configured
- [ ] All dependencies installed (`composer install` & `npm install`)

### Repository:
- [ ] All changes committed to GitHub
- [ ] `.env` files NOT committed (check .gitignore)
- [ ] `vendor/` and `node_modules/` NOT committed
- [ ] README updated

---

## 🗄️ Database Setup (Syskay cPanel)

- [ ] MySQL database created
- [ ] Database user created with strong password
- [ ] User added to database with ALL PRIVILEGES
- [ ] Save credentials securely:
  ```
  DB_HOST: localhost
  DB_NAME: ____________
  DB_USER: ____________
  DB_PASS: ____________
  ```
- [ ] Schema imported via phpMyAdmin
- [ ] Test tables exist and are empty

---

## 🖥️ Backend Deployment (Syskay)

### File Upload:
- [ ] Created `api/` folder in `public_html/`
- [ ] All backend files uploaded to `public_html/api/`
- [ ] `vendor/` folder uploaded (or run `composer install`)

### Configuration:
- [ ] `.env` file created from `.env.example`
- [ ] Database credentials updated in `.env`
- [ ] `JWT_SECRET` set to random strong string
- [ ] `APP_URL` set to your domain
- [ ] Payment keys (Paystack, Flutterwave) added
- [ ] Email configuration completed
- [ ] `APP_DEBUG=false` for production
- [ ] `APP_ENV=production`

### Permissions:
- [ ] `storage/` folder set to 755
- [ ] `storage/logs/` set to 755
- [ ] `storage/uploads/` set to 755 (if exists)

### .htaccess:
- [ ] Root `.htaccess` configured for API routing
- [ ] Copy from `backend/.htaccess.production` to `public_html/.htaccess`

### Testing:
- [ ] Visit `https://yourdomain.com/api/health`
- [ ] Expected: `{"status": "healthy", "timestamp": "..."}`
- [ ] Check error logs if failing

---

## 🎨 Frontend Deployment (Vercel)

### Vercel Setup:
- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] Project imported

### Configuration:
- [ ] Root Directory: `frontend`
- [ ] Framework: Create React App
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `build`

### Environment Variables:
- [ ] `REACT_APP_API_URL` = `https://yourdomain.com/api`
- [ ] `REACT_APP_NAME` = `Eskal Eight Services`
- [ ] `REACT_APP_ENVIRONMENT` = `production`
- [ ] `REACT_APP_PAYSTACK_PUBLIC_KEY` = `pk_live_...`
- [ ] `REACT_APP_FLUTTERWAVE_PUBLIC_KEY` = `FLWPUBK_...`

### Deployment:
- [ ] Click "Deploy"
- [ ] Build succeeds without errors
- [ ] Deployment live at Vercel URL

---

## 🔗 Connect Frontend & Backend

### Update CORS:
- [ ] Copy Vercel deployment URL
- [ ] Update `.env` on Syskay: `CORS_ORIGIN=https://your-vercel-url.vercel.app`
- [ ] Save changes

### Test Integration:
- [ ] Visit Vercel frontend URL
- [ ] Open browser DevTools → Network tab
- [ ] Try to register/login
- [ ] API calls should succeed (status 200)
- [ ] No CORS errors in console

---

## ✅ Post-Deployment Testing

### Backend Tests:
- [ ] Health endpoint: `/api/health`
- [ ] Register new user: `/api/auth/register`
- [ ] Login: `/api/auth/login`
- [ ] Get services: `/api/services`
- [ ] Check database for new records

### Frontend Tests:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Register form submits
- [ ] Login form works
- [ ] Dashboard accessible after login
- [ ] Services page displays
- [ ] Quote request form submits
- [ ] Payment integration works
- [ ] File uploads work (if applicable)
- [ ] Contact form sends

### Full User Flow:
- [ ] New user can register
- [ ] User receives email (if configured)
- [ ] User can login
- [ ] User can browse services
- [ ] User can request quote
- [ ] User can make payment
- [ ] Admin can login to dashboard
- [ ] Admin can view analytics

---

## 🔐 Security Verification

- [ ] `.env` file protected (not web-accessible)
- [ ] HTTPS enabled (forced via .htaccess)
- [ ] CORS properly configured (not wildcard `*` in production)
- [ ] SQL injection protection (using prepared statements)
- [ ] XSS protection headers set
- [ ] File upload validation working
- [ ] Rate limiting enabled
- [ ] Error messages don't expose sensitive info

---

## 📊 Monitoring Setup

- [ ] Check cPanel error logs
- [ ] Check application logs: `storage/logs/`
- [ ] Set up email alerts for critical errors
- [ ] Bookmark cPanel URL
- [ ] Bookmark Vercel dashboard
- [ ] Save all credentials in password manager

---

## 🎯 Performance Optimization

### Backend (Syskay):
- [ ] Composer autoloader optimized: `--optimize-autoloader --classmap-authoritative`
- [ ] OPcache enabled in cPanel
- [ ] Gzip compression enabled (.htaccess)
- [ ] PHP version set to 8.0+

### Frontend (Vercel):
- [ ] Code splitting enabled (automatic with CRA)
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] Bundle size acceptable

---

## 📱 Browser Testing

Test on multiple browsers:
- [ ] Chrome/Edge (Desktop)
- [ ] Firefox (Desktop)
- [ ] Safari (Mac/iOS)
- [ ] Chrome (Mobile)
- [ ] Safari (Mobile)

---

## 📝 Documentation

- [ ] Update README with live URLs
- [ ] Document API endpoints
- [ ] Create user guide (if needed)
- [ ] Document admin features
- [ ] Note any known issues

---

## 🚨 Emergency Contacts

**Save These:**
```
Syskay Support: https://syskay.com/submitticket.php
Vercel Support: https://vercel.com/support
Your Domain: ___________________
cPanel URL: https://yourdomain.com:2083
FTP Host: ftp.yourdomain.com
```

---

## 🎉 Launch Day

- [ ] All checklist items completed
- [ ] Final testing done
- [ ] Backups created
- [ ] Launch announcement ready
- [ ] Support channels ready
- [ ] Monitoring in place

---

## 📅 Post-Launch (First Week)

- [ ] Monitor error logs daily
- [ ] Check user registrations
- [ ] Verify payments working
- [ ] Respond to user feedback
- [ ] Fix any critical bugs immediately

---

## 🔄 Regular Maintenance

**Weekly:**
- [ ] Check error logs
- [ ] Review user feedback
- [ ] Monitor server resources

**Monthly:**
- [ ] Database backup
- [ ] Update dependencies
- [ ] Review security logs
- [ ] Performance analysis

**Quarterly:**
- [ ] Full security audit
- [ ] Update PHP/packages
- [ ] Review and optimize database
- [ ] Test disaster recovery

---

## 📊 Success Metrics

Track these after launch:
- [ ] Number of registered users
- [ ] Active daily users
- [ ] Quote requests submitted
- [ ] Successful payments
- [ ] Page load times
- [ ] Error rates
- [ ] Uptime percentage

---

**Deployment Date:** __________
**Deployed By:** __________
**Version:** 1.0.0

---

**Ready to Deploy? Follow SYSKAY_DEPLOYMENT_GUIDE.md for detailed steps!**
