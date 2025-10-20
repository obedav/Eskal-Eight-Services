import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaCode, FaMobile, FaCog, FaLink, FaCloud, FaServer,
  FaPalette, FaRocket, FaRobot, FaArrowRight, FaCheckCircle
} from 'react-icons/fa';

const TechServices = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const techServices = [
    {
      id: 'web-development',
      title: 'Web Development',
      icon: FaCode,
      color: 'from-blue-500 to-cyan-500',
      description: 'Corporate websites, e-commerce platforms, and web portals built with modern technologies.',
      features: [
        'Corporate websites & landing pages',
        'E-commerce platforms',
        'Web portals & dashboards',
        'Progressive Web Apps (PWA)',
      ],
      category: 'development',
      pricing: 'Starting from ₦500,000',
      priceType: 'starting',
    },
    {
      id: 'mobile-app-development',
      title: 'Mobile App Development',
      icon: FaMobile,
      color: 'from-purple-500 to-pink-500',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: [
        'Android & iOS apps',
        'React Native & Flutter',
        'App Store deployment',
        'Push notifications',
      ],
      category: 'development',
      pricing: 'Starting from ₦800,000',
      priceType: 'starting',
    },
    {
      id: 'custom-software',
      title: 'Custom Software Solutions',
      icon: FaCog,
      color: 'from-green-500 to-teal-500',
      description: 'Tailored business applications, CRM, inventory systems, and enterprise software.',
      features: [
        'Custom CRM systems',
        'Inventory management',
        'ERP solutions',
        'Business intelligence',
      ],
      category: 'software',
      pricing: 'Request Quote',
      priceType: 'custom',
    },
    {
      id: 'api-integration',
      title: 'API Integration & Automation',
      icon: FaLink,
      color: 'from-orange-500 to-red-500',
      description: 'Connect systems seamlessly with payment gateways, logistics APIs, and automation.',
      features: [
        'Payment gateway integration',
        'ERP & CRM integrations',
        'Process automation',
        'API security',
      ],
      category: 'integration',
      pricing: 'Starting from ₦300,000',
      priceType: 'starting',
    },
    {
      id: 'cloud-hosting',
      title: 'Cloud Hosting & Infrastructure',
      icon: FaCloud,
      color: 'from-cyan-500 to-blue-600',
      description: 'Reliable hosting, domain setup, SSL certificates, and cloud infrastructure.',
      features: [
        'Website hosting (VPS, Dedicated)',
        'Domain & SSL certificates',
        'Cloud storage solutions',
        '99.9% uptime guarantee',
      ],
      category: 'infrastructure',
      pricing: '₦50,000 - ₦200,000/month',
      priceType: 'range',
    },
    {
      id: 'it-support',
      title: 'IT Infrastructure & Support',
      icon: FaServer,
      color: 'from-indigo-500 to-purple-600',
      description: 'Complete IT infrastructure, networking, and 24/7 technical support.',
      features: [
        'Network setup',
        'Server management',
        '24/7 technical support',
        'Cybersecurity solutions',
      ],
      category: 'infrastructure',
      pricing: '₦200,000 - ₦500,000',
      priceType: 'range',
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      icon: FaPalette,
      color: 'from-pink-500 to-rose-500',
      description: 'Beautiful, intuitive interfaces that enhance user experience.',
      features: [
        'User interface design',
        'Wireframing & prototyping',
        'Design systems',
        'Usability testing',
      ],
      category: 'design',
      pricing: 'Starting from ₦250,000',
      priceType: 'starting',
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      icon: FaRocket,
      color: 'from-yellow-500 to-orange-500',
      description: 'Help businesses transition to digital operations with strategic consulting.',
      features: [
        'Digital strategy development',
        'Process digitization',
        'Technology roadmap',
        'Staff training',
      ],
      category: 'consulting',
      pricing: 'Request Consultation',
      priceType: 'custom',
    },
    {
      id: 'ai-data-solutions',
      title: 'AI & Data Solutions',
      icon: FaRobot,
      color: 'from-teal-500 to-green-600',
      description: 'AI-powered chatbots, analytics dashboards, and machine learning solutions.',
      features: [
        'AI chatbots',
        'Data analytics',
        'Business intelligence dashboards',
        'Predictive analytics',
      ],
      category: 'advanced',
      pricing: 'Request Quote',
      priceType: 'custom',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: FaCode },
    { id: 'development', name: 'Development', icon: FaCode },
    { id: 'infrastructure', name: 'Cloud & Hosting', icon: FaCloud },
    { id: 'software', name: 'Software Solutions', icon: FaCog },
    { id: 'design', name: 'Design & UX', icon: FaPalette },
    { id: 'integration', name: 'Integration', icon: FaLink },
    { id: 'consulting', name: 'Consulting', icon: FaRocket },
    { id: 'advanced', name: 'AI & Data', icon: FaRobot },
  ];

  const techStack = [
    { name: 'React', logo: '⚛️' },
    { name: 'Laravel', logo: '🔷' },
    { name: 'Node.js', logo: '🟢' },
    { name: 'Python', logo: '🐍' },
    { name: 'PHP', logo: '🐘' },
    { name: 'MySQL', logo: '🗄️' },
    { name: 'MongoDB', logo: '🍃' },
    { name: 'AWS', logo: '☁️' },
    { name: 'Docker', logo: '🐳' },
    { name: 'Git', logo: '📦' },
    { name: 'Figma', logo: '🎨' },
    { name: 'Flutter', logo: '💙' },
  ];

  const filteredServices = activeCategory === 'all'
    ? techServices
    : techServices.filter(service => service.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-br from-[#0B1F3F] via-[#1E90FF] to-[#009688] text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-2xl">💻</span>
              <span className="text-sm font-semibold">Eskal Eight Tech</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
              Technology & Digital Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transform your business with cutting-edge technology solutions
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/request-quote"
                className="bg-white text-[#0B1F3F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                Get Started
                <FaArrowRight />
              </Link>
              <button
                onClick={() => document.getElementById('tech-stack').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                View Our Tech Stack
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Eskal Eight Tech?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine technical excellence with deep business understanding to deliver solutions that drive real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '🚀', title: 'Fast Delivery', desc: 'Agile development for quick turnaround' },
              { icon: '💡', title: 'Innovation', desc: 'Latest technologies and best practices' },
              { icon: '🛡️', title: 'Reliable', desc: '99.9% uptime & 24/7 support' },
              { icon: '💰', title: 'Cost-Effective', desc: 'Competitive pricing without compromise' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-gray-100 py-8 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#1E90FF] to-[#009688] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <cat.icon className="text-lg" />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 group"
              >
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <IconComponent className="text-5xl mb-4 relative z-10" />
                  <h3 className="text-2xl font-bold mb-3 relative z-10">{service.title}</h3>

                  {/* Pricing Badge */}
                  <div className="relative z-10">
                    {service.priceType === 'custom' ? (
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                        <span className="text-sm font-medium">{service.pricing}</span>
                      </div>
                    ) : (
                      <div className="bg-white/95 text-gray-900 px-4 py-2 rounded-lg inline-block">
                        <p className="text-sm font-semibold">{service.pricing}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to="/request-quote"
                      state={{ service: service.title }}
                      className="flex-1 bg-gradient-to-r from-[#1E90FF] to-[#009688] text-white px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2"
                    >
                      Request Quote
                      <FaArrowRight />
                    </Link>
                    <Link
                      to={`/tech-services/${service.id}`}
                      className="px-6 py-3 border-2 border-[#1E90FF] text-[#1E90FF] rounded-lg font-medium hover:bg-[#1E90FF] hover:text-white transition-colors flex items-center gap-2"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Showcase */}
      <div id="tech-stack" className="bg-gradient-to-br from-[#0B1F3F] to-[#1E90FF] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Tech Stack</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              We use modern, industry-standard technologies to build robust and scalable solutions
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all transform hover:scale-110 group"
              >
                <div className="text-5xl mb-3 group-hover:scale-125 transition-transform">{tech.logo}</div>
                <p className="text-white font-medium text-sm">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how our technology solutions can help you achieve your goals
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/request-quote"
              className="bg-gradient-to-r from-[#1E90FF] to-[#009688] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Request a Quote
              <FaArrowRight />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-[#1E90FF] text-[#1E90FF] px-8 py-4 rounded-lg font-semibold hover:bg-[#1E90FF] hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default TechServices;
