import Text from '@/components/atoms/Text';

export default async function OptionsAdminPage() {
  return (
    <main className="flex flex-col gap-5 min-h-screen">
      <div className="border-b border-neutral-300 pb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          This is the page of a part
        </Text>
      </div>
      hola hola
    </main>
  );
}
