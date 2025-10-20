import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import quoteService from '../../services/quoteService';
import projectService from '../../services/projectService';
import paymentService from '../../services/paymentService';
import messageService from '../../services/messageService';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';

const ClientDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [stats, setStats] = useState([
    { name: 'Active Quotes', value: '0', icon: '📋', color: 'bg-blue-500' },
    { name: 'Projects', value: '0', icon: '🏗️', color: 'bg-green-500' },
    { name: 'Payments', value: '0', icon: '💳', color: 'bg-purple-500' },
    { name: 'Messages', value: '0', icon: '✉️', color: 'bg-orange-500' },
  ]);
  const [recentQuotes, setRecentQuotes] = useState([]);

  useEffect(() => {
    // Check for success message from navigation state
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
      // Clear the location state
      window.history.replaceState({}, document.title);
    }

    fetchDashboardData();
  }, [location]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch quotes for the current user
      const quotesResponse = await quoteService.getMyQuotes();
      if (quotesResponse.success) {
        const quotes = quotesResponse.data?.quotes || [];
        const activeQuotes = quotes.filter(q =>
          q.status === 'pending' || q.status === 'in_review' || q.status === 'approved'
        );

        // Set recent quotes (last 3)
        setRecentQuotes(quotes.slice(0, 3));

        // Update stats
        setStats(prevStats => {
          const newStats = [...prevStats];
          newStats[0].value = activeQuotes.length.toString();
          return newStats;
        });
      }

      // Fetch projects count
      const projectsResponse = await projectService.getMyProjects();
      if (projectsResponse.success) {
        const projects = projectsResponse.data?.projects || [];
        setStats(prevStats => {
          const newStats = [...prevStats];
          newStats[1].value = projects.length.toString();
          return newStats;
        });
      }

      // Fetch payments count
      const paymentsResponse = await paymentService.getPaymentHistory();
      if (paymentsResponse.success) {
        const payments = paymentsResponse.data || [];
        setStats(prevStats => {
          const newStats = [...prevStats];
          newStats[2].value = payments.length.toString();
          return newStats;
        });
      }

      // Fetch unread messages count
      const messagesResponse = await messageService.getUnreadCount();
      if (messagesResponse.success) {
        const count = messagesResponse.data?.count || 0;
        setStats(prevStats => {
          const newStats = [...prevStats];
          newStats[3].value = count.toString();
          return newStats;
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.first_name}!
            </h1>
            <Link
              to="/request-quote"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6">
            <Alert type="success" message={successMessage} onClose={() => setSuccessMessage('')} />
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-3xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Quotes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Quote Requests
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentQuotes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No quotes found. <Link to="/request-quote" className="text-blue-600 hover:text-blue-800">Request your first quote</Link>
                    </td>
                  </tr>
                ) : (
                  recentQuotes.map((quote) => (
                    <tr key={quote.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {quote.service_name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(quote.created_at).toLocaleDateString()}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {quote.total_amount ? `₦${parseFloat(quote.total_amount).toLocaleString()}` : 'Pending'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/client/quotes/${quote.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-200">
            <Link
              to="/client/quotes"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View all quotes →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/services"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <span className="text-2xl">🔧</span>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Browse Services
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Explore our service offerings
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/client/projects"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    My Projects
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Track ongoing projects
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/client/payments"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Payment History
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    View payment records
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
