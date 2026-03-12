import { Link } from 'react-router-dom';

import { Seo } from '../components/Seo';

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found | Latta Kapada"
        description="The requested page could not be found in the Latta Kapada storefront."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 text-center md:px-6">
        <h1 className="font-display text-7xl text-[var(--ink)]">404</h1>
        <p className="mt-4 text-base leading-8 text-[var(--muted)]">
          This page does not exist. Return to the store catalog.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-[var(--brand-gold)] px-6 py-4 text-sm font-semibold text-white"
        >
          Go Home
        </Link>
      </section>
    </>
  );
}
