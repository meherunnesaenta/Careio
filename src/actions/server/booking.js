'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoption";
import { connect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

// Global collection (lazy loading)
let bookingCollection = null;

const getBookingCollection = async () => {
    if (!bookingCollection) {
        bookingCollection = await connect('booking');
    }
    return bookingCollection;
};

export const createBooking = async (payload) => {
    try {
        const { userId, serviceId, image, category, location, serviceDate,price, totalAmount = 0 } = payload;


        if (!userId || !serviceId || !location || !serviceDate) {
            return { 
                acknowledged: false, 
                message: 'Missing required fields' 
            };
        }

        const newBooking = {
            userId,
            serviceId,
            image: image || "",
            category: category || "",
            location,
            serviceDate,
            quantity: 1,
            price,
            totalAmount: Number(totalAmount),
            status: 'pending',
            createdAt: new Date()
        };

        const collection = await getBookingCollection();
        const result = await collection.insertOne(newBooking);

        return { 
            acknowledged: true, 
            insertedId: result.insertedId,
            message: "Booking created successfully" 
        };

    } catch (error) {
        return {  
            acknowledged: false, 
            message: error.message || "Database error" 
        };
    }
};

export const isExistingBooking = async (serviceId) => {
    try {
        const user = await getServerSession(authOptions);
        if (!user?.user?.email || !serviceId) return false;

        const collection = await getBookingCollection();

        const query = { 
            userId: user.user.email, 
            serviceId: String(serviceId) 
        };

        const existing = await collection.findOne(query);

        return Boolean(existing);
    } catch (error) {
      
        return false;
    }
};

export const getBooking = async () => {
    try {
        const user = await getServerSession(authOptions);
        if (!user?.user?.email) return [];

        const collection = await getBookingCollection();

        const result = await collection.find({ userId: user.user.email }).toArray();

        return result.map(item => ({
            ...item,
            _id: item._id.toString()
        }));
    } catch (error) {
      
        return [];
    }
};

export const getBookingByEmail = async (email) => {
    try {
        if (!email) return { acknowledged: false, message: 'Email is required' };
        const collection = await getBookingCollection();
        const bookings = await collection.find({ userId: email }).toArray();
        return bookings ;
    }
    catch (error) {
        return { acknowledged: false, message: error.message || 'Database error' };
    }
};



export const updateBooking = async (service, inc = true) => {
    try {
        const user = await getServerSession(authOptions);
        if (!user?.user?.email) return { success: false };

        const collection = await getBookingCollection();

        const price = Number(service?.price || 0);

        const result = await collection.updateOne(
            { userId: user.user.email, serviceId: service.serviceId },
            {
                $inc: {
                    quantity: inc ? 1 : -1,
                    totalAmount: inc ? price : -price
                }
            }
        );

        return { success: Boolean(result.modifiedCount) };

    } catch (error) {
        
        return { success: false };
    }
};

export const deleteBooking = async (bookingId) => {
    try {
        const user = await getServerSession(authOptions);
        if (!user?.user?.email) return { success: false };

        const collection = await getBookingCollection();

        const result = await collection.deleteOne({ 
            _id: new ObjectId(bookingId),   
            userId: user.user.email 
        });

        return { success: Boolean(result.deletedCount) };

    } catch (error) {
        console.error("Delete Booking Error:", error);
        return { success: false };
    }
};