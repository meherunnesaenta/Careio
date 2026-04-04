'use client'
import React from 'react';
import Link from 'next/link';
import Logo from '../components/layout/Logo';
import { useSession } from 'next-auth/react';
import AuthLogin from '../components/Button/AuthLogin';
import { redirect, usePathname } from 'next/navigation';

// Icon components for better organization
const Icons = {
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H7v8H5a2 2 0 0 1-2-2z" />
    </svg>
  ),
  Profile: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Booking: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  ),
  Payment: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="7" y1="15" x2="7.01" y2="15" />
      <line x1="12" y1="15" x2="12.01" y2="15" />
    </svg>
  ),
  Task: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Worker: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M12 3v2" />
      <path d="M15 6l-1.5 1.5" />
      <path d="M9 6l1.5 1.5" />
    </svg>
  ),
  Logout: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
};

// Sidebar Item Component
const SidebarItem = ({ href, icon: Icon, label, isCollapsed }) => (
  <li>
    <Link
      href={href}
      className={`group relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-base-300 ${isCollapsed ? 'justify-center' : ''
        }`}
      data-tip={isCollapsed ? label : undefined}
    >
      <Icon />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  </li>
);

// Sidebar Section Component
const SidebarSection = ({ items, isCollapsed }) => (
  <ul className="menu w-full space-y-1 p-2">
    {items.map((item, index) => (
      <SidebarItem key={index} {...item} isCollapsed={isCollapsed} />
    ))}
  </ul>
);

const DashBoardLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const pathname = usePathname();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!session) {
    redirect(`/login?callbackUrl=${pathname}`);
  }

  // Navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { href: "/", icon: Icons.Home, label: "Home" },
      { href: "/dashboard/profile", icon: Icons.Profile, label: "Profile" },
      { href: "/dashboard/myBooking", icon: Icons.Booking, label: "My Bookings" },
      { href: "/dashboard/payment", icon: Icons.Payment, label: "Payments" },
    ];

    const roleSpecificItems = {
      admin: [
        { href: "/dashboard/manage-decorators", icon: Icons.Worker, label: "Decorator Management" },
        { href: "/dashboard/assign-task", icon: Icons.Task, label: "Assign Tasks" },
        { href: "/dashboard/worker-dashboard", icon: Icons.Worker, label: "Worker Dashboard" },
      ],
      user: [
        { href: "/dashboard/becomeworker", icon: Icons.Worker, label: "Apply as Worker" },
      ],
      worker: [
        { href: "/dashboard/my-tasks", icon: Icons.Task, label: "My Tasks" },
        { href: "/dashboard/earnings", icon: Icons.Payment, label: "Earnings" },
      ],
    };

    let role = session?.role;
    let items = [...commonItems];

    if (role === 'admin') items.push(...roleSpecificItems.admin);
    else if (role === 'user') items.push(...roleSpecificItems.user);
    else if (role === 'worker') items.push(...roleSpecificItems.worker);

    return items;
  };

  const navItems = getNavItems();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Enhanced Navbar */}
        <nav className="navbar sticky top-0 z-30 bg-base-100 shadow-md">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <Icons.Menu />
            </label>
          </div>

          <div className="flex-1">
            <Logo />
          </div>


        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 bg-base-200 min-h-[calc(100vh-4rem)]">
          <div className="animate-fadeIn">
            {children}
          </div>
        </main>
      </div>

      {/* Enhanced Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

        <div className={`flex flex-col h-full bg-base-100 shadow-xl transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
          }`}>
          {/* Sidebar Header with Collapse Toggle */}
          <div className="flex items-center justify-between p-4 border-b border-base-300">
            {!isCollapsed && (
              <div className="font-bold text-xl">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Menu
                </span>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="btn btn-sm btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''
                  }`}
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <SidebarSection items={navItems} isCollapsed={isCollapsed} />
          </div>

          {/* Footer with Logout */}
          <div className="p-4 border-t border-base-300">
            <div
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-error/10 hover:text-error cursor-pointer ${isCollapsed ? 'justify-center' : ''
                }`}
              data-tip={isCollapsed ? "Logout" : undefined}
            >
              <Icons.Logout />
              {!isCollapsed && (
                
                  <AuthLogin />
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DashBoardLayout;