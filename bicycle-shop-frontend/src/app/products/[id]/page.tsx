import { fetchProductsByCategory } from '@/actions/productsActions';
import Text from '@/components/atoms/Text';
import ProductCard from '@/components/molecules/ProductCard';
import { Product } from '@/types/apiTypes';

export default async function ProductsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: products } = await fetchProductsByCategory(parseInt(id));

  return (
    <main className="flex flex-col gap-5 ">
      <div className="border-b border-neutral-300 pb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          Select a product to configure it
        </Text>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            imageUrl={
              'https://images.cyclingfactory.be/GRIFNEROAD_image_1024x.png'
            }
            href={'/configurator/' + product.id}
          />
        ))}
      </div>
    </main>
  );
}
