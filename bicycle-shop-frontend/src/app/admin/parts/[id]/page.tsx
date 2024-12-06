import { fetchOptionsByPartId } from '@/actions/optionsActions';
import { fetchPartById } from '@/actions/partsActions';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { Option } from '@/types/storeTypes';
import Link from 'next/link';

export default async function PartsAdminPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  const { data: part } = await fetchPartById(id);
  const { data: options } = await fetchOptionsByPartId(id);

  return (
    <main className="flex flex-col gap-5 min-h-screen">
      <div className="flex flex-row justify-between mb-10">
        <div className="flex flex-row gap-3 items-baseline">
          <Text as="h1" size="3xl" variant="primary" className="font-bold">
            Part:
          </Text>
          <Text as="h2" size="2xl" variant="secondary" className="font-bold">
            {part.name}
          </Text>
        </div>
        <div className="flex flex-row gap-6">
          <Button variant="outline">Delete</Button>
        </div>
      </div>
      <div className="flex flex-row justify-between mb-5">
        <Text as="h2" size="2xl" variant="primary" className="font-bold">
          Options
        </Text>
        <div className="flex flex-row gap-6">
          <Button>Add new one</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {options.map((option: Option) => (
          <div
            key={option.id}
            className="border border-neutral-300 bg-neutral-100 p-5 items-center justify-center flex flex-col gap-5 rounded-lg"
          >
            <Text as="h3" size="xl" variant="primary" className="font-bold">
              {option.name}
            </Text>
            <Text as="p" size="lg" variant="secondary">
              {option.description}
            </Text>

            <div className="flex flex-row gap-3">
              <Text as="p" size="sm" variant="muted">
                Base price: {option.price}
              </Text>

              <Text as="p" size="sm" variant="muted">
                Stock: {option.quantity}
              </Text>
            </div>

            <div className="flex flex-row gap-3">
              <Link href={`/admin/parts/${part.id}`}>
                <Button>Edit</Button>
              </Link>
              <Button variant="outline">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
