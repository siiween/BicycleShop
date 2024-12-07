import { fetchOptionsByPartId } from '@/actions/optionsActions';
import { fetchPartById } from '@/actions/partsActions';
import PartOptions from '@/components/organisms/PartOptions';
import UpdatePartForm from '@/components/organisms/UpdatePartForm';

export default async function PartsAdminPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const { data: part } = await fetchPartById(id);
  const { data: options } = await fetchOptionsByPartId(id);

  return (
    <main className="flex flex-col min-h-screen gap-10">
      <div className="flex flex-col gap-3">
        <UpdatePartForm part={part} />
      </div>
      <div className="flex flex-col gap-3">
        <PartOptions options={options} partId={id} />
      </div>
    </main>
  );
}
