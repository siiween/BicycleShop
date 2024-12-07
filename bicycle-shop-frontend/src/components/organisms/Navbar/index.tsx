'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-neutral-800">
      <div className="max-w-7xl mx-auto px-5 py-7 flex items-center justify-between">
        <div className="flex items-center gap-16 justify-center">
          <Text as="h1" size="3xl" className="font-bold" variant="white">
            Shop
          </Text>

          <ul className="flex flex-row gap-5">
            <li>
              <Link href="/">
                <Text
                  variant={
                    pathname === '/' ||
                    pathname.startsWith('/products') ||
                    pathname.startsWith('/configurator')
                      ? 'red'
                      : 'white'
                  }
                  className="font-bold"
                >
                  Home
                </Text>
              </Link>
            </li>
            <li>
              <Link href="/admin">
                <Text
                  variant={pathname.startsWith('/admin') ? 'red' : 'white'}
                  className="font-bold"
                >
                  Admin
                </Text>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <Text
                  variant={pathname.startsWith('/contact') ? 'red' : 'white'}
                  className="font-bold"
                >
                  Contact
                </Text>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="">
            <ShoppingCartIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
