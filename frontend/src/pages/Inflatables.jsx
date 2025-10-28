import React from 'react';
import { Link } from 'react-router-dom';

// Import all inflatable images
import inflatable1 from '../assets/images/services/inflatable/inflatable1.jpeg';
import inflatable3 from '../assets/images/services/inflatable/inflatable3.jpg';
import inflatable4 from '../assets/images/services/inflatable/inflatable4.jpg';
import inflatable5 from '../assets/images/services/inflatable/inflatable5.jpg';
import inflatable6 from '../assets/images/services/inflatable/inflatable6.jpg';
import inflatable7 from '../assets/images/services/inflatable/inflatable7.jpg';
import inflatable9 from '../assets/images/services/inflatable/inflatable9.jpg';

const Inflatables = () => {
  const inflatables = [
    {
      id: 1,
      image: inflatable1,
      title: 'Custom Product Replica',
      description: 'High-quality inflatable product replicas'
    },
    {
      id: 3,
      image: inflatable3,
      title: 'Brand Inflatable',
      description: 'Eye-catching promotional inflatables'
    },
    {
      id: 4,
      image: inflatable4,
      title: 'Product Display',
      description: 'Large-scale product displays'
    },
    {
      id: 5,
      image: inflatable5,
      title: 'Marketing Inflatable',
      description: 'Attention-grabbing marketing tools'
    },
    {
      id: 6,
      image: inflatable6,
      title: 'Custom Design',
      description: 'Tailored inflatable solutions'
    },
    {
      id: 7,
      image: inflatable7,
      title: 'Event Inflatable',
      description: 'Perfect for events and exhibitions'
    },
    {
      id: 9,
      image: inflatable9,
      title: 'Promotional Display',
      description: 'Stand out with giant inflatables'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0B1F3F] to-[#1E90FF] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Product Replica Inflatables
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Transform Your Brand with Custom Giant Inflatables
            </p>
            <p className="text-lg max-w-3xl mx-auto text-gray-200">
              Make a lasting impression with our high-quality, custom-made inflatable product replicas.
              Perfect for events, promotions, grand openings, and brand activations.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose Our Inflatable Replicas?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF] to-[#0077CC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Attention-Grabbing</h3>
                <p className="text-gray-600">Stand out from the competition with eye-catching giant replicas</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF] to-[#0077CC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
                <p className="text-gray-600">Tailored to your exact product specifications and branding</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF] to-[#0077CC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💪</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Durable Quality</h3>
                <p className="text-gray-600">Made with premium materials for long-lasting use</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Inflatable Collection
            </h2>
            <p className="text-xl text-gray-600">
              Browse our portfolio of custom inflatable product replicas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inflatables.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0B1F3F] to-[#1E90FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Your Custom Inflatable?
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Let's bring your vision to life with a stunning inflatable replica that will make your brand impossible to ignore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="bg-white text-[#1E90FF] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Request a Quote
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#1E90FF] transition-all duration-300 hover:shadow-xl"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inflatables;
