'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useMemo } from 'react';

import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import { associatePartToProduct } from '@/actions/productsActions';
import { Part } from '@/types/apiTypes';
import { handleError } from '@/lib/errorHandler';

import Modal from '../Modal';

interface AssociatePartModalProps {
  onClose: () => void;
  availableParts: Part[];
  parts: Part[];
  productId: number;
}

const AssociatePartModal: React.FC<AssociatePartModalProps> = ({
  onClose,
  availableParts,
  parts,
  productId,
}) => {
  const router = useRouter();

  const filteredAvailableParts = useMemo(() => {
    const associatedPartIds = parts.map((part) => part.id);
    return availableParts.filter(
      (part) => !associatedPartIds.includes(part.id)
    );
  }, [parts, availableParts]);

  const handleAssociatePart = async (partId: number) => {
    try {
      const { success } = await associatePartToProduct(productId, partId);
      if (success) {
        onClose();
        toast.success('Part associated successfully');
        router.refresh();
      } else {
        throw new Error('Failed to associate part');
      }
    } catch (error: unknown) {
      handleError(error, 'Failed to associate part');
    }
  };

  return (
    <Modal onClose={onClose} title="Select a part">
      <div>
        <div className="grid md:grid-cols-3 gap-5">
          {filteredAvailableParts.map((part: Part) => (
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
              <Button onClick={() => handleAssociatePart(part.id)}>
                Associate
              </Button>
            </div>
          ))}
        </div>
        {filteredAvailableParts.length === 0 && (
          <Text as="p" size="lg" variant="muted">
            No available parts to associate
          </Text>
        )}
      </div>
    </Modal>
  );
};

export default AssociatePartModal;
