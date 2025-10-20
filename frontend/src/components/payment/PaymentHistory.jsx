import React, { useState, useEffect, useCallback } from 'react';
import { FaEye, FaFilter } from 'react-icons/fa';
import { format } from 'date-fns';
import paymentService from '../../services/paymentService';
import Loader from '../common/Loader';
import Alert from '../common/Alert';

const PaymentHistory = ({ quoteId = null }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    payment_method: '',
  });
  const [selectedPayment, setSelectedPayment] = useState(null);

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      let response;
      if (quoteId) {
        response = await paymentService.getQuotePayments(quoteId);
      } else {
        const params = {};
        if (filters.status) params.status = filters.status;
        if (filters.payment_method) params.payment_method = filters.payment_method;
        response = await paymentService.getPaymentHistory(params);
      }

      if (response.success) {
        setPayments(response.data || []);
      } else {
        setError(response.message || 'Failed to load payment history');
      }
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError(err.message || 'Failed to load payment history');
    } finally {
      setLoading(false);
    }
  }, [filters, quoteId]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      payment_method: '',
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert type="error" message={error} onClose={() => setError('')} />
      )}

      {/* Filters */}
      {!quoteId && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FaFilter className="mr-2" />
              Filters
            </h3>
            {(filters.status || filters.payment_method) && (
              <button
                onClick={clearFilters}
                className="text-sm text-[#1E90FF] hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="input"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={filters.payment_method}
                onChange={(e) => handleFilterChange('payment_method', e.target.value)}
                className="input"
              >
                <option value="">All Methods</option>
                <option value="paystack">Paystack</option>
                <option value="flutterwave">Flutterwave</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Payment List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {payments.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No payments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Reference</th>
                  {!quoteId && <th>Quote</th>}
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="font-mono text-sm">{payment.reference}</td>
                    {!quoteId && (
                      <td className="font-medium">{payment.quote_number}</td>
                    )}
                    <td className="font-bold text-[#1E90FF]">
                      {paymentService.formatAmount(payment.amount)}
                    </td>
                    <td>
                      <span className="text-sm">
                        {paymentService.getPaymentMethodName(payment.payment_method)}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm">
                        {paymentService.getPaymentTypeName(payment.payment_type)}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-${paymentService.getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="text-sm text-gray-600">
                      {format(new Date(payment.created_at), 'MMM dd, yyyy')}
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="text-[#1E90FF] hover:text-[#0077CC] mr-2"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
};

// Payment Details Modal Component
const PaymentDetailsModal = ({ payment, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Reference</p>
                <p className="font-mono font-medium">{payment.reference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span
                  className={`badge badge-${paymentService.getStatusColor(
                    payment.status
                  )}`}
                >
                  {payment.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="font-bold text-lg text-[#1E90FF]">
                  {paymentService.formatAmount(payment.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Currency</p>
                <p className="font-medium">{payment.currency}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium">
                  {paymentService.getPaymentMethodName(payment.payment_method)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Type</p>
                <p className="font-medium">
                  {paymentService.getPaymentTypeName(payment.payment_type)}
                </p>
              </div>
            </div>

            {payment.quote_number && (
              <div>
                <p className="text-sm text-gray-600">Quote Number</p>
                <p className="font-medium">{payment.quote_number}</p>
              </div>
            )}

            {payment.transaction_id && (
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-mono text-sm">{payment.transaction_id}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Created At</p>
                <p className="text-sm">
                  {format(new Date(payment.created_at), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              {payment.paid_at && (
                <div>
                  <p className="text-sm text-gray-600">Paid At</p>
                  <p className="text-sm">
                    {format(new Date(payment.paid_at), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="btn-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
