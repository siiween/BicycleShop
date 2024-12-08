'use client';
import { fetchOptionsByPartId } from '@/actions/optionsActions';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { Option, Part } from '@/types/apiTypes';
import { useEffect, useState } from 'react';

export default function OptionEasySelector({
  parts,
  handleSubmit,
  currentSelectedOption,
  setCurrentSelectedOption,
  selection = [],
}: {
  parts: Part[];
  handleSubmit: () => void;
  currentSelectedOption: Option | null;
  setCurrentSelectedOption: (option: Option | null) => void;
  selection?: Option[];
}) {
  const [currentSelectedPart, setCurrentSelectedPart] = useState<number | null>(
    null
  );

  const [availableOptions, setAvailableOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchAvailableOptions = async () => {
      if (currentSelectedPart) {
        const { data: options } =
          await fetchOptionsByPartId(currentSelectedPart);
        setAvailableOptions(options);
      }
    };
    fetchAvailableOptions();
  }, [currentSelectedPart]);

  return (
    <>
      <Text as="h3" size="lg" variant="primary" className="font-bold mb-4">
        Select part
      </Text>
      <div className="grid grid-cols-4 gap-3">
        {parts.map((part) => (
          <Button
            variant={currentSelectedPart == part.id ? 'primary' : 'outline'}
            key={part.id}
            onClick={() => {
              setCurrentSelectedPart(part.id);
              setCurrentSelectedOption(null);
            }}
          >
            {part.name}
          </Button>
        ))}
      </div>
      {currentSelectedPart && availableOptions.length > 0 && (
        <>
          <Text
            as="h3"
            size="lg"
            variant="primary"
            className="font-bold mb-4 mt-10"
          >
            Select option for{' '}
            {parts.find((p) => p.id == currentSelectedPart)?.name}
          </Text>
          <div className="grid grid-cols-4 gap-3">
            {availableOptions
              .filter((option) => !selection.find((o) => o.id == option.id))
              .map((option) => (
                <Button
                  variant={
                    currentSelectedOption?.id == option.id
                      ? 'primary'
                      : 'outline'
                  }
                  key={option.id}
                  onClick={() => setCurrentSelectedOption(option)}
                >
                  {option.name}
                </Button>
              ))}
          </div>

          {currentSelectedOption && (
            <div className="flex mt-5 pt-5 border-t border-neutral-300 justify-end">
              <Button
                onClick={() => {
                  handleSubmit();
                  setCurrentSelectedOption(null);
                  setCurrentSelectedPart(null);
                }}
              >
                Add
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
