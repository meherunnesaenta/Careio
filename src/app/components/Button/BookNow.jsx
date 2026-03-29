'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { createBooking } from '@/actions/server/booking';

const BookNow = ({ service }) => {
  const { id, name ,image,category} = service;
  const { data: session, status } = useSession();
  const router = useRouter();
  const path = usePathname();

  const [modalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [serviceDate, setServiceDate] = useState('');

  const handleBooking = () => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=${path}`);
    } else {
       router.push(`/booking/${id}`);
    }
  };



  return (

      <button onClick={handleBooking} className="btn btn-primary">
        Book Now
      </button>


  );
};

export default BookNow;