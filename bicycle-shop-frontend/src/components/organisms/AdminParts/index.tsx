import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import PartAdminCard from '@/components/molecules/PartAdminCard';
import { Part } from '@/types/apiTypes';
import Link from 'next/link';

interface AdminPartsProps {
  parts: Part[];
}

const AdminParts: React.FC<AdminPartsProps> = ({ parts }) => {
  return (
    <>
      <div className="flex flex-row justify-between mb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          All the parts in the shop
        </Text>
        <Link href="/admin/parts/create">
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
        {parts.length === 0 && (
          <Text as="p" size="lg" variant="muted">
            No parts in the shop
          </Text>
        )}
      </div>
    </>
  );
};

export default AdminParts;
