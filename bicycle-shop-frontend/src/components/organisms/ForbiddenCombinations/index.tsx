import Link from 'next/link';

import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ForbiddenCombinationCard from '@/components/molecules/ForbiddenCombinationCard';
import { ForbiddenCombination } from '@/types/apiTypes';

interface ForbiddenCombinationsProps {
  forbiddenCombinations: ForbiddenCombination[];
}
const ForbiddenCombinations: React.FC<ForbiddenCombinationsProps> = ({
  forbiddenCombinations,
}) => {
  return (
    <>
      <div className="flex flex-row justify-between mb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          All the Forbidden combinations
        </Text>
        <Link href="/admin/forbidden-combinations/create">
          <Button className="">Add a combination</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {forbiddenCombinations.map((combination: ForbiddenCombination) => (
          <ForbiddenCombinationCard
            key={combination.id}
            name={combination.name}
            options={combination.forbiddenCombinationOptions}
            id={combination.id}
          />
        ))}
        {forbiddenCombinations.length === 0 && (
          <Text as="p" size="lg" variant="muted">
            No forbidden combinations in the shop
          </Text>
        )}
      </div>
    </>
  );
};

export default ForbiddenCombinations;
