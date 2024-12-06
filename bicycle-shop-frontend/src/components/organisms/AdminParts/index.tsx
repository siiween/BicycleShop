import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import PartAdminCard from '@/components/molecules/PartAdminCard';
import ProductAdminCard from '@/components/molecules/ProductAdminCard';
import { Product } from '@/types/apiTypes';
import { Part } from '@/types/storeTypes';
import Link from 'next/link';

export default function AdminParts({ parts }: { parts: Part[] }) {
  return (
    <>
      <div className="flex flex-row justify-between mb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          All the parts in the shop
        </Text>
        <Link href="/admin/products/create">
          <Button className="">Add Part</Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {parts.map((part: Part) => (
          <PartAdminCard
            key={part.id}
            name={part.name}
            description={part.description}
            href={'/admin/parts/' + part.id}
          />
        ))}
      </div>
    </>
  );
}
