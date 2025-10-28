import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/services/logo.png';

const Header = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/tech-services', label: 'Tech Services', highlight: true },
    { path: '/contact', label: 'Contact' },
  ];

  const services = [
    { path: '/services', label: 'Brand Management', icon: '🎨', color: 'from-purple-500 to-pink-600' },
    { path: '/services', label: 'POSM & Advertising', icon: '📢', color: 'from-red-500 to-orange-600' },
    { path: '/services', label: 'Corporate Uniforms', icon: '👔', color: 'from-cyan-500 to-blue-600' },
    { path: '/services', label: 'Safety Equipment', icon: '🦺', color: 'from-yellow-500 to-orange-600' },
    { path: '/services', label: 'Procurement', icon: '📦', color: 'from-blue-500 to-blue-600' },
    { path: '/inflatables', label: 'Product Inflatables', icon: '🎈', color: 'from-purple-500 to-purple-600' },
    { path: '/printing', label: 'Printing Services', icon: '🖨️', color: 'from-orange-500 to-red-600' },
    { path: '/mascots', label: 'Brand Mascots', icon: '🎭', color: 'from-pink-500 to-purple-600' },
    { path: '/services', label: 'Corporate Gifting', icon: '🎁', color: 'from-pink-500 to-red-600' },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-12 sm:top-10 md:top-8 z-40 mt-12 sm:mt-10 md:mt-8">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="ESKAL EIGHT Services"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-gray-900">
                ESKAL <span className="text-[#1E90FF]">EIGHT</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  link.highlight
                    ? 'text-[#009688] hover:text-[#00BCD4] font-semibold'
                    : 'text-gray-700 hover:text-[#1E90FF]'
                } transition-colors font-medium flex items-center gap-1`}
              >
                {link.highlight && <span className="text-lg">💻</span>}
                {link.label}
                {link.highlight && (
                  <span className="ml-1 px-2 py-0.5 bg-[#009688] text-white text-xs rounded-full">
                    New
                  </span>
                )}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesMenuOpen(true)}
              onMouseLeave={() => setServicesMenuOpen(false)}
            >
              <button className="text-gray-700 hover:text-[#1E90FF] transition-colors font-medium flex items-center gap-1">
                Services
                <svg
                  className={`w-4 h-4 transition-transform ${servicesMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Menu Dropdown */}
              {servicesMenuOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 z-50">
                  <div className="grid grid-cols-3 gap-4">
                    {services.map((service) => (
                      <Link
                        key={service.label}
                        to={service.path}
                        className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
                        onClick={() => setServicesMenuOpen(false)}
                      >
                        <div className={`text-3xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-[#1E90FF] text-sm">
                            {service.label}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      to="/services"
                      className="block text-center text-[#1E90FF] hover:text-[#0077CC] font-semibold text-sm"
                      onClick={() => setServicesMenuOpen(false)}
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#1E90FF] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1E90FF] flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user?.first_name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="font-medium">
                    {user?.first_name || 'User'}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      userMenuOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to={isAdmin() ? '/admin/dashboard' : '/client/dashboard'}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/client/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-[#1E90FF] transition-colors font-medium py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#1E90FF] text-white px-6 py-2 rounded-lg hover:bg-[#0077CC] transition-all duration-300 hover:shadow-md font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900 hover:text-[#1E90FF] transition-colors p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-3 px-4 text-gray-700 hover:text-[#1E90FF] hover:bg-gray-50 transition-colors rounded-lg mx-2 text-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Services Section in Mobile Menu */}
            <div className="mx-2 mt-4 mb-2">
              <div className="text-sm font-semibold text-gray-500 px-4 mb-2">SERVICES</div>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => (
                  <Link
                    key={service.label}
                    to={service.path}
                    className="flex items-center gap-2 py-2 px-3 text-gray-700 hover:text-[#1E90FF] hover:bg-gray-50 transition-colors rounded-lg text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-xl">{service.icon}</span>
                    <span className="font-medium">{service.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {isAuthenticated ? (
              <>
                <Link
                  to={isAdmin() ? '/admin/dashboard' : '/client/dashboard'}
                  className="block py-3 px-4 text-gray-700 hover:text-[#1E90FF] hover:bg-gray-50 transition-colors rounded-lg mx-2 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/client/profile"
                  className="block py-3 px-4 text-gray-700 hover:text-[#1E90FF] hover:bg-gray-50 transition-colors rounded-lg mx-2 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-[#1E90FF] hover:bg-gray-50 transition-colors rounded-lg mx-2 text-lg font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-3 px-4 text-gray-700 hover:text-[#1E90FF] hover:bg-gray-50 transition-colors rounded-lg mx-2 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-3 px-4 mt-2 mx-2 text-center bg-[#1E90FF] text-white hover:bg-[#0077CC] transition-colors rounded-lg text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
