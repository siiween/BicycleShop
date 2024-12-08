'use client';

import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ProductCartCard from '@/components/molecules/ProductCartCard';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { cart, clearCart, removeProduct } = useShoppingCart();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-20">
      <div className="bg-white w-96 h-full flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-neutral-300">
          <Text as="h2" size="xl" className="font-bold">
            Your cart
          </Text>
          <Button onClick={onClose} variant="transparent">
            <XMarkIcon className="h-6 w-6 text-black" />
          </Button>
        </div>
        <div className="grow overflow-y-scroll flex flex-col gap-0 divide-y-4">
          {cart.products.length === 0 ? (
            <Text className="p-5">Your cart is empty</Text>
          ) : (
            cart.products.map((product) => (
              <ProductCartCard
                removeProduct={removeProduct}
                key={product.configurationId}
                product={product}
              />
            ))
          )}
        </div>
        <div className="p-5 border-t border-neutral-300 flex-shrink-0 flex gap-5">
          <Button className="w-full" variant="outline" onClick={clearCart}>
            Clear cart
          </Button>
          <Button className="w-full">Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
