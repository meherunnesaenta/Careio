'use server';

import { connect } from "@/lib/dbconnect";


    const workerCollection = await connect('workers');


export const postworker = async (payload) => {
  try {
    const { fullName, location, serviceType, organization, experience, bio, phone, email, cvFileName } = payload;

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

// Optional: Get all workers
export const getworkers = async () => {
  try {
    const db = await connect();
    const workerCollection = db.collection('workers');
    
    const result = await workerCollection.find({}).toArray();
    return result.map(doc => ({
      ...doc,
      _id: doc._id.toString()
    }));
  } catch (error) {
    console.error("getworkers Error:", error);
    throw new Error("Failed to fetch workers");
  }
};

export const isExistingWorker = async (email) => {
  try {
    if (!email) return false;  
    const existing = await workerCollection.findOne({ userEmail: email.toLowerCase().trim() });
    return Boolean(existing);
  }
  catch (error) {
    console.error("isExistingWorker Error:", error);
    return false;
  }
};

