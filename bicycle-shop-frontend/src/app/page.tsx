import { fetchCategories } from '@/actions/categoriesActions';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { Category } from '@/types/apiTypes';
import Link from 'next/link';

export default async function Home() {
  const { data: categories } = await fetchCategories();

  return (
    <div className="flex flex-col items-center text-center justify-center gap-10">
      <Text
        as="h1"
        size="4xl"
        variant="primary"
        className="font-bold text-center mt-20"
      >
        Welcome to Marcus bicycle shop. <br />
        Here you can configure your own bike
      </Text>

      <div className="flex flex-row gap-3 ">
        {categories.map((category: Category) => (
          <Link href={'/products/' + category.id} key={category.id}>
            <Button name="Configure bike" size="lg">
              Configure a {category.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
