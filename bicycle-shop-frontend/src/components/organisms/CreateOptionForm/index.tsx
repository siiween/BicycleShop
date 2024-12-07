'use client';
import { createOption } from '@/actions/optionsActions';
import Button from '@/components/atoms/Button';
import Input from '@/components/molecules/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CreateOptionForm({ partId }: { partId: number }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      formData.price <= 0 ||
      formData.quantity < 0
    ) {
      toast.error('All fields are required');
      return;
    }

    const formattedData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };

    try {
      console.log(partId, formattedData);

      const { success, data: newOption } = await createOption(
        formattedData,
        partId
      );
      if (success) {
        toast.success('Option created successfully');
        router.push(`/admin/parts/${newOption?.part?.id}`);
      } else {
        throw new Error('Failed to create option');
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error('Failed to create option');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="grid grid-cols-2 gap-5">
        <Input
          placeholder="Name"
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          placeholder="Description"
          id="description"
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Input
          placeholder="Price"
          id="price"
          name="price"
          label="Price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          required
        />
        <Input
          placeholder="Quantity"
          id="quantity"
          name="quantity"
          label="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          type="number"
          required
        />
      </div>
      <div className="flex justify-end border-t border-neutral-300 mt-5 pt-5">
        <Button type="submit">Create Option</Button>
      </div>
    </form>
  );
}
