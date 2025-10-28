import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminLayout from '../components/layout/AdminLayout';
import AuthLayout from '../components/layout/AuthLayout';

// Public Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import ServiceDetail from '../pages/ServiceDetail';
import Portfolio from '../pages/Portfolio';
import RequestQuote from '../pages/RequestQuote';
import Contact from '../pages/Contact';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Inflatables from '../pages/Inflatables';
import Mascots from '../pages/Mascots';
import Printing from '../pages/Printing';
import NotFound from '../pages/NotFound';

// Auth Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

// Payment Pages
import PaymentCallback from '../pages/PaymentCallback';

// Tech Services Pages
import TechServices from '../pages/TechServices';
import TechServiceDetail from '../pages/TechServiceDetail';

// Client Dashboard Pages
import ClientDashboard from '../pages/client/Dashboard';
import QuoteDetails from '../pages/client/QuoteDetails';
// import ClientProjects from '../pages/client/Projects';
// import ClientProjectDetails from '../pages/client/ProjectDetails';
// import ClientQuotes from '../pages/client/Quotes';
// import ClientPayments from '../pages/client/Payments';
// import ClientMessages from '../pages/client/Messages';
// import ClientProfile from '../pages/client/Profile';

// Admin Dashboard Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminQuotes from '../pages/admin/Quotes';
import AdminClients from '../pages/admin/Clients';
import AdminProjects from '../pages/admin/Projects';
import AdminPayments from '../pages/admin/Payments';
import AdminServices from '../pages/admin/Services';
import AdminAnalytics from '../pages/admin/Analytics';
import AdminSettings from '../pages/admin/Settings';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/inflatables" element={<Inflatables />} />
        <Route path="/mascots" element={<Mascots />} />
        <Route path="/printing" element={<Printing />} />
        <Route path="/tech-services" element={<TechServices />} />
        <Route path="/tech-services/:serviceId" element={<TechServiceDetail />} />
        <Route path="/quote" element={<RequestQuote />} />
        <Route path="/request-quote" element={<RequestQuote />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Payment Routes */}
      <Route path="/payment/callback" element={<PaymentCallback />} />

      {/* Client Dashboard Routes */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/quotes/:id" element={<QuoteDetails />} />
        {/* <Route path="/dashboard/projects" element={<ClientProjects />} />
        <Route path="/dashboard/projects/:id" element={<ClientProjectDetails />} />
        <Route path="/dashboard/quotes" element={<ClientQuotes />} />
        <Route path="/dashboard/payments" element={<ClientPayments />} />
        <Route path="/dashboard/messages" element={<ClientMessages />} />
        <Route path="/dashboard/profile" element={<ClientProfile />} /> */}
      </Route>

      {/* Admin Dashboard Routes */}
      <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/quotes" element={<AdminQuotes />} />
        <Route path="/admin/clients" element={<AdminClients />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
