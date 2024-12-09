'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

import { useConfiguratorStore } from '@/store/configuratorStore';
import { Option, Part, Product } from '@/types/apiTypes';
import PriceBanner from '@/components/molecules/PriceBanner.tsx';
import Text from '@/components/atoms/Text';
import { formatConflictMessage } from '@/lib/format';
import { fetchOptionsByPartId } from '@/actions/optionsActions';
import { validateOptionsCombinations } from '@/actions/forbiddenCombinationsActions';
import ConfiguratorNavigation from '@/components/molecules/ConfiguratorNavigation';
import { handleError } from '@/lib/errorHandler';

interface ConfiguratorProps {
  initialParts: Part[];
  product: Product;
}

const Configurator: React.FC<ConfiguratorProps> = ({
  initialParts,
  product,
}) => {
  const {
    currentStep,
    parts,
    selectedOptions,
    setParts,
    selectOption,
    nextStep,
    previousStep,
    currentProduct,
    reset,
    setCurrentProduct,
  } = useConfiguratorStore();

  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentProduct !== product.id) {
      reset();
      setCurrentProduct(product.id);
    }
    setParts(initialParts);
  }, [
    initialParts,
    product.id,
    reset,
    setCurrentProduct,
    setParts,
    currentProduct,
  ]);

  const currentPart = parts[currentStep];

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await fetchOptionsByPartId(currentPart.id);
        setOptions(data);
      } catch (error: unknown) {
        handleError(error, 'Failed to load options');
      } finally {
        setLoading(false);
      }
    };

    if (currentPart) {
      loadOptions();
    }
  }, [currentPart]);

  const handleOptionSelect = async (option: Option) => {
    try {
      const { data } = await validateOptionsCombinations(
        selectedOptions,
        option.id
      );

      if (data?.isValid) {
        selectOption(currentPart.id, option);
      } else {
        const conflictingOptionsNames = data?.conflictingOptions
          .map(
            (optionId: number) =>
              Object.values(selectedOptions).find(
                (option) => option.id === optionId
              )?.name
          )
          .filter((name: string): name is string => name !== undefined);
        toast.error(
          `You can't select ${option.name} because you have selected ${formatConflictMessage(
            conflictingOptionsNames
          )}.`
        );
      }
    } catch (error) {
      console.error('Failed to select option', error);
      toast.error('Failed to select option');
    }
  };

  if (!currentPart && !parts) return <Text>Loading parts...</Text>;

  if (parts.length === 0)
    return (
      <Text>You cannot configure this product, please contact the manager</Text>
    );

  return (
    <div className="flex flex-row gap-10">
      <div className="flex flex-col grow">
        <div className="grid grid-cols-5 gap-10">
          <div className="col-span-2 relative aspect-square overflow-hidden">
            <Image
              src={product.image_url}
              alt={`${currentPart.name} image`}
              fill
              sizes="180px"
              className="object-cover object-right"
              priority
            />
          </div>
          <div className="flex flex-col justify-center col-span-3">
            <Text as="h1" size="3xl" variant="primary" className="font-bold">
              {currentPart.name}
            </Text>
            <Text className="text-gray-600 mb-4">
              {currentPart.description}
            </Text>

            {loading ? (
              <p>Loading options...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {options.map((option: Option) => (
                  <button
                    key={option.id}
                    disabled={
                      option.quantity === 0 || option.is_available === false
                    }
                    onClick={() => handleOptionSelect(option)}
                    className={`p-3 border rounded-lg hover:shadow-md disabled:bg-neutral-200 disabled:hover:shadow-none ${
                      selectedOptions[currentPart.id]?.id === option.id
                        ? 'bg-rose-600 text-white'
                        : 'bg-white'
                    }`}
                  >
                    <p>{option.name}</p>
                    <p className="text-xs">{option.description}</p>
                    {(option.quantity === 0 ||
                      option.is_available === false) && (
                      <Text size="xs" className="text-red-500 mt-2">
                        {!option.is_available
                          ? 'Not available'
                          : 'Out of stock'}
                      </Text>
                    )}
                  </button>
                ))}

                {options.length === 0 && (
                  <div className="col-span-2">
                    <Text>
                      No options available, you cannot continue with the
                      configuration, contact the manager
                    </Text>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <ConfiguratorNavigation
          previousStep={previousStep}
          nextStep={nextStep}
          currentStep={currentStep}
          parts={parts}
          selectedOptions={selectedOptions}
          currentPart={currentPart}
          product={product}
        />
      </div>
      <PriceBanner selectedOptions={selectedOptions} parts={parts} />
    </div>
  );
};

export default Configurator;
