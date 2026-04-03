'use client';
import { isExistingWorker, postworker } from '@/actions/server/worker';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const BeingWorkerForm = () => {
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    fullName: '',
    location: '',
    serviceType: '',
    organization: '',
    experience: '',
    bio: '',
    phone: '',
    email: '',
  });

  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isAlreadyWorker, setIsAlreadyWorker] = useState(false); // New state
  const [message, setMessage] = useState({ type: '', text: '' });

  // Auto fill from session (Safe way)
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        fullName: session.user.name || prev.fullName,
        email: session.user.email || prev.email,
      }));
    }
  }, [session?.user?.email, session?.user?.name]); // Safe dependency

  // Check if user is already a worker
  useEffect(() => {
    const checkIfWorker = async () => {
      if (session?.user?.email) {
        try {
          const result = await isExistingWorker(session.user.email);
          {
            result? setIsAlreadyWorker(true) : setIsAlreadyWorker(false); 
          }
        } catch (err) {
          console.error("Error checking worker status:", err);
        }
      }
    };

    checkIfWorker();
  }, [session?.user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      setMessage({ type: 'error', text: 'You must be logged in to apply' });
      return;
    }

    if (!formData.fullName || !formData.location || !formData.serviceType || !formData.email) {
      setMessage({ type: 'error', text: 'Please fill all required fields (*)' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const payload = {
        ...formData,
        userId: session.user.id || session.user._id,
        cvFileName: cvFile ? cvFile.name : null,
      };

      const result = await postworker(payload);

      if (result.success) {
        setMessage({ type: 'success', text: result.message || 'Application submitted successfully!' });
        setSubmitted(true);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to submit' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container-custom mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-base-content/70 mt-3 text-lg">
              Join our platform and start earning by providing your services
            </p>
          </div>

          {submitted ? (
            <div className="card bg-base-100 shadow-xl max-w-md mx-auto">
              <div className="card-body items-center text-center py-12">
                <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-6xl">✅</span>
                </div>
                <h2 className="card-title text-2xl">Application Submitted!</h2>
                <p className="text-base-content/70">
                  Thank you! We will review your profile and activate your worker account soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-primary mt-8"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Personal Info */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-2xl mb-6 flex items-center gap-3">
                      <span className="badge badge-primary badge-lg">1</span>
                      Personal Information
                    </h2>

                    <div className="space-y-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Full Name <span className="text-error">*</span></span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          className="input input-bordered w-full"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">Phone Number</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+880 1XXX-XXXXXX"
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">Email <span className="text-error">*</span></span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled
                            className="input input-bordered w-full"
                          />
                        </div>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Location / Service Area <span className="text-error">*</span></span>
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Narsingdi Sadar, Dhaka Division"
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Service Details (tomar original code) */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-2xl mb-6 flex items-center gap-3">
                      <span className="badge badge-primary badge-lg">2</span>
                      Service Details
                    </h2>

                    <div className="space-y-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Service Type <span className="text-error">*</span></span>
                        </label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          required
                          className="select select-bordered w-full"
                        >
                          <option value="">Select your main service</option>
                          <option value="electrician">Electrician</option>
                          <option value="plumber">Plumber</option>
                          <option value="carpenter">Carpenter</option>
                          <option value="painter">Painter</option>
                          <option value="cleaner">Cleaner</option>
                          <option value="driver">Driver</option>
                          <option value="mechanic">Mechanic</option>
                          <option value="cook">Cook</option>
                          <option value="tutor">Tutor</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">Organization / Company</span>
                          </label>
                          <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="Previous or current company"
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">Years of Experience</span>
                          </label>
                          <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            min="0"
                            placeholder="e.g. 5"
                            className="input input-bordered w-full"
                          />
                        </div>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">About Yourself & Services</span>
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          className="textarea textarea-bordered h-32 w-full"
                          placeholder="Describe your skills..."
                        ></textarea>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Upload CV / Resume (Optional)</span>
                        </label>
                        <div className="border-2 border-dashed border-base-300 rounded-box p-8 text-center hover:border-primary transition-colors">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="hidden"
                            id="cv-upload"
                          />
                          <label htmlFor="cv-upload" className="cursor-pointer flex flex-col items-center">
                            <div className="text-5xl mb-4">📄</div>
                            <span className="font-medium text-primary">
                              {cvFile ? cvFile.name : 'Click to upload your CV'}
                            </span>
                            <p className="text-sm text-base-content/60 mt-1">PDF, DOC, JPG, PNG (Max 10MB)</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              {message.text && (
                <div className={`mt-8 alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                  {message.text}
                </div>
              )}

              {/* Submit Button */}
              {!submitted && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="submit"
                    disabled={loading || isAlreadyWorker}
                    className="btn btn-primary btn-lg px-16 text-lg font-semibold disabled:btn-disabled"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-md mr-2"></span>
                        Submitting...
                      </>
                    ) : isAlreadyWorker ? (
                      "You are already a Applied"
                    ) : (
                      "Submit Application & Become a Worker"
                    )}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeingWorkerForm;