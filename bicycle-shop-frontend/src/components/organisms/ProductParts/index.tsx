'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { disassociatePartFromProduct } from '@/actions/productsActions';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import AssociatePartModal from '@/components/molecules/AssociatePartModal';
import { Part } from '@/types/apiTypes';
import { handleError } from '@/lib/errorHandler';

interface ProductPartsProps {
  parts: Part[];
  availableParts: Part[];
  productId: number;
}

const ProductParts: React.FC<ProductPartsProps> = ({
  parts,
  availableParts,
  productId,
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

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
    } catch (error: unknown) {
      handleError(error, 'Failed to disassociate part');
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col justify-between gap-3">
        <Text as="h2" size="2xl" variant="primary" className="font-bold">
          Associated parts
        </Text>
        <div className="flex flex-row gap-6">
          <Button onClick={() => setOpenModal(true)}>Associate a part</Button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
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
        <AssociatePartModal
          onClose={() => setOpenModal(false)}
          availableParts={availableParts}
          parts={parts}
          productId={productId}
        />
      )}
    </>
  );
};

export default ProductParts;
