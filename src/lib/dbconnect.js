const { MongoClient, ServerApiVersion } = require('mongodb');
const uri=process.env.MONGODBURL
const dbname =process.env.DBNAME
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const connect=async (cname)=>{
  return  client.db(dbname).collection(cname);
}