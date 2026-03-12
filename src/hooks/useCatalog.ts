import { useEffect, useState } from 'react';

import type { CatalogState, Product } from '../types';

export function useCatalog() {
  const [state, setState] = useState<CatalogState>({
    products: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const response = await fetch('/products.json');

        if (!response.ok) {
          throw new Error('Unable to load product catalog.');
        }

        const products = (await response.json()) as Product[];

        if (active) {
          setState({
            products,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (active) {
          setState({
            products: [],
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : 'Unable to load product catalog.',
          });
        }
      }
    }

    void loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return state;
}
