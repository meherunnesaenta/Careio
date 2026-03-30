'use client';

import { createBooking, isExistingBooking } from '@/actions/server/booking';
import { redirect } from 'next/dist/server/api-utils';
import React, { useState, useEffect } from 'react';

const BookingForm = ({ service, session }) => {

    const [isExisting, setIsExisting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);

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
                console.log("Existing booking check:", exists); // Debugging
            } catch (error) {
                console.error("Error checking existing booking:", error);
                setIsExisting(false);
            } finally {
                setChecking(false);
            }
        };

        checkExisting();
    }, [service]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const payload = {
            userId: session?.user?.email,
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

        console.log("📦 Final Payload Sent:", payload);

        try {
            const result = await createBooking(payload);
            console.log("✅ Booking Result:", result);

            if (result?.acknowledged === true) {
                alert("🎉 Booking Created Successfully! Status: Pending");
                // Optional: Refresh the page or redirect
                window.location.reload();
            } else {
                alert("❌ Booking Failed: " + (result?.message || "Unknown error"));
            }
        } catch (error) {
            console.error("❌ Create Booking Error:", error);
            redirect('/myBookings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card bg-base-100 shadow-2xl">
            <div className="card-body p-8">
                <h2 className="text-2xl font-semibold text-secondary mb-6">Fill Booking Information</h2>

                <form onSubmit={handleBooking} className="space-y-6">
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
                        disabled={loading || checking || isExisting}
                        className="btn btn-primary w-full h-14 text-lg mt-8"
                    >
                        {isExisting ? "Already Booked" : loading ? "Creating Booking..." : "Confirm Booking"}
                    </button>
                </form>

                <p className="text-center text-sm text-base-content/60 mt-6">
                    Booking will be saved with <span className="text-warning font-medium">Pending</span> status
                </p>
            </div>
        </div>
    );
};

export default BookingForm;