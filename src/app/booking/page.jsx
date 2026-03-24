import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const BookingPage = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect('/login?callbackUrl=/booking');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Booking Page</h1>
      <p>Welcome {session.user?.email}</p>
    </div>
  );
};

export default BookingPage;