import { fetchPartsByProductId } from '@/actions/partsActions';
import { fetchProductById } from '@/actions/productsActions';
import Text from '@/components/atoms/Text';
import Configurator from '@/components/organisms/Configurator';

export default async function ConfiguratorPage({
  params,
}: {
  params: { productId: number };
}) {
  const { productId } = await params;
  const { data: product } = await fetchProductById(productId);
  const { data: parts } = await fetchPartsByProductId(productId);

  return (
    <main className="flex flex-col gap-5 min-h-screen">
      <div className="border-b border-neutral-300 pb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          Configurating {product.name}
        </Text>
      </div>
      <Configurator initialParts={parts} product={product} />
    </main>
  );
}
