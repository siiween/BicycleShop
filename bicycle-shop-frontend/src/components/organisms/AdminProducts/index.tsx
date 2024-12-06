import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ProductAdminCard from '@/components/molecules/ProductAdminCard';
import { Product } from '@/types/apiTypes';
import Link from 'next/link';

export default function AdminProducts({ products }: { products: Product[] }) {
  return (
    <>
      <div className="flex flex-row justify-between mb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          All the products in the shop
        </Text>
        <Link href="/admin/products/create">
          <Button className="">Add Product</Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {products.map((product: Product) => (
          <ProductAdminCard
            key={product.id}
            name={product.name}
            category={product.category.name}
            description={product.description}
            href={'/admin/products/' + product.id}
          />
        ))}
      </div>
    </>
  );
}
