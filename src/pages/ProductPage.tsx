import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { Seo } from '../components/Seo';
import { useCart } from '../context/CartContext';
import { getProductBySlug } from '../lib/catalog';
import type { Product } from '../types';

type ProductPageProps = {
  products: Product[];
};

export function ProductPage({ products }: ProductPageProps) {
  const { slug } = useParams();
  const product = getProductBySlug(products, slug);
  const { addItem, getQuantity } = useCart();

  const [variantIndex, setVariantIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const selectedVariant = product?.variants[variantIndex];
  const currentImage = selectedVariant?.images[imageIndex] ?? '';
  const cartQuantity = product && selectedVariant
    ? getQuantity(product.id, selectedVariant.id)
    : 0;

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const relatedProducts = products
    .filter(
      (entry) =>
        entry.id !== product.id && entry.subcategory === product.subcategory,
    )
    .slice(0, 3);

  function updateVariant(nextIndex: number) {
    setVariantIndex(nextIndex);
    setImageIndex(0);
  }

  function handleAddToCart() {
    if (!selectedVariant) {
      return;
    }

    addItem(product.id, selectedVariant.id);
  }

  return (
    <>
      <Seo
        title={`${product.name} | Latta Kapada`}
        description={product.description}
        image={currentImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <Link
          to="/shop"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-gold-deep)]"
        >
          <ChevronLeft className="size-4" />
          Back to Shop
        </Link>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[36px] border border-[var(--border-soft)] bg-white p-6 shadow-[0_20px_60px_rgba(25,23,18,0.06)] md:p-8">
            <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#f7f3ea_0%,#efebe2_100%)]">
              <img
                src={currentImage}
                alt={product.name}
                className="aspect-square w-full object-contain p-8 md:p-10"
              />
              {selectedVariant && selectedVariant.images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setImageIndex(
                        (current) =>
                          (current - 1 + selectedVariant.images.length) %
                          selectedVariant.images.length,
                      )
                    }
                    className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90"
                    aria-label="Previous product image"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setImageIndex(
                        (current) => (current + 1) % selectedVariant.images.length,
                      )
                    }
                    className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90"
                    aria-label="Next product image"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </>
              ) : null}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {selectedVariant?.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setImageIndex(index)}
                  className={`overflow-hidden rounded-[22px] border p-2 ${
                    index === imageIndex
                      ? 'border-[var(--brand-gold)] bg-[var(--paper)]'
                      : 'border-[var(--border-soft)] bg-white'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} preview ${index + 1}`}
                    className="aspect-[4/3] w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-[var(--border-soft)] bg-white p-6 shadow-[0_20px_60px_rgba(25,23,18,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-gold-deep)]">
              {product.category} / {product.subcategory}
            </p>
            <h1 className="mt-3 font-display text-5xl text-[var(--ink)]">{product.name}</h1>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">{product.description}</p>

            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                Available Styles
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => updateVariant(index)}
                    className={`flex items-center gap-3 rounded-[24px] border px-4 py-4 text-left ${
                      index === variantIndex
                        ? 'border-[var(--brand-gold)] bg-[var(--paper)]'
                        : 'border-[var(--border-soft)] bg-white'
                    }`}
                  >
                    <span>
                      <span className="block font-semibold text-[var(--ink)]">
                        {variant.name}
                      </span>
                      <span className="text-sm text-[var(--muted)]">Product view</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--paper)] px-4 py-2 text-sm font-semibold text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {product.details.map((detail) => (
                <div
                  key={detail}
                  className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--paper)] px-4 py-4 text-sm leading-7 text-[var(--muted)]"
                >
                  {detail}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[var(--brand-gold)] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[var(--brand-gold-deep)]"
              >
                <ShoppingCart className="size-4" />
                Add to Cart
              </button>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-[var(--paper)] px-6 py-4 text-sm font-semibold text-[var(--ink)]"
              >
                Open Cart
              </Link>
            </div>

            {cartQuantity > 0 ? (
              <p className="mt-4 text-sm font-semibold text-[var(--brand-gold-deep)]">
                {cartQuantity} item{cartQuantity > 1 ? 's' : ''} already in cart
                for this variant.
              </p>
            ) : null}

          </div>
        </div>

        {relatedProducts.length ? (
          <div className="mt-12 rounded-[36px] border border-[var(--border-soft)] bg-white p-6 shadow-[0_20px_60px_rgba(25,23,18,0.06)] md:p-8">
            <h2 className="font-display text-4xl text-[var(--ink)]">Related Styles</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.slug}`}
                  className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--paper)] p-4 transition hover:border-[var(--brand-gold)]"
                >
                  <img
                    src={relatedProduct.variants[0].images[0]}
                    alt={relatedProduct.name}
                    className="aspect-[4/3] w-full rounded-[20px] bg-white object-contain p-4"
                  />
                  <h3 className="mt-4 font-display text-2xl text-[var(--ink)]">
                    {relatedProduct.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {relatedProduct.subcategory}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
