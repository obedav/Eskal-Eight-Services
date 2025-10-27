import React from 'react';

const ViewToggle = ({ is3D, onToggle }) => {
  return (
    <div className="fixed top-24 right-6 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-2 border-2 border-gray-200">
        <button
          onClick={onToggle}
          className="group relative overflow-hidden rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:scale-105"
        >
          {/* Background animation */}
          <div className={`absolute inset-0 transition-all duration-500 ${is3D ? 'bg-gradient-to-r from-[#1E90FF] to-[#0B1F3F]' : 'bg-gray-200'}`}></div>

          {/* Content */}
          <div className="relative flex items-center gap-3">
            <span className={`text-2xl transition-transform duration-500 ${is3D ? 'rotate-0' : 'rotate-180'}`}>
              {is3D ? '🎮' : '📄'}
            </span>
            <div className="text-left">
              <div className={`text-sm font-bold ${is3D ? 'text-white' : 'text-gray-700'}`}>
                {is3D ? '3D View' : '2D View'}
              </div>
              <div className={`text-xs ${is3D ? 'text-blue-200' : 'text-gray-500'}`}>
                Click to switch
              </div>
            </div>
          </div>
        </button>

        {/* Info tooltip */}
        <div className="mt-2 p-3 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-xs text-gray-700 leading-relaxed">
            <span className="font-bold text-[#1E90FF]">Current:</span> {is3D ? 'Immersive 3D Experience' : 'Classic 2D Design'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewToggle;
