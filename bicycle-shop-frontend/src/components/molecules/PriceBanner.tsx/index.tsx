'use client';
import { calculateOptionsPrice } from '@/actions/optionsActions';
import Text from '@/components/atoms/Text';
import { OptionsPrice } from '@/types/apiTypes';
import { Part } from '@/types/storeTypes';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function PriceBanner({
  selectedOptions,
  parts,
}: {
  selectedOptions: Record<number, { id: number; name: string }>;
  parts: Part[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState<OptionsPrice | null>(null);

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const {
          data: { data },
        } = await axios.post(`http://127.0.0.1:3030/options/calculate`, {
          selectedOptionIds: Object.values(selectedOptions).map(
            (option) => option.id
          ),
        });

        setPrice(data);
      } catch (err: any) {
        setError('Failed to load prices');
      } finally {
        setLoading(false);
      }
    };
    if (Object.keys(selectedOptions).length > 0) {
      loadOptions();
    }
  }, [selectedOptions]);

  return (
    <div className="flex flex-col w-80 flex-shrink-0 p-3">
      <Text as="h2" size="lg" variant="primary" className="font-bold mb-5">
        This is your bike
      </Text>

      {parts.map((part: Part) => {
        const selectedOption = selectedOptions[part.id];
        const selectedOptionPrice = price?.options?.find(
          (option) => option.optionId == selectedOption?.id
        )?.price;

        const selectedOptionBasePrice = price?.options?.find(
          (option) => option.optionId == selectedOption?.id
        )?.basePrice;

        return (
          <div className="flex flex-col border-t py-3" key={part.id}>
            <div className="flex  border-neutral-200  gap-2">
              <Text size="xs" variant="primary" className="font-bold">
                {part.name}:
              </Text>
              <Text
                size="xs"
                variant={selectedOption?.name ? 'primary' : 'muted'}
              >
                {selectedOption?.name || 'No option selected'}
              </Text>
            </div>
            {selectedOption?.id && (
              <Text size="xs" variant="muted" className="text-right">
                {error ? 'Failed to load prices' : selectedOptionPrice + ' €'}
                {!error &&
                  selectedOptionBasePrice !== selectedOptionPrice &&
                  ` (Base: ${selectedOptionBasePrice} €)`}
              </Text>
            )}
          </div>
        );
      })}

      <div className="flex flex-row gap-3 mt-5 pt-5 border-t border-black items-center">
        <Text as="h2" size="lg" variant="primary" className="font-bold">
          Total:
        </Text>
        {Object.keys(selectedOptions).length > 0 ? (
          <Text size="lg" variant="secondary" className="">
            {loading || !price
              ? 'Calculating...'
              : error
                ? 'Failed to load prices'
                : price.total + ' €'}
          </Text>
        ) : (
          <Text size="sm" variant="muted">
            Select some options first
          </Text>
        )}
      </div>
    </div>
  );
}