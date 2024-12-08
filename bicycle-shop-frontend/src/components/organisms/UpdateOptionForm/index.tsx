'use client';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateOption } from '@/actions/optionsActions';
import Checkbox from '@/components/atoms/Checkbox';
import { Option } from '@/types/apiTypes';

interface UpdateOptionFormProps {
  option: Option;
}

const UpdateOptionForm: React.FC<UpdateOptionFormProps> = ({ option }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: option.name,
    description: option.description,
    price: option.price,
    quantity: option.quantity,
    is_available: option.is_available,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (value: boolean) => {
    setFormData({
      ...formData,
      is_available: value,
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      formData.price < 0 ||
      formData.quantity < 0 ||
      formData.is_available === null
    ) {
      toast.error('All fields are required');
      return;
    }

    const formattedData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      is_available: formData.is_available,
    };

    try {
      const { success } = await updateOption(option.id, formattedData);
      if (success) {
        toast.success('Product updated successfully');
        router.push(`/admin/parts/${option.part.id}/options/${option.id}`);
      } else {
        throw new Error('Failed to update option');
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error('Failed to update option');
    }
  }

  return (
    <>
      <div className="flex flex-row justify-between ">
        <div className="flex flex-row gap-3 items-baseline">
          <Text as="h1" size="3xl" variant="primary" className="font-bold">
            Edit {option.part.name} Option:
          </Text>
          <Text as="h2" size="2xl" variant="secondary" className="font-bold">
            {option.name}
          </Text>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-5 border border-neutral-300"
      >
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
            <Input
              placeholder="Price"
              id="price"
              name="price"
              label="Price"
              value={formData.price}
              onChange={handleChange}
              required
              type="number"
            />
          </div>
          <div>
            <Input
              placeholder="Quantity"
              id="quantity"
              name="quantity"
              label="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              type="number"
            />
          </div>
          <div>
            <Checkbox
              id="is_available"
              name="is_available"
              label="Is Available"
              checked={formData.is_available}
              onChange={handleCheckboxChange}
            />
          </div>

          <div className="col-span-2">
            <Input
              placeholder="Description"
              id="description"
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button type="submit" variant="outline">
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateOptionForm;
