'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { updatePaymentStatus } from '@/actions/server/payment';


export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('updating...');

  useEffect(() => {
    if (sessionId) {
      // Session ID diye payment update korbo
      updatePaymentStatus(sessionId).then(result => {
        if (result.success) {
          setStatus('Payment successful!');
          // 2 sec por redirect
          setTimeout(() => {
            window.location.href = '/dashboard'; // Tomar dashboard e pathao
          }, 2000);
        } else {
          setStatus('Error: ' + result.message);
        }
      });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">{status}</h1>
        <p>Redirecting to dashboard...</p>
      </div>
    </div>
  );
}