'use server'

import { ObjectId } from "mongodb";

const { connect } = require("@/lib/dbconnect")

const serviceCollection =await connect('service')

export const getService=async()=>{
    const result =await serviceCollection.find().toArray();
    return result;
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