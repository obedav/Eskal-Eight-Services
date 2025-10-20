import React, { useState } from 'react';
import { FaCalendar, FaClock, FaUser, FaEnvelope, FaPhone, FaBriefcase, FaCheckCircle } from 'react-icons/fa';

const ConsultationBooking = ({ service = '', onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: service,
    consultationType: 'general',
    preferredDate: '',
    preferredTime: '',
    projectBudget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const consultationTypes = [
    { value: 'general', label: 'General Consultation', icon: '💬' },
    { value: 'technical', label: 'Technical Assessment', icon: '⚙️' },
    { value: 'strategy', label: 'Digital Strategy', icon: '📊' },
    { value: 'demo', label: 'Product Demo', icon: '🎬' },
  ];

  const budgetRanges = [
    '< ₦500,000',
    '₦500,000 - ₦1,000,000',
    '₦1,000,000 - ₦3,000,000',
    '₦3,000,000 - ₦5,000,000',
    '> ₦5,000,000',
    'Not sure yet',
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Consultation booking:', formData);
    setSubmitted(true);
    setLoading(false);

    // In production, send to backend API
    // const response = await api.post('/consultations/book', formData);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-fadeIn">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-5xl text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h3>
          <p className="text-gray-600 mb-2">
            Thank you for booking a consultation with Eskal Eight Tech.
          </p>
          <p className="text-gray-600 mb-6">
            We'll send you a confirmation email at <strong>{formData.email}</strong> with the meeting details.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Scheduled for:</strong><br />
              {new Date(formData.preferredDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} at {formData.preferredTime}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#1E90FF] to-[#009688] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B1F3F] to-[#1E90FF] text-white p-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Book a Free Consultation</h2>
              <p className="text-blue-100">Let's discuss your project and how we can help</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 text-3xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Consultation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Type of Consultation
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {consultationTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, consultationType: type.value }))}
                  className={`p-4 border-2 rounded-lg transition-all text-center ${
                    formData.consultationType === type.value
                      ? 'border-[#1E90FF] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser className="inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaPhone className="inline mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input"
                placeholder="+234 123 456 7890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaBriefcase className="inline mr-2" />
                Company/Organization
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="input"
                placeholder="Your Company Ltd"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Interested In *
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select a service</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Custom Software Solutions">Custom Software Solutions</option>
              <option value="API Integration">API Integration & Automation</option>
              <option value="Cloud Hosting">Cloud Hosting & Infrastructure</option>
              <option value="IT Support">IT Infrastructure & Support</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Digital Transformation">Digital Transformation</option>
              <option value="AI & Data Solutions">AI & Data Solutions</option>
            </select>
          </div>

          {/* Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCalendar className="inline mr-2" />
                Preferred Date *
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaClock className="inline mr-2" />
                Preferred Time *
              </label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Project Budget
            </label>
            <select
              name="projectBudget"
              value={formData.projectBudget}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tell us about your project
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="input"
              placeholder="Describe your project, goals, timeline, or any specific questions you have..."
            ></textarea>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">What to Expect:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✓ 45-60 minute consultation call</li>
              <li>✓ Discussion of your requirements & goals</li>
              <li>✓ Initial technical recommendations</li>
              <li>✓ Project timeline & cost estimate</li>
              <li>✓ Next steps & proposal (if applicable)</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#1E90FF] to-[#009688] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Book Consultation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationBooking;
