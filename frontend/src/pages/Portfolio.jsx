import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'branding', name: 'Brand Management' },
    { id: 'procurement', name: 'Procurement' },
    { id: 'logistics', name: 'Logistics' },
    { id: 'printing', name: 'Printing' },
    { id: 'gifting', name: 'Corporate Gifting' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Corporate Brand Identity Design',
      category: 'branding',
      image: '🎨',
      client: 'Tech Startup',
      year: '2024',
      value: '₦15M',
      description: 'Complete brand identity package including logo, color palette, and brand guidelines.',
      status: 'Completed',
    },
    {
      id: 2,
      title: 'Government Office Complex Supplies',
      category: 'procurement',
      image: '🏢',
      client: 'Federal Ministry',
      year: '2024',
      value: '₦50M',
      description: 'Complete office furniture and equipment procurement for new government complex.',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Interstate Logistics Operations',
      category: 'logistics',
      image: '🚚',
      client: 'Manufacturing Company',
      year: '2023',
      value: '₦30M',
      description: 'Multi-state distribution network setup and management.',
      status: 'Completed',
    },
    {
      id: 4,
      title: 'Hotel Branded Amenities Package',
      category: 'branding',
      image: '🏨',
      client: 'Luxury Hotel Chain',
      year: '2024',
      value: '₦25M',
      description: 'Custom branded hotel amenities, uniforms, and promotional materials.',
      status: 'Completed',
    },
    {
      id: 5,
      title: 'Corporate Uniform Production',
      category: 'printing',
      image: '👔',
      client: 'Banking Institution',
      year: '2024',
      value: '₦40M',
      description: 'Design and production of branded corporate uniforms for 500+ staff.',
      status: 'In Progress',
    },
    {
      id: 6,
      title: 'Executive Gift Packages',
      category: 'gifting',
      image: '🎁',
      client: 'Telecommunications Company',
      year: '2023',
      value: '₦20M',
      description: 'Premium branded corporate gifts for client appreciation program.',
      status: 'Completed',
    },
    {
      id: 7,
      title: 'Marketing Materials Printing',
      category: 'printing',
      image: '🖨️',
      client: 'Real Estate Firm',
      year: '2024',
      value: '₦12M',
      description: 'Large format printing of banners, brochures, and promotional materials.',
      status: 'Completed',
    },
    {
      id: 8,
      title: 'Product Branding Campaign',
      category: 'branding',
      image: '📦',
      client: 'FMCG Company',
      year: '2023',
      value: '₦35M',
      description: 'Complete product rebranding including packaging and promotional strategy.',
      status: 'Completed',
    },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0B1F3F] to-[#1E90FF] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md text-blue-100 rounded-full text-sm font-semibold mb-6 border border-white/20">
              Our Work
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our track record of successful projects across brand management,
              procurement, logistics, and printing services
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 8C120 16 240 32 360 42.7C480 53 600 59 720 56C840 53 960 43 1080 42.7C1200 43 1320 53 1380 58.7L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-b-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '1000+', label: 'Products Branded', icon: '🎨' },
              { number: '50+', label: 'Corporate Clients', icon: '🏢' },
              { number: '6', label: 'Years Experience', icon: '⭐' },
              { number: '98%', label: 'Satisfaction Rate', icon: '😊' },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-block mb-4 text-4xl group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-[#1E90FF] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white py-10 sticky top-0 z-10 border-b-2 border-gray-100 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#1E90FF] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-[#1E90FF]/30 hover:scale-105'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-[#1E90FF]/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Project Image/Icon */}
              <div className="relative bg-gradient-to-br from-[#0B1F3F] to-[#1E90FF] h-48 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                </div>
                <span className="text-8xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </span>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1.5 bg-blue-50 text-[#1E90FF] text-xs font-semibold rounded-full border border-blue-100">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                  <span
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                      project.status === 'Completed'
                        ? 'bg-green-50 text-green-700 border border-green-100'
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1E90FF] transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
                      <svg
                        className="w-4 h-4 text-[#1E90FF]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-medium">{project.client}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
                      <svg
                        className="w-4 h-4 text-[#1E90FF]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-medium">{project.year}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
                      <svg
                        className="w-4 h-4 text-[#1E90FF]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-bold text-gray-900">
                      {project.value}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-[#0B1F3F] to-[#1E90FF] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join our growing list of satisfied clients. Let's discuss how we can
            help bring your brand vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/request-quote"
              className="bg-white text-[#0B1F3F] px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Request a Quote →
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
