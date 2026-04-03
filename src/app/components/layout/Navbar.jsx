'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import NavLink from '../Button/NavLink';
import ThemeToggleButton from '../Button/ThemeToggleButton';
import DashBoard from './DashBoard';
import { 
  FaHome, 
  FaServicestack, 
  FaInfoCircle, 
  FaBars, 
  FaTimes,
  FaUserCircle 
} from 'react-icons/fa';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { path: '/', label: 'Home', icon: FaHome },
        { path: '/service', label: 'Services', icon: FaServicestack },
        { path: '/about', label: 'About', icon: FaInfoCircle },
    ];

    return (
        <>
            {/* Spacer */}
            <div className="h-16"></div>
            
            {/* Navbar */}
            <nav className={`fixed rounded-2xl top-0 w-11/12 mx-auto left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled 
                    ? 'bg-base-100/95 backdrop-blur-xl shadow-2xl border-b border-base-300/50' 
                    : 'bg-base-100/80 backdrop-blur-md border-b border-base-200/30'
            }`}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo Section */}
                        <div className="flex items-center gap-2">
                            <Logo />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    path={item.path}
                                    className="group relative px-4 py-2 rounded-lg font-medium text-base-content/80 hover:text-primary transition-all duration-300"
                                >
                                    <span className="relative z-10">{item.label}</span>
                                    <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                </NavLink>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3">
                            {/* Theme Toggle */}
                            <div className="tooltip tooltip-bottom" data-tip="Toggle theme">
                                <ThemeToggleButton />
                            </div>
                            
                            {/* Dashboard Button */}
                            <div className="tooltip tooltip-bottom hidden md:block" data-tip="Dashboard">
                                <DashBoard />
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden relative w-10 h-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center group"
                            >
                                {isMobileMenuOpen ? (
                                    <FaTimes className="w-5 h-5" />
                                ) : (
                                    <FaBars className="w-5 h-5" />
                                )}
                                <span className="absolute inset-0 rounded-lg ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden fixed inset-x-0 top-16 z-50 transition-all duration-500 ease-in-out ${
                    isMobileMenuOpen 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-4'
                }`}>
                    <div className="bg-base-100/98 backdrop-blur-xl border-b border-base-300 shadow-2xl">
                        <div className="max-w-7xl mx-auto px-4 py-6">
                            <div className="flex flex-col gap-2">
                                {navItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="group flex items-center gap-3 px-4 py-3 rounded-lg text-base-content/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                                            style={{
                                                animationDelay: `${index * 50}ms`,
                                                animation: isMobileMenuOpen ? 'slideIn 0.3s ease-out forwards' : 'none'
                                            }}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    );
                                })}
                                
                                {/* Mobile Dashboard Button */}
                                <div className="pt-4 mt-2 border-t border-base-300">
                                    <div className="px-4">
                                        <DashBoard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
};

export default Navbar;