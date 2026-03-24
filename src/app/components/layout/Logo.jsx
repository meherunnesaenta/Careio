import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href={'/'} className='flex justify-center items-center'>
        <Image 
        width={70}
        height={70}
        
        alt="logo"
        src='/assets/logo.jpg'></Image>
    </Link>
  );
};

export default Logo;