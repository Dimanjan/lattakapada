import { Seo } from '../components/Seo';

export function AboutPage() {
  return (
    <>
      <Seo
        title="About | Latta Kapada"
        description="Learn about the Latta Kapada storefront and the organized online shopping experience."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
        <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[34px] bg-[var(--ink)] p-8 text-white">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-gold-soft)]">
              About Latta Kapada
            </p>
            <h1 className="mt-4 font-display text-6xl">Professional, frontend-first shopping.</h1>
          </div>
          <div className="rounded-[34px] border border-[var(--border-soft)] bg-white p-8">
            <p className="text-base leading-8 text-[var(--muted)]">
              This store is structured as a modern React and TypeScript storefront
              with Tailwind styling, organized product JSON, grouped product families,
              and a clean cart flow. Categories, subcategories, detail pages, and the
              footer and header navigation are all wired for a complete frontend demo.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
