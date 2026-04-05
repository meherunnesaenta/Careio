'use server';

import { connect } from "@/lib/dbconnect";

// Collection initialization - only once
const workerCollection = await connect('workers');

export const postworker = async (payload) => {
  try {
    const { 
      fullName, 
      location, 
      serviceType, 
      organization, 
      experience, 
      bio, 
      phone, 
      email, 
      cvFileName,
      image  // ADD image field
    } = payload;

    if (!fullName || !location || !serviceType || !email) {
      return { 
        success: false, 
        message: "Full Name, Location, Service Type and Email are required" 
      };
    }

    console.log("postworker Payload:", payload);

    const newworker = {
      userName: fullName.trim(),
      userEmail: email.toLowerCase().trim(),
      serviceType: serviceType,
      location: location.trim(),
      organization: organization?.trim() || null,
      experience: experience ? parseInt(experience) : 0,
      bio: bio?.trim() || "",
      phone: phone?.trim() || "",
      cvFileName: cvFileName || null,
      image: image || null,  // ADD image to database
      role: "worker",                     
      rating: 0,
      totalReviews: 0,
      status: "pending",                     
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await workerCollection.insertOne(newworker);

    return {
      success: true,
      message: "Your worker application has been submitted successfully!",
      insertId: result.insertedId.toString(),
    };

  } catch (error) {
    console.error("postworker Error:", error);
    return {
      success: false,
      message: error.message || "Failed to submit application. Please try again."
    };
  }
};

// Get all workers - FIXED version with image
export const getworkers = async () => {
  try {
    const result = await workerCollection.find({}).toArray();
    
    return result.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      name: doc.userName,
      email: doc.userEmail,
      image: doc.image || null, // Include image field
    }));
  } catch (error) {
    console.error("getworkers Error:", error);
    return [];
  }
};

// Get worker by email
export const getWorkerByEmail = async (email) => {
  try {
    if (!email) return null;
    
    const worker = await workerCollection.findOne({ 
      userEmail: email.toLowerCase().trim() 
    });
    
    if (worker) {
      return {
        ...worker,
        _id: worker._id.toString(),
        image: worker.image || null,
      };
    }
    return null;
  } catch (error) {
    console.error("getWorkerByEmail Error:", error);
    return null;
  }
};

// Check if existing worker
export const isExistingWorker = async (email) => {
  try {
    if (!email) return false;
    
    const existing = await workerCollection.findOne({ 
      userEmail: email.toLowerCase().trim() 
    });
    
    return Boolean(existing);
  } catch (error) {
    console.error("isExistingWorker Error:", error);
    return false;
  }
};

// Get workers by service type
export const getWorkersByService = async (serviceType) => {
  try {
    if (!serviceType) return [];
    
    const result = await workerCollection.find({ 
      serviceType: serviceType,
      status: "approved"
    }).toArray();
    
    return result.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      name: doc.userName,
      email: doc.userEmail,
      image: doc.image || null,
    }));
  } catch (error) {
    console.error("getWorkersByService Error:", error);
    return [];
  }
};

// Update worker status (approve/reject)
export const updateWorkerStatus = async (workerId, status) => {
  try {
    const { ObjectId } = require('mongodb');
    
    const result = await workerCollection.updateOne(
      { _id: new ObjectId(workerId) },
      { 
        $set: { 
          status: status,
          updatedAt: new Date()
        } 
      }
    );
    
    return {
      success: result.modifiedCount > 0,
      message: result.modifiedCount > 0 ? `Worker ${status} successfully` : "Worker not found"
    };
  } catch (error) {
    console.error("updateWorkerStatus Error:", error);
    return {
      success: false,
      message: error.message
    };
  }
};

// Update worker image
export const updateWorkerImage = async (workerId, imageUrl) => {
  try {
    const { ObjectId } = require('mongodb');
    
    const result = await workerCollection.updateOne(
      { _id: new ObjectId(workerId) },
      { 
        $set: { 
          image: imageUrl,
          updatedAt: new Date()
        } 
      }
    );
    
    return {
      success: result.modifiedCount > 0,
      message: result.modifiedCount > 0 ? "Image updated successfully" : "Worker not found"
    };
  } catch (error) {
    console.error("updateWorkerImage Error:", error);
    return {
      success: false,
      message: error.message
    };
  }
};