'use server'

import { ObjectId } from "mongodb";

const { connect } = require("@/lib/dbconnect")

const serviceCollection = await connect('service')

export const getService = async () => {
  try {
    if (!serviceCollection) {
      console.error("Database not connected");
      return [];
    }

    const result = await serviceCollection.find({}).toArray();
    console.log(`Found ${result.length} services`);

    return result.map(service => ({
      ...service,
      _id: service._id.toString()
    }));
  } catch (error) {
    console.error("getService Error:", error);
    return []; // Return empty array instead of throwing
  }
}

export const getSingleService = async (id) => {


  if (!id) {

    return null;
  }

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (error) {

    return null;
  }

  const service = await serviceCollection.findOne({ _id: objectId });
  if (!service) {

    return null;
  }

  return { ...service, _id: service._id.toString() };
};

export const postService = async (payload) => {
  const { name, category, image, shortDescription, description, price, features } = payload;

  const service = {
    name,
    category,
    image,
    shortDescription,
    description,
    price,
    features
  }
  const result = await serviceCollection.insertOne(service);

  // Return plain serializable object
  return {
    success: result.acknowledged,
    insertedId: result.insertedId?.toString() || null,
    message: result.acknowledged ? 'Service created successfully!' : 'Failed to create service'
  };
}

// actions/server/service.js - Fix updateService function

export const updateService = async (id, payload) => {
  if (!id) {
    return {
      success: false,
      message: 'Service ID is required'
    };
  }

  try {
    const { name, category, image, shortDescription, description, price, features } = payload;

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      return {
        success: false,
        message: 'Invalid Service ID'
      };
    }

    const updateData = {
      name,
      category,
      image,
      shortDescription,
      description,
      price: Number(price),
      features: features.filter(f => f.trim() !== ''),
      updatedAt: new Date()
    };

    const result = await serviceCollection.updateOne(
      { _id: objectId },
      { $set: updateData }
    );

    return {
      success: result.acknowledged && result.modifiedCount > 0,
      message: result.modifiedCount > 0 ? 'Service updated successfully!' : 'No changes made'
    };
  } catch (error) {
    console.error("updateService Error:", error);
    return {
      success: false,
      message: error.message || 'Failed to update service'
    };
  }
}

export const deleteService = async (id) => {
  if (!id) {
    return {
      success: false,
      message: 'Service ID is required'
    };
  }

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (error) {
    return {
      success: false,
      message: 'Invalid Service ID'
    };
  }

  const result = await serviceCollection.deleteOne({ _id: objectId });

  return {
    success: result.acknowledged && result.deletedCount > 0,
    message: result.deletedCount > 0 ? 'Service deleted successfully!' : 'Service not found'
  };
}
