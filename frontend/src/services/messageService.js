import api from './api';

const messageService = {
  /**
   * Get inbox messages
   */
  getInbox: async (limit = 20, offset = 0) => {
    try {
      const response = await api.get(`/messages/inbox?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.error('Get inbox error:', error);
      throw error;
    }
  },

  /**
   * Get sent messages
   */
  getSent: async (limit = 20, offset = 0) => {
    try {
      const response = await api.get(`/messages/sent?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.error('Get sent messages error:', error);
      throw error;
    }
  },

  /**
   * Get a specific message by ID
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/messages/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get message error:', error);
      throw error;
    }
  },

  /**
   * Send a new message
   */
  send: async (messageData) => {
    try {
      const response = await api.post('/messages', messageData);
      return response.data;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  },

  /**
   * Get unread message count
   */
  getUnreadCount: async () => {
    try {
      const response = await api.get('/messages/unread-count');
      return response.data;
    } catch (error) {
      console.error('Get unread count error:', error);
      throw error;
    }
  },

  /**
   * Get admin unread count (from all clients)
   */
  getAdminUnreadCount: async () => {
    try {
      const response = await api.get('/messages/admin/unread-count');
      return response.data;
    } catch (error) {
      console.error('Get admin unread count error:', error);
      throw error;
    }
  },

  /**
   * Mark a message as read
   */
  markAsRead: async (id) => {
    try {
      const response = await api.put(`/messages/${id}/mark-read`);
      return response.data;
    } catch (error) {
      console.error('Mark as read error:', error);
      throw error;
    }
  },

  /**
   * Mark all messages as read
   */
  markAllAsRead: async () => {
    try {
      const response = await api.put('/messages/mark-all-read');
      return response.data;
    } catch (error) {
      console.error('Mark all as read error:', error);
      throw error;
    }
  },

  /**
   * Delete a message
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/messages/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete message error:', error);
      throw error;
    }
  },
};

export default messageService;
