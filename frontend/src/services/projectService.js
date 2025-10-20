import api from './api';

const projectService = {
  /**
   * Get all projects with filtering and pagination
   */
  getAllProjects: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();

      if (params.status) queryParams.append('status', params.status);
      if (params.client_id) queryParams.append('client_id', params.client_id);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);

      const queryString = queryParams.toString();
      const url = `/projects${queryString ? `?${queryString}` : ''}`;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Get all projects error:', error);
      throw error;
    }
  },

  /**
   * Get user's projects
   */
  getMyProjects: async (status = '') => {
    try {
      const queryParams = new URLSearchParams();
      if (status) queryParams.append('status', status);

      const queryString = queryParams.toString();
      const url = `/projects/my${queryString ? `?${queryString}` : ''}`;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Get my projects error:', error);
      throw error;
    }
  },

  /**
   * Get project by ID
   */
  getProjectById: async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get project error:', error);
      throw error;
    }
  },

  /**
   * Get project statistics
   */
  getStatistics: async () => {
    try {
      const response = await api.get('/projects/statistics');
      return response.data;
    } catch (error) {
      console.error('Get project statistics error:', error);
      throw error;
    }
  },

  /**
   * Create new project
   */
  createProject: async (projectData) => {
    try {
      const response = await api.post('/projects', projectData);
      return response.data;
    } catch (error) {
      console.error('Create project error:', error);
      throw error;
    }
  },

  /**
   * Update project
   */
  updateProject: async (id, projectData) => {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      console.error('Update project error:', error);
      throw error;
    }
  },

  /**
   * Update project status
   */
  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/projects/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Update project status error:', error);
      throw error;
    }
  },

  /**
   * Delete project
   */
  deleteProject: async (id) => {
    try {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete project error:', error);
      throw error;
    }
  },

  /**
   * Get status badge color
   */
  getStatusColor: (status) => {
    const colors = {
      planning: 'info',
      in_progress: 'primary',
      on_hold: 'warning',
      completed: 'success',
      cancelled: 'danger',
    };
    return colors[status] || 'secondary';
  },

  /**
   * Get status display name
   */
  getStatusName: (status) => {
    const names = {
      planning: 'Planning',
      in_progress: 'In Progress',
      on_hold: 'On Hold',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return names[status] || status;
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
};

export default projectService;
