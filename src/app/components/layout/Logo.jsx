import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href={'/'} className='flex justify-center items-center'>
      <Image
        src='/assets/logo.png'
        alt="logo"
        width={70}
        height={70}
        className="w-20 h-auto"
      />
      <p className='text-sm font-bold'>Car.<span className='text-accent'>io</span></p>
    </Link>
  );
};

export default Logo;