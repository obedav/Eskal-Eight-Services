import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import { format } from 'date-fns';
import quoteService from '../../services/quoteService';
import PaymentModal from '../../components/payment/PaymentModal';
import PaymentHistory from '../../components/payment/PaymentHistory';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';

const QuoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // details, payments

  const fetchQuoteDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await quoteService.getQuote(parseInt(id));

      if (response.success) {
        setQuote(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load quote details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchQuoteDetails();
  }, [fetchQuoteDetails]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      paid: 'bg-purple-100 text-purple-800',
      completed: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const canMakePayment = () => {
    if (!quote) return false;
    return ['approved', 'pending_payment'].includes(quote.status) && quote.total_amount > 0;
  };

  const handlePaymentSuccess = (paymentData) => {
    setShowPaymentModal(false);
    fetchQuoteDetails(); // Refresh quote details
    setActiveTab('payments'); // Switch to payments tab
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert
          type="error"
          message={error || 'Quote not found'}
          onClose={() => navigate('/client/dashboard')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/client/dashboard')}
            className="flex items-center text-[#1E90FF] hover:text-[#0077CC] mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quote {quote.quote_number}
              </h1>
              <p className="text-gray-600 mt-1">
                Requested on {format(new Date(quote.created_at), 'MMMM dd, yyyy')}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`}>
                {quote.status.replace('_', ' ').toUpperCase()}
              </span>
              {canMakePayment() && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <FaCreditCard />
                  Make Payment
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-[#1E90FF] text-[#1E90FF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Quote Details
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'payments'
                    ? 'border-[#1E90FF] text-[#1E90FF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Payment History
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Quote Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Quote Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Service</p>
                        <p className="font-medium text-gray-900">{quote.service_name || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Quote Number</p>
                        <p className="font-mono font-medium text-gray-900">{quote.quote_number}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`}>
                          {quote.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Financial Information
                    </h3>
                    <div className="space-y-3">
                      {quote.total_amount > 0 ? (
                        <>
                          <div>
                            <p className="text-sm text-gray-600">Total Amount</p>
                            <p className="text-2xl font-bold text-[#1E90FF]">
                              ₦{parseFloat(quote.total_amount).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Payment Status</p>
                            <p className="font-medium text-gray-900">
                              {quote.status === 'paid' ? 'Paid in Full' : 'Pending Payment'}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            Quote amount pending approval
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Request Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Request Details
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {quote.description || 'No description provided'}
                    </p>
                  </div>
                </div>

                {/* Admin Notes */}
                {quote.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Admin Notes
                    </h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{quote.notes}</p>
                    </div>
                  </div>
                )}

                {/* Activity Timeline */}
                {quote.activities && quote.activities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Activity Timeline
                    </h3>
                    <div className="space-y-3">
                      {quote.activities.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-shrink-0 w-2 h-2 mt-2 bg-[#1E90FF] rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.action}
                            </p>
                            {activity.notes && (
                              <p className="text-sm text-gray-600 mt-1">{activity.notes}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              {format(new Date(activity.created_at), 'MMM dd, yyyy HH:mm')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'payments' && (
              <PaymentHistory quoteId={quote.id} />
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          quote={quote}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default QuoteDetails;
