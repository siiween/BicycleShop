import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

import Text from '@/components/atoms/Text';

interface ProductAdminCardProps {
  name: string;
  href: string;
  description: string;
  category: string;
}

const ProductAdminCard: React.FC<ProductAdminCardProps> = ({
  name,
  href,
  description,
  category,
}) => {
  return (
    <Link
      href={href}
      className="p-5 items-center gap-5 w-full hover:bg-neutral-200 hover:shadow transition-all bg-neutral-100 rounded-lg border border-neutral-300"
    >
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
    </Link>
  );
};

export default ProductAdminCard;
