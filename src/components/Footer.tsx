import { Facebook, Mail, Phone, Store } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { siteConfig } from '../data/site';
import { Logo } from './Logo';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Cart', to: '/cart' },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_0.8fr_1fr] md:px-6">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">
            Discover everyday cargo pants, neat formal trousers, relaxed half
            pants, and utility styles designed for comfort, movement, and easy
            daily wear.
          </p>
          <div className="flex flex-wrap gap-3">
            {siteConfig.phoneNumbers.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white px-4 py-2 text-sm"
              >
                <Phone className="size-4 text-[var(--brand-gold-deep)]" />
                {phone}
              </a>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white px-4 py-2 text-sm"
            >
              <Mail className="size-4 text-[var(--brand-gold-deep)]" />
              {siteConfig.email}
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl text-[var(--ink)]">Navigation</h2>
          <div className="mt-5 grid gap-3">
            {footerLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm text-[var(--muted)] transition hover:text-[var(--brand-gold-deep)]"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <h2 className="font-display text-2xl text-[var(--ink)]">Store Contact</h2>
          <div className="space-y-4 text-sm text-[var(--muted)]">
            <p className="inline-flex items-center gap-2">
              <Store className="size-4 text-[var(--brand-gold-deep)]" />
              {siteConfig.address}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2"
            >
              <Mail className="size-4 text-[var(--brand-gold-deep)]" />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <Facebook className="size-4 text-[var(--brand-gold-deep)]" />
              Facebook Page
            </a>
            <p>{siteConfig.shippingNote}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border-soft)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 text-xs uppercase tracking-[0.2em] text-[var(--muted)] md:px-6">
          <span>Latta Kapada</span>
          <a
            href="https://sajedar.com"
            className="transition hover:text-[var(--brand-gold-deep)]"
          >
            Powered by sajedar.com
          </a>
        </div>
      </div>
    </footer>
  );
}
