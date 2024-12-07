'use client';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import { Option } from '@/types/apiTypes';
import { deleteForbiddenCombination } from '@/actions/forbiddenCombinationsActions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import OptionMiniCard from '../OptionMiniCard';

export default function ForbiddenCombinationCard({
  name,
  options,
  id,
}: {
  name: string;
  options: { id: number; option: Option }[];
  id: number;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const { success } = await deleteForbiddenCombination(id);
      if (success) {
        toast.success('Combination deleted');
        router.push('/admin');
      } else {
        throw new Error('Error deleting dependent price');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error deleting dependent price');
    }
  };

  return (
    <div className="p-5 items-center gap-5 w-full transition-all bg-neutral-100 rounded-lg border border-neutral-300 h-fit">
      <Text
        as="h3"
        size="lg"
        variant="primary"
        className="font-semibold text-left mb-5"
      >
        {name}
      </Text>

      <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-neutral-300">
        {options.map((option) => (
          <OptionMiniCard
            name={option.option.name}
            partName={option.option.part.name}
            key={option.id}
          />
        ))}
      </div>
      <div className="flex flex-row justify-end mt-5 pt-5 border-t border-neutral-300">
        <Button variant="outline" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
