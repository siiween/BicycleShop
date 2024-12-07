import Text from '@/components/atoms/Text';

export default function OptionMiniCard({
  partName,
  name,
}: {
  partName: string;
  name: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-neutral-300 p-3 h-fit flex flex-col">
      <Text as="p" size="sm" variant="primary" className="font-bold">
        {partName}
      </Text>
      <Text as="p" size="xs" variant="muted" className="font-semibold">
        {name}
      </Text>
    </div>
  );
}
