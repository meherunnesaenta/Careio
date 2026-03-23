'use server'

const { connect } = require("@/lib/dbconnect")

const serviceCollection =await connect('service')

export const getService=async()=>{
    const result =await serviceCollection.find().toArray();
    return result;
}