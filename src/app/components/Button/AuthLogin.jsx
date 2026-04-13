'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

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
          onClick={() => signOut({ callbackUrl: '/' })}
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