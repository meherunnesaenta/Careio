'use client'
import React from 'react';
import AuthLogin from '../Button/AuthLogin';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaAngleDown} from 'react-icons/fa';

const DashBoard = () => {
    const { data: session, status } = useSession();

    if (status === "loading") return null;

    return (
        <div>
            {status === "authenticated" ? (
                <div className="dropdown dropdown-end relative">
                    {/* Circular Button */}
                    <label tabIndex={0} className="btn btn-ghost flex items-center gap-1">
                        {session?.user?.image ? (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                    src={session.user.image}
                                    alt="User"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                {session?.user?.name?.[0] || 'U'}
                            </div>
                        )}
                        <FaAngleDown className="text-sm font-primary" />
                    </label>

                    {/* Dropdown menu */}
                    <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                        <li>
                            <Link href="/dashboard" className="flex items-center gap-2">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <AuthLogin />
                        </li>
                    </ul>
                </div>
            ) : (
                <AuthLogin />
            )}
        </div>
    );
};

export default DashBoard;