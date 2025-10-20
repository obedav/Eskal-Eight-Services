import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaFilter, FaDownload } from 'react-icons/fa';
import paymentService from '../../services/paymentService';
import PaymentHistory from '../../components/payment/PaymentHistory';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';

const ClientPayments = () => {
  const [stats, setStats] = useState({
    total_paid: 0,
    pending: 0,
    completed: 0,
    payment_count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPaymentStats();
  }, []);

  const fetchPaymentStats = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await paymentService.getPaymentHistory();
      if (response.success) {
        const payments = response.data || [];

        const totalPaid = payments
          .filter(p => p.status === 'completed')
          .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

        const pendingAmount = payments
          .filter(p => p.status === 'pending' || p.status === 'processing')
          .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

        setStats({
          total_paid: totalPaid,
          pending: pendingAmount,
          completed: payments.filter(p => p.status === 'completed').length,
          payment_count: payments.length,
        });
      } else {
        setError(response.message || 'Failed to load payment statistics');
      }
    } catch (err) {
      console.error('Error fetching payment stats:', err);
      setError(err.message || 'Failed to load payment statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
          <p className="text-gray-600 mt-1">View all your payment transactions and invoices</p>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.payment_count}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaMoneyBillWave className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  ₦{stats.total_paid.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaMoneyBillWave className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ₦{stats.pending.toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FaMoneyBillWave className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Successful</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaMoneyBillWave className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment History Component */}
        <PaymentHistory />
      </div>
    </div>
  );
};

export default ClientPayments;
