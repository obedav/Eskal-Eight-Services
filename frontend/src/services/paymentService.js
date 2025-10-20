import api from './api';

/**
 * Payment Service
 *
 * Handles all payment-related API calls
 */

const paymentService = {
  /**
   * Initialize a payment
   * @param {Object} paymentData - Payment initialization data
   * @returns {Promise} Payment initialization response
   */
  initializePayment: async (paymentData) => {
    try {
      const response = await api.post('/payments/initialize', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Verify a payment
   * @param {string} reference - Payment reference
   * @returns {Promise} Payment verification response
   */
  verifyPayment: async (reference) => {
    try {
      const response = await api.post('/payments/verify', { reference });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get payment by ID
   * @param {number} paymentId - Payment ID
   * @returns {Promise} Payment details
   */
  getPayment: async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get payment history
   * @param {Object} params - Query parameters (page, per_page, status, payment_method)
   * @returns {Promise} Payment history
   */
  getPaymentHistory: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `/payments${queryString ? `?${queryString}` : ''}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get payments for a specific quote
   * @param {number} quoteId - Quote ID
   * @returns {Promise} Payments for the quote
   */
  getQuotePayments: async (quoteId) => {
    try {
      const response = await api.get(`/payments?quote_id=${quoteId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get payment statistics (Admin only)
   * @param {Object} filters - Date filters (from_date, to_date)
   * @returns {Promise} Payment statistics
   */
  getPaymentStatistics: async (filters = {}) => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const url = `/payments/statistics/all${queryString ? `?${queryString}` : ''}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Format amount for display
   * @param {number} amount - Amount in naira
   * @returns {string} Formatted amount
   */
  formatAmount: (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  },

  /**
   * Get payment status badge color
   * @param {string} status - Payment status
   * @returns {string} Badge color class
   */
  getStatusColor: (status) => {
    const statusColors = {
      pending: 'warning',
      processing: 'info',
      completed: 'success',
      failed: 'error',
      cancelled: 'error',
      refunded: 'warning',
    };
    return statusColors[status] || 'info';
  },

  /**
   * Get payment method display name
   * @param {string} method - Payment method
   * @returns {string} Display name
   */
  getPaymentMethodName: (method) => {
    const methodNames = {
      paystack: 'Paystack',
      flutterwave: 'Flutterwave',
      bank_transfer: 'Bank Transfer',
      cash: 'Cash Payment',
    };
    return methodNames[method] || method;
  },

  /**
   * Get payment type display name
   * @param {string} type - Payment type
   * @returns {string} Display name
   */
  getPaymentTypeName: (type) => {
    const typeNames = {
      full: 'Full Payment',
      deposit: 'Deposit',
      installment: 'Installment',
    };
    return typeNames[type] || type;
  },

  /**
   * Open payment window
   * @param {string} authorizationUrl - Payment authorization URL
   * @param {Function} onSuccess - Success callback
   * @param {Function} onClose - Close callback
   */
  openPaymentWindow: (authorizationUrl, onSuccess, onClose) => {
    // Open payment URL in new window
    const paymentWindow = window.open(
      authorizationUrl,
      'payment',
      'width=600,height=700,left=200,top=100'
    );

    // Check if window was closed
    const checkWindowClosed = setInterval(() => {
      if (paymentWindow && paymentWindow.closed) {
        clearInterval(checkWindowClosed);
        if (onClose) {
          onClose();
        }
      }
    }, 1000);

    // Listen for payment completion message
    const messageListener = (event) => {
      if (event.data.type === 'payment-success') {
        clearInterval(checkWindowClosed);
        if (paymentWindow && !paymentWindow.closed) {
          paymentWindow.close();
        }
        window.removeEventListener('message', messageListener);
        if (onSuccess) {
          onSuccess(event.data.reference);
        }
      }
    };

    window.addEventListener('message', messageListener);

    return {
      close: () => {
        clearInterval(checkWindowClosed);
        if (paymentWindow && !paymentWindow.closed) {
          paymentWindow.close();
        }
        window.removeEventListener('message', messageListener);
      },
    };
  },

  /**
   * Calculate minimum deposit amount
   * @param {number} totalAmount - Total quote amount
   * @param {number} percentage - Deposit percentage (default 30)
   * @returns {number} Minimum deposit amount
   */
  calculateMinimumDeposit: (totalAmount, percentage = 30) => {
    return (totalAmount * percentage) / 100;
  },

  /**
   * Calculate installment amounts
   * @param {number} totalAmount - Total quote amount
   * @param {number} depositAmount - Deposit amount
   * @param {number} installments - Number of installments
   * @returns {Array} Installment breakdown
   */
  calculateInstallments: (totalAmount, depositAmount, installments) => {
    const remainingAmount = totalAmount - depositAmount;
    const installmentAmount = remainingAmount / installments;

    const breakdown = [
      {
        number: 0,
        description: 'Deposit',
        amount: depositAmount,
      },
    ];

    for (let i = 1; i <= installments; i++) {
      breakdown.push({
        number: i,
        description: `Installment ${i}`,
        amount: installmentAmount,
      });
    }

    return breakdown;
  },
};

export default paymentService;
