'use client'
import { usePathname } from 'next/navigation';
import React from 'react';


const SocialLogin = () => {
    const path= usePathname()
      const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: {path} });
  };
    return (
        <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
        >
             Continue with Google
        </button>
    );
};

export default SocialLogin;