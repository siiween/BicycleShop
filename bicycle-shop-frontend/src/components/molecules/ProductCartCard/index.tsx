'use client';

import { useEffect, useMemo, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

import { calculateOptionsPrice } from '@/actions/optionsActions';
import Text from '@/components/atoms/Text';
import { Product } from '@/types/apiTypes';
import Button from '@/components/atoms/Button';

interface ProductCartCardProps {
  product: {
    product: Product;
    options: { id: number; name: string; price: number }[];
    configurationId: number;
  };
  removeProduct: (configurationId: number) => void;
}

const ProductCartCard: React.FC<ProductCartCardProps> = ({
  product,
  removeProduct,
}) => {
  const [total, setTotal] = useState<number | null>(null);
  const [realPrices, setRealPrices] = useState<
    | {
        basePrice: number;
        price: number;
        name: string;
        optionId: number;
      }[]
    | null
  >(null);

  const optionsIds = useMemo(
    () => product.options.map((option) => option.id),
    [product.options]
  );

  useEffect(() => {
    async function fetchPrice() {
      try {
        const { data: finalPrices } = await calculateOptionsPrice(optionsIds);
        setTotal(finalPrices.total);
        setRealPrices(finalPrices.options);
      } catch (error) {
        console.error('Error fetching product prices:', error);
      }
    }
    fetchPrice();
  }, [optionsIds]);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <Text size="lg" className="font-semibold p-5">
          {product.product.name}
        </Text>

        <Button
          variant="transparent"
          onClick={() => removeProduct(product.configurationId)}
        >
          <TrashIcon className="h-4 w-4 text-rose-600" />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        {product.options.map((option) => {
          const finalPrice = Number(
            realPrices?.find((price) => price.optionId === option.id)?.price
          );

          const finalBasePrice = Number(
            realPrices?.find((price) => price.optionId === option.id)?.basePrice
          );

          return (
            <div className="flex justify-between gap-2 px-5" key={option.id}>
              <Text variant="muted" size="sm">
                {option.name}:
              </Text>
              <div className="flex flex-row gap-2">
                <Text variant="muted" size="sm">
                  {finalPrice !== null ? finalPrice + '€' : 'Calculating...'}
                </Text>
                {finalPrice &&
                  finalBasePrice &&
                  finalBasePrice - finalPrice !== 0 && (
                    <Text variant="muted" size="sm">
                      (+{finalPrice - finalBasePrice}€)
                    </Text>
                  )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between border-t border-neutral-300 pt-3 mt-3 p-5 items-baseline">
        <Text variant="primary" className="" size="xs">
          Config ID: {product.configurationId}
        </Text>

        {total !== null ? (
          <Text variant="primary" className="font-bold" size="sm">
            Total: {total}€
          </Text>
        ) : (
          <Text variant="muted" size="sm">
            Calculating total...
          </Text>
        )}
      </div>
    </div>
  );
};

export default ProductCartCard;
