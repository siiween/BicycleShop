'use client';
import { deletePart, updatePart } from '@/actions/partsActions';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Input from '@/components/atoms/Input';
import { Part } from '@/types/apiTypes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface UpdatePartFormProps {
  part: Part;
}

const UpdatePartForm: React.FC<UpdatePartFormProps> = ({ part }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: part.name,
    description: part.description,
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

    if (!formData.name || !formData.description) {
      toast.error('All fields are required');
      return;
    }

    const formattedData = {
      name: formData.name,
      description: formData.description,
    };

    try {
      const { success } = await updatePart(formattedData, part.id);
      if (success) {
        toast.success('Part updated successfully');
        router.push(`/admin/parts/${part.id}`);
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error('Failed to update part');
    }
  }

  const handleDelete = async () => {
    try {
      const { success } = await deletePart(part.id);
      if (success) {
        toast.success('Part deleted');
        router.push('/admin');
      } else {
        throw new Error('Error deleting part');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error deleting part');
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between ">
        <div className="flex flex-row gap-3 items-baseline">
          <Text as="h1" size="3xl" variant="primary" className="font-bold">
            Edit Part:
          </Text>
          <Text as="h2" size="2xl" variant="secondary" className="font-bold">
            {part.name}
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
        <div className="flex justify-end mt-5">
          <Button type="submit" variant="outline">
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdatePartForm;
