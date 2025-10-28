import React from 'react';
import { FaWhatsapp, FaWeixin, FaEnvelope, FaComments } from 'react-icons/fa';

const FloatingContactButtons = () => {

  // Your contact information
  const contactInfo = {
    whatsapp: '+2348067970138',
    email: 'eskaleightserviceslimited@gmail.com',
    wechat: 'eskaleight',
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello! I would like to inquire about your services.');
    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${contactInfo.email}?subject=Service Inquiry&body=Hello, I would like to know more about your services.`;
  };

  const handleWeChat = () => {
    alert(`Add us on WeChat: ${contactInfo.wechat}\n\nPlease scan our QR code or search for our WeChat ID to connect with us.`);
  };

  const handleChat = () => {
    window.location.href = '/contact';
  };

  return (
    <>
      {/* Floating Contact Buttons - Mobile shows text, Desktop shows circles */}
      <div className="fixed right-3 md:right-6 bottom-6 z-50 flex flex-col gap-3">

        {/* WhatsApp Button - Semi-transparent style like reference site */}
        <button
          onClick={handleWhatsApp}
          className="group relative flex items-center justify-center w-14 h-14 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-white hover:bg-opacity-100 text-[#25D366] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="WhatsApp Chat"
          title="WhatsApp Chat"
        >
          <FaWhatsapp className="text-4xl md:text-3xl" />

          {/* Desktop tooltip */}
          <span className="hidden md:group-hover:block absolute right-full mr-3 bg-gray-900 text-white px-4 py-3 rounded-lg text-xs whitespace-nowrap shadow-xl">
            <div className="font-semibold mb-1">WhatsApp</div>
            <div className="text-green-300">{contactInfo.whatsapp}</div>
          </span>
        </button>

        {/* WeChat Button */}
        <button
          onClick={handleWeChat}
          className="group relative flex items-center justify-center w-14 h-14 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-white hover:bg-opacity-100 text-[#09B83E] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="WeChat Contact"
          title="WeChat Contact"
        >
          <FaWeixin className="text-4xl md:text-3xl" />

          {/* Desktop tooltip */}
          <span className="hidden md:group-hover:block absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
            WeChat: {contactInfo.wechat}
          </span>
        </button>

        {/* Email Button */}
        <button
          onClick={handleEmail}
          className="group relative flex items-center justify-center w-14 h-14 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-white hover:bg-opacity-100 text-[#EA4335] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Send Email"
          title="Send Email"
        >
          <FaEnvelope className="text-4xl md:text-3xl" />

          {/* Desktop tooltip */}
          <span className="hidden md:group-hover:block absolute right-full mr-3 bg-gray-900 text-white px-4 py-3 rounded-lg text-xs whitespace-nowrap shadow-xl">
            <div className="font-semibold mb-1">Email</div>
            <div className="text-blue-300 max-w-[200px] break-words">{contactInfo.email}</div>
          </span>
        </button>

        {/* Live Chat Button */}
        <button
          onClick={handleChat}
          className="group relative flex items-center justify-center w-14 h-14 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-white hover:bg-opacity-100 text-[#1E90FF] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Live Chat"
          title="Live Chat Support"
        >
          <FaComments className="text-4xl md:text-3xl animate-pulse" />

          {/* Desktop tooltip */}
          <span className="hidden md:group-hover:block absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
            Live Chat Support
          </span>

          {/* Online indicator */}
          <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
        </button>
      </div>

      {/* Contact Info Top Bar - Mobile Optimized */}
      <div className="fixed top-0 left-0 right-0 bg-[#0B1F3F] text-white z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-0 flex flex-col sm:flex-row justify-between sm:justify-end items-center gap-2 sm:gap-6 text-xs">
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-2 hover:text-[#1E90FF] transition-colors touch-manipulation"
            title="Send us an email"
          >
            <FaEnvelope className="text-sm flex-shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-none">{contactInfo.email}</span>
          </a>
          <a
            href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#25D366] transition-colors touch-manipulation"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp className="text-sm flex-shrink-0" />
            <span>{contactInfo.whatsapp}</span>
          </a>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .touch-manipulation {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
      `}</style>
    </>
  );
};

export default FloatingContactButtons;
