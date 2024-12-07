'use client';
import {
  associatePartToProduct,
  disassociatePartFromProduct,
} from '@/actions/productsActions';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Modal from '@/components/molecules/Modal';
import { Part } from '@/types/apiTypes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';

export default function ProductParts({
  parts,
  availableParts,
  productId,
}: {
  parts: Part[];
  availableParts: Part[];
  productId: number;
}) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

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
        setOpenModal(false);
        toast.success('Part associated successfully');
        router.refresh();
      } else {
        throw new Error('Failed to associate part');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDisassociatePart = async (partId: number) => {
    try {
      const { success } = await disassociatePartFromProduct(productId, partId);
      if (success) {
        setOpenModal(false);
        toast.success('Part disassociated successfully');
        router.refresh();
      } else {
        throw new Error('Failed to disassociate part');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Text as="h2" size="2xl" variant="primary" className="font-bold">
          Associated parts
        </Text>
        <div className="flex flex-row gap-6">
          <Button onClick={() => setOpenModal(true)}>Associate a part</Button>
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
              <Button
                variant="outline"
                onClick={() => handleDisassociatePart(part.id)}
              >
                Delete relation
              </Button>
            </div>
          </div>
        ))}

        {parts.length === 0 && (
          <Text as="p" size="lg" variant="muted">
            No parts associated with this product
          </Text>
        )}
      </div>

      {openModal && (
        <Modal onClose={() => setOpenModal(false)} title="Select a part">
          <div>
            <div className="grid grid-cols-3 gap-5">
              {filteredAvailableParts.map((part: Part) => (
                <div
                  key={part.id}
                  className="border border-neutral-300 bg-neutral-100 p-5 items-center justify-center flex flex-col gap-5 rounded-lg"
                >
                  <Text
                    as="h3"
                    size="xl"
                    variant="primary"
                    className="font-bold"
                  >
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
      )}
    </>
  );
}
