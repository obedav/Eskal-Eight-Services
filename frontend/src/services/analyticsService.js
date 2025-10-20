import api from './api';

const analyticsService = {
  /**
   * Get dashboard overview statistics
   */
  getDashboard: async () => {
    try {
      const response = await api.get('/analytics/dashboard');
      return response.data;
    } catch (error) {
      console.error('Get dashboard analytics error:', error);
      throw error;
    }
  },

  /**
   * Get revenue analytics
   */
  getRevenue: async (period = '30days') => {
    try {
      const response = await api.get(`/analytics/revenue?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('Get revenue analytics error:', error);
      throw error;
    }
  },

  /**
   * Get quote trends
   */
  getQuoteTrends: async (period = '30days') => {
    try {
      const response = await api.get(`/analytics/quote-trends?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('Get quote trends error:', error);
      throw error;
    }
  },

  /**
   * Get client activity
   */
  getClientActivity: async (limit = 10) => {
    try {
      const response = await api.get(`/analytics/client-activity?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Get client activity error:', error);
      throw error;
    }
  },

  /**
   * Get service performance
   */
  getServicePerformance: async (period = '30days') => {
    try {
      const response = await api.get(`/analytics/service-performance?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('Get service performance error:', error);
      throw error;
    }
  },

  /**
   * Get recent activity feed
   */
  getRecentActivity: async (limit = 20) => {
    try {
      const response = await api.get(`/analytics/recent-activity?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Get recent activity error:', error);
      throw error;
    }
  },

  /**
   * Export analytics data
   */
  exportData: async (type = 'dashboard', format = 'csv', period = '30days') => {
    try {
      const url = `/analytics/export?type=${type}&format=${format}&period=${period}`;

      if (format === 'csv') {
        // For CSV, we need to handle blob download
        const response = await api.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'text/csv' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `analytics_${type}_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        return { success: true, message: 'Export downloaded successfully' };
      } else {
        // For JSON
        const response = await api.get(url);
        return response.data;
      }
    } catch (error) {
      console.error('Export analytics error:', error);
      throw error;
    }
  },

  /**
   * Format currency amount
   */
  formatAmount: (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  },

  /**
   * Format number with commas
   */
  formatNumber: (number) => {
    return new Intl.NumberFormat('en-NG').format(number);
  },

  /**
   * Calculate percentage change
   */
  calculatePercentageChange: (current, previous) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  },

  /**
   * Get trend icon based on percentage
   */
  getTrendIcon: (percentage) => {
    if (percentage > 0) return 'up';
    if (percentage < 0) return 'down';
    return 'neutral';
  },

  /**
   * Get trend color based on percentage
   */
  getTrendColor: (percentage) => {
    if (percentage > 0) return 'success';
    if (percentage < 0) return 'danger';
    return 'secondary';
  },
};

export default analyticsService;
