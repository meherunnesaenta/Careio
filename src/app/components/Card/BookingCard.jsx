'use client';

import { updateBooking } from '@/actions/server/booking';
import React, { useState } from 'react';

const BookingCard = ({ booking }) => {
const [quantity, setQuantity] = useState(booking.quantity || 1);
const [total, setTotal] = useState(booking.totalAmount || 0);

const handleInc = async () => {
  const res = await updateBooking(booking, true);

  if (res?.success) {
    setQuantity(prev => prev + 1);
    setTotal(prev => prev + booking.price);
  }
};

const handleDec = async () => {
  if (quantity <= 1) return;

  const res = await updateBooking(booking, false);

  if (res?.success) {
    setQuantity(prev => prev - 1);
    setTotal(prev => prev - booking.price);
  }
};

  return (
    <div className="card bg-base-200 shadow-xl p-4 flex flex-col md:flex-row gap-9">

      {/* Image */}
      <img
        src={booking.image}
        alt="service"
        className="w-full md:w-40 h-32 object-cover rounded-xl"
      />

      {/* Content */}
      <div className="flex-1">
        <h2 className="text-xl font-bold capitalize">
          {booking.category || 'Service'}
        </h2>

        <p className="text-sm opacity-70 mt-1">
          Status:
          <span className="ml-2 badge badge-warning">
            {booking.status || 'pending'}
          </span>
        </p>

        {/* Quantity Controller */}
        <div className="flex items-center gap-3 mt-4">

          <button onClick={handleDec} className="btn btn-sm btn-error">
            -
          </button>

          <span className="text-lg font-semibold">{quantity}</span>

          <button onClick={handleInc} className="btn btn-sm btn-success">
            +
          </button>
        </div>

        {/* Price */}
       
      </div>

       <div className="mt-3 flex-1">
          <p className="text-sm opacity-70">
            Price: ৳{booking.price} × {quantity}
          </p>
          <p className="text-lg font-bold text-primary">
            Total: ৳{total}
          </p>
        </div>

      {/* Action */}
      <div className="flex md:flex-col justify-between items-end gap-2">
        <button className="btn btn-primary btn-sm">View</button>
        <button className="btn btn-error btn-sm">Remove</button>
      </div>
    </div>
  );
};

export default BookingCard;