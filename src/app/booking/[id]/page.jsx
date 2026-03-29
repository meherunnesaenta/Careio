import { getSingleService } from '@/actions/server/service';
import BookingForm from '@/app/components/from/BookingForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: "Book Service - Care",
  description: "Complete your booking for professional home care service. Choose duration, location and confirm instantly.",
  robots: {
    index: false,        // Booking page সাধারণত index করা হয় না
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
                    <h1 className="text-4xl font-bold text-base-content">
                        Booking for {service.name}
                    </h1>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Service Info */}
                    <div className="lg:col-span-2">
                        <div className="card bg-base-200 shadow-xl sticky top-8">
                            <figure className="px-6 pt-6">
                                {service.image ? (
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="rounded-xl w-full h-64 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-64 bg-base-300 rounded-xl flex items-center justify-center text-6xl">
                                        🛠️
                                    </div>
                                )}
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl">{service.name}</h2>
                                <p className="text-base-content/80">{service.description}</p>
                                <div className="divider"></div>
                                <div className="flex justify-between text-lg">
                                    <span>Price:</span>
                                    <span className="font-bold text-primary">৳{service.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form - Client Component */}
                    <div className="lg:col-span-3">
                        <BookingForm service={service} session={session} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;  