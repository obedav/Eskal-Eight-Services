import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import paymentService from '../services/paymentService';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, failed
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const reference = searchParams.get('reference');

    if (!reference) {
      setStatus('failed');
      setError('No payment reference provided');
      return;
    }

    verifyPayment(reference);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const verifyPayment = async (reference) => {
    try {
      const response = await paymentService.verifyPayment(reference);

      if (response.success) {
        setPayment(response.data.payment);
        setStatus('success');

        // Notify parent window if in popup
        if (window.opener) {
          window.opener.postMessage(
            {
              type: 'payment-success',
              reference: reference,
            },
            window.location.origin
          );
        }
      } else {
        setStatus('failed');
        setError(response.message || 'Payment verification failed');
      }
    } catch (err) {
      setStatus('failed');
      setError(err.message || 'Failed to verify payment');
    }
  };

  const handleContinue = () => {
    if (payment?.quote_id) {
      navigate(`/client/quotes/${payment.quote_id}`);
    } else {
      navigate('/client/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {status === 'verifying' && (
          <div className="text-center">
            <FaSpinner className="text-6xl text-[#1E90FF] mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Payment...
            </h2>
            <p className="text-gray-600">
              Please wait while we confirm your payment.
            </p>
          </div>
        )}

        {status === 'success' && payment && (
          <div className="text-center">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your payment has been received and confirmed.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-medium text-gray-900">{payment.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-lg text-green-600">
                    {paymentService.formatAmount(payment.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium text-gray-900">
                    {paymentService.getPaymentMethodName(payment.payment_method)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Type:</span>
                  <span className="font-medium text-gray-900">
                    {paymentService.getPaymentTypeName(payment.payment_type)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {payment.status}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full btn-primary py-3"
            >
              Continue to Dashboard
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center">
            <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-6">
              {error || 'We could not verify your payment. Please try again.'}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/client/dashboard')}
                className="w-full btn-primary py-3"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate(-1)}
                className="w-full btn-outline py-3"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;
