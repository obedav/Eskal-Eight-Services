import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 1,
      title: 'Procurement & Supplies',
      category: 'procurement',
      description: 'Sourcing and delivering goods, materials, and equipment for various industries.',
      icon: '📦',
      features: [
        'Office Equipment',
        'Engineering Tools',
        'Safety Gear',
        'Building Materials',
        'IT Equipment',
      ],
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Logistics & Haulage',
      category: 'logistics',
      description: 'Professional transportation and fleet management services across Nigeria.',
      icon: '🚚',
      features: [
        'Local & Interstate Delivery',
        'Heavy Equipment Transport',
        'Fleet Management',
        'Warehousing',
        'Real-time Tracking',
      ],
      color: 'bg-green-500',
    },
    {
      id: 3,
      title: 'Construction & Civil Works',
      category: 'construction',
      description: 'Complete building construction, renovation, and infrastructure development.',
      icon: '🏗️',
      features: [
        'Residential Construction',
        'Commercial Buildings',
        'Renovations',
        'Site Supervision',
        'Project Management',
      ],
      color: 'bg-orange-500',
    },
    {
      id: 4,
      title: 'Engineering & Technical Services',
      category: 'engineering',
      description: 'Professional installation, maintenance, and technical support services.',
      icon: '⚙️',
      features: [
        'Electrical Installation',
        'Mechanical Services',
        'ICT Setup',
        'Equipment Maintenance',
        'Technical Support',
      ],
      color: 'bg-purple-500',
    },
    {
      id: 5,
      title: 'Consultancy & Project Management',
      category: 'consultancy',
      description: 'Expert advisory and coordination services for complex projects.',
      icon: '💼',
      features: [
        'Project Planning',
        'Risk Management',
        'Quality Assurance',
        'Budget Control',
        'Stakeholder Management',
      ],
      color: 'bg-indigo-500',
    },
    {
      id: 6,
      title: 'General Contracts',
      category: 'contracts',
      description: 'Comprehensive contracting services for government and private sector.',
      icon: '📋',
      features: [
        'Tender Registration',
        'Contract Bidding',
        'Partnership Services',
        'Compliance Management',
        'Multi-sector Projects',
      ],
      color: 'bg-red-500',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'procurement', name: 'Procurement' },
    { id: 'logistics', name: 'Logistics' },
    { id: 'construction', name: 'Construction' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'consultancy', name: 'Consultancy' },
    { id: 'contracts', name: 'Contracts' },
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((service) => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive solutions for procurement, logistics, construction,
              and technical services. Delivering quality, efficiency & trust.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } shadow-sm`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`${service.color} p-6 text-center`}>
                <div className="text-6xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-bold text-white">
                  {service.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
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
                <Link
                  to={`/request-quote?service=${service.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-900 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We offer customized solutions for unique requirements. Contact us
              to discuss your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/request-quote"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors border border-blue-500"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose ESKAL EIGHT SERVICES?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Quality Assurance
              </h3>
              <p className="text-sm text-gray-600">
                Certified professionals and quality materials
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-sm text-gray-600">
                Timely execution and on-schedule completion
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Competitive Pricing
              </h3>
              <p className="text-sm text-gray-600">
                Transparent quotes and value for money
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-sm text-gray-600">
                Dedicated customer support team
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
