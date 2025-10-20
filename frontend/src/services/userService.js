import api from './api';

const userService = {
  /**
   * Get all users with filtering and pagination
   */
  getAllUsers: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();

      if (params.role) queryParams.append('role', params.role);
      if (params.status) queryParams.append('status', params.status);
      if (params.search) queryParams.append('search', params.search);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);

      const queryString = queryParams.toString();
      const url = `/users${queryString ? `?${queryString}` : ''}`;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Get all users error:', error);
      throw error;
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },

  /**
   * Get user statistics
   */
  getStatistics: async () => {
    try {
      const response = await api.get('/users/statistics');
      return response.data;
    } catch (error) {
      console.error('Get user statistics error:', error);
      throw error;
    }
  },

  /**
   * Update user status
   */
  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/users/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Update user status error:', error);
      throw error;
    }
  },

  /**
   * Delete user
   */
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  },

  /**
   * Get status badge color
   */
  getStatusColor: (status) => {
    const colors = {
      active: 'success',
      inactive: 'warning',
      suspended: 'danger',
    };
    return colors[status] || 'secondary';
  },

  /**
   * Get role display name
   */
  getRoleName: (role) => {
    const roles = {
      super_admin: 'Super Admin',
      admin: 'Admin',
      client: 'Client',
      user: 'User',
    };
    return roles[role] || role;
  },
};

export default userService;
