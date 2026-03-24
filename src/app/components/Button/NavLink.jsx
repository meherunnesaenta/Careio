'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({ path, children }) => {
  const pathname = usePathname();
  
  // Active ki na — true/false
  const isActive = path === pathname;

  return (
    <Link 
      href={path} 
      className={`
        // ${isActive ? 'text-primary font-bold border-b-2 border-primary' : ' hover:text-secondary'}
      `}
    >
      {children}
    </Link>
  );
};

export default NavLink;