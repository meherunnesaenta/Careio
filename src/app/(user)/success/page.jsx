'use client'
import { useSearchParams } from 'next/navigation';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  console.log(sessionId);

  return <div>Payment Successful 🎉</div>;
};

export default SuccessPage;