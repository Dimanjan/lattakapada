import type { Product } from '../types';

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getPrimaryImage(product: Product) {
  return product.variants[0]?.images[0] ?? '';
}

export function matchesProduct(product: Product, term: string) {
  const search = term.trim().toLowerCase();
  if (!search) {
    return true;
  }

  const haystack = [
    product.name,
    product.category,
    product.subcategory,
    product.overview,
    product.description,
    ...product.searchTerms,
    ...product.tags,
    ...product.variants.map((variant) => variant.name),
    ...product.variants.map((variant) => variant.color),
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(search);
}

export function getCategories(products: Product[]) {
  return Array.from(new Set(products.map((product) => product.category)));
}

export function getSubcategories(products: Product[], category?: string) {
  return Array.from(
    new Set(
      products
        .filter((product) => !category || product.category === category)
        .map((product) => product.subcategory),
    ),
  );
}

export function getProductBySlug(products: Product[], slug?: string) {
  return products.find((product) => product.slug === slug);
}
