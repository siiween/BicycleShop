import { fetchCategories } from '@/actions/categoriesActions';
import Text from '@/components/atoms/Text';
import CreateProductForm from '@/components/organisms/CreateProductForm';

export default async function CreateProductAdmin() {
  const { data: categories } = await fetchCategories();

  return (
    <main className="flex flex-col gap-5 min-h-screen">
      <div className="border-b border-neutral-300 pb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          Create a new product
        </Text>
      </div>
      <CreateProductForm categories={categories} />
    </main>
  );
}
