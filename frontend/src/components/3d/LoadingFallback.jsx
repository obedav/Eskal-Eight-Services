import React from 'react';

const LoadingFallback = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1F3F] via-[#1E90FF] to-[#0B1F3F]">
      <div className="text-center text-white">
        {/* 3D Loading Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-t-transparent border-r-blue-300 border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>

        <h2 className="text-2xl font-bold mb-2 animate-pulse">Loading 3D Experience...</h2>
        <p className="text-blue-200 text-sm">Preparing your immersive journey</p>

        {/* Progress Dots */}
        <div className="flex gap-2 justify-center mt-6">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;
