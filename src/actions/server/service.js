'use server'

import { ObjectId } from "mongodb";

const { connect } = require("@/lib/dbconnect")

const serviceCollection =await connect('service')

export const getService=async()=>{
    const result =await serviceCollection.find().toArray();
    return result;
}

export const getSingleService = async (id) => {
  console.log("🔹 getSingleService called with id:", id); 

  if (!id) {
    console.log("❌ No id provided");
    return null;
  }

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (error) {
    console.log("❌ Invalid ObjectId format:", id);
    return null;
  }

  const service = await serviceCollection.findOne({ _id: objectId });
  if (!service) {
    console.log("❌ No service found for this id:", id);
    return null;
  }

  return { ...service, _id: service._id.toString() };
};