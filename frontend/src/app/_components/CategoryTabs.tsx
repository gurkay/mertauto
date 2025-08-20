'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { Session } from 'next-auth';
import Image from 'next/image';
import { menus } from '@/constants/menus';

// Custom ChevronDown icon component
const ChevronDownIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface IProps {
  session: Session | null;
}

export default function CategoryTabs({ session }: IProps) {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
        setOpenDropdowns([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Filter categories based on user roles
  const userRoles = session?.user?.roles || ['ALL'];
  const filteredMenus = menus.filter(menu =>
    menu.auth.some(role => userRoles.includes(role) || role === 'ALL')
  );

  return (
    <div ref={menuRef}>
      {/* Mobile hamburger button */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-2 relative transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-180' : ''}`}>
            <span className={`absolute h-0.5 w-4 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
            <span className={`absolute h-0.5 w-4 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute h-0.5 w-4 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
          </div>
        </button>

      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex space-x-1 py-3">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <Image
            src="/images/icons/mert-auto-icon.png"
            alt="Mert Auto Logo"
            width={60}
            height={60}
            className="object-contain"
          />
          <span className="text-gray-100 text-xl hidden md:inline ">Mert Auto</span>
        </Link>
        {filteredMenus.map((menu) => (
          <div key={menu.name} className="relative">
            {menu.children ? (
              <>
                <button
                  onClick={() => toggleDropdown(menu.name)}
                  className="flex items-center text-gray-800 hover:text-blue-600 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150"
                >
                  <Image 
                    src={menu.icon} 
                    alt={menu.name}
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  {menu.name}
                  <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdowns.includes(menu.name) ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute left-0 z-10 mt-1 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all ease-in-out duration-100 ${openDropdowns.includes(menu.name) ? 'opacity-100 scale-100' : 'opacity-0 scale-95 invisible'}`}>
                  <div className="py-1">
                    {menu.children
                      .filter(child => child.auth.some(role => userRoles.includes(role) || role === 'ALL'))
                      .map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Image 
                            src={child.icon} 
                            alt={child.name}
                            width={16}
                            height={16}
                            className="mr-2 inline"
                          />
                          {child.name}
                        </Link>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={menu.href}
                className="flex items-center text-gray-800 hover:text-blue-600 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150"
              >
                <Image 
                  src={menu.icon} 
                  alt={menu.name}
                  width={16}
                  height={16}
                  className="mr-2"
                />
                {menu.name}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden mt-2`}>
        <div className="space-y-1 px-2 pb-3 pt-2">
          {filteredMenus.map((menu) => (
            <div key={menu.name}>
              {menu.children ? (
                <>
                  <button
                    onClick={() => toggleDropdown(menu.name)}
                    className="flex w-full items-center justify-between text-gray-800 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium"
                  >
                    <div className="flex items-center">
                      <Image 
                        src={menu.icon} 
                        alt={menu.name}
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      {menu.name}
                    </div>
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform duration-200 ${openDropdowns.includes(menu.name) ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openDropdowns.includes(menu.name) && (
                    <div className="pl-4 space-y-1">
                      {menu.children
                        .filter(child => child.auth.some(role => userRoles.includes(role) || role === 'ALL'))
                        .map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Image 
                              src={child.icon} 
                              alt={child.name}
                              width={16}
                              height={16}
                              className="mr-2 inline"
                            />
                            {child.name}
                          </Link>
                        ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={menu.href}
                  className="flex items-center text-gray-800 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Image 
                    src={menu.icon} 
                    alt={menu.name}
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  {menu.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 