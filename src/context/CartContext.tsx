import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import type { CartItem } from '../types';

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addItem: (productId: string, variantId: string) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clearCart: () => void;
  getQuantity: (productId: string, variantId: string) => number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const storageKey = 'latta-kapada-cart';

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      addItem(productId, variantId) {
        setItems((current) => {
          const existing = current.find(
            (item) =>
              item.productId === productId && item.variantId === variantId,
          );

          if (existing) {
            return current.map((item) =>
              item.productId === productId && item.variantId === variantId
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }

          return [...current, { productId, variantId, quantity: 1 }];
        });
      },
      setQuantity(productId, variantId, quantity) {
        setItems((current) =>
          current
            .map((item) =>
              item.productId === productId && item.variantId === variantId
                ? { ...item, quantity }
                : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      removeItem(productId, variantId) {
        setItems((current) =>
          current.filter(
            (item) =>
              item.productId !== productId || item.variantId !== variantId,
          ),
        );
      },
      clearCart() {
        setItems([]);
      },
      getQuantity(productId, variantId) {
        return (
          items.find(
            (item) =>
              item.productId === productId && item.variantId === variantId,
          )?.quantity ?? 0
        );
      },
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
