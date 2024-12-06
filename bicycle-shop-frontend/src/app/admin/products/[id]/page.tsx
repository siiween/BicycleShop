import { fetchCategories } from '@/actions/categoriesActions';
import {
  fetchPartsByProductId,
  fetchProductById,
} from '@/actions/productsActions';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ProductParts from '@/components/organisms/ProductParts';
import UpdateProductForm from '@/components/organisms/UpdateProductForm';
import { Part } from '@/types/apiTypes';
import Link from 'next/link';

export default async function ProductAdminPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const { data: product } = await fetchProductById(id);
  const { data: parts } = await fetchPartsByProductId(id);
  const { data: categories } = await fetchCategories();

  return (
    <main className="flex flex-col min-h-screen gap-10">
      <div className="flex flex-col gap-3">
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
            <Button variant="outline">Delete</Button>
          </div>
        </div>

        <UpdateProductForm categories={categories} product={product} />
      </div>

      <ProductParts parts={parts} />
    </main>
  );
}
