import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 1,
      title: 'Brand Management',
      category: 'branding',
      description: 'Corporate identity development and comprehensive branding solutions.',
      icon: '🎨',
      features: [
        'Corporate Branding',
        'Product Customization',
        'Marketing Materials',
        'Brand Strategy',
        'Visual Identity Design',
      ],
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: 2,
      title: 'Procurement & Supplies',
      category: 'procurement',
      description: 'Sourcing and delivering goods, materials, and equipment for various industries.',
      icon: '📦',
      features: [
        'Office Equipment',
        'Branded Products',
        'Safety Gear',
        'Corporate Gifts',
        'IT Equipment',
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 3,
      title: 'Logistics & Haulage',
      category: 'logistics',
      description: 'Professional transportation and fleet management services across Nigeria.',
      icon: '🚚',
      features: [
        'Local & Interstate Delivery',
        'Equipment Transport',
        'Fleet Management',
        'Warehousing',
        'Real-time Tracking',
      ],
      color: 'from-green-500 to-green-600',
    },
    {
      id: 4,
      title: 'Printing Services',
      category: 'printing',
      description: 'Professional printing and customization services for all your branding needs.',
      icon: '🖨️',
      features: [
        'Large Format Printing',
        'Product Branding',
        'Promotional Materials',
        'Banners & Signage',
        'Custom Packaging',
      ],
      color: 'from-orange-500 to-red-600',
    },
    {
      id: 5,
      title: 'Consultancy',
      category: 'consultancy',
      description: 'Expert advisory services for brand development and business growth.',
      icon: '💼',
      features: [
        'Brand Strategy',
        'Market Research',
        'Business Planning',
        'Brand Positioning',
        'Stakeholder Management',
      ],
      color: 'from-indigo-500 to-purple-600',
    },
    {
      id: 6,
      title: 'Corporate Gifting',
      category: 'gifting',
      description: 'Premium branded corporate gifts and promotional merchandise.',
      icon: '🎁',
      features: [
        'Custom Gift Items',
        'Bulk Orders',
        'Corporate Packages',
        'Seasonal Promotions',
        'Gift Wrapping',
      ],
      color: 'from-pink-500 to-red-600',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'branding', name: 'Branding' },
    { id: 'procurement', name: 'Procurement' },
    { id: 'logistics', name: 'Logistics' },
    { id: 'printing', name: 'Printing' },
    { id: 'consultancy', name: 'Consultancy' },
    { id: 'gifting', name: 'Gifting' },
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((service) => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0B1F3F] to-[#1E90FF] text-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md text-blue-100 rounded-full text-sm font-semibold mb-6 border border-white/20">
              What We Do
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions for branding, procurement, logistics, and
              business growth. Delivering quality, efficiency & trust.
            </p>
          </div>
        </div>

        {/* Curved Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 8C120 16 240 32 360 42.7C480 53 600 59 720 56C840 53 960 43 1080 42.7C1200 43 1320 53 1380 58.7L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#1E90FF] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-[#1E90FF]/30'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-[#1E90FF]/30 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-br ${service.color} p-8 text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-[#1E90FF] mr-3 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  to={`/request-quote?service=${service.id}`}
                  className="block w-full text-center bg-[#1E90FF] text-white py-3 rounded-xl font-semibold hover:bg-[#0077CC] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Request Quote →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 overflow-hidden">
          <div className="px-6 py-12 sm:px-12 text-center">
            <div className="max-w-3xl mx-auto">
              <span className="inline-block px-4 py-2 bg-blue-50 text-[#1E90FF] rounded-full text-sm font-semibold mb-4">
                Custom Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We offer customized solutions for unique requirements. Contact us
                to discuss your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-[#1E90FF] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#0077CC] transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Contact Us
                </Link>
                <Link
                  to="/request-quote"
                  className="bg-white text-[#1E90FF] border-2 border-[#1E90FF] px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                >
                  Request Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-50 text-[#1E90FF] rounded-full text-sm font-semibold mb-4">
              Our Advantages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose ESKAL EIGHT SERVICES?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '✓', bg: 'bg-blue-50', title: 'Quality Assurance', desc: 'Certified professionals and quality materials' },
              { icon: '⚡', bg: 'bg-green-50', title: 'Fast Delivery', desc: 'Timely execution and on-schedule completion' },
              { icon: '💯', bg: 'bg-purple-50', title: 'Competitive Pricing', desc: 'Transparent quotes and value for money' },
              { icon: '🤝', bg: 'bg-orange-50', title: '24/7 Support', desc: 'Dedicated customer support team' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#1E90FF]/30 hover:shadow-lg transition-all duration-300 group">
                <div className={`${item.bg} rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-[#1E90FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
