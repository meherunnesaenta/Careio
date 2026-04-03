'use client';
import { createCheckoutSession } from '@/app/api/create-checkout-session/route';
import React, { useState } from 'react';

const Pay = ({ booking }) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        const result = await createCheckoutSession(booking);

        if (result.success && result.url) {
            window.location.href = result.url;
        } else {
            alert(result.message || 'Payment start korte problem hoyeche');
        }

        setLoading(false);
    };

    return (
        <button 
            onClick={handlePayment} 
            disabled={loading}
            className="btn btn-outline btn-secondary"
        >
            {loading ? 'Processing...' : 'Pay Now'}
        </button>
    );
};

export default Pay;