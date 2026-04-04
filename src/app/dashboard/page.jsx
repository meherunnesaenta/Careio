import { getBookingByEmail } from '@/actions/server/booking';
import { getServerSession } from 'next-auth';
import DashboardCharts from '../components/DashBoard/DashboardCharts';

const UserDashboard = async () => {
  const session = await getServerSession();
  const bookings = (await getBookingByEmail(session?.user?.email))?.bookings || [];


  return <DashboardCharts bookings={bookings} session={session} />;
};

export default UserDashboard;