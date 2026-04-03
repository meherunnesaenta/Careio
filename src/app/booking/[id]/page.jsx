
import { getSingleService } from '@/actions/server/service';
import BookingForm from '@/app/components/from/BookingForm';
import Heading from '@/app/components/Heading/Heading';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Book Service - Care",
    description: "Complete your booking for professional home care service. Choose duration, location and confirm instantly.",
    robots: {
        index: false,        
        follow: false,
    },
    openGraph: {
        title: "Confirm Your Booking - Care",
        description: "Secure your booking for reliable care service at home.",
        images: [{ url: "https://i.ibb.co/ZpM9cBTy/image.png" }],
    },
};
const BookingPage = async ({ params }) => {
    const resolvedParams = await params;
    const session = await getServerSession();

    if (!session) {
        redirect(`/login?callbackUrl=/booking/${resolvedParams.id}`);
    }

    const service = await getSingleService(resolvedParams.id);

    if (!service) {
        return <div>Service not found</div>;
    }


    return (
        <div className="min-h-screen bg-base-100 py-12">
            <div className="container-custom max-w-4xl mx-auto px-4">
                <div className="mb-10 text-center">
                    <Heading>Booking for {service.name}</Heading>
                </div>


                    {/* Form - Client Component */}
                    <div className="lg:col-span-3">
                        <BookingForm service={service} session={session} />
                    </div>
            </div>
        </div>
    );
};

export default BookingPage;  