import {
  fetchDependentPrices,
  fetchOptionsById,
} from '@/actions/optionsActions';
import { fetchParts } from '@/actions/partsActions';
import DependentPricesAdmin from '@/components/organisms/DependentPricesAdmin';
import UpdateOptionForm from '@/components/organisms/UpdateOptionForm';

export default async function CreateOptionAdmin({
  params,
}: {
  params: { optionId: number };
}) {
  const { optionId } = await params;
  const { data: option } = await fetchOptionsById(optionId);
  const { data: dependentPrices } = await fetchDependentPrices(optionId);
  const { data: parts } = await fetchParts();

  return (
    <main className="flex flex-col min-h-screen gap-10">
      <div className="flex flex-col gap-3">
        <UpdateOptionForm option={option} />
      </div>

      <div className="flex flex-col gap-3">
        <DependentPricesAdmin
          dependentPrices={dependentPrices}
          option={option}
          parts={parts}
        />
      </div>
    </main>
  );
}
