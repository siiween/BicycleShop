'use client';
import { createPart } from '@/actions/partsActions';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CreatePartForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
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
      const { success, data: newPart } = await createPart(formattedData);
      if (success) {
        toast.success('Part created successfully');
        router.push(`/admin/parts/${newPart.id}`);
      } else {
        throw new Error('Failed to create part');
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error('Failed to create part');
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
      <div className="flex justify-end border-t border-neutral-300 mt-5 pt-5">
        <Button type="submit">Create Part</Button>
      </div>
    </form>
  );
};

export default CreatePartForm;
