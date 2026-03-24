'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Loading from '@/app/loading';

const AuthLogin = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="w-10">
      <progress className="progress progress-secondary w-full"></progress>
    </div>
  }

  return (
    <div>
      {session ? (
        <button
          className='btn btn-secondary'
          onClick={() => signOut()}
        >
          Log Out
        </button>
      ) : (
        <Link href='/login' className='btn btn-secondary'>
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthLogin;