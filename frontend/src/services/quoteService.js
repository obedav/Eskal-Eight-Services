import api from './api';

const quoteService = {
  /**
   * Create a new quote request
   * @param {Object} quoteData - Quote data including service_id, description, etc.
   * @returns {Promise} API response
   */
  createQuote: async (quoteData) => {
    try {
      const response = await api.post('/quotes', quoteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get all quotes for the authenticated user
   * @param {Object} params - Query parameters (page, limit, status)
   * @returns {Promise} API response
   */
  getMyQuotes: async (params = {}) => {
    try {
      const response = await api.get('/quotes/my', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get a single quote by ID
   * @param {number} id - Quote ID
   * @returns {Promise} API response
   */
  getQuoteById: async (id) => {
    try {
      const response = await api.get(`/quotes/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get all quotes (admin only)
   * @param {Object} params - Query parameters (page, limit, status)
   * @returns {Promise} API response
   */
  getAllQuotes: async (params = {}) => {
    try {
      const response = await api.get('/quotes', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get quote statistics (admin only)
   * @returns {Promise} API response
   */
  getStatistics: async () => {
    try {
      const response = await api.get('/quotes/statistics');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Search quotes
   * @param {Object} params - Search parameters
   * @returns {Promise} API response
   */
  searchQuotes: async (params = {}) => {
    try {
      const response = await api.get('/quotes/search', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update quote status (admin only)
   * @param {number} id - Quote ID
   * @param {string} status - New status (pending, in_review, approved, rejected, completed)
   * @param {string} notes - Optional notes
   * @returns {Promise} API response
   */
  updateQuoteStatus: async (id, status, notes = '') => {
    try {
      const response = await api.put(`/quotes/${id}/status`, { status, notes });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Set quote amount (admin only)
   * @param {number} id - Quote ID
   * @param {number} amount - Quote amount
   * @param {string} notes - Optional notes
   * @returns {Promise} API response
   */
  setQuoteAmount: async (id, amount, notes = '') => {
    try {
      const response = await api.put(`/quotes/${id}/amount`, { amount, notes });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Upload document to quote
   * @param {number} id - Quote ID
   * @param {File} file - File to upload
   * @returns {Promise} API response
   */
  uploadDocument: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('document', file);

      const response = await api.post(`/quotes/${id}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get quote activities/history
   * @param {number} id - Quote ID
   * @returns {Promise} API response
   */
  getQuoteActivities: async (id) => {
    try {
      const response = await api.get(`/quotes/${id}/activities`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default quoteService;
