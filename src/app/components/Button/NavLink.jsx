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
        // ${isActive ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}
      `}
    >
      {children}
    </Link>
  );
};

export default NavLink;