'use client'
import { deleteBooking } from '@/actions/server/booking';
import React from 'react';

const RemoveCard = ({ booking }) => {
    
    

    const handleDelete = (bookingId) => async () => {
        const result = await deleteBooking(bookingId);
        if (result?.success) {
            alert("Booking removed successfully");
            window.location.reload();
        } else {
            alert("Failed to remove booking: " + (result?.message || "Unknown error"));
        }   
    }
    return (
        <button onClick={handleDelete(booking._id)} className="btn btn-error btn-outline btn-sm">Remove</button>
    );
};

export default RemoveCard;