import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import quoteService from '../services/quoteService';

const RequestQuote = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service');

  const [formData, setFormData] = useState({
    service_type: preselectedService || '',
    project_title: '',
    description: '',
    budget: '',
    timeline: '',
    location: '',
    contact_phone: '',
    contact_email: '',
    additional_notes: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const services = [
    { id: '1', name: 'Brand Management' },
    { id: '2', name: 'Procurement & Supplies' },
    { id: '3', name: 'Logistics & Haulage' },
    { id: '4', name: 'Printing Services' },
    { id: '5', name: 'Consultancy' },
    { id: '6', name: 'Corporate Gifting' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.service_type) {
      newErrors.service_type = 'Please select a service';
    }

    if (!formData.project_title) {
      newErrors.project_title = 'Project title is required';
    }

    if (!formData.description) {
      newErrors.description = 'Project description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (!formData.contact_email) {
      newErrors.contact_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contact_email)) {
      newErrors.contact_email = 'Email is invalid';
    }

    if (!formData.contact_phone) {
      newErrors.contact_phone = 'Phone number is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/request-quote' } });
      return;
    }

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Prepare quote data for API
      const quoteData = {
        service_id: parseInt(formData.service_type),
        project_title: formData.project_title,
        description: formData.description,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        timeline: formData.timeline,
        location: formData.location,
        contact_phone: formData.contact_phone,
        contact_email: formData.contact_email,
        additional_requirements: formData.additional_notes,
      };

      // Submit quote request to API
      const response = await quoteService.createQuote(quoteData);

      if (response.success) {
        // Success - redirect to client dashboard or thank you page
        navigate('/client/dashboard', {
          state: {
            message: 'Quote request submitted successfully! We will review and get back to you soon.',
            type: 'success'
          },
        });
      } else {
        setErrors({ general: response.message || 'Failed to submit quote request' });
      }
    } catch (error) {
      console.error('Quote submission error:', error);
      const errorMessage =
        error.message ||
        'Failed to submit quote request. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0B1F3F] to-[#1E90FF] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md text-blue-100 rounded-full text-sm font-semibold mb-6 border border-white/20">
              Get Started
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Request a Quote</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Tell us about your project and we'll get back to you with a detailed, competitive quote
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 8C120 16 240 32 360 42.7C480 53 600 59 720 56C840 53 960 43 1080 42.7C1200 43 1320 53 1380 58.7L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 md:p-10 hover:shadow-lg transition-all duration-300">
          {errors.general && (
            <div className="mb-8 p-5 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl flex items-start">
              <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Service Selection */}
            <div className="mb-8">
              <label
                htmlFor="service_type"
                className="block text-sm font-semibold text-gray-900 mb-3"
              >
                Service Type *
              </label>
              <select
                id="service_type"
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                className={`w-full px-5 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 transition-all duration-300 hover:border-gray-300 ${
                  errors.service_type
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-[#1E90FF]'
                }`}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errors.service_type && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.service_type}
                </p>
              )}
            </div>

            {/* Project Title */}
            <div className="mb-8">
              <label
                htmlFor="project_title"
                className="block text-sm font-semibold text-gray-900 mb-3"
              >
                Project Title *
              </label>
              <input
                type="text"
                id="project_title"
                name="project_title"
                value={formData.project_title}
                onChange={handleChange}
                className={`w-full px-5 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 transition-all duration-300 hover:border-gray-300 ${
                  errors.project_title
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-[#1E90FF]'
                }`}
                placeholder="e.g., Corporate Branding Package"
              />
              {errors.project_title && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.project_title}
                </p>
              )}
            </div>

            {/* Project Description */}
            <div className="mb-8">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-900 mb-3"
              >
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                className={`w-full px-5 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 transition-all duration-300 hover:border-gray-300 resize-none ${
                  errors.description
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-[#1E90FF]'
                }`}
                placeholder="Provide detailed information about your project requirements..."
              />
              <p className="text-sm text-gray-600 mt-2">
                {formData.description.length}/50 minimum characters
              </p>
              {errors.description && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                >
                  Estimated Budget (Optional)
                </label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 focus:border-[#1E90FF] transition-all duration-300 hover:border-gray-300"
                  placeholder="e.g., ₦500,000 - ₦1,000,000"
                />
              </div>

              {/* Timeline */}
              <div>
                <label
                  htmlFor="timeline"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                >
                  Project Timeline (Optional)
                </label>
                <input
                  type="text"
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 focus:border-[#1E90FF] transition-all duration-300 hover:border-gray-300"
                  placeholder="e.g., 2 weeks, 1 month"
                />
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-900 mb-3"
              >
                Project Location (Optional)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 focus:border-[#1E90FF] transition-all duration-300 hover:border-gray-300"
                placeholder="e.g., Lagos, Abuja"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Contact Email */}
              <div>
                <label
                  htmlFor="contact_email"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                >
                  Contact Email *
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  className={`w-full px-5 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 transition-all duration-300 hover:border-gray-300 ${
                    errors.contact_email
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-[#1E90FF]'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.contact_email && (
                  <p className="text-red-600 text-sm mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.contact_email}
                  </p>
                )}
              </div>

              {/* Contact Phone */}
              <div>
                <label
                  htmlFor="contact_phone"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                >
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  className={`w-full px-5 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 transition-all duration-300 hover:border-gray-300 ${
                    errors.contact_phone
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-[#1E90FF]'
                  }`}
                  placeholder="080xxxxxxxx"
                />
                {errors.contact_phone && (
                  <p className="text-red-600 text-sm mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.contact_phone}
                  </p>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Upload Documents (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 hover:border-[#1E90FF]/30 transition-all duration-300 bg-gray-50 hover:bg-blue-50/30">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg
                    className="w-14 h-14 text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium mb-1">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-sm text-gray-500">
                    PDF, DOC, DOCX, JPG, PNG up to 10MB
                  </span>
                </label>
                {files.length > 0 && (
                  <div className="mt-6 pt-6 border-t-2 border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      Selected files:
                    </p>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600 bg-white rounded-lg px-3 py-2 border border-gray-200">
                          <svg className="w-4 h-4 mr-2 text-[#1E90FF]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-10">
              <label
                htmlFor="additional_notes"
                className="block text-sm font-semibold text-gray-900 mb-3"
              >
                Additional Notes (Optional)
              </label>
              <textarea
                id="additional_notes"
                name="additional_notes"
                value={formData.additional_notes}
                onChange={handleChange}
                rows="4"
                className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 focus:border-[#1E90FF] transition-all duration-300 hover:border-gray-300 resize-none"
                placeholder="Any other information you'd like to share..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#1E90FF] text-white py-4 rounded-xl font-semibold hover:bg-[#0077CC] focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:ring-offset-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Quote Request →'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;
