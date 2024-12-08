// components/organisms/SelectProductsByCategory.tsx
import Text from '@/components/atoms/Text';
import ProductCard from '@/components/molecules/ProductCard';
import { Category, Product } from '@/types/apiTypes';

export default function SelectProductsByCategory({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  return (
    <>
      {' '}
      <div className="border-b border-neutral-300 pb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          Select a {category.name} to configure it
        </Text>
        <Text size="lg" variant="muted" className="mt-2">
          {category.description}
        </Text>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            name={product.name}
            description={product.description}
            imageUrl={
              'https://images.cyclingfactory.be/GRIFNEROAD_image_1024x.png'
            }
            href={'/configurator/' + product.id}
          />
        ))}
      </div>
    </>
  );
}
