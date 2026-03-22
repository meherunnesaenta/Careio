'use client'
import Link from 'next/link';
import React from 'react';

const AuthLogin = () => {

  return (
    <div>
        <Link href={'/login'} className='btn btn-secondary'>Login</Link>
    </div>
  );
};

export default AuthLogin;