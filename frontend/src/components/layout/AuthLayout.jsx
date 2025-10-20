import React from 'react';
import { Link, Outlet } from 'react-router-dom';

/**
 * AuthLayout component for login, register, and password reset pages
 * Provides a consistent layout for authentication-related pages
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3F] to-[#112B4A] flex flex-col">
      {/* Header */}
      <header className="bg-white bg-opacity-10 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#1E90FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E8</span>
              </div>
              <div>
                <span className="text-white text-xl font-bold">
                  ESKAL <span className="text-[#1E90FF]">EIGHT</span>
                </span>
                <p className="text-xs text-gray-300">SERVICES</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Services
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Content Card */}
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <Outlet />
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              Need help?{' '}
              <Link
                to="/contact"
                className="text-[#1E90FF] hover:text-white font-medium transition-colors"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-10 backdrop-blur-md py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-300">
            <p>
              &copy; {new Date().getFullYear()} ESKAL EIGHT SERVICES. All rights reserved.
            </p>
            <div className="mt-2 flex items-center justify-center space-x-4">
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                to="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * Simplified AuthLayout for minimal design
 */
export const MinimalAuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3F] to-[#112B4A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-[#1E90FF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">E8</span>
            </div>
            <div>
              <span className="text-white text-2xl font-bold">
                ESKAL <span className="text-[#1E90FF]">EIGHT</span>
              </span>
              <p className="text-xs text-gray-300">SERVICES</p>
            </div>
          </Link>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <Outlet />
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">
              Back to Home
            </Link>
            <span className="mx-2">•</span>
            <Link
              to="/contact"
              className="hover:text-white transition-colors"
            >
              Contact Support
            </Link>
          </p>
          <p className="mt-4 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} ESKAL EIGHT SERVICES
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Split AuthLayout with image/info panel
 */
export const SplitAuthLayout = ({ infoContent }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Info/Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0B1F3F] to-[#112B4A] p-12 flex-col justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-[#1E90FF] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">E8</span>
          </div>
          <div>
            <span className="text-white text-2xl font-bold">
              ESKAL <span className="text-[#1E90FF]">EIGHT</span>
            </span>
            <p className="text-xs text-gray-300">SERVICES</p>
          </div>
        </Link>

        <div className="text-white">
          {infoContent || (
            <>
              <h2 className="text-4xl font-bold mb-4">
                Welcome to ESKAL EIGHT
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Your trusted partner in procurement, logistics, construction, and technical services across Nigeria.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#1E90FF] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">10+ Years Experience</h3>
                    <p className="text-sm text-gray-300">
                      Proven track record of successful projects
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#1E90FF] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">500+ Projects Completed</h3>
                    <p className="text-sm text-gray-300">
                      Delivering excellence across multiple sectors
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#1E90FF] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">200+ Happy Clients</h3>
                    <p className="text-sm text-gray-300">
                      Building lasting partnerships through trust
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ESKAL EIGHT SERVICES. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#1E90FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E8</span>
              </div>
              <div>
                <span className="text-[#0B1F3F] text-xl font-bold">
                  ESKAL <span className="text-[#1E90FF]">EIGHT</span>
                </span>
                <p className="text-xs text-gray-600">SERVICES</p>
              </div>
            </Link>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Outlet />
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <Link to="/" className="hover:text-[#1E90FF] transition-colors">
              Back to Home
            </Link>
            <span className="mx-2">•</span>
            <Link
              to="/contact"
              className="hover:text-[#1E90FF] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
