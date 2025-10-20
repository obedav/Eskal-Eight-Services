import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: '💪',
      title: 'Commitment',
      description: 'Dedicated to delivering on our promises with unwavering focus and determination in every project.',
    },
    {
      icon: '🎯',
      title: 'Customer Value',
      description: 'Putting our customers first, ensuring every solution adds real value to their business success.',
    },
    {
      icon: '🤝',
      title: 'Teamwork',
      description: 'Collaborative approach with our clients and internal teams to achieve exceptional results together.',
    },
    {
      icon: '👔',
      title: 'Professionalism',
      description: 'Maintaining the highest standards of business conduct and service excellence in all our operations.',
    },
    {
      icon: '🔄',
      title: 'Flexibility/Adaptability',
      description: 'Adapting to changing business needs and market demands with agile, innovative solutions.',
    },
    {
      icon: '🌍',
      title: 'Social Responsibility',
      description: 'Contributing positively to society while conducting our business ethically and sustainably.',
    },
  ];

  const team = [
    {
      name: 'John Doe',
      position: 'Chief Executive Officer',
      image: '👨‍💼',
    },
    {
      name: 'Jane Smith',
      position: 'Operations Director',
      image: '👩‍💼',
    },
    {
      name: 'Michael Johnson',
      position: 'Technical Director',
      image: '👨‍🔧',
    },
    {
      name: 'Sarah Williams',
      position: 'Business Development Manager',
      image: '👩‍💻',
    },
  ];

  const milestones = [
    { year: '2019', event: 'Company Founded (RC 2559791)' },
    { year: '2020', event: 'Eskal8 Couture Launched' },
    { year: '2021', event: 'Major Client Partnerships' },
    { year: '2022', event: 'Expanded Service Portfolio' },
    { year: '2024', event: 'Tech Division Launch' },
    { year: '2025', event: 'China Expansion (Taichangqing Trading)' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] text-white">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your trusted partner in branding, procurement, uniforms, and logistics across Nigeria
            </p>
            <p className="text-lg text-[#1E90FF] font-semibold mt-4">
              "Above and beyond the Regular"
            </p>
          </div>
        </div>
      </div>

      {/* Company Overview */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Eskal Eight Services Ltd</strong> (RC 2559791) is a young, dynamic company established in 2019, offering high-quality branding, procurement, and logistics solutions to small, medium, and large organizations across Nigeria.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Through our specialized division <strong>Eskal8 Couture</strong>, we produce premium corporate uniforms, PPE, hotel amenities, and custom apparel. We position ourselves as partners in business who grow with our customers, helping create marketplace awareness through our skilled staff and cutting-edge technologies.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              In 2025, we expanded globally with our subsidiary <strong>Taichangqing Trading Company Limited</strong> in China, enabling us to provide international procurement services with competitive pricing and reliable quality.
            </p>
            <Link
              to="/services"
              className="inline-block bg-[#1E90FF] text-white px-8 py-3 rounded-lg hover:bg-[#0077CC] transition-colors font-medium"
            >
              Our Services
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl font-bold text-[#1E90FF] mb-2">2019</div>
              <div className="text-gray-600">Established</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl font-bold text-[#1E90FF] mb-2">1000+</div>
              <div className="text-gray-600">Products Branded</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl font-bold text-[#1E90FF] mb-2">50+</div>
              <div className="text-gray-600">Corporate Clients</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl font-bold text-[#1E90FF] mb-2">24/7</div>
              <div className="text-gray-600">Fast Delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                "To help customers build a reliable, secure, and flexible branding foundation that enables them to achieve their business objectives."
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <div className="text-5xl mb-4">🔭</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To be Nigeria's leading branding and promotional solutions provider, recognized for quality, innovation, and customer-centric approach while expanding our global reach through strategic partnerships.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-300">
              Key milestones in our growth story
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-[#1E90FF] mb-2">
                  {milestone.year}
                </div>
                <div className="text-sm text-gray-300">{milestone.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experienced professionals driving our success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] p-8 text-center">
                <div className="text-6xl">{member.image}</div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4">{member.position}</p>
                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-[#1E90FF] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ESKAL EIGHT?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What sets us apart from the competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Cutting-Edge Technologies
              </h3>
              <p className="text-gray-600">
                Investment in modern branding technologies for efficiency and quality delivery
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌏</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Global Expansion
              </h3>
              <p className="text-gray-600">
                Expanded to China in 2025 with subsidiary Taichangqing Trading Company Limited
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Fast Turnaround
              </h3>
              <p className="text-gray-600">
                Unequalled turnaround time through partnerships with reliable suppliers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0B1F3F] to-[#112B4A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Let's discuss your project and discover how we can help you achieve
            your goals.
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

export default About;
