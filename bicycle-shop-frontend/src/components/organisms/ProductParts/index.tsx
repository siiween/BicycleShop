import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { Part } from '@/types/apiTypes';
import Link from 'next/link';

export default function ProductParts({ parts }: { parts: Part[] }) {
  return (
    <>
      <div className="flex flex-row justify-between mb-5 items-center">
        <Text as="h2" size="2xl" variant="primary" className="font-bold">
          Associated parts
        </Text>
        <div className="flex flex-row gap-6">
          <Button>Associate a part</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {parts.map((part: Part) => (
          <div
            key={part.id}
            className="border border-neutral-300 bg-neutral-100 p-5 items-center justify-center flex flex-col gap-5 rounded-lg"
          >
            <Text as="h3" size="xl" variant="primary" className="font-bold">
              {part.name}
            </Text>
            <Text as="p" size="lg" variant="primary">
              {part.description}
            </Text>
            <div className="flex flex-row gap-3">
              <Link href={`/admin/parts/${part.id}`}>
                <Button>Edit</Button>
              </Link>
              <Button variant="outline">Delete relation</Button>
            </div>
          </div>
        ))}

        {parts.length === 0 && (
          <Text as="p" size="lg" variant="muted">
            No parts associated with this product
          </Text>
        )}
      </div>
    </>
  );
}
