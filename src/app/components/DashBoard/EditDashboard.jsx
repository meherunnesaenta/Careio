'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  FaEye,
  FaTrash,
  FaPlus,
  FaSpinner,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTag,
  FaMoneyBillWave,
  FaList
} from 'react-icons/fa';
import Link from 'next/link';
import { getService, deleteService } from '@/actions/server/service';

const EditDashboard = () => {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Load all services
  useEffect(() => {
    const loadServices = async () => {
      try {
        const result = await getService();
        // Convert ObjectIds to strings for client-side use
        const servicesWithStringIds = result.map(service => ({
          ...service,
          _id: service._id.toString()
        }));
        setServices(servicesWithStringIds);
      } catch (err) {
        console.error('Error loading services:', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  // Handle delete service
  const handleDelete = async (serviceId, serviceName) => {
    if (!confirm(`Are you sure you want to delete "${serviceName}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(serviceId);

    try {
      const result = await deleteService(serviceId);

      if (result.success) {
        // Remove from local state
        setServices(prev => prev.filter(service => service._id !== serviceId));
        alert('Service deleted successfully!');
      } else {
        alert('Failed to delete service: ' + result.message);
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete service. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // Get category label
  const getCategoryLabel = (category) => {
    const categories = {
      child: '👶 Child Care',
      elderly: '👴 Elderly Care',
      special: '💝 Special Needs Care',
      home: '🏠 Home Nursing'
    };
    return categories[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-base-content/60">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8">
        <div className="container-custom max-w-6xl mx-auto px-4">
          <div className="alert alert-error">
            <FaExclamationTriangle />
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8">
      <div className="container-custom max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                Manage Services
              </h1>
              <p className="text-base-content/60">
                View, edit, and delete your services
              </p>
            </div>
            <Link href="/dashboard/postservice" className="btn btn-primary gap-2">
              <FaPlus />
              Add New Service
            </Link>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-4"></div>
        </div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-base-200 flex items-center justify-center mx-auto mb-4">
              <FaList className="w-12 h-12 text-base-content/40" />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">No Services Found</h3>
            <p className="text-base-content/60 mb-6">Start by adding your first service</p>
            <Link href="/dashboard/postservice" className="btn btn-primary">
              <FaPlus className="mr-2" />
              Add First Service
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service._id} className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all">
                <figure className="px-4 pt-4">
                  <div className="relative h-48 w-full rounded-lg overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-lg font-bold text-base-content mb-2">
                    {service.name}
                  </h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FaTag className="text-primary" />
                      <span className="badge badge-outline badge-primary">
                        {getCategoryLabel(service.category)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <FaMoneyBillWave className="text-green-600" />
                      <span className="font-semibold text-green-600">
                        ৳{service.price}
                      </span>
                    </div>

                    <p className="text-base-content/70 text-sm line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="card-actions justify-end gap-2">
                    <Link
                      href={`/dashboard/manage-service/update/${service._id}`}
                      className="btn btn-outline btn-primary btn-sm gap-2"
                    >
                      <FaEye />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(service._id, service.name)}
                      disabled={deletingId === service._id}
                      className="btn btn-outline btn-error btn-sm gap-2"
                    >
                      {deletingId === service._id ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaTrash />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {services.length > 0 && (
          <div className="mt-8 text-center">
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <FaList className="inline-block w-8 h-8 stroke-current" />
                </div>
                <div className="stat-title">Total Services</div>
                <div className="stat-value text-primary">{services.length}</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaCheckCircle className="inline-block w-8 h-8 stroke-current" />
                </div>
                <div className="stat-title">Active Services</div>
                <div className="stat-value text-secondary">{services.length}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditDashboard;