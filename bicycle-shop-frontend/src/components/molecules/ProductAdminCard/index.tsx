import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

import Text from '@/components/atoms/Text';
import Image from 'next/image';

interface ProductAdminCardProps {
  name: string;
  href: string;
  description: string;
  category: string;
  imageUrl: string;
}

const ProductAdminCard: React.FC<ProductAdminCardProps> = ({
  name,
  href,
  description,
  category,
  imageUrl,
}) => {
  return (
    <Link
      href={href}
      className="grid md:grid-cols-6 items-center w-full hover:bg-neutral-200 hover:shadow transition-all bg-neutral-100 rounded-lg border border-neutral-300 h-fit"
    >
      <div className="md:col-span-2 relative md:aspect-square aspect-video overflow-hidden flex">
        <Image
          src={imageUrl}
          alt={name + ' image'}
          fill
          sizes="180px"
          className="object-cover object-right"
          priority
        />
      </div>
      <div className="gap-5 p-5 md:col-span-4">
        <Text
          as="h3"
          size="2xl"
          variant="primary"
          className="font-semibold text-left"
        >
          {name}
        </Text>
        <Text size="sm" variant="muted" className="font-semibold text-left">
          {description || 'No description'}
        </Text>

        <div className="flex flex-row gap-3 mt-5">
          <Text size="lg" className="font-semibold text-left">
            Category:
          </Text>
          <Text size="lg" variant="muted" className="font-semibold text-left">
            {category}
          </Text>
        </div>

        <div className="flex flex-row gap-3 items-center justify-end mt-5 w-full">
          <Text size="sm" variant="primary" className="font-semibold text-left">
            Edit Product
          </Text>
          <ArrowRightIcon className="h-4 w-4 text-rose-700" />
        </div>
      </div>
    </Link>
  );
};

export default ProductAdminCard;
