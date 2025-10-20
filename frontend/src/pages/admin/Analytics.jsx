import React, { useState, useEffect } from 'react';
import { FaChartLine, FaUsers, FaMoneyBillWave, FaProjectDiagram } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import analyticsService from '../../services/analyticsService';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminAnalytics = () => {
  const [dashboard, setDashboard] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch dashboard stats
      const dashboardResponse = await analyticsService.getDashboard();
      if (dashboardResponse.success) {
        setDashboard(dashboardResponse.data);
      } else {
        setError(dashboardResponse.message || 'Failed to load dashboard analytics');
      }

      // Fetch revenue trends
      const revenueResponse = await analyticsService.getRevenue('30days');
      if (revenueResponse.success) {
        setRevenueData(revenueResponse.data);
      }

      // Fetch recent activity
      const activityResponse = await analyticsService.getRecentActivity(10);
      if (activityResponse.success) {
        setRecentActivity(activityResponse.data);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!dashboard) return null;

  // Revenue Chart Data
  const revenueChartData = {
    labels: revenueData?.labels || ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue (₦)',
        data: revenueData?.values || [0, 0, 0, 0],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return '₦' + context.parsed.y.toLocaleString();
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₦' + value.toLocaleString();
          }
        }
      }
    }
  };

  // Projects Doughnut Chart Data
  const projectsChartData = {
    labels: ['Planning', 'In Progress', 'Completed', 'On Hold'],
    datasets: [
      {
        data: [
          dashboard.projects?.planning || 0,
          dashboard.projects?.in_progress || 0,
          dashboard.projects?.completed || 0,
          dashboard.projects?.on_hold || 0,
        ],
        backgroundColor: [
          'rgba(234, 179, 8, 0.8)',   // yellow - planning
          'rgba(59, 130, 246, 0.8)',  // blue - in progress
          'rgba(34, 197, 94, 0.8)',   // green - completed
          'rgba(249, 115, 22, 0.8)',  // orange - on hold
        ],
        borderColor: [
          'rgb(234, 179, 8)',
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(249, 115, 22)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const projectsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-1">View business insights and performance metrics</p>
      </div>

      {error && <Alert type="error" message={error} />}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FaMoneyBillWave className="text-green-600 text-2xl" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">
            {analyticsService.formatAmount(dashboard.payments?.total_amount || 0)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Completed: {analyticsService.formatAmount(dashboard.payments?.completed_amount || 0)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUsers className="text-blue-600 text-2xl" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm">Total Clients</h3>
          <p className="text-2xl font-bold text-gray-900">{dashboard.users?.clients || 0}</p>
          <p className="text-xs text-gray-500 mt-1">
            Active: {dashboard.users?.active || 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaProjectDiagram className="text-purple-600 text-2xl" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm">Active Projects</h3>
          <p className="text-2xl font-bold text-gray-900">{dashboard.projects?.in_progress || 0}</p>
          <p className="text-xs text-gray-500 mt-1">
            Total: {dashboard.projects?.total || 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <FaChartLine className="text-orange-600 text-2xl" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm">Total Quotes</h3>
          <p className="text-2xl font-bold text-gray-900">{dashboard.quotes?.total || 0}</p>
          <p className="text-xs text-gray-500 mt-1">
            Pending: {dashboard.quotes?.pending || 0} | Approved: {dashboard.quotes?.approved || 0}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend (Last 30 Days)</h3>
          <div className="h-64">
            <Line data={revenueChartData} options={revenueChartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Projects by Status</h3>
          <div className="h-64">
            <Doughnut data={projectsChartData} options={projectsChartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.type === 'quote' ? 'bg-blue-100' :
                activity.type === 'payment' ? 'bg-green-100' :
                'bg-purple-100'
              }`}>
                <span className="text-xl">
                  {activity.type === 'quote' ? '📋' :
                   activity.type === 'payment' ? '💰' : '🏗️'}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
