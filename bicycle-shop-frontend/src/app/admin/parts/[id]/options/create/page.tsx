import { fetchPartById } from '@/actions/partsActions';
import Text from '@/components/atoms/Text';
import CreateOptionForm from '@/components/organisms/CreateOptionForm';

export default async function CreateOptionAdmin({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const { data: part } = await fetchPartById(id);

  return (
    <main className="flex flex-col gap-5 min-h-screen">
      <div className="border-b border-neutral-300 pb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          Create a new option for {part.name} part
        </Text>
      </div>
      <CreateOptionForm partId={part.id} />
    </main>
  );
}
