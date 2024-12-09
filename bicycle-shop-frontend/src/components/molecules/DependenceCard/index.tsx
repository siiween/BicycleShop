'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { deleteDependentPrice } from '@/actions/dependentPrices';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { DependentPrice } from '@/types/apiTypes';

interface DependenceCardProps {
  dependence: DependentPrice;
  partId: number;
  optionId: number;
}

const DependenceCard: React.FC<DependenceCardProps> = ({
  dependence,
  partId,
  optionId,
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const { success } = await deleteDependentPrice(dependence.id);
      if (success) {
        toast.success('Option deleted');
        router.push('/admin/parts/' + partId + '/options/' + optionId);
      } else {
        throw new Error('Error deleting dependent price');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error deleting dependent price');
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-white border rounded-lg border-neutral-300 p-3">
      <Text as="h3" size="xl" variant="primary" className="font-bold">
        Price: {dependence.price}€
      </Text>
      <div className="bg-white rounded-lg border border-neutral-300 p-3 h-fit flex flex-col">
        <Text as="p" size="sm" variant="primary" className="font-bold">
          {dependence.conditionOption.name}
        </Text>
        <Text as="p" size="xs" variant="muted" className="font-semibold">
          {dependence.conditionOption.part.name}
        </Text>
      </div>
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DependenceCard;
