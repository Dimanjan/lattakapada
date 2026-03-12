import { useDeferredValue, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FilterSidebar } from '../components/FilterSidebar';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { getCategories, getSubcategories, matchesProduct } from '../lib/catalog';
import type { Product } from '../types';

type ShopPageProps = {
  products: Product[];
};

export function ShopPage({ products }: ShopPageProps) {
  const [params, setParams] = useSearchParams();
  const search = params.get('search') ?? '';
  const category = params.get('category') ?? '';
  const subcategory = params.get('subcategory') ?? '';
  const deferredSearch = useDeferredValue(search);

  const categories = useMemo(() => getCategories(products), [products]);
  const subcategories = useMemo(
    () => getSubcategories(products, category || undefined),
    [category, products],
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const categoryMatch = !category || product.category === category;
        const subcategoryMatch = !subcategory || product.subcategory === subcategory;
        return categoryMatch && subcategoryMatch && matchesProduct(product, deferredSearch);
      }),
    [category, deferredSearch, products, subcategory],
  );

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    if (key === 'category' && !value) {
      next.delete('subcategory');
    }
    setParams(next);
  }

  function handleCategoryChange(value: string) {
    const next = new URLSearchParams(params);
    if (value) {
      next.set('category', value);
    } else {
      next.delete('category');
    }
    next.delete('subcategory');
    setParams(next);
  }

  function resetFilters() {
    setParams(search ? { search } : {});
  }

  return (
    <>
      <Seo
        title="Shop | Latta Kapada"
        description="Search and browse the Latta Kapada clothing catalog by category, subcategory, and product family."
      />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-gold-deep)]">
            Shop Collection
          </p>
          <h1 className="mt-3 font-display text-5xl text-[var(--ink)]">
            Search-ready store catalog
          </h1>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            Products are organized into category, subcategory, and product family
            levels, with grouped image sliders for styles that share the same base name.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
          <FilterSidebar
            categories={categories}
            subcategories={subcategories}
            activeCategory={category}
            activeSubcategory={subcategory}
            onCategoryChange={handleCategoryChange}
            onSubcategoryChange={(value) => updateParam('subcategory', value)}
            onReset={resetFilters}
          />

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-[var(--border-soft)] bg-white px-6 py-5">
              <div>
                <p className="text-sm text-[var(--muted)]">
                  Showing {filteredProducts.length} product family
                  {filteredProducts.length === 1 ? '' : 'ies'}
                  {search ? ` for "${search}"` : ''}
                </p>
              </div>
              <div className="text-sm font-semibold text-[var(--brand-gold-deep)]">
                {category || 'All Categories'} / {subcategory || 'All Subcategories'}
              </div>
            </div>

            {filteredProducts.length ? (
              <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-[var(--border-soft)] bg-white px-6 py-14 text-center">
                <h2 className="font-display text-4xl text-[var(--ink)]">No products found</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Try a different search term or clear the category filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
