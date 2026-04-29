'use client'
import React, { useState } from 'react';
import AuthLogin from '../Button/AuthLogin';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaAngleDown } from 'react-icons/fa';

const DashBoard = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    if (status === "loading") return null;

    return (
        <div className="relative">
            {status === "authenticated" ? (
                <div className="relative">
                    {/* Button - works same on all devices */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="btn btn-ghost flex items-center gap-1"
                        aria-label="User menu"
                    >
                        {session?.user?.image ? (
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                                <Image
                                    src={session.user.image}
                                    alt="User"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-xs sm:text-sm">
                                {session?.user?.name?.[0] || 'U'}
                            </div>
                        )}
                        <FaAngleDown className={`text-xs sm:text-sm transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Menu - full width on mobile, positioned on desktop */}
                    {isOpen && (
                        <>
                            {/* Backdrop for mobile */}
                            <div 
                                className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
                                onClick={() => setIsOpen(false)}
                            />
                            
                            {/* Menu panel */}
                            <div className={`
                                fixed sm:absolute 
                                z-50 
                                bg-base-100 shadow-xl 
                                transition-all duration-300
                                ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                                sm:right-0 sm:mt-2 sm:w-52 sm:rounded-box
                                left-0 right-0 bottom-0 sm:bottom-auto
                                rounded-t-2xl sm:rounded-box
                                sm:left-auto
                            `}>
                                <div className="p-4 border-b border-base-200 sm:hidden">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Menu</span>
                                        <button 
                                            onClick={() => setIsOpen(false)}
                                            className="btn btn-sm btn-ghost"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                                
                                <ul className="menu p-2">
                                    <li>
                                        <Link 
                                            href="/dashboard" 
                                            className="flex items-center gap-2 px-3 py-2"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <AuthLogin />
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <AuthLogin />
            )}
        </div>
    );
};

export default DashBoard;