'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Cart from '../Cart';
import NavLink from '@/components/atoms/NavLink';

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

            <ul className="flex flex-row gap-5">
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
              <li>
                <NavLink
                  title="Contact"
                  active={pathname.startsWith('/contact')}
                  to="/contact"
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
