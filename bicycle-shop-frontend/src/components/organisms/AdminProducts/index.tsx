import Link from 'next/link';

import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ProductAdminCard from '@/components/molecules/ProductAdminCard';
import { Product } from '@/types/apiTypes';

interface AdminProductsProps {
  products: Product[];
}

const AdminProducts: React.FC<AdminProductsProps> = ({ products }) => {
  return (
    <>
      <div className="flex md:flex-row flex-col gap-3 justify-between mb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          All the products in the shop
        </Text>
        <Link href="/admin/products/create">
          <Button className="">Add Product</Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {products.map((product: Product) => (
          <ProductAdminCard
            key={product.id}
            name={product.name}
            category={product.category.name}
            description={product.description}
            href={'/admin/products/' + product.id}
            imageUrl={product.image_url}
          />
        ))}
      </div>
    </>
  );
};

export default AdminProducts;
