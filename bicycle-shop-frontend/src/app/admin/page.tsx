import { fetchForbbidenCombinations } from '@/actions/forbiddenCombinationsActions';
import { fetchParts } from '@/actions/partsActions';
import { fetchProducts } from '@/actions/productsActions';
import AdminParts from '@/components/organisms/AdminParts';
import AdminProducts from '@/components/organisms/AdminProducts';
import ForbiddenCombinations from '@/components/organisms/ForbiddenCombinations';

export default async function ProductsAdminPage() {
  const { data: products } = await fetchProducts();
  const { data: parts } = await fetchParts();
  const { data: forbiddenCombinations } = await fetchForbbidenCombinations();

  return (
    <main className="flex flex-col gap-10 min-h-screen">
      <div>
        <AdminProducts products={products} />
      </div>
      <div>
        <AdminParts parts={parts} />
      </div>

      <div>
        <ForbiddenCombinations forbiddenCombinations={forbiddenCombinations} />
      </div>
    </main>
  );
}
