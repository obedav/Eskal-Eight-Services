import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import service images
import printingImg from '../../assets/images/services/design.jpg';
import inflatableImg from '../../assets/images/services/inflatable/inflatable1.jpeg';
import mascotImg from '../../assets/images/services/mascot/mascot1.jpg';
import brandingImg from '../../assets/images/services/image19.jpg';
import uniformsImg from '../../assets/images/services/polo-shirt.jpg';
import safetyImg from '../../assets/images/services/overall-jacket.jpg';
import procurementImg from '../../assets/images/services/GOLDEN-PENNY-PAPER-FOOD-PACK_034646.jpg';
import giftingImg from '../../assets/images/services/waist bag.png';

const ServiceTreeBranch = () => {
  const [showBranch, setShowBranch] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const services = [
    { path: '/printing', image: printingImg, label: 'Printing', delay: 0.2 },
    { path: '/inflatables', image: inflatableImg, label: 'Inflatables', delay: 0.3 },
    { path: '/mascots', image: mascotImg, label: 'Mascots', delay: 0.4 },
    { path: '/services', image: brandingImg, label: 'Branding', delay: 0.5 },
    { path: '/services', image: uniformsImg, label: 'Uniforms', delay: 0.6 },
    { path: '/services', image: safetyImg, label: 'Safety', delay: 0.7 },
    { path: '/services', image: procurementImg, label: 'Procurement', delay: 0.8 },
    { path: '/services', image: giftingImg, label: 'Gifting', delay: 0.9 },
  ];

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      // Clear existing timer when user scrolls
      clearTimeout(timeoutId);
      setShowBranch(false);

      // Start a new 3-second timer after scrolling stops
      timeoutId = setTimeout(() => {
        if (!hasInteracted) {
          setShowBranch(true);
        }
      }, 3000);
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    // Start initial timer when component mounts
    timeoutId = setTimeout(() => {
      if (!hasInteracted) {
        setShowBranch(true);
      }
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasInteracted]);

  const handleClose = () => {
    setShowBranch(false);
    setHasInteracted(true);
  };

  if (!showBranch) return null;

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
      {/* Tree Branch */}
      <div className="relative pointer-events-auto">
        {/* Main Branch - Animated from left - Responsive sizes */}
        <div className="relative">
          {/* Branch SVG - Flipped to grow from left - Optimized for mobile visibility */}
          <svg
            className="absolute left-0 top-1/2 -translate-y-1/2 branch-grow w-36 h-72 sm:w-40 sm:h-80 md:w-48 md:h-96 lg:w-52 lg:h-[400px]"
            viewBox="0 0 200 400"
            style={{ filter: 'drop-shadow(-2px 2px 4px rgba(0,0,0,0.2))' }}
          >
            {/* Main branch trunk - flipped */}
            <path
              d="M0 200 Q50 200 100 180 Q120 170 130 150"
              stroke="#8B4513"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="animate-draw-branch"
            />

            {/* Branch 1 */}
            <path
              d="M50 200 Q60 190 70 175"
              stroke="#8B4513"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              className="animate-draw-branch"
              style={{ animationDelay: '0.3s' }}
            />

            {/* Branch 2 */}
            <path
              d="M80 185 Q90 180 100 165"
              stroke="#8B4513"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              className="animate-draw-branch"
              style={{ animationDelay: '0.4s' }}
            />

            {/* Branch 3 */}
            <path
              d="M110 175 Q120 185 130 200"
              stroke="#8B4513"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              className="animate-draw-branch"
              style={{ animationDelay: '0.5s' }}
            />

            {/* Branch 4 */}
            <path
              d="M50 200 Q60 210 70 225"
              stroke="#8B4513"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              className="animate-draw-branch"
              style={{ animationDelay: '0.6s' }}
            />

            {/* Branch 5 */}
            <path
              d="M80 215 Q90 220 100 235"
              stroke="#8B4513"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              className="animate-draw-branch"
              style={{ animationDelay: '0.7s' }}
            />

            {/* Branch 6 */}
            <path
              d="M110 225 Q120 215 130 200"
              stroke="#8B4513"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              className="animate-draw-branch"
              style={{ animationDelay: '0.8s' }}
            />
          </svg>

          {/* Service Seeds - Positioned along branches on LEFT - Responsive */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            {services.map((service, index) => {
              // Responsive positions - adjusted for larger mobile seeds
              const mobilePositions = [
                { top: '-90px', left: '50px' },   // Branch 1
                { top: '-55px', left: '70px' },   // Branch 2
                { top: '-20px', left: '90px' },   // Branch 3
                { top: '15px', left: '50px' },    // Branch 4
                { top: '45px', left: '70px' },    // Branch 5
                { top: '75px', left: '90px' },    // Branch 6
                { top: '100px', left: '50px' },   // Branch 7
                { top: '130px', left: '70px' },   // Branch 8
              ];

              const desktopPositions = [
                { top: '-120px', left: '70px' },   // Branch 1
                { top: '-80px', left: '100px' },   // Branch 2
                { top: '-30px', left: '130px' },   // Branch 3
                { top: '20px', left: '70px' },     // Branch 4
                { top: '60px', left: '100px' },    // Branch 5
                { top: '100px', left: '130px' },   // Branch 6
                { top: '140px', left: '70px' },    // Branch 7
                { top: '180px', left: '100px' },   // Branch 8
              ];

              return (
                <>
                  {/* Mobile seed (hidden on md+) - Larger for better visibility */}
                  <Link
                    key={`${service.label}-mobile`}
                    to={service.path}
                    className="absolute group seed-pop md:hidden"
                    style={{
                      ...mobilePositions[index],
                      animationDelay: `${service.delay}s`,
                    }}
                    onClick={handleClose}
                  >
                    {/* Seed pod with image - Larger on mobile for visibility */}
                    <div className="relative">
                      {/* Seed glow effect - More prominent on mobile */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full blur-lg opacity-50 group-active:opacity-70 transition-opacity"></div>

                      {/* Seed with service image - 12x12 on mobile (increased from 10x10) */}
                      <div className="relative w-12 h-12 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-2xl active:scale-95 transition-transform border-2 border-white ring-2 ring-green-400 bg-white">
                        <img
                          src={service.image}
                          alt={service.label}
                          className="w-full h-full object-cover"
                          loading="eager"
                          style={{ imageRendering: 'auto' }}
                        />
                        {/* Subtle gradient overlay - lighter for better visibility */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10"></div>
                      </div>

                      {/* Service label - shows on tap on mobile */}
                      <div className="absolute top-1/2 left-full ml-2 -translate-y-1/2 opacity-0 group-active:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                        <div className="bg-white text-gray-900 px-3 py-2 rounded-lg shadow-xl whitespace-nowrap text-xs font-bold border border-gray-200">
                          {service.label}
                          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-l border-b border-gray-200"></div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Desktop seed (hidden on mobile) */}
                  <Link
                    key={`${service.label}-desktop`}
                    to={service.path}
                    className="absolute group seed-pop hidden md:block"
                    style={{
                      ...desktopPositions[index],
                      animationDelay: `${service.delay}s`,
                    }}
                    onClick={handleClose}
                  >
                    {/* Seed pod with image - Full size on desktop */}
                    <div className="relative">
                      {/* Seed glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>

                      {/* Seed with service image - 14x14 on desktop */}
                      <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-xl group-hover:scale-110 transition-transform border-3 border-white ring-2 ring-green-400">
                        <img
                          src={service.image}
                          alt={service.label}
                          className="w-full h-full object-cover"
                        />
                        {/* Gradient overlay for better visibility */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                      </div>

                      {/* Service label - appears on hover */}
                      <div className="absolute top-1/2 left-full ml-3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                        <div className="bg-white text-gray-900 px-3 py-2 rounded-lg shadow-xl whitespace-nowrap text-sm font-semibold">
                          {service.label}
                          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>

          {/* Close button - now on left side - Responsive size */}
          <button
            onClick={handleClose}
            className="absolute top-2 left-2 sm:top-4 sm:left-4 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* "Our Services" label at the base - now on left side - Responsive */}
          <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow-xl">
            <p className="text-xs sm:text-sm font-bold text-[#1E90FF]">🌳 Our Services</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes draw-branch {
          from {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
          }
          to {
            stroke-dasharray: 200;
            stroke-dashoffset: 0;
          }
        }

        @keyframes branch-grow {
          from {
            transform: translateX(-100%) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes seed-pop {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .animate-draw-branch {
          animation: draw-branch 0.8s ease-out forwards;
        }

        .branch-grow {
          animation: branch-grow 0.6s ease-out forwards;
        }

        .seed-pop {
          animation: seed-pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ServiceTreeBranch;
