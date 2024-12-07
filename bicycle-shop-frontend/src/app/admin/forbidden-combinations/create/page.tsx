import { fetchParts } from '@/actions/partsActions';
import Text from '@/components/atoms/Text';
import CreateForbiddenCombinationForm from '@/components/organisms/CreateForbiddenCombinationForm';

export default async function CreateForbiddenCombinationPage() {
  const { data: parts } = await fetchParts();
  return (
    <main className="flex flex-col gap-5 min-h-screen">
      <div className="border-b border-neutral-300 pb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          Create a new forbidden combination
        </Text>
      </div>
      <CreateForbiddenCombinationForm parts={parts} />
    </main>
  );
}
