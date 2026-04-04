'use client';
import { updateBooking } from '@/actions/server/booking';
import React, { useState, useEffect } from 'react';
import RemoveCard from '../Button/RemoveCard';
import Pay from '../Button/Pay';
import { getPayStatus } from '@/actions/server/payment';

const BookingCard = ({ booking }) => {

  const [quantity, setQuantity] = useState(booking.quantity || 1);
  const [total, setTotal] = useState(booking.totalAmount || 0);
  const [paid, setPaid] = useState(false);

  // ✅ payment status check (correct way)
  useEffect(() => {
    const checkStatus = async () => {
      const res = await getPayStatus(booking.serviceId);

      if (res?.status === 'paid') {
        setPaid(true);
      }
    };

    checkStatus();
  }, [booking.serviceId]);

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

      <img
        src={booking.image}
        alt="service"
        className="w-full md:w-40 h-32 object-cover rounded-xl"
      />

      <div className="flex-1">
        <h2 className="text-xl font-bold capitalize">
          {booking.category || 'Service'}
        </h2>

        <p className="text-sm opacity-70 mt-1">
          Status:
          <span className="ml-2 badge badge-warning">
            {paid ? 'paid' : 'pending'}
          </span>
        </p>

        <div className="flex items-center gap-3 mt-4">
          <button onClick={handleDec} className="btn btn-sm btn-error">-</button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button onClick={handleInc} className="btn btn-sm btn-success">+</button>
        </div>
      </div>

      <div className="mt-3 flex-1">
        <p className="text-sm opacity-70">
          Price: ৳{booking.price} × {quantity}
        </p>
        <p className="text-lg font-bold text-primary">
          Total: ৳{total}
        </p>
      </div>

      <div className="flex md:flex-col justify-between items-end gap-2">
        <Pay booking={booking} paid={paid} />
        <RemoveCard booking={booking} />
      </div>
    </div>
  );
};

export default BookingCard;