'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoption";
import { connect } from "@/lib/dbconnect";

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
        const { userId, serviceId, image, category, location, serviceDate, totalAmount = 0 } = payload;

        console.log("🔹 createBooking called with payload:", payload);

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
        console.error("Create Booking Error:", error);
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
            serviceId: serviceId 
        };

        const existing = await collection.findOne(query);
        return Boolean(existing);
    } catch (error) {
        console.error("isExistingBooking Error:", error);
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
        console.error("Get Booking Error:", error);
        return [];
    }
};

export const updateBooking = async (service, inc = true) => {
    try {
        const user = await getServerSession(authOptions);
        if (!user?.user?.email || !service?._id) return { success: false };

        const collection = await getBookingCollection();

        const query = { 
            userId: user.user.email, 
            serviceId: service._id 
        };

        const updateData = {
            $inc: { quantity: inc ? 1 : -1 }
        };

        const result = await collection.updateOne(query, updateData);
        return { success: Boolean(result.modifiedCount) };
    } catch (error) {
        console.error("Update Booking Error:", error);
        return { success: false };
    }
};