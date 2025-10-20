import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'procurement', name: 'Procurement' },
    { id: 'logistics', name: 'Logistics' },
    { id: 'construction', name: 'Construction' },
    { id: 'engineering', name: 'Engineering' },
  ];

  const projects = [
    {
      id: 1,
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
      id: 2,
      title: 'Interstate Logistics Operations',
      category: 'logistics',
      image: '🚛',
      client: 'Manufacturing Company',
      year: '2023',
      value: '₦30M',
      description: 'Multi-state distribution network setup and management.',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Commercial Building Construction',
      category: 'construction',
      image: '🏗️',
      client: 'Private Developer',
      year: '2024',
      value: '₦200M',
      description: '5-storey commercial complex with modern amenities.',
      status: 'In Progress',
    },
    {
      id: 4,
      title: 'Water Treatment Plant',
      category: 'engineering',
      image: '⚙️',
      client: 'State Government',
      year: '2023',
      value: '₦150M',
      description: 'Design and installation of industrial water treatment facility.',
      status: 'Completed',
    },
    {
      id: 5,
      title: 'Medical Equipment Supply',
      category: 'procurement',
      image: '🏥',
      client: 'General Hospital',
      year: '2024',
      value: '₦80M',
      description: 'Procurement and installation of modern medical equipment.',
      status: 'Completed',
    },
    {
      id: 6,
      title: 'Road Construction Project',
      category: 'construction',
      image: '🛣️',
      client: 'Local Government',
      year: '2023',
      value: '₦120M',
      description: '10km dual carriageway construction with drainage systems.',
      status: 'Completed',
    },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] text-white">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our track record of successful projects across procurement,
              logistics, construction, and engineering sectors
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1E90FF] mb-2">500+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1E90FF] mb-2">200+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1E90FF] mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1E90FF] mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white py-8 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#1E90FF] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Project Image/Icon */}
              <div className="bg-gradient-to-br from-[#0B1F3F] to-[#112B4A] h-48 flex items-center justify-center">
                <span className="text-8xl">{project.image}</span>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-[#1E90FF] bg-opacity-10 text-[#1E90FF] text-xs font-semibold rounded-full">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
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
                    <span>{project.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
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
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
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
                    <span className="font-semibold text-gray-900">
                      {project.value}
                    </span>
                  </div>
                </div>

                {/* <Link
                  to={`/portfolio/${project.id}`}
                  className="block w-full text-center bg-[#1E90FF] text-white px-4 py-2 rounded-lg hover:bg-[#0077CC] transition-colors font-medium"
                >
                  View Details
                </Link> */}
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
      <div className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Join our growing list of satisfied clients. Let's discuss how we can
            help bring your project to life.
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
      </div>
    </div>
  );
};

export default Portfolio;
