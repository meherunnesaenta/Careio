'use client';
import React, { useState } from 'react';

const Pay = ({ booking, paid }) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(booking)
            });

            const result = await res.json();

            if (result.success && result.url) {
                window.location.href = result.url;
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.error(err);
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