'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  FaCloudUploadAlt, 
  FaTrash, 
  FaPlus, 
  FaTimes,
  FaCheckCircle,
  FaImage,
  FaInfoCircle,
  FaTag,
  FaMoneyBillWave,
  FaList,
  FaSpinner,
  FaArrowLeft
} from 'react-icons/fa';
import Link from 'next/link';
import { postService } from '@/actions/server/service';

const PostService = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '',
    shortDescription: '',
    description: '',
    price: '',
    features: ['']
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload and convert to Base64
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      // Convert image to Base64
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setFormData(prev => ({ ...prev, image: base64String }));
        setUploadingImage(false);
        alert('Image converted to Base64 successfully!');
      };
      
      reader.onerror = () => {
        alert('Failed to convert image');
        setUploadingImage(false);
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('Image conversion failed:', error);
      alert('Failed to process image. Please try again.');
      setUploadingImage(false);
    }
  };

  // Remove image
  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle features change
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  // Add feature field
  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  // Remove feature field
  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  // Handle submit - Post Service with JSON image
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      alert('Please upload an image');
      return;
    }
    
    setLoading(true);

    // Filter out empty features
    const filteredFeatures = formData.features.filter(f => f.trim() !== '');
    
    const submitData = {
      name: formData.name,
      category: formData.category,
      image: formData.image, // This is now Base64 string
      shortDescription: formData.shortDescription,
      description: formData.description,
      price: Number(formData.price),
      features: filteredFeatures
    };

    console.log('Submitting data with Base64 image:', {
      ...submitData,
      image: submitData.image.substring(0, 100) + '...' // Log preview only
    });

    try {
      const result =await postService(submitData);


      if (result.success) {
        alert('Service created successfully!');
        handleReset();
        router.push('/service');
      } else {
        alert('Failed to create service: ' + result.message);
      }
    } catch (error) {
      console.error('Submit failed:', error);
      alert('Failed to create service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
      image: '',
      shortDescription: '',
      description: '',
      price: '',
      features: ['']
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const categories = [
    { value: 'child', label: '👶 Child Care' },
    { value: 'elderly', label: '👴 Elderly Care' },
    { value: 'special', label: '💝 Special Needs Care' },
    { value: 'home', label: '🏠 Home Nursing' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8">
      <div className="container-custom max-w-4xl mx-auto px-4">

        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 text-sm font-semibold bg-primary/10 text-primary rounded-full">
              Create New Service
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
            Add a New Service
          </h1>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            Fill in the details below to add a new service to your platform
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"></div>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body p-6 md:p-8">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Service Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    <FaTag className="text-primary" />
                    Service Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Baby Sitting & Child Care"
                  className="input input-bordered w-full focus:input-primary transition-all"
                  required
                />
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    <FaInfoCircle className="text-primary" />
                    Category
                  </span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered w-full focus:select-primary transition-all"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload - Base64 */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    <FaImage className="text-primary" />
                    Service Image (Base64)
                  </span>
                </label>
                
                {!imagePreview ? (
                  <div 
                    className="border-2 border-dashed border-base-300 rounded-xl p-8 text-center hover:border-primary transition-all cursor-pointer bg-base-200/50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {uploadingImage ? (
                      <>
                        <FaSpinner className="w-12 h-12 text-primary animate-spin mx-auto" />
                        <p className="text-base-content/60 mt-3">Converting image...</p>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                          <FaCloudUploadAlt className="w-10 h-10 text-primary" />
                        </div>
                        <div className="mt-4">
                          <p className="text-primary font-semibold">Click to upload image</p>
                          <p className="text-base-content/50 text-sm mt-1">
                            PNG, JPG, JPEG up to 5MB (Will be converted to Base64)
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden bg-base-200">
                    <div className="relative h-56 w-full">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 btn btn-circle btn-error btn-sm"
                    >
                      <FaTrash />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <p className="text-white text-xs">Base64 Format</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    <FaInfoCircle className="text-primary" />
                    Short Description
                  </span>
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="e.g., নিরাপদ ও ভালোবাসাপূর্ণ শিশু যত্ন সেবা।"
                  className="input input-bordered w-full focus:input-primary transition-all"
                  required
                />
              </div>

              {/* Full Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    <FaInfoCircle className="text-primary" />
                    Full Description
                  </span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Detailed description of the service..."
                  className="textarea textarea-bordered w-full focus:textarea-primary transition-all"
                  required
                ></textarea>
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    <FaMoneyBillWave className="text-primary" />
                    Price (৳)
                  </span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 600"
                  className="input input-bordered w-full focus:input-primary transition-all"
                  required
                />
              </div>

              {/* Features */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    <FaList className="text-primary" />
                    Features
                  </span>
                </label>
                
                <div className="space-y-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                        className="input input-bordered flex-1 focus:input-primary transition-all"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="btn btn-error btn-outline btn-square"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addFeature}
                  className="btn btn-outline btn-primary btn-sm mt-3 gap-2 w-fit"
                >
                  <FaPlus />
                  Add Feature
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-base-300">
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="btn btn-primary flex-1 gap-2"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating Service...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      Create Service
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-outline"
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostService;