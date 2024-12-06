import Image from 'next/image';
import Text from '@/components/atoms/Text';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

interface ArtistCardProps {
  imageUrl: string;
  name: string;
  href: string;
  description: string;
}

export default function ProductCard({
  imageUrl,
  name,
  href,
  description,
}: ArtistCardProps) {
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

        <div className="flex flex-row gap-3 items-center mt-5">
          <Text size="sm" variant="primary" className="font-semibold text-left">
            Start Configuration
          </Text>
          <ArrowRightIcon className="h-4 w-4 text-rose-700" />
        </div>
      </div>
    </Link>
  );
}
