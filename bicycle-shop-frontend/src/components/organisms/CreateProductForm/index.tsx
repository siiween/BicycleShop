'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { createProduct } from '@/actions/productsActions';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import { Category } from '@/types/apiTypes';
import { handleError } from '@/lib/errorHandler';

interface CreateProductFormProps {
  categories: Category[];
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({
  categories,
}) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === 'image' &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        toast.error('The selected file must be an image');
        return;
      }
      setFormData({ ...formData, image: file });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.category_id ||
      !formData.image
    ) {
      toast.error('All fields are required');
      return;
    }

    const formattedData = new FormData();
    formattedData.append('name', formData.name);
    formattedData.append('description', formData.description);
    formattedData.append('category_id', formData.category_id);
    if (formData.image) {
      formattedData.append('image', formData.image);
    }

    try {
      const { success, data: newProduct } = await createProduct(formattedData);
      if (success) {
        toast.success('Product created successfully');
        router.push(`/admin/products/${newProduct.id}`);
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error: unknown) {
      handleError(error, 'Failed to create product');
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
        <div className="col-span-2">
          <label
            htmlFor="image"
            className="block font-medium text-gray-700 mb-1"
          >
            Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="image"
            name="image"
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
};

export default CreateProductForm;
