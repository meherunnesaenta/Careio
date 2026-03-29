import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href={'/'} className='flex justify-center items-center'>
      <Image
        src='/assets/logo.png'
        alt="logo"
        width={80}
        height={80}
        className="w-15 h-auto"
      />
      <p className='text-sm font-bold'>Care.<span className='text-accent'>io</span></p>
    </Link>
  );
};

export default Logo;