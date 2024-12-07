import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import OptionAdminCard from '@/components/molecules/OptionAdminCard';
import { Option } from '@/types/storeTypes';
import Link from 'next/link';

export default function PartOptions({
  options,
  partId,
}: {
  options: Option[];
  partId: number;
}) {
  return (
    <>
      <div className="flex flex-row justify-between">
        <Text as="h2" size="2xl" variant="primary" className="font-bold">
          Options
        </Text>
        <div className="flex flex-row gap-6">
          <Link href={`/admin/parts/${partId}/options/create`}>
            <Button>Add Option</Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {options.map((option: Option) => (
          <OptionAdminCard key={option.id} option={option} partId={partId} />
        ))}

        {options.length === 0 && (
          <Text as="p" size="lg" variant="muted">
            No options associated with this part
          </Text>
        )}
      </div>
    </>
  );
}
