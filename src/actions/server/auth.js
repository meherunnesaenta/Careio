'use server'
const { connect } = require("@/lib/dbconnect");
import bcrypt from "bcrypt";

const userCollection =await connect('users');

export const postUser=async(payload)=>{
    const {name, email, password }=payload;
    if(!email || !password) return null;

    const isExist =await userCollection.findOne({email});
    if(isExist){
        return { acknowledged: false, message: 'Email already exists' };
    }

    const newUser={
        provider:'credentials',
        name,
        email,
        password: await bcrypt.hash(password,10) ,
        role: 'user'
    }

    const result = await userCollection.insertOne(newUser);

    if (result.acknowledged) {
        return {
            acknowledged: true,
            insertId: result.insertedId.toString() 
        }
    }

    return { acknowledged: false };
}

export const loginUser= async(payload)=>{
        const { email, password }=payload;
    if(!email || !password) return null;

    const user =await userCollection.findOne({email});
    if(!user){
        return null
    }

    const isExist = await bcrypt.compare(password,user.password )

    if(isExist){
        return {...user,_id:user._id.toString()}
    }
    else{
        return null;
    }
}