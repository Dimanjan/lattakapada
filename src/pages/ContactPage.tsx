import { Facebook, Mail, Phone } from 'lucide-react';

import { Seo } from '../components/Seo';
import { siteConfig } from '../data/site';

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact | Latta Kapada"
        description="Reach Latta Kapada through phone or Facebook for product inquiries and orders."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[34px] border border-[var(--border-soft)] bg-white p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-gold-deep)]">
              Contact Store
            </p>
            <h1 className="mt-4 font-display text-5xl text-[var(--ink)]">Talk to Latta Kapada</h1>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              Use the numbers below for direct inquiries and order support, or follow
              the Facebook page linked in the footer.
            </p>
          </div>
          <div className="grid gap-4">
            {siteConfig.phoneNumbers.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="rounded-[28px] border border-[var(--border-soft)] bg-white p-6 shadow-[0_20px_60px_rgba(25,23,18,0.05)]"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--brand-gold-deep)]">
                  <Phone className="size-5" />
                </div>
                <p className="mt-4 text-3xl font-semibold text-[var(--ink)]">{phone}</p>
              </a>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-[28px] border border-[var(--border-soft)] bg-white p-6 shadow-[0_20px_60px_rgba(25,23,18,0.05)]"
            >
              <div className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--brand-gold-deep)]">
                <Mail className="size-5" />
              </div>
              <p className="mt-4 text-2xl font-semibold text-[var(--ink)]">{siteConfig.email}</p>
            </a>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-[28px] border border-[var(--border-soft)] bg-[var(--ink)] p-6 text-white shadow-[0_20px_60px_rgba(25,23,18,0.05)]"
            >
              <Facebook className="size-5 text-[var(--brand-gold-soft)]" />
              Visit Facebook Page
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
