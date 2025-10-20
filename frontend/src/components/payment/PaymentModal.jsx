import React, { useState } from 'react';
import { FaTimes, FaCreditCard, FaMoneyBillWave, FaUniversity } from 'react-icons/fa';
import paymentService from '../../services/paymentService';
import Loader from '../common/Loader';

const PaymentModal = ({ isOpen, onClose, quote, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [paymentType, setPaymentType] = useState('full');
  const [amount, setAmount] = useState(quote?.total_amount || 0);
  const [showBankDetails, setShowBankDetails] = useState(false);

  if (!isOpen || !quote) return null;

  const minDeposit = paymentService.calculateMinimumDeposit(quote.total_amount);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value);

    if (value === quote.total_amount) {
      setPaymentType('full');
    } else if (value >= minDeposit) {
      setPaymentType('deposit');
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === 'bank_transfer') {
      setShowBankDetails(true);
    } else {
      setShowBankDetails(false);
    }
  };

  const handleInitializePayment = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate amount
      if (paymentType !== 'full' && amount < minDeposit) {
        setError(`Minimum deposit is ${paymentService.formatAmount(minDeposit)}`);
        setLoading(false);
        return;
      }

      const paymentData = {
        quote_id: quote.id,
        payment_method: paymentMethod,
        payment_type: paymentType,
        amount: amount,
      };

      const response = await paymentService.initializePayment(paymentData);

      if (response.success) {
        const data = response.data;

        if (paymentMethod === 'paystack' || paymentMethod === 'flutterwave') {
          // Redirect to payment gateway
          window.location.href = data.authorization_url;
        } else if (paymentMethod === 'bank_transfer') {
          // Show bank details
          setShowBankDetails(true);
          setLoading(false);
        } else if (paymentMethod === 'cash') {
          // Show success message
          alert(data.instructions);
          onSuccess(data);
          onClose();
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to initialize payment');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-[#0B1F3F] px-6 py-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Make Payment</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            {/* Quote Details */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Quote Details</h4>
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-600">Quote Number:</span>
                  <span className="font-medium text-gray-900">{quote.quote_number}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-lg text-[#1E90FF]">
                    {paymentService.formatAmount(quote.total_amount)}
                  </span>
                </p>
                {paymentType !== 'full' && (
                  <p className="flex justify-between text-xs text-gray-500">
                    <span>Minimum Deposit (30%):</span>
                    <span>{paymentService.formatAmount(minDeposit)}</span>
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleInitializePayment}>
              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange('paystack')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'paystack'
                        ? 'border-[#1E90FF] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FaCreditCard className="mx-auto mb-2 text-2xl text-[#1E90FF]" />
                    <p className="text-sm font-medium">Paystack</p>
                    <p className="text-xs text-gray-500">Card, Bank, USSD</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange('flutterwave')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'flutterwave'
                        ? 'border-[#1E90FF] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FaCreditCard className="mx-auto mb-2 text-2xl text-orange-500" />
                    <p className="text-sm font-medium">Flutterwave</p>
                    <p className="text-xs text-gray-500">Card, Bank</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange('bank_transfer')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#1E90FF] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FaUniversity className="mx-auto mb-2 text-2xl text-green-600" />
                    <p className="text-sm font-medium">Bank Transfer</p>
                    <p className="text-xs text-gray-500">Direct Transfer</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange('cash')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-[#1E90FF] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FaMoneyBillWave className="mx-auto mb-2 text-2xl text-purple-600" />
                    <p className="text-sm font-medium">Cash</p>
                    <p className="text-xs text-gray-500">Pay at Office</p>
                  </button>
                </div>
              </div>

              {/* Payment Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Type
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentType('full');
                      setAmount(quote.total_amount);
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                      paymentType === 'full'
                        ? 'border-[#1E90FF] bg-blue-50 text-[#1E90FF]'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Full Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentType('deposit');
                      setAmount(minDeposit);
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                      paymentType === 'deposit'
                        ? 'border-[#1E90FF] bg-blue-50 text-[#1E90FF]'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Deposit
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  min={minDeposit}
                  max={quote.total_amount}
                  step="0.01"
                  className="input"
                  required
                />
              </div>

              {/* Bank Details (if bank transfer selected and initialized) */}
              {showBankDetails && paymentMethod === 'bank_transfer' && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Bank Transfer Details</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Please transfer to any of these accounts:
                  </p>
                  {/* Bank details will be shown after initialization */}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Loader size="small" />
                      <span className="ml-2">Processing...</span>
                    </span>
                  ) : (
                    'Proceed to Payment'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
