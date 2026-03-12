import { ChevronLeft, ChevronRight, Eye, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import type { Product } from '../types';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, getQuantity, setQuantity } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const gallery = product.variants.flatMap((variant) => variant.images);
  const totalInCart = product.variants.reduce(
    (total, variant) => total + getQuantity(product.id, variant.id),
    0,
  );

  function moveGallery(step: number) {
    setActiveImage((current) => (current + step + gallery.length) % gallery.length);
  }

  function handleAddToCart() {
    addItem(product.id, product.variants[0].id);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[var(--border-soft)] bg-white shadow-[0_20px_60px_rgba(25,23,18,0.06)]">
      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f3ea_0%,#efebe2_100%)]">
        <Link to={`/product/${product.slug}`} className="block">
          <img
            src={gallery[activeImage]}
            alt={product.name}
            loading="lazy"
            className="aspect-[4/4.2] w-full object-contain p-6 transition duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        {gallery.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => moveGallery(-1)}
              className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => moveGallery(1)}
              className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90"
              aria-label="Next image"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        ) : null}
        <div className="absolute left-5 top-5 rounded-full bg-[var(--brand-gold)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          {product.subcategory}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl text-[var(--ink)]">{product.name}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{product.overview}</p>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-3 text-sm text-[var(--muted)]">
          <span className="inline-flex items-center gap-1 font-semibold text-[var(--ink)]">
            <Star className="size-4 fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
            {product.rating}
          </span>
          <span>({product.reviews} reviews)</span>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-[var(--paper)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-gold-deep)]">
            {product.variants.length} style option{product.variants.length > 1 ? 's' : ''}
          </span>
        </div>
        {totalInCart > 0 ? (
          <div className="mb-4 rounded-[24px] border border-[var(--border-soft)] bg-[var(--paper)] p-4">
            <p className="mb-3 text-sm font-semibold text-[var(--ink)]">
              {totalInCart} item{totalInCart > 1 ? 's' : ''} in cart
            </p>
            <div className="grid grid-cols-[72px_1fr_72px] gap-3">
              <button
                type="button"
                onClick={() =>
                  setQuantity(
                    product.id,
                    product.variants[0].id,
                    Math.max(0, getQuantity(product.id, product.variants[0].id) - 1),
                  )
                }
                className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-xl font-semibold"
              >
                -
              </button>
              <div className="flex items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-white text-lg font-semibold">
                {getQuantity(product.id, product.variants[0].id)}
              </div>
              <button
                type="button"
                onClick={() => addItem(product.id, product.variants[0].id)}
                className="rounded-2xl bg-[var(--brand-gold)] px-4 py-3 text-xl font-semibold text-white"
              >
                +
              </button>
            </div>
            <Link
              to="/cart"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--brand-gold)] px-4 py-4 text-sm font-semibold text-white transition hover:bg-[var(--brand-gold-deep)]"
            >
              Proceed to Checkout
            </Link>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand-gold)] px-4 py-4 text-sm font-semibold text-white transition hover:bg-[var(--brand-gold-deep)]"
          >
            <ShoppingCart className="size-4" />
            Add to Cart
          </button>
        )}
        <Link
          to={`/product/${product.slug}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border-soft)] bg-[var(--paper)] px-4 py-4 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--brand-gold)]"
        >
          <Eye className="size-4" />
          View Details
        </Link>
      </div>
    </article>
  );
}
