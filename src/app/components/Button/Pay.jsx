'use client';
import { createCheckoutSession } from '@/app/api/create-checkout-session/route';
import React, { useState } from 'react';

const Pay = ({ booking, paid }) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            const result = await createCheckoutSession(booking);
            
            if (result.success && result.url) {
                // Stripe checkout page e redirect
                window.location.href = result.url;
            } else {
                alert(result.message || 'Payment failed');
            }

        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading || paid}
            className="btn btn-outline btn-secondary"
        >
            {loading ? 'Processing...' : paid ? 'Paid' : 'Pay Now'}
        </button>
    );
};

export default Pay;