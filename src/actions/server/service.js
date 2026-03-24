'use server'

import { ObjectId } from "mongodb";

const { connect } = require("@/lib/dbconnect")

const serviceCollection =await connect('service')

export const getService=async()=>{
    const result =await serviceCollection.find().toArray();
    return result;
}

export const getSingleService=async(id)=>{
   if (!id || id.length !== 24) return null; 
    
    const query ={_id:new ObjectId(id)}
    const service =await serviceCollection.findOne(query);
    return {...service, _id:service._id.toString()||null};
}
