import api from './api';

const serviceService = {
  /**
   * Get all services
   * @param {Object} params - Query parameters (category, active, page, limit)
   * @returns {Promise} API response
   */
  getAllServices: async (params = {}) => {
    try {
      const response = await api.get('/services', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get a single service by ID
   * @param {number} id - Service ID
   * @returns {Promise} API response
   */
  getServiceById: async (id) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get a single service by slug
   * @param {string} slug - Service slug
   * @returns {Promise} API response
   */
  getServiceBySlug: async (slug) => {
    try {
      const response = await api.get(`/services/slug/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get all service categories
   * @returns {Promise} API response
   */
  getCategories: async () => {
    try {
      const response = await api.get('/services/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Search services
   * @param {Object} params - Search parameters (query, category)
   * @returns {Promise} API response
   */
  searchServices: async (params = {}) => {
    try {
      const response = await api.get('/services/search', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create a new service (admin only)
   * @param {Object} serviceData - Service data
   * @returns {Promise} API response
   */
  createService: async (serviceData) => {
    try {
      const response = await api.post('/services', serviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update a service (admin only)
   * @param {number} id - Service ID
   * @param {Object} serviceData - Updated service data
   * @returns {Promise} API response
   */
  updateService: async (id, serviceData) => {
    try {
      const response = await api.put(`/services/${id}`, serviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Toggle service active status (admin only)
   * @param {number} id - Service ID
   * @returns {Promise} API response
   */
  toggleServiceStatus: async (id) => {
    try {
      const response = await api.put(`/services/${id}/toggle`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Delete a service (admin only)
   * @param {number} id - Service ID
   * @returns {Promise} API response
   */
  deleteService: async (id) => {
    try {
      const response = await api.delete(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default serviceService;
