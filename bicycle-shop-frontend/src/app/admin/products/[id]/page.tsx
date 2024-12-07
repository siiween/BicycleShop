import { fetchCategories } from '@/actions/categoriesActions';
import { fetchParts } from '@/actions/partsActions';
import {
  fetchPartsByProductId,
  fetchProductById,
} from '@/actions/productsActions';

import ProductParts from '@/components/organisms/ProductParts';
import UpdateProductForm from '@/components/organisms/UpdateProductForm';

export default async function ProductAdminPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const { data: product } = await fetchProductById(id);
  const { data: parts } = await fetchPartsByProductId(id);
  const { data: categories } = await fetchCategories();
  const { data: availableParts } = await fetchParts();

  return (
    <main className="flex flex-col min-h-screen gap-10">
      <div className="flex flex-col gap-3">
        <UpdateProductForm categories={categories} product={product} />
      </div>

      <div className="flex flex-col gap-3">
        <ProductParts
          parts={parts}
          availableParts={availableParts}
          productId={id}
        />
      </div>
    </main>
  );
}
