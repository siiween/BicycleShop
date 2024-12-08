'use client';
import { deleteOption } from '@/actions/optionsActions';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { Option } from '@/types/apiTypes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface OptionAdminCardProps {
  option: Option;
  partId: number;
}

const OptionAdminCard: React.FC<OptionAdminCardProps> = ({
  option,
  partId,
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const { success } = await deleteOption(option.id);
      if (success) {
        toast.success('Option deleted');
        router.push('/admin/parts/' + partId);
      } else {
        throw new Error('Error deleting option');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error deleting option');
    }
  };

  return (
    <div className="border border-neutral-300 bg-neutral-100 p-5 items-center justify-center flex flex-col gap-5 rounded-lg">
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

        <Text as="p" size="sm" variant={option.is_available ? 'muted' : 'red'}>
          {option.is_available ? 'Available' : 'Not available'}
        </Text>
      </div>

      <div className="flex flex-row gap-3">
        <Link href={`/admin/parts/${partId}/options/${option.id}`}>
          <Button>Edit</Button>
        </Link>
        <Button variant="outline" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default OptionAdminCard;
