import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Option, Part } from '@/types/apiTypes';
import { createDependentPrice } from '@/actions/dependentPrices';
import Input from '@/components/atoms/Input';
import { handleError } from '@/lib/errorHandler';

import OptionEasySelector from '../OptionEasySelector';
import Modal from '../Modal';

interface AddDependenceModalProps {
  option: Option;
  onClose: () => void;
  parts: Part[];
}

const AddDependenceModal: React.FC<AddDependenceModalProps> = ({
  option,
  onClose,
  parts,
}) => {
  const router = useRouter();

  const [newPrice, setNewPrice] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(Number(e.target.value));
  };

  async function handleSubmit() {
    if (!selectedOption || newPrice < 0) {
      toast.error('All fields are required');
      return;
    }
    const formattedData = {
      price: newPrice,
      optionId: option.id as number,
      conditionOptionId: selectedOption.id,
    };

    try {
      const { success } = await createDependentPrice(formattedData);
      if (success) {
        toast.success('Dependence created successfully');
        router.push(`/admin/parts/${option?.part?.id}/options/${option.id}`);
        onClose();
      } else {
        throw new Error('Failed to create dependence');
      }
    } catch (error: unknown) {
      handleError(error, 'Failed to create dependence');
    }
  }

  return (
    <Modal
      title={`Add dependence to ${option.part.name} (${option.name})`}
      onClose={onClose}
    >
      <Input
        placeholder="New price"
        id="price"
        name="price"
        label="New Price"
        value={newPrice}
        onChange={handleChange}
        required
        type="number"
      />

      <OptionEasySelector
        handleSubmit={handleSubmit}
        parts={parts}
        currentSelectedOption={selectedOption}
        setCurrentSelectedOption={setSelectedOption}
      />
    </Modal>
  );
};

export default AddDependenceModal;
