'use client';
import { createProduct, updateProduct } from '@/actions/productsActions';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import { Category, Product } from '@/types/apiTypes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function UpdateProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product: Product;
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    category_id: product.category.id,
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
      ('use server');
      const { success } = await updateProduct(formattedData, product.id);
      if (success) {
        toast.success('Product updated successfully');
        router.push(`/admin/products/${product.id}`);
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error('Failed to update product');
    }
  }

  return (
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
      <div className="flex justify-end mt-5">
        <Button type="submit" variant="outline">
          Update
        </Button>
      </div>
    </form>
  );
}
