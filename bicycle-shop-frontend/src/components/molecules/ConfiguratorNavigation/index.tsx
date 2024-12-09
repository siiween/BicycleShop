import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { validateOptionsCombinations } from '@/actions/forbiddenCombinationsActions';
import Button from '@/components/atoms/Button';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { Option, Part, Product } from '@/types/apiTypes';

interface ConfiguratorNavigationProps {
  previousStep: () => void;
  nextStep: () => void;
  currentStep: number;
  parts: Part[];
  selectedOptions: Record<number, Option>;
  currentPart: Part;
  product: Product;
}

const ConfiguratorNavigation: React.FC<ConfiguratorNavigationProps> = ({
  previousStep,
  nextStep,
  currentStep,
  parts,
  selectedOptions,
  currentPart,
  product,
}) => {
  const { addProduct } = useShoppingCart();
  const { reset } = useConfiguratorStore();
  const router = useRouter();

  const addToCart = async () => {
    try {
      const { success, message } = await validateOptionsCombinations(
        selectedOptions,
        product.id
      );
      if (!success) {
        toast.error(message);
        return;
      } else {
        await addProduct(product, Object.values(selectedOptions));
        toast.success('Product added to cart');
        router.push('/');
        reset();
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to add product to cart');
    }
  };

  return (
    <div className="flex justify-between w-full mt-6">
      <Button
        onClick={previousStep}
        variant="outline"
        disabled={currentStep === 0}
      >
        <ArrowLeftIcon className="h-4 w-4 text-black" /> Previous
      </Button>
      {currentStep === parts.length - 1 ? (
        <Button
          onClick={addToCart}
          disabled={!selectedOptions[currentPart.id]?.id}
        >
          Add to the cart
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={nextStep}
          disabled={!selectedOptions[currentPart.id]?.id}
        >
          Next
          <ArrowRightIcon className="h-4 w-4 text-black" />
        </Button>
      )}
    </div>
  );
};

export default ConfiguratorNavigation;
