import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    { title: 'Commitment', description: 'Dedicated to delivering on our promises with unwavering focus in every project.', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
    { title: 'Customer Value', description: 'Putting clients first, ensuring every solution adds real value to their success.', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' },
    { title: 'Teamwork', description: 'Collaborative approach to achieve exceptional results together.', color: 'from-green-500 to-green-600', bg: 'bg-green-50' },
    { title: 'Professionalism', description: 'Maintaining highest standards of business conduct and service excellence.', color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Adaptability', description: 'Adapting to changing business needs with agile, innovative solutions.', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50' },
    { title: 'Social Responsibility', description: 'Contributing positively to society with ethical business practices.', color: 'from-pink-500 to-pink-600', bg: 'bg-pink-50' },
  ];

  const milestones = [
    { year: '2019', event: 'Company Founded' },
    { year: '2020', event: 'Eskal8 Couture Launched' },
    { year: '2021', event: 'Major Client Partnerships' },
    { year: '2022', event: 'Service Portfolio Expanded' },
    { year: '2024', event: 'Tech Division Launch' },
    { year: '2025', event: 'China Expansion' },
  ];

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
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-4">
              Your trusted partner in branding, procurement, and logistics across Nigeria
            </p>
            <p className="text-2xl font-semibold text-white">
              "Above and beyond the Regular"
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 8C120 16 240 32 360 42.7C480 53 600 59 720 56C840 53 960 43 1080 42.7C1200 43 1320 53 1380 58.7L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </div>

      {/* Company Overview */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-blue-50 text-[#1E90FF] rounded-full text-sm font-semibold mb-6">
              Who We Are
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Building Brands, Delivering Excellence
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              <strong>Eskal Eight Services Ltd</strong> (RC 2559791) is a dynamic company established in 2019, offering high-quality branding, procurement, and logistics solutions to organizations across Nigeria.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Through <strong>Eskal8 Couture</strong>, we produce premium corporate uniforms, PPE, hotel amenities, and custom apparel. We position ourselves as partners who grow with our customers.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              In 2025, we expanded globally with <strong>Taichangqing Trading Company Limited</strong> in China, enabling international procurement with competitive pricing.
            </p>
            <Link
              to="/services"
              className="inline-block bg-[#1E90FF] text-white px-8 py-4 rounded-xl hover:bg-[#0077CC] transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
            >
              Explore Our Services →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { number: '2019', label: 'Established' },
              { number: '1000+', label: 'Products Branded' },
              { number: '50+', label: 'Corporate Clients' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#1E90FF]/30 hover:shadow-lg transition-all duration-300 text-center group">
                <div className="text-4xl font-bold text-[#1E90FF] mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-10 border-2 border-blue-200 overflow-hidden group">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>

              {/* Number badge */}
              <div className="mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">01</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                "To help customers build a reliable, secure, and flexible branding foundation that enables them to achieve their business objectives."
              </p>

              {/* Decorative element */}
              <div className="absolute -bottom-10 -right-10 opacity-10">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-600"></div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-10 border-2 border-purple-200 overflow-hidden group">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-pink-600"></div>

              {/* Number badge */}
              <div className="mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">02</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be Nigeria's leading branding and promotional solutions provider, recognized for quality, innovation, and customer-centric approach.
              </p>

              {/* Decorative element */}
              <div className="absolute -bottom-10 -right-10 opacity-10">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-pink-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-50 text-[#1E90FF] rounded-full text-sm font-semibold mb-4">
            What Drives Us
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#1E90FF]/30 hover:shadow-lg transition-all duration-300 group overflow-hidden"
            >
              {/* Gradient Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color}`}></div>

              {/* Number Badge */}
              <div className="mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-md`}>
                  <span className="text-white font-bold text-xl">{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1E90FF] transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>

              {/* Decorative background element */}
              <div className="absolute -bottom-8 -right-8 opacity-5">
                <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${value.color}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative bg-gradient-to-br from-[#0B1F3F] to-[#1E90FF] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md text-blue-100 rounded-full text-sm font-semibold mb-4 border border-white/20">
              Our Journey
            </span>
            <h2 className="text-4xl font-bold mb-4">Key Milestones</h2>
            <p className="text-xl text-blue-100">Highlights of our growth story</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-2xl font-bold text-white mb-2">{milestone.year}</div>
                <div className="text-sm text-blue-100">{milestone.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-50 text-[#1E90FF] rounded-full text-sm font-semibold mb-4">
              Our Advantages
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ESKAL EIGHT?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What sets us apart from the competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { bg: 'bg-blue-50', title: 'Cutting-Edge Technology', desc: 'Modern branding technologies for efficiency and quality', color: 'from-blue-500 to-blue-600' },
              { bg: 'bg-green-50', title: 'Global Reach', desc: 'Expanded to China with Taichangqing Trading Company', color: 'from-green-500 to-green-600' },
              { bg: 'bg-purple-50', title: 'Fast Turnaround', desc: 'Unequalled turnaround through reliable partnerships', color: 'from-purple-500 to-purple-600' },
            ].map((item, index) => (
              <div key={index} className="relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#1E90FF]/30 hover:shadow-lg transition-all duration-300 text-center group overflow-hidden">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}></div>

                {/* Number badge */}
                <div className="mb-6 flex justify-center">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                    <span className="text-white font-bold text-2xl">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1E90FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>

                {/* Decorative background element */}
                <div className="absolute -bottom-8 -right-8 opacity-5">
                  <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${item.color}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-[#0B1F3F] to-[#1E90FF] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl mb-10 text-blue-100">
            Let's discuss your project and discover how we can help you achieve your goals.
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

export default About;
