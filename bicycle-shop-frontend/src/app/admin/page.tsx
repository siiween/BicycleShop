import { fetchParts } from '@/actions/partsActions';
import { fetchProducts } from '@/actions/productsActions';
import AdminParts from '@/components/organisms/AdminParts';
import AdminProducts from '@/components/organisms/AdminProducts';
import { Suspense } from 'react';

export default async function ProductsAdminPage() {
  const { data: products } = await fetchProducts();
  const { data: parts } = await fetchParts();

  return (
    <main className="flex flex-col gap-10 min-h-screen">
      <div className="">
        <AdminProducts products={products} />
      </div>
      <div className="">
        <AdminParts parts={parts} />
      </div>
    </main>
  );
}
