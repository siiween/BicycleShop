import Text from '@/components/atoms/Text';
import CreatePartForm from '@/components/organisms/CreatePartForm';

export default async function CreatePartAdmin() {
  return (
    <main className="flex flex-col gap-5 min-h-screen">
      <div className="border-b border-neutral-300 pb-5">
        <Text as="h1" size="3xl" variant="primary" className="font-bold">
          Create a new part
        </Text>
      </div>
      <CreatePartForm />
    </main>
  );
}
