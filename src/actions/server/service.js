'use server'

import { ObjectId } from "mongodb";
const { connect } = require("@/lib/dbconnect")

const serviceCollection = await connect('service') // Check koro 'services' na 'service'

export const getService = async () => {
  const result = await serviceCollection.find().toArray();
  return result.map(service => ({
    ...service,
    _id: service._id.toString()
  }));
}

export const getSingleService = async (id) => {
  if (!id) {
    return {
      success: false,
      message: 'Service ID is required',
      service: null
    };
  }

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (error) {
    return {
      success: false,
      message: 'Invalid Service ID format',
      service: null
    };
  }

  try {
    const service = await serviceCollection.findOne({ _id: objectId });
    
    if (!service) {
      return {
        success: false,
        message: 'Service not found',
        service: null
      };
    }

    return {
      success: true,
      message: 'Service found',
      service: {
        ...service,
        _id: service._id.toString()
      }
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      success: false,
      message: 'Database error: ' + error.message,
      service: null
    };
  }
};

export const postService = async (payload) => {
  const { name, category, image, shortDescription, description, price, features } = payload;

  const service = {
    name,
    category,
    image,
    shortDescription,
    description,
    price: Number(price),
    features: features.filter(f => f.trim() !== ''),
    createdAt: new Date()
  }
  
  const result = await serviceCollection.insertOne(service);

  return {
    success: result.acknowledged,
    insertedId: result.insertedId?.toString() || null,
    message: result.acknowledged ? 'Service created successfully!' : 'Failed to create service'
  };
}

export const updateService = async (id, payload) => {
  if (!id) {
    return {
      success: false,
      message: 'Service ID is required'
    };
  }

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
    message: result.modifiedCount > 0 ? 'Service updated successfully!' : 'No changes made or service not found'
  };
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