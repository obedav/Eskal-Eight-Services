import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Import client logos
import fmnLogo from '../assets/images/services/Clients/fmn.png';
import fourPointsLogo from '../assets/images/services/Clients/four-points.png';
import goldenLogo from '../assets/images/services/Clients/golden.jpg';
import baggoLogo from '../assets/images/services/Clients/baggo.jpg';
import macgregolLogo from '../assets/images/services/Clients/MacGregol.png';
import ijewereLogo from '../assets/images/services/Clients/ijewere.jpg';
import golden1Logo from '../assets/images/services/Clients/golden1.png';
import lynEdgeLogo from '../assets/images/services/Clients/lyn-edge.png';
import ascoLogo from '../assets/images/services/Clients/asco.jpg';
import nrLogo from '../assets/images/services/Clients/NR.jpg';

// Import service images (different from Services page)
import brandingHomeImg from '../assets/images/services/image18.jpg';
import procurementHomeImg from '../assets/images/services/GOLDEN-PENNY-PAPER-FOOD-PACK_034646.jpg';
import inflatableHomeImg from '../assets/images/services/inflatable/inflatable1.jpeg';
import printingHomeImg from '../assets/images/services/design1.jpg';
import consultancyHomeImg from '../assets/images/services/polo-shirt.jpg';
import giftingHomeImg from '../assets/images/services/product-advert.jpg';

