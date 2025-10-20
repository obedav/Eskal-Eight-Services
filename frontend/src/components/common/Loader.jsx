import React from 'react';

/**
 * Loader component with multiple size and color variants
 * @param {string} size - Size variant: 'sm', 'md', 'lg', 'xl'
 * @param {string} color - Color variant: 'primary', 'secondary', 'white', 'dark'
 * @param {boolean} fullScreen - If true, displays centered on full screen
 * @param {string} text - Optional loading text
 */
const Loader = ({
  size = 'md',
  color = 'primary',
  fullScreen = false,
  text = ''
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
    xl: 'w-24 h-24 border-4',
  };

  // Color classes
  const colorClasses = {
    primary: 'border-[#1E90FF] border-t-transparent',
    secondary: 'border-[#0B1F3F] border-t-transparent',
    white: 'border-white border-t-transparent',
    dark: 'border-gray-800 border-t-transparent',
  };

  // Text size classes
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
      />
      {text && (
        <p className={`${textSizeClasses[size]} ${
          color === 'white' ? 'text-white' : 'text-gray-600'
        } font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

/**
 * Inline loader for buttons and small spaces
 */
export const InlineLoader = ({ size = 'sm', color = 'white' }) => {
  const sizeClasses = {
    xs: 'w-4 h-4 border-2',
    sm: 'w-5 h-5 border-2',
    md: 'w-6 h-6 border-2',
  };

  const colorClasses = {
    primary: 'border-[#1E90FF] border-t-transparent',
    secondary: 'border-[#0B1F3F] border-t-transparent',
    white: 'border-white border-t-transparent',
    dark: 'border-gray-800 border-t-transparent',
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin inline-block`}
    />
  );
};

/**
 * Skeleton loader for content placeholders
 */
export const SkeletonLoader = ({
  lines = 3,
  className = '',
  avatar = false
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {avatar && (
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2" />
            <div className="h-3 bg-gray-300 rounded w-1/3" />
          </div>
        </div>
      )}
      {[...Array(lines)].map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-300 rounded mb-3 ${
            index === lines - 1 ? 'w-2/3' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

/**
 * Card skeleton loader
 */
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 animate-pulse"
        >
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-300 rounded w-full mb-3" />
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-3" />
          <div className="h-4 bg-gray-300 rounded w-2/3" />
          <div className="mt-6 flex gap-3">
            <div className="h-10 bg-gray-300 rounded w-24" />
            <div className="h-10 bg-gray-300 rounded w-24" />
          </div>
        </div>
      ))}
    </>
  );
};

/**
 * Table skeleton loader
 */
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-12 rounded-t-lg mb-2" />
      {[...Array(rows)].map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 py-4 border-b border-gray-200"
        >
          {[...Array(columns)].map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-4 bg-gray-300 rounded flex-1"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Loader;
