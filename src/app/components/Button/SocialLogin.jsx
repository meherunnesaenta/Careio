'use client'

import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const normalizeCallbackUrl = (url) => {
  if (!url) return '/';
  return url.replace(/^https?:\/\/[^/]+/, '') || '/';
};

const SocialLogin = () => {
  const searchParams = useSearchParams();
  const initialCallbackUrl = normalizeCallbackUrl(searchParams.get('callbackUrl') || '/');
  const [callbackUrl, setCallbackUrl] = useState(initialCallbackUrl);

  useEffect(() => {
    const urlFromParams = searchParams.get('callbackUrl');
    const urlFromStorage = typeof window !== 'undefined' ? localStorage.getItem('callbackUrl') : null;
    const rawUrl = urlFromParams || urlFromStorage || '/';

    setCallbackUrl(normalizeCallbackUrl(rawUrl));
  }, [searchParams]);

  const handleGoogleLogin = async () => {
    const absoluteCallbackUrl = callbackUrl.startsWith('http')
      ? callbackUrl
      : `${window.location.origin}${callbackUrl}`;

    await signIn("google", { callbackUrl: absoluteCallbackUrl });
    // Clear the saved callback URL after successful login
    if (typeof window !== 'undefined') {
      localStorage.removeItem('callbackUrl');
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="btn btn-outline w-full flex items-center gap-2"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google"
        className="w-5 h-5"
      />
      Continue with Google
    </button>
  );
};

export default SocialLogin;