import Text from '@/components/atoms/Text';
import ProductCard from '@/components/molecules/ProductCard';
import { Category, Product } from '@/types/apiTypes';

interface SelectProductsByCategoryProps {
  category: Category;
  products: Product[];
}

const SelectProductsByCategory: React.FC<SelectProductsByCategoryProps> = ({
  category,
  products,
}) => {
  return (
    <>
      <div className="border-b border-neutral-300 pb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          Select {category.name} to configure it
        </Text>
        <Text size="lg" variant="muted" className="mt-2">
          {category.description}
        </Text>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            name={product.name}
            description={product.description}
            imageUrl={product.image_url}
            href={'/configurator/' + product.id}
          />
        ))}
      </div>
    </>
  );
};

export default SelectProductsByCategory;
