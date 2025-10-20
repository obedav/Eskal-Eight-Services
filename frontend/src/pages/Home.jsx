import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      icon: '📦',
      title: 'Procurement & Supplies',
      description: 'Quality materials and equipment sourcing',
    },
    {
      icon: '🚚',
      title: 'Logistics & Haulage',
      description: 'Efficient transportation services',
    },
    {
      icon: '🏗️',
      title: 'Construction & Civil Works',
      description: 'Professional building solutions',
    },
    {
      icon: '⚙️',
      title: 'Engineering Services',
      description: 'Technical expertise and support',
    },
    {
      icon: '💼',
      title: 'Consultancy',
      description: 'Expert project management',
    },
    {
      icon: '📋',
      title: 'General Contracts',
      description: 'Comprehensive contracting services',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              ESKAL EIGHT SERVICES
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-blue-100">
              Delivering Quality, Efficiency & Trust
            </p>
            <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Your trusted partner for procurement, logistics, construction, and
              technical services across Nigeria
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="bg-[#1E90FF] text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-[#0077CC] transition-colors"
              >
                Explore Services
              </Link>
              <Link
                to="/request-quote"
                className="bg-white text-[#0B1F3F] px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions tailored to meet your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to="/services"
                  className="text-[#1E90FF] font-medium hover:text-[#0077CC] inline-flex items-center"
                >
                  Learn more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to excellence in everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Quality Assurance
              </h3>
              <p className="text-gray-600">
                Certified professionals and premium materials
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                On-time execution and timely completion
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Competitive Pricing
              </h3>
              <p className="text-gray-600">
                Transparent quotes and value for money
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Dedicated customer support team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Clients Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're proud to work with some of Nigeria's most respected companies
            </p>
          </div>

          {/* Client Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {/* FMN - Food and Agro-Allied Group */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-4xl mb-2">🏭</div>
                <p className="text-sm font-semibold text-gray-700">FMN</p>
              </div>
            </div>

            {/* Four Points by Sheraton */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-4xl mb-2">🏨</div>
                <p className="text-sm font-semibold text-gray-700">Sheraton</p>
              </div>
            </div>

            {/* Golden Penny Foods */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-4xl mb-2">🌾</div>
                <p className="text-sm font-semibold text-gray-700">Golden Penny</p>
              </div>
            </div>

            {/* BAGCO */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-4xl mb-2">🏢</div>
                <p className="text-sm font-semibold text-gray-700">BAGCO</p>
              </div>
            </div>

            {/* MacGREGOL Security */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-4xl mb-2">🛡️</div>
                <p className="text-sm font-semibold text-gray-700">MacGREGOL</p>
              </div>
            </div>

            {/* Ijewere & Co */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-sm font-semibold text-gray-700">Ijewere & Co</p>
              </div>
            </div>

            {/* Golden Sukh Company */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-4xl mb-2">🏭</div>
                <p className="text-sm font-semibold text-gray-700">Golden Sukh</p>
              </div>
            </div>

            {/* Lyn-Edge Pharmaceuticals */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-4xl mb-2">💊</div>
                <p className="text-sm font-semibold text-gray-700">Lyn-Edge</p>
              </div>
            </div>

            {/* ASCO Security */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-4xl mb-2">🔒</div>
                <p className="text-sm font-semibold text-gray-700">ASCO</p>
              </div>
            </div>

            {/* NR */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-4xl mb-2">🏢</div>
                <p className="text-sm font-semibold text-gray-700">NR</p>
              </div>
            </div>

            {/* Placeholder for more clients */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-32 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="text-4xl mb-2 text-gray-400">+</div>
                <p className="text-xs font-medium text-gray-400">More Clients</p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-5xl mb-3">⭐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Corporate Clients</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-5xl mb-3">🎨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Products Branded</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-5xl mb-3">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Let us help you bring your project to life. Request a quote today
            and discover the ESKAL EIGHT difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/request-quote"
              className="bg-[#1E90FF] text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-[#0077CC] transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              to="/contact"
              className="bg-white text-[#0B1F3F] px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-[#1E90FF] mb-2">500+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#1E90FF] mb-2">200+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#1E90FF] mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#1E90FF] mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
