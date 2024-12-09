import { useState, useEffect, useCallback } from 'react';
import { openDB } from 'idb';

import { ShoppingCart } from '@/types/shoppingCart';
import { Option, Product } from '@/types/apiTypes';

const DB_NAME = 'ShoppingCartDB';
const STORE_NAME = 'cart';
const DB_VERSION = 1;

export const useShoppingCart = () => {
  const [cart, setCart] = useState<ShoppingCart>({ products: [] });

  const initDB = useCallback(async () => {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'configurationId' });
        }
      },
    });
    return db;
  }, []);

  const fetchCart = useCallback(async () => {
    const db = await initDB();
    const allItems = await db.getAll(STORE_NAME);
    setCart({ products: allItems });
  }, [initDB]);

  const addProduct = useCallback(
    async (product: Product, options: Option[]) => {
      const db = await initDB();
      const configurationId = Date.now();
      await db.put(STORE_NAME, { configurationId, product, options });
      await fetchCart();
    },
    [initDB, fetchCart]
  );

  const removeProduct = useCallback(
    async (configurationId: number) => {
      const db = await initDB();
      await db.delete(STORE_NAME, configurationId);
      const updatedItems = cart.products.filter(
        (item) => item.configurationId !== configurationId
      );
      setCart({ products: updatedItems });
    },
    [cart.products, initDB]
  );

  const clearCart = useCallback(async () => {
    const db = await initDB();
    await db.clear(STORE_NAME);
    setCart({ products: [] });
  }, [initDB]);

  const deleteDatabase = useCallback(async () => {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase(DB_NAME);

      request.onsuccess = () => {
        setCart({ products: [] });
        resolve();
      };

      request.onerror = (event) => {
        reject(new Error('Failed to delete database: ' + event));
      };

      request.onblocked = () => {
        reject(new Error('Database deletion blocked'));
      };
    });
  }, []);

  useEffect(() => {
    fetchCart().catch((error) => {
      console.error('Error fetching initial cart data: ', error);
    });
  }, [fetchCart]);

  return {
    cart,
    addProduct,
    removeProduct,
    clearCart,
    deleteDatabase,
  };
};
