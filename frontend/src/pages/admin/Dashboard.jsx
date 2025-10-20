import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import analyticsService from '../../services/analyticsService';
import messageService from '../../services/messageService';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [pendingActions, setPendingActions] = useState({
    quotesToReview: 0,
    newMessages: 0,
    paymentsReceived: 0,
  });
  const [stats, setStats] = useState([
    { name: 'Total Quotes', value: '0', change: '+0%', icon: '📋', color: 'bg-blue-500' },
    { name: 'Active Projects', value: '0', change: '+0%', icon: '🏗️', color: 'bg-green-500' },
    { name: 'Total Clients', value: '0', change: '+0%', icon: '👥', color: 'bg-purple-500' },
    { name: 'Revenue', value: '₦0', change: '+0%', icon: '💰', color: 'bg-orange-500' },
  ]);

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard analytics
      const dashboardResponse = await analyticsService.getDashboard();

      if (dashboardResponse.success) {
        const data = dashboardResponse.data;

        // Update stats with real data
        setStats([
          {
            name: 'Total Quotes',
            value: (data.quotes?.total || 0).toString(),
            change: '+0%',
            icon: '📋',
            color: 'bg-blue-500'
          },
          {
            name: 'Active Projects',
            value: (data.projects?.in_progress || 0).toString(),
            change: '+0%',
            icon: '🏗️',
            color: 'bg-green-500'
          },
          {
            name: 'Total Clients',
            value: (data.users?.clients || 0).toString(),
            change: '+0%',
            icon: '👥',
            color: 'bg-purple-500'
          },
          {
            name: 'Revenue',
            value: analyticsService.formatAmount(data.payments?.total_amount || 0),
            change: '+0%',
            icon: '💰',
            color: 'bg-orange-500'
          },
        ]);

        // Update pending actions
        setPendingActions({
          quotesToReview: data.quotes?.pending || 0,
          newMessages: 0, // Will be updated by message count fetch
          paymentsReceived: data.payments?.total_count || 0,
        });
      }

      // Fetch recent activity for quotes
      const activityResponse = await analyticsService.getRecentActivity(5);
      if (activityResponse.success) {
        const recentQuotesData = activityResponse.data?.quotes || [];
        setRecentQuotes(recentQuotesData.slice(0, 3));
      }

      // Fetch unread message count for admin
      const messageCountResponse = await messageService.getAdminUnreadCount();
      if (messageCountResponse.success) {
        setPendingActions(prev => ({
          ...prev,
          newMessages: messageCountResponse.data?.count || 0,
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_review':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Welcome back, {user?.first_name}! Here's what's happening today.
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/admin/quotes/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Create Quote
              </Link>
              <Link
                to="/admin/clients/new"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Add Client
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        {stat.name}
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    {stat.change}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Quotes */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Quote Requests
                </h3>
                <Link
                  to="/admin/quotes"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all →
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentQuotes.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                          No recent quotes
                        </td>
                      </tr>
                    ) : (
                      recentQuotes.map((quote) => (
                        <tr key={quote.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                                {(quote.client_name || 'U').charAt(0)}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                  {quote.client_name || 'Unknown'}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(quote.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {quote.service_name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                quote.status
                              )}`}
                            >
                              {quote.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link
                              to={`/admin/quotes/${quote.id}`}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              Review
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Pending Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Pending Actions
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Quotes to Review
                    </p>
                    <p className="text-xs text-gray-500">Requires attention</p>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">{pendingActions.quotesToReview}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      New Messages
                    </p>
                    <p className="text-xs text-gray-500">From clients</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{pendingActions.newMessages}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Payments Received
                    </p>
                    <p className="text-xs text-gray-500">This week</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{pendingActions.paymentsReceived}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link
                  to="/admin/quotes"
                  className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">
                    📋 Manage Quotes
                  </span>
                </Link>
                <Link
                  to="/admin/clients"
                  className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">
                    👥 View Clients
                  </span>
                </Link>
                <Link
                  to="/admin/projects"
                  className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">
                    🏗️ Track Projects
                  </span>
                </Link>
                <Link
                  to="/admin/payments"
                  className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">
                    💰 Payment Records
                  </span>
                </Link>
                <Link
                  to="/admin/analytics"
                  className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">
                    📊 View Analytics
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
