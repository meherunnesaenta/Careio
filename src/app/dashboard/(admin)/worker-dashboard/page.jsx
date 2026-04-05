'use client';

import { getworkers } from '@/actions/server/worker';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaUserCircle } from 'react-icons/fa';

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    const loadWorkers = async () => {
      try {
        const result = await getworkers();
        setWorkers(result);
      } catch (err) {
        console.error('Error loading workers:', err);
        setError('Failed to load workers');
      } finally {
        setLoading(false);
      }
    };

    loadWorkers();
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={`inline-block w-4 h-4 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4">Loading workers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!workers || workers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Workers List</h1>
            <p className="text-base-content/60">No workers found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Professional Workers</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workers.map((worker) => (
            <div key={worker._id} className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              
              {/* Worker Image */}
              <figure className="px-6 pt-6">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                  {worker.image ? (
                    <Image
                      src={worker.image}
                      alt={worker.userName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <FaUserCircle className="w-20 h-20 text-base-content/30" />
                    </div>
                  )}
                </div>
              </figure>
              
              <div className="card-body text-center">
                {/* Name and Rating */}
                <h2 className="card-title text-xl font-bold justify-center">
                  {worker.userName}
                </h2>
                
                {/* Rating */}
                <div className="flex justify-center items-center gap-1">
                  {renderStars(worker.rating || 0)}
                  <span className="text-sm text-base-content/60 ml-2">
                    ({worker.totalReviews || 0} reviews)
                  </span>
                </div>
                
                {/* Service Type Badge */}
                <div className="flex justify-center mt-2">
                  <span className="badge badge-primary badge-lg">
                    {worker.serviceType}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-left mt-4">
                  {/* Location */}
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary w-4 h-4" />
                    <span className="font-semibold">Location:</span> 
                    {worker.location}
                  </p>
                  
                  {/* Email */}
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-primary w-4 h-4" />
                    <span className="font-semibold">Email:</span> 
                    <span className="truncate">{worker.userEmail}</span>
                  </p>
                  
                  {/* Phone */}
                  {worker.phone && (
                    <p className="flex items-center gap-2">
                      <FaPhone className="text-primary w-4 h-4" />
                      <span className="font-semibold">Phone:</span> 
                      {worker.phone}
                    </p>
                  )}
                  
                  {/* Organization */}
                  {worker.organization && (
                    <p className="flex items-center gap-2">
                      <FaBriefcase className="text-primary w-4 h-4" />
                      <span className="font-semibold">Organization:</span> 
                      {worker.organization}
                    </p>
                  )}
                  
                  {/* Experience */}
                  <p className="flex items-center gap-2">
                    <span className="font-semibold ml-6">Experience:</span> 
                    {worker.experience} years
                  </p>
                </div>
                
                {/* Bio */}
                {worker.bio && (
                  <p className="text-sm text-base-content/70 mt-3 line-clamp-2">
                    {worker.bio}
                  </p>
                )}
                
                {/* Status Badge */}
                <div className="mt-3 flex justify-center">
                  <span className={`badge ${
                    worker.status === 'approved' ? 'badge-success' : 
                    worker.status === 'rejected' ? 'badge-error' : 
                    'badge-warning'
                  } badge-md`}>
                    {worker.status === 'approved' ? '✓ Approved' : 
                     worker.status === 'rejected' ? '✗ Rejected' : 
                     '⏳ Pending'}
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="card-actions justify-center mt-4">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => document.getElementById(`modal_${worker._id}`).showModal()}
                  >
                    View Details
                  </button>
                  <button className="btn btn-outline btn-sm">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals for each worker */}
      {workers.map((worker) => (
        <dialog key={worker._id} id={`modal_${worker._id}`} className="modal">
          <div className="modal-box max-w-2xl">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Worker Image */}
              <div className="flex-shrink-0">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary">
                  {worker.image ? (
                    <Image
                      src={worker.image}
                      alt={worker.userName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <FaUserCircle className="w-24 h-24 text-base-content/30" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Worker Details */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{worker.userName}</h3>
                
                <div className="flex items-center gap-2 mt-1">
                  {renderStars(worker.rating || 0)}
                  <span className="text-sm">({worker.totalReviews || 0} reviews)</span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <p>
                    <span className="font-semibold">Service Type:</span> {worker.serviceType}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span> {worker.location}
                  </p>
                  <p>
                    <span className="font-semibold">Experience:</span> {worker.experience} years
                  </p>
                  {worker.organization && (
                    <p>
                      <span className="font-semibold">Organization:</span> {worker.organization}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">Email:</span> {worker.userEmail}
                  </p>
                  {worker.phone && (
                    <p>
                      <span className="font-semibold">Phone:</span> {worker.phone}
                    </p>
                  )}
                </div>
                
                {worker.bio && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-1">About</h4>
                    <p className="text-sm text-base-content/70">{worker.bio}</p>
                  </div>
                )}
                
                {worker.cvFileName && (
                  <div className="mt-4">
                    <a 
                      href={`/uploads/${worker.cvFileName}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      View CV
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-action">
              <button className="btn btn-primary">Hire Now</button>
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      ))}
    </div>
  );
};

export default Workers;