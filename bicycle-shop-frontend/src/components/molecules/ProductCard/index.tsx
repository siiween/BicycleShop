'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

import Text from '@/components/atoms/Text';
import { useConfiguratorStore } from '@/store/configuratorStore';

interface ArtistCardProps {
  imageUrl: string;
  name: string;
  href: string;
  description: string;
  productId: number;
}

const ProductCard: React.FC<ArtistCardProps> = ({
  imageUrl,
  name,
  href,
  description,
  productId,
}) => {
  const { currentProduct } = useConfiguratorStore();
  return (
    <Link
      href={href}
      className="grid grid-cols-5 items-center gap-5 w-full hover:bg-neutral-200 hover:shadow transition-all bg-neutral-100 rounded-lg border border-neutral-300"
    >
      <div className="col-span-2 relative aspect-square rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={name + ' image'}
          fill
          sizes="180px"
          className="object-cover object-right"
          priority
        />
      </div>
      <div className="w-full mt-2 col-span-3 p-5">
        <Text
          as="h3"
          size="2xl"
          variant="primary"
          className="truncate font-semibold text-left"
        >
          {name}
        </Text>
        <Text size="sm" variant="muted" className="font-semibold text-left">
          {description || 'No description'}
        </Text>

        {currentProduct == productId ? (
          <div className="flex flex-row gap-3 items-center mt-5 bg-neutral-300 w-fit px-3 py-2 rounded-lg">
            <Text
              size="sm"
              variant="primary"
              className="font-semibold text-left"
            >
              Continue with the configuration
            </Text>
            <ArrowRightIcon className="h-4 w-4 text-rose-700" />
          </div>
        ) : (
          <div className="flex flex-row gap-3 items-center mt-5">
            <Text
              size="sm"
              variant="primary"
              className="font-semibold text-left"
            >
              Start Configuration
            </Text>
            <ArrowRightIcon className="h-4 w-4 text-rose-700" />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
