'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { deleteProduct, updateProduct } from '@/actions/productsActions';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Text from '@/components/atoms/Text';
import { Category, Product } from '@/types/apiTypes';
import { handleError } from '@/lib/errorHandler';
import Image from 'next/image';

interface UpdateProductFormProps {
  categories: Category[];
  product: Product;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  categories,
  product,
}) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    category_id: product.category.id,
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

    if (!formData.name || !formData.description || !formData.category_id) {
      toast.error('All fields are required');
      return;
    }

    const formattedData = new FormData();
    formattedData.append('name', formData.name);
    formattedData.append('description', formData.description);
    formattedData.append('category_id', formData.category_id.toString());
    if (formData.image) {
      formattedData.append('image', formData.image);
    }
    try {
      const { success } = await updateProduct(
        formattedData,
        Number(product.id)
      );
      if (success) {
        toast.success('Product updated successfully');
        router.push(`/admin/products/${product.id}`);
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error: unknown) {
      handleError(error, 'Failed to update product');
    }
  }

  const handleDelete = async () => {
    try {
      const { success } = await deleteProduct(product.id);
      if (success) {
        toast.success('Product deleted');
        router.push('/admin');
      } else {
        throw new Error('Error deleting product');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error deleting product');
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between ">
        <div className="flex flex-row gap-3 items-baseline">
          <Text as="h1" size="3xl" variant="primary" className="font-bold">
            Edit Product:
          </Text>
          <Text as="h2" size="2xl" variant="secondary" className="font-bold">
            {product.name}
          </Text>
        </div>
        <div className="flex flex-row gap-6">
          <Button variant="outline" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-neutral-300"
      >
        <div className="grid grid-cols-6 items-center">
          <div className="col-span-1 relative aspect-square overflow-hidden">
            <Image
              src={product.image_url}
              alt={`${product.name} image`}
              fill
              sizes="180px"
              className="object-cover object-right"
              priority
            />
          </div>

          <div className="col-span-5 grid grid-cols-2 gap-5 h-fit p-5">
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
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end p-5">
          <Button type="submit" variant="outline">
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateProductForm;
