'use client';

import { createBooking, isExistingBooking } from '@/actions/server/booking';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const BookingForm = ({ service, session }) => {

    const { user } = session || {};
    const [loading, setLoading] = useState(false);

    const router = useRouter();


    const handleBooking = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const payload = {
            userId: user?.email,
            userName: user?.name,
            serviceId: String(service?._id || service?.id),
            image: service?.image || "",
            category: service?.category || "",
            quantity: 1,
            price: service?.price || 0,
            region: formData.get('region'),
            district: formData.get('district'),
            city: formData.get('city'),
            duration: formData.get('duration'),
            serviceDate: new Date().toISOString(),

            totalAmount: Number(service?.price) || 0,
            status: "Pending",

            location: {
                region: formData.get('region'),
                district: formData.get('district'),
                city: formData.get('city'),
            }
        };


        const result = await createBooking(payload);


        if (result?.acknowledged === true) {
            alert("🎉 Booking Created Successfully! Status: Pending");

            router.push('/myBooking');
           

        } else {
            alert("❌ Booking Failed: " + (result?.message || "Unknown error"));
        }
         setLoading(false);
    };

    return (
        <div className="card bg-base-100 shadow-2xl">
            <div className="card-body p-8">
                <h2 className="text-2xl font-semibold text-secondary mb-6">Fill Booking Information</h2>



                <form onSubmit={handleBooking} className="space-y-6">
                    <div className=' flex flex-col md:flex-row gap-7'>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={user?.name || ''}
                                className="input input-bordered w-full  cursor-not-allowed"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={user?.email || ''}
                                className="input input-bordered w-full  cursor-not-allowed"
                                disabled
                            />
                        </div>
                    </div>
                    <div>

                        <label className="label">
                            <span className="label-text font-medium">Region</span>
                        </label>
                        <input
                            type="text"
                            name="region"
                            placeholder="e.g. Dhaka Division"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-medium">District</span>
                        </label>
                        <input
                            type="text"
                            name="district"
                            placeholder="e.g. Narsingdi"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-medium">City</span>
                        </label>
                        <input
                            type="text"
                            name="city"
                            placeholder="e.g. Narsingdi Sadar"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-medium">Duration</span>
                        </label>
                        <input
                            type="text"
                            name="duration"
                            placeholder="e.g. 3 days or 8 hours"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full h-14 text-lg mt-8"
                    >
                        Confirm Booking
                    </button>
                </form>

                <p className="text-center text-sm text-base-content/60 mt-6">
                    Booking will be saved. <span className="text-warning font-medium">Admin will review</span> the booking.
                </p>
            </div>
        </div>
    );
};

export default BookingForm;