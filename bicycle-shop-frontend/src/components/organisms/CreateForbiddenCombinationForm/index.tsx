'use client';
import { createForbiddenCombination } from '@/actions/forbiddenCombinationsActions';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Input from '@/components/atoms/Input';
import OptionEasySelector from '@/components/molecules/OptionEasySelector';
import { Option, Part } from '@/types/apiTypes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface CreateForbiddenCombinationFormProps {
  parts: Part[];
}

const CreateForbiddenCombinationForm: React.FC<
  CreateForbiddenCombinationFormProps
> = ({ parts }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
  });

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const [lastSelectedOption, setLastSelectedOption] = useState<Option | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name || selectedOptions.length < 2) {
      toast.error('All fields are required');
      return;
    }

    const formattedData = {
      name: formData.name,
      optionIds: selectedOptions.map((option) => option.id),
    };

    try {
      const { success } = await createForbiddenCombination(formattedData);
      if (success) {
        toast.success('Forbidden comnination created successfully');
        router.push(`/admin`);
      } else {
        throw new Error('Failed to create forbidden comnination');
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error('Failed to create forbidden comnination');
    }
  }

  const handleSubmitSelectOption = () => {
    if (lastSelectedOption === null) {
      toast.error('Select an option to add');
      return;
    } else {
      setSelectedOptions([...selectedOptions, lastSelectedOption]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <Input
            placeholder="Name"
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Selected Options (at least 2){' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {selectedOptions.map((option) => (
              <div
                key={option.id}
                className="flex justify-between bg-white border border-neutral-300 p-2 rounded-lg"
              >
                <Text size="md">
                  {option.name} ({option.part.name})
                </Text>
                <div className="h-fit">
                  <Button
                    size="xs"
                    onClick={() =>
                      setSelectedOptions(
                        selectedOptions.filter((o) => o.id !== option.id)
                      )
                    }
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {selectedOptions.length == 0 && (
            <Text size="md" variant="red" className="mt-3">
              Please select an option
            </Text>
          )}
        </div>

        <div className="col-span-2 p-5 bg-white rounded-lg border border-neutral-300">
          <OptionEasySelector
            parts={parts}
            handleSubmit={handleSubmitSelectOption}
            currentSelectedOption={lastSelectedOption}
            setCurrentSelectedOption={setLastSelectedOption}
            selection={selectedOptions}
          />
        </div>
      </div>
      <div className="flex justify-end border-t border-neutral-300 mt-5 pt-5">
        <Button type="submit">Create forbidden combination</Button>
      </div>
    </form>
  );
};

export default CreateForbiddenCombinationForm;
