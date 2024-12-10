'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import NavLink from '@/components/atoms/NavLink';

import Cart from '../Cart';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="bg-neutral-800">
        <div className="max-w-7xl mx-auto px-5 py-7 flex items-center justify-between">
          <div className="flex items-center gap-16 justify-center">
            <Text as="h1" size="3xl" className="font-bold" variant="white">
              Shop
            </Text>

            <ul className="flex flex-row md:gap-5 gap-3">
              <li>
                <NavLink
                  title="Home"
                  active={
                    pathname === '/' ||
                    pathname.startsWith('/products') ||
                    pathname.startsWith('/configurator')
                  }
                  to="/"
                />
              </li>
              <li>
                <NavLink
                  title="Admin"
                  active={pathname.startsWith('/admin')}
                  to="/admin"
                />
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setIsCartOpen(true)}>
              <ShoppingCartIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;
