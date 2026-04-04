import { getBooking } from '@/actions/server/booking';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import BookingCard from '../../components/Card/BookingCard';
import Heading from '../../components/Heading/Heading';


const MyBooking = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect(`/login?callbackUrl=/dashboard/myBooking`);
  }

  const bookings = await getBooking();

  return (
    <div className="container-custom py-10">

      <Heading>My Bookings</Heading>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg opacity-70">No bookings found </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking}  />
          ))}
        </div>
      )}

    </div>
  );
};

export default MyBooking;