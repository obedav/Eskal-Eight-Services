import React from 'react';
import ForgotPasswordForm from '../components/auth/ForgotPassword';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ESKAL EIGHT SERVICES
          </h1>
          <p className="text-gray-600">
            Delivering Quality, Efficiency & Trust
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
