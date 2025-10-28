import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import all mascot images
import mascot1 from '../assets/images/services/mascot/mascot1.jpg';
import mascot2 from '../assets/images/services/mascot/mascot2.jpg';
import mascot3 from '../assets/images/services/mascot/mascot3.jpg';
import mascot4 from '../assets/images/services/mascot/mascot4.jpeg';
import mascot5 from '../assets/images/services/mascot/mascot5.jpeg';
import mascot6 from '../assets/images/services/mascot/mascot6.jpeg';

const Mascots = () => {
  const [selectedMascot, setSelectedMascot] = useState(null);

  const mascots = [
    {
      id: 1,
      image: mascot1,
      title: 'Custom Character Mascots',
      description: 'Bring your brand characters to life with professionally crafted mascots',
      features: ['Full Custom Design', 'Premium Materials', 'Brand Representation']
    },
    {
      id: 2,
      image: mascot2,
      title: 'Corporate Brand Mascots',
      description: 'Professional mascot costumes for corporate events and brand activations',
      features: ['Corporate Events', 'Trade Shows', 'Grand Openings']
    },
    {
      id: 3,
      image: mascot3,
      title: 'Product Mascots',
      description: 'Transform your products into lovable, huggable brand ambassadors',
      features: ['Product Launches', 'Retail Promotions', 'Market Activations']
    },
    {
      id: 4,
      image: mascot4,
      title: 'Event Mascots',
      description: 'Create memorable experiences with custom event mascots',
      features: ['Festivals', 'Sports Events', 'Entertainment']
    },
    {
      id: 5,
      image: mascot5,
      title: 'Promotional Mascots',
      description: 'Eye-catching mascots designed to boost your promotional campaigns',
      features: ['Marketing Campaigns', 'Store Openings', 'Special Events']
    },
    {
      id: 6,
      image: mascot6,
      title: 'Themed Character Mascots',
      description: 'Unique themed mascots tailored to your specific brand identity',
      features: ['Custom Themes', 'Brand Storytelling', 'Interactive Experiences']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section with Animated Background */}
      <section className="relative bg-gradient-to-br from-[#FF6B6B] via-[#4ECDC4] to-[#45B7D1] text-white py-24 overflow-hidden">
        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full animate-float blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-300 rounded-full animate-float blur-3xl" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-300 rounded-full animate-float blur-3xl" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/30">
              <span className="text-4xl animate-bounce">🎭</span>
              <span className="font-semibold text-lg">Premium Mascot Services</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
              Bring Your Brand <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                To Life!
              </span>
            </h1>
            <p className="text-2xl md:text-3xl mb-8 text-white/90 font-medium">
              Custom Mascots That Make Brands Unforgettable
            </p>
            <p className="text-lg max-w-3xl mx-auto text-white/80 leading-relaxed">
              From concept to creation, we design and build high-quality mascot costumes that capture
              hearts, create connections, and make your brand the star of every event.
            </p>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H0V0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              Why Partner With Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mascot Magic That Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We don't just create mascots – we create brand experiences that resonate
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '🎨', title: 'Custom Design', desc: 'Tailored to your unique brand identity' },
              { icon: '💎', title: 'Premium Quality', desc: 'Durable materials built to last' },
              { icon: '⚡', title: 'Fast Turnaround', desc: 'Quick delivery without compromising quality' },
              { icon: '❤️', title: 'Brand Love', desc: 'Create emotional connections with audiences' }
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-purple-200"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mascot Gallery - Unique Masonry-style Layout */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white shadow-md rounded-full text-sm font-semibold mb-4 text-purple-700">
              Our Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mascots We've Brought to Life
            </h2>
            <p className="text-xl text-gray-600">
              Click on any mascot to explore the details
            </p>
          </div>

          {/* Interactive Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mascots.map((mascot, index) => (
              <div
                key={mascot.id}
                onClick={() => setSelectedMascot(selectedMascot === mascot.id ? null : mascot.id)}
                className={`group relative cursor-pointer rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
                  index === 0 || index === 5 ? 'md:row-span-2' : ''
                } ${selectedMascot === mascot.id ? 'ring-4 ring-purple-500 scale-105' : 'hover:scale-105'}`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${index === 0 || index === 5 ? 'h-[600px]' : 'h-80'}`}>
                  <img
                    src={mascot.image}
                    alt={mascot.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                    <div className="absolute top-0 left-0 w-1 h-20 bg-gradient-to-b from-pink-500 to-purple-500"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-1 bg-gradient-to-l from-pink-500 to-purple-500"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-20 bg-gradient-to-t from-pink-500 to-purple-500"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold border border-white/30">
                        #{mascot.id}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                      {mascot.title}
                    </h3>
                    <p className="text-sm text-gray-200 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {mascot.description}
                    </p>

                    {/* Features Tags - Show on Hover */}
                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                      {mascot.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-lg text-xs border border-white/20">
                          ✨ {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Click Indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                      <span className="text-white text-lg">👁️</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Perfect For Every Occasion
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Corporate Events', desc: 'Make your brand memorable at conferences, trade shows, and corporate gatherings', icon: '🏢' },
                  { title: 'Product Launches', desc: 'Create buzz and excitement around new product releases', icon: '🚀' },
                  { title: 'Sports & Entertainment', desc: 'Energize crowds and create unforgettable fan experiences', icon: '⚽' },
                  { title: 'Retail Promotions', desc: 'Drive foot traffic and boost sales with engaging mascot appearances', icon: '🛍️' },
                  { title: 'Community Events', desc: 'Connect with your community and build brand loyalty', icon: '🎉' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-300">
                    <span className="text-4xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 z-10"></div>
                <img
                  src={mascot1}
                  alt="Featured Mascot"
                  className="w-full h-[600px] object-cover"
                />
              </div>
              {/* Floating Badges */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="text-3xl mb-1">⭐</div>
                <div className="font-bold text-gray-900">100%</div>
                <div className="text-xs text-gray-600">Custom Made</div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{animationDelay: '1s'}}>
                <div className="text-3xl mb-1">🎯</div>
                <div className="font-bold text-gray-900">50+</div>
                <div className="text-xs text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="text-6xl mb-6 animate-bounce">🎭</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Create Your Perfect Mascot?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Let's design a mascot that captures your brand's personality and creates lasting
            impressions. Our team is ready to bring your vision to life!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
            >
              <span>Get Your Quote</span>
              <span className="text-2xl">→</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-3 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 hover:shadow-2xl border-2"
            >
              <span>Contact Us</span>
              <span className="text-2xl">💬</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mascots;
