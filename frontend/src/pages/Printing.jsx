import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import all printing images
import printing from '../assets/images/services/printing/printing.jpeg';
import printing1 from '../assets/images/services/printing/printing1.jpeg';
import printing2 from '../assets/images/services/printing/printing2.jpeg';
import printing3 from '../assets/images/services/printing/printing3.jpeg';
import printing4 from '../assets/images/services/printing/printing4.jpeg';
import printing5 from '../assets/images/services/printing/printing5.jpeg';
import printing6 from '../assets/images/services/printing/printing6.png';
import printing7 from '../assets/images/services/printing/printing7.jpg';
import printing8 from '../assets/images/services/printing/printing8.jpg';
import printing9 from '../assets/images/services/printing/printing9.jpg';
import printing10 from '../assets/images/services/printing/printing10.jpg';
import printing11 from '../assets/images/services/printing/printing11.jpg';
import printing12 from '../assets/images/services/printing/printing12.jpg';
import printing13 from '../assets/images/services/printing/printing13.jpg';
import printing14 from '../assets/images/services/printing/printing14.jpg';
import printing15 from '../assets/images/services/printing/printing15.jpg';

const Printing = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const printingServices = [
    {
      id: 1,
      image: printing1,
      title: 'Large Format Printing',
      caption: 'Make Your Message BIGGER Than Life',
      category: 'large-format',
      description: 'Eye-catching banners, posters, and signage that command attention'
    },
    {
      id: 2,
      image: printing2,
      title: 'Vehicle Branding',
      caption: 'Turn Every Journey Into A Marketing Campaign',
      category: 'branding',
      description: 'Transform your fleet into mobile billboards'
    },
    {
      id: 3,
      image: printing3,
      title: 'Product Packaging',
      caption: 'Packaging That Tells Your Brand Story',
      category: 'packaging',
      description: 'Custom packaging solutions that make products irresistible'
    },
    {
      id: 4,
      image: printing4,
      title: 'Business Stationery',
      caption: 'Leave A Lasting Professional Impression',
      category: 'stationery',
      description: 'Business cards, letterheads, and branded materials'
    },
    {
      id: 5,
      image: printing5,
      title: 'Promotional Materials',
      caption: 'Marketing Tools That Actually Work',
      category: 'promotional',
      description: 'Brochures, flyers, and catalogs that drive results'
    },
    {
      id: 6,
      image: printing6,
      title: 'Custom Banners',
      caption: 'Stand Out At Every Event',
      category: 'large-format',
      description: 'Durable, vibrant banners for any occasion'
    },
    {
      id: 7,
      image: printing7,
      title: 'Digital Printing',
      caption: 'Speed Meets Quality',
      category: 'digital',
      description: 'Fast turnaround without compromising on quality'
    },
    {
      id: 8,
      image: printing8,
      title: 'Branded Merchandise',
      caption: 'Your Brand, Everywhere',
      category: 'branding',
      description: 'Custom printed promotional items and merchandise'
    },
    {
      id: 9,
      image: printing9,
      title: 'Signage Solutions',
      caption: 'Guiding Eyes, Capturing Attention',
      category: 'signage',
      description: 'Indoor and outdoor signage that gets noticed'
    },
    {
      id: 10,
      image: printing10,
      title: 'Label Printing',
      caption: 'Small Details, Big Impact',
      category: 'packaging',
      description: 'Professional labels for products and packaging'
    },
    {
      id: 11,
      image: printing11,
      title: 'Offset Printing',
      caption: 'Premium Quality, Large Volumes',
      category: 'offset',
      description: 'High-volume printing with exceptional consistency'
    },
    {
      id: 12,
      image: printing12,
      title: 'Wall Graphics',
      caption: 'Transform Spaces Into Experiences',
      category: 'large-format',
      description: 'Custom wall murals and graphics for interior branding'
    },
    {
      id: 13,
      image: printing13,
      title: 'Event Materials',
      caption: 'Make Your Event Unforgettable',
      category: 'promotional',
      description: 'Complete printing solutions for events and exhibitions'
    },
    {
      id: 14,
      image: printing14,
      title: 'Textile Printing',
      caption: 'Fabric Meets Creativity',
      category: 'textile',
      description: 'Custom printing on fabrics and textiles'
    },
    {
      id: 15,
      image: printing15,
      title: 'POS Materials',
      caption: 'Drive Sales At The Point Of Purchase',
      category: 'promotional',
      description: 'Point of sale displays that boost conversions'
    },
    {
      id: 16,
      image: printing,
      title: 'Custom Solutions',
      caption: 'If You Can Dream It, We Can Print It',
      category: 'custom',
      description: 'Bespoke printing solutions tailored to your needs'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: '🎨' },
    { id: 'large-format', name: 'Large Format', icon: '📐' },
    { id: 'branding', name: 'Branding', icon: '🚗' },
    { id: 'packaging', name: 'Packaging', icon: '📦' },
    { id: 'promotional', name: 'Promotional', icon: '📢' },
    { id: 'digital', name: 'Digital', icon: '⚡' },
  ];

  const filteredServices = activeCategory === 'all'
    ? printingServices
    : printingServices.filter(service => service.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section with Print-inspired Design */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 text-white py-24 overflow-hidden">
        {/* CMYK Dots Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle, cyan 2px, transparent 2px),
                            radial-gradient(circle, magenta 2px, transparent 2px),
                            radial-gradient(circle, yellow 2px, transparent 2px)`,
            backgroundSize: '60px 60px, 80px 80px, 100px 100px',
            backgroundPosition: '0 0, 20px 20px, 40px 40px'
          }}></div>
        </div>

        {/* Animated CMYK Circles */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-magenta-400 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-yellow-400 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20">
              <span className="text-4xl">🖨️</span>
              <span className="font-semibold text-lg">Professional Printing Services</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Print Your Vision<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Into Reality
              </span>
            </h1>

            <p className="text-2xl md:text-3xl mb-8 text-cyan-100 font-medium">
              Where Quality Meets Creativity
            </p>

            <p className="text-lg max-w-3xl mx-auto text-slate-200 leading-relaxed mb-8">
              From concept to creation, we deliver exceptional printing solutions that elevate your brand.
              High-quality materials, cutting-edge technology, and unmatched attention to detail.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              {[
                { number: '1000+', label: 'Projects Completed' },
                { number: '24/7', label: 'Customer Support' },
                { number: '100%', label: 'Quality Guaranteed' },
                { number: '48hrs', label: 'Fast Turnaround' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-cyan-300 mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H0V0Z" fill="#F8FAFC"/>
          </svg>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Printing Gallery - Modern Grid Layout */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
              Our Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Printing Excellence Showcase
            </h2>
            <p className="text-xl text-gray-600">
              Explore our diverse range of printing services - {filteredServices.length} solutions and counting
            </p>
          </div>

          {/* Bento-style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  index % 7 === 0 || index % 7 === 3 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${
                  index % 7 === 0 || index % 7 === 3 ? 'h-full min-h-[500px]' : 'h-80'
                }`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                  {/* CMYK Corner Accent */}
                  <div className="absolute top-0 right-0 flex">
                    <div className="w-3 h-20 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-3 h-20 bg-magenta-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75"></div>
                    <div className="w-3 h-20 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold border border-white/30">
                        {service.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
                      {service.title}
                    </h3>

                    {/* Caption - Eye-catching */}
                    <p className="text-lg md:text-xl font-semibold text-cyan-300 mb-3 italic drop-shadow-md">
                      "{service.caption}"
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {service.description}
                    </p>

                    {/* Hover Action */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                      <div className="inline-flex items-center gap-2 text-cyan-300 font-semibold">
                        <span>Learn More</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-cyan-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)',
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Our Printing Services?
            </h2>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              Industry-leading quality, unbeatable turnaround times, and exceptional customer service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Precision & Quality',
                description: 'State-of-the-art equipment and premium materials ensure every print is perfect'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Same-day and express services available without compromising on quality'
              },
              {
                icon: '💰',
                title: 'Best Value',
                description: 'Competitive pricing with volume discounts and no hidden fees'
              },
              {
                icon: '🎨',
                title: 'Design Support',
                description: 'Free design consultation and file preparation assistance'
              },
              {
                icon: '🌍',
                title: 'Eco-Friendly',
                description: 'Sustainable printing options with recycled materials and eco-inks'
              },
              {
                icon: '🤝',
                title: 'Dedicated Support',
                description: 'Personal account managers for corporate clients and large projects'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl animate-float top-10 left-10"></div>
          <div className="absolute w-80 h-80 bg-white rounded-full blur-3xl animate-float bottom-10 right-10" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="text-7xl mb-6 animate-bounce">🚀</div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready To Bring Your Ideas To Print?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
            Let's create something amazing together. Get a free quote today and see the difference
            professional printing makes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
            >
              <span>Get Free Quote</span>
              <span className="text-2xl">📋</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 bg-transparent border-3 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:shadow-2xl border-2"
            >
              <span>Talk To Expert</span>
              <span className="text-2xl">💬</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Printing;
