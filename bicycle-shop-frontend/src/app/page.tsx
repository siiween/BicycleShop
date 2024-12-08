import { fetchCategories } from '@/actions/categoriesActions';
import { fetchProductsByCategory } from '@/actions/productsActions';
import Text from '@/components/atoms/Text';
import SelectProductsByCategory from '@/components/organisms/SelectProductsByCategory';
import { Category } from '@/types/apiTypes';

async function fetchProducts(categoryId: number) {
  const { data: products } = await fetchProductsByCategory(categoryId);
  return products;
}

export default async function Home() {
  const { data: categories } = await fetchCategories();

  const categoriesWithProducts = await Promise.all(
    categories.map(async (category: Category) => {
      const products = await fetchProducts(category.id);
      return { category, products };
    })
  );

  return (
    <div className="flex flex-col gap-10">
      {categoriesWithProducts.map(({ category, products }) => (
        <div key={category.id} className="flex flex-col gap-5">
          <SelectProductsByCategory category={category} products={products} />
        </div>
      ))}
    </div>
  );
}
