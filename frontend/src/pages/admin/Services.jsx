import React, { useState, useEffect } from 'react';
import { FaCog, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import serviceService from '../../services/serviceService';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await serviceService.getAllServices();
      if (response.success) {
        // Backend returns { success, message, data: { services: [...] } }
        setServices(response.data?.services || []);
      } else {
        setError(response.message || 'Failed to load services');
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: services.length,
    active: services.filter(s => s.status === 'active').length,
    featured: services.filter(s => s.is_featured || s.featured).length,
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
          <p className="text-gray-600 mt-1">Manage your services and offerings</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <FaPlus /> Add Service
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Services</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaCog className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaCog className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-purple-600">{stats.featured}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FaCog className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {error && <Alert type="error" message={error} />}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.category}</p>
              </div>
              {(service.is_featured || service.featured) && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                  Featured
                </span>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  service.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {service.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Total Quotes</span>
                <span className="font-medium text-gray-900">{service.total_quotes}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                <FaEye /> View
              </button>
              <button className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
                <FaEdit /> Edit
              </button>
              <button className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