const Home = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    // Trigger animations on scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-animate]');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(prev => ({ ...prev, [index]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: 'Brand Management',
      description: 'Corporate identity and product branding solutions',
      image: brandingHomeImg,
    },
    {
      title: 'Procurement & Supplies',
      description: 'Quality materials and equipment sourcing',
      image: procurementHomeImg,
    },
    {
      title: 'Product Replica Inflatables',
      description: 'Custom giant inflatable product replicas for events',
      image: inflatableHomeImg,
      link: '/inflatables',
    },
    {
      title: 'Printing Services',
      description: 'Professional printing and customization',
      image: printingHomeImg,
    },
    {
      title: 'Consultancy',
      description: 'Expert brand and business consulting',
      image: consultancyHomeImg,
    },
    {
      title: 'Corporate Gifting',
      description: 'Premium branded corporate gifts',
      image: giftingHomeImg,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Stripe/Deel Style with Curved Shape */}
      <section className="hero-gradient text-white overflow-hidden relative pb-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Curved Bottom Shape */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 8C120 16 240 32 360 42.7C480 53 600 59 720 56C840 53 960 43 1080 42.7C1200 43 1320 53 1380 58.7L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb"/>
          </svg>
        </div>

        {/* Moving Bus Across Full Hero Section */}
        <div className="absolute bottom-32 left-0 right-0 z-20 pointer-events-none">
          <div className="relative w-full h-16">
            {/* Moving Bus - Flipped to face forward */}
            <div className="absolute bottom-2 bus-animate-full text-6xl filter drop-shadow-2xl transform scale-x-[-1]">
              🚚
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          {/* 2 Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column - Powerful Message */}
            <div className="text-left animate-slide-in-left">
              <div className="inline-block mb-4">
                <span className="bg-white/10 backdrop-blur-md text-blue-100 px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                  🏆 Nigeria's Trusted Partner
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Elevating Brands,
                <span className="block gradient-text bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                  Delivering Excellence
                </span>
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                From branding to procurement, we provide comprehensive solutions
                that empower Nigeria's leading organizations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/request-quote"
                  className="group relative bg-white text-[#0B1F3F] px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl text-center overflow-hidden"
                >
                  <span className="relative z-10">Get Started →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/services"
                  className="group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
                >
                  Explore Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-blue-100">500+ Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                    ⭐
                  </div>
                  <span className="text-blue-100">98% Satisfaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                    🏅
                  </div>
                  <span className="text-blue-100">10+ Years</span>
                </div>
              </div>
            </div>

            {/* Right Column - Animated Visual */}
            <div className="relative animate-slide-in-right">
              {/* Floating Cards Animation */}
              <div className="relative h-96 lg:h-[500px]">

                {/* Card 1 - Main Card */}
                <div className="absolute top-0 left-0 right-0 card-glass p-8 animate-float">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                      🎨
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Brand Management</h3>
                      <p className="text-gray-600 text-sm">Creative Solutions</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-700 text-sm">Corporate Branding</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <span className="text-gray-700 text-sm">Product Customization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      <span className="text-gray-700 text-sm">Marketing Materials</span>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Inflatable Card (Bottom Left) */}
                <div className="absolute bottom-0 left-0 w-64 card-glass p-6 animate-float" style={{animationDelay: '1s'}}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                      🎈
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Inflatables</h4>
                      <p className="text-gray-600 text-xs">Custom Replicas</p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse" style={{width: '85%'}}></div>
                  </div>
                </div>

                {/* Card 3 - Stats Card (Bottom Right) */}
                <div className="absolute bottom-0 right-0 w-56 card-glass p-6 animate-float" style={{animationDelay: '2s'}}>
                  <div className="text-center">
                    <div className="text-4xl mb-2">📦</div>
                    <div className="text-3xl font-bold gradient-text bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                      1000+
                    </div>
                    <p className="text-gray-600 text-sm">Products Delivered</p>
                  </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse-slow"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Overview - Clean Grid */}
      <section className="py-24 bg-white" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-50 text-[#1E90FF] rounded-full text-sm font-semibold mb-4">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions tailored to meet your business needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link || "/services"}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Decorative Corner Element */}
                  <div className="absolute top-0 right-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1E90FF]/20 to-transparent rounded-bl-3xl"></div>
                  </div>

                  {/* Title on Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-12 h-1 bg-[#1E90FF] rounded-full mb-3"></div>
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 bg-white">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center text-[#1E90FF] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    <span>Learn more</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Clean Feature Grid */}
      <section className="py-24 bg-gray-50" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white text-[#1E90FF] rounded-full text-sm font-semibold mb-4 border border-gray-200">
              Our Advantages
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to excellence in everything we do
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', title: 'Quality Assurance', desc: 'Certified professionals and premium materials' },
              { color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', title: 'Fast Delivery', desc: 'On-time execution and timely completion' },
              { color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', title: 'Competitive Pricing', desc: 'Transparent quotes and value for money' },
              { color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', title: '24/7 Support', desc: 'Dedicated customer support team' },
            ].map((item, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#1E90FF]/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                {/* Gradient Accent */}
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${item.color}`}></div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1E90FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.desc}
                </p>

                {/* Decorative Element */}
                <div className="absolute bottom-4 right-4 opacity-10">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.color}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Clients - Clean Grid */}
      <section className="py-24 bg-white" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-50 text-[#1E90FF] rounded-full text-sm font-semibold mb-4">
              Our Partners
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're proud to work with some of Nigeria's most respected companies
            </p>
          </div>

          {/* Client Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
            {[
              { logo: fmnLogo, name: 'FMN' },
              { logo: fourPointsLogo, name: 'Four Points' },
              { logo: goldenLogo, name: 'Golden Penny' },
              { logo: baggoLogo, name: 'BAGCO' },
              { logo: macgregolLogo, name: 'MacGREGOL' },
              { logo: ijewereLogo, name: 'Ijewere & Co' },
              { logo: golden1Logo, name: 'Golden Sukh' },
              { logo: lynEdgeLogo, name: 'Lyn-Edge' },
              { logo: ascoLogo, name: 'ASCO' },
              { logo: nrLogo, name: 'NR' },
            ].map((client, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center p-4 h-28 hover:bg-white hover:border-[#1E90FF]/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '50+', label: 'Corporate Clients', color: 'from-blue-500 to-blue-600' },
              { number: '1000+', label: 'Products Branded', color: 'from-purple-500 to-purple-600' },
              { number: '98%', label: 'Client Satisfaction', color: 'from-green-500 to-green-600' },
            ].map((badge, index) => (
              <div key={index} className="group relative text-center p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl hover:border-[#1E90FF]/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Decorative top accent */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${badge.color}`}></div>

                {/* Number */}
                <div className="relative z-10">
                  <h3 className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${badge.color} bg-clip-text text-transparent mb-3`}>
                    {badge.number}
                  </h3>
                  <p className="text-gray-600 font-medium">{badge.label}</p>
                </div>

                {/* Decorative background element */}
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${badge.color}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Clean Gradient */}
      <section className="relative bg-gradient-to-br from-[#0B1F3F] to-[#1E90FF] text-white overflow-hidden" data-animate>
        {/* Curved Top */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto rotate-180">
            <path d="M0 0L60 8C120 16 240 32 360 42.7C480 53 600 59 720 56C840 53 960 43 1080 42.7C1200 43 1320 53 1380 58.7L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>

        {/* Subtle background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Let us help you bring your vision to life. Request a quote today
            and discover the ESKAL EIGHT difference.
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

        {/* Curved Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 8C120 16 240 32 360 42.7C480 53 600 59 720 56C840 53 960 43 1080 42.7C1200 43 1320 53 1380 58.7L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Stats Section - Clean Minimal */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '200+', label: 'Happy Clients' },
              { number: '10+', label: 'Years Experience' },
              { number: '24/7', label: 'Customer Support' },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-[#1E90FF] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
