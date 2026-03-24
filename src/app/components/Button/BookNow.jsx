'use client'

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

const BookNow = ({ service }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const path = usePathname();

  const handleBooking = () => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=${path}`);
    } else {
      alert("Booking allowed ✅");
      router.push('/booking') // optional
    }
  };

  return (
    <button onClick={handleBooking} className="btn btn-primary">
      Book Now
    </button>
  );
};

export default BookNow;