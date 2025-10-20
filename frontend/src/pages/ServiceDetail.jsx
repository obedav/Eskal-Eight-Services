import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock service data - will be replaced with API call
  const service = {
    id: parseInt(id),
    title: 'Procurement & Supplies',
    category: 'procurement',
    description: 'Complete procurement solutions for businesses, government agencies, and organizations across Nigeria.',
    longDescription: `Our procurement and supplies service offers comprehensive solutions for all your organizational needs.
    We specialize in sourcing, purchasing, and delivering quality materials, equipment, and supplies across various sectors.
    With our extensive network of reliable suppliers and efficient logistics systems, we ensure timely delivery and competitive pricing.`,
    features: [
      'General supplies and materials procurement',
      'Office equipment and furniture',
      'Industrial machinery and equipment',
      'Medical and laboratory supplies',
      'ICT equipment and accessories',
      'Construction materials',
      'Vendor management and quality assurance',
      'Competitive pricing and cost optimization',
    ],
    benefits: [
      'Access to wide network of verified suppliers',
      'Cost-effective procurement solutions',
      'Quality assurance on all products',
      'Timely delivery and logistics support',
      'Flexible payment terms',
      'After-sales support',
    ],
    image: '📦',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Services
          </button>

          <div className="flex items-start gap-6">
            <div className="text-6xl bg-white bg-opacity-10 p-6 rounded-lg">
              {service.image}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
              <p className="text-xl text-gray-300 mb-6">
                {service.description}
              </p>
              <Link
                to="/request-quote"
                className="inline-block bg-[#1E90FF] text-white px-8 py-3 rounded-lg hover:bg-[#0077CC] transition-colors font-medium"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Service Overview
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {service.longDescription}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What We Offer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-[#1E90FF] flex-shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Us
              </h2>
              <div className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#1E90FF] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Get Started Today
              </h3>
              <p className="text-gray-600 mb-6">
                Request a quote for this service and our team will get back to you within 24 hours.
              </p>

              <Link
                to="/request-quote"
                className="block w-full bg-[#1E90FF] text-white text-center px-6 py-3 rounded-lg hover:bg-[#0077CC] transition-colors font-medium mb-3"
              >
                Request Quote
              </Link>

              <Link
                to="/contact"
                className="block w-full bg-white border-2 border-[#1E90FF] text-[#1E90FF] text-center px-6 py-3 rounded-lg hover:bg-[#1E90FF] hover:text-white transition-colors font-medium"
              >
                Contact Us
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Contact Information
                </h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#1E90FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>+234 XXX XXX XXXX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#1E90FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>info@eskaleight.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#1E90FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Mon - Fri: 8AM - 5PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Related Services
              </h3>
              <div className="space-y-3">
                <Link
                  to="/services/2"
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚚</span>
                    <span className="text-gray-700 hover:text-[#1E90FF]">
                      Logistics & Haulage
                    </span>
                  </div>
                </Link>
                <Link
                  to="/services/3"
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏗️</span>
                    <span className="text-gray-700 hover:text-[#1E90FF]">
                      Construction Services
                    </span>
                  </div>
                </Link>
                <Link
                  to="/services"
                  className="block p-3 text-[#1E90FF] hover:underline font-medium"
                >
                  View All Services →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
