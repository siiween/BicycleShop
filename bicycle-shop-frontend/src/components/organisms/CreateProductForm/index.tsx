'use client';
import { createProduct } from '@/actions/productsActions';
import Button from '@/components/atoms/Button';
import Input from '@/components/molecules/Input';
import Select from '@/components/molecules/Select';
import { Category } from '@/types/apiTypes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CreateProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
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

    if (!formData.name || !formData.description || !formData.category_id) {
      toast.error('All fields are required');
      return;
    }

    const formattedData = {
      name: formData.name,
      description: formData.description,
      category_id: Number(formData.category_id),
    };

    try {
      const { success, data: newProduct } = await createProduct(formattedData);
      if (success) {
        toast.success('Product created successfully');
        router.push(`/admin/products/${newProduct.id}`);
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error('Failed to create product');
    }
  }

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
          <Select
            id="category_id"
            name="category_id"
            label="Category"
            value={formData.category_id}
            onChange={handleChange}
            required
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            placeholder="Select a category"
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
      <div className="flex justify-end border-t border-neutral-300 mt-5 pt-5">
        <Button type="submit">Create Product</Button>
      </div>
    </form>
  );
}
