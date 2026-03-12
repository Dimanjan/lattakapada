import { Search, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { siteConfig } from '../data/site';
import { getPrimaryImage } from '../lib/catalog';
import type { Product } from '../types';

type HomePageProps = {
  products: Product[];
};

export function HomePage({ products }: HomePageProps) {
  const heroProduct = products.find((product) => product.hero) ?? products[0];
  const featuredProducts = products.filter((product) => product.featured);
  const collectionCards = products.slice(0, 4);

  return (
    <>
      <Seo
        title={siteConfig.title}
        description={siteConfig.description}
        image={getPrimaryImage(heroProduct)}
      />
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-6 md:px-6 md:pb-14 md:pt-10">
        <div className="overflow-hidden rounded-[36px] border border-[var(--border-soft)] bg-[radial-gradient(circle_at_top_left,#efe4b0,transparent_34%),linear-gradient(135deg,#f7f3ea_10%,#fffdf8_56%,#ece6dd_100%)] p-8 shadow-[0_30px_90px_rgba(25,23,18,0.08)] md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-[var(--border-soft)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-gold-deep)]">
                Everyday Collection
              </p>
              <h1 className="max-w-xl font-display text-5xl leading-[0.95] tracking-tight text-[var(--ink)] md:text-7xl">
                Modern bottoms collection for everyday style.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-8 text-[var(--muted)]">
                Explore cargo pants, formal pants, denim half pants, and utility
                styles arranged into clear product groups with multiple color
                options.
              </p>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <FeatureChip
                  icon={<Search className="size-4" />}
                  label="Easy search"
                />
                <FeatureChip
                  icon={<ShieldCheck className="size-4" />}
                  label="Quick add to cart"
                />
                <FeatureChip
                  icon={<Truck className="size-4" />}
                  label="Color options"
                />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -right-10 top-10 hidden h-44 w-44 rounded-full bg-[var(--brand-gold)]/20 blur-3xl md:block" />
              <video
                src="/homepage_video.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
                className="relative ml-auto h-[620px] w-full rounded-[34px] object-cover shadow-[0_30px_90px_rgba(25,23,18,0.1)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-gold-deep)]">
              Featured Products
            </p>
            <h2 className="mt-3 font-display text-5xl text-[var(--ink)]">
              Browse the latest Latta Kapada collection
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden rounded-full border border-[var(--border-soft)] bg-white px-5 py-3 text-sm font-semibold text-[var(--ink)] md:inline-flex"
          >
            View All
          </Link>
        </div>
        <div className="grid gap-6 xl:grid-cols-4 md:grid-cols-2">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 md:pb-18">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {collectionCards.map((product, index) => (
            <div
              key={product.id}
              className={`overflow-hidden rounded-[28px] border border-[var(--border-soft)] p-6 ${
                index % 2 === 0 ? 'bg-white' : 'bg-[var(--paper)]'
              }`}
            >
              <img
                src={getPrimaryImage(product)}
                alt={product.name}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-[24px] bg-white object-contain p-5"
              />
              <p className="mt-5 text-xs uppercase tracking-[0.24em] text-[var(--brand-gold-deep)]">
                {product.subcategory}
              </p>
              <h3 className="mt-2 font-display text-3xl text-[var(--ink)]">{product.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{product.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

type FeatureChipProps = {
  icon: React.ReactNode;
  label: string;
};

function FeatureChip({ icon, label }: FeatureChipProps) {
  return (
    <div className="inline-flex min-h-16 items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-4 text-sm font-semibold text-[var(--ink)] shadow-sm">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--brand-gold-deep)]">
        {icon}
      </span>
      <span className="leading-5">{label}</span>
    </div>
  );
}
