import {
  fetchPartsByProductId,
  fetchProductById,
} from '@/actions/productsActions';
import Text from '@/components/atoms/Text';
import Configurator from '@/components/organisms/Configurator';

export default async function ConfiguratorPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const { data: product } = await fetchProductById(id);
  const { data: parts } = await fetchPartsByProductId(id);

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
