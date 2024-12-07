import Text from '@/components/atoms/Text';
import { Option } from '@/types/storeTypes';
import Button from '@/components/atoms/Button';

export default function ForbiddenCombinationCard({
  name,
  options,
}: {
  name: string;
  options: { id: number; option: Option }[];
}) {
  return (
    <div className="p-5 items-center gap-5 w-full transition-all bg-neutral-100 rounded-lg border border-neutral-300 h-fit">
      <Text
        as="h3"
        size="lg"
        variant="primary"
        className="font-semibold text-left mb-5"
      >
        {name}
      </Text>

      <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-neutral-300">
        {options.map((option) => (
          <div
            key={option.id}
            className="bg-white rounded-lg border border-neutral-300 p-3 h-fit flex items-center justify-center"
          >
            <Text
              as="p"
              size="sm"
              variant="primary"
              className="semibold text-center"
            >
              {option.option.name}
            </Text>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-end mt-5 pt-5 border-t border-neutral-300">
        <Button variant="outline">Delete</Button>
      </div>
    </div>
  );
}
