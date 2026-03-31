'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { createBooking, isExistingBooking } from '@/actions/server/booking';

const BookNow = ({ service }) => {
  const { id } = service;
  const { data: session, status } = useSession();
  const router = useRouter();
  const path = usePathname();
  const [isExisting, setIsExisting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const handleBooking = () => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=${path}`);
    } else {
      router.push(`/booking/${id}`);
    }
  };

  // Check if booking already exists
  useEffect(() => {
    const checkExisting = async () => {
      if (!service?._id && !service?.id) {
        setChecking(false);
        return;
      }

      try {
        const exists = await isExistingBooking(service?._id || service?.id);
        setIsExisting(exists);
       
      } catch (error) {
        setIsExisting(false);
      } finally {
        setChecking(false);
      }
    };

    checkExisting();
  }, [service]);


  return (
    <button
      onClick={handleBooking}
      className="btn btn-primary "
      disabled={isExisting || loading || checking}  
    >
      {checking
        ? "Checking..."
        : isExisting
          ? "Already Booked"
          : loading
            ? "Creating Booking..."
            : "Book Now"
      }
    </button>


  );
};

export default BookNow;