import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { startTransition, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../data/site';
import { Logo } from './Logo';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams();
      if (search.trim()) {
        params.set('search', search.trim());
      }
      navigate(`/shop?${params.toString()}`);
      setMobileOpen(false);
    });
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[rgba(248,245,239,0.9)] backdrop-blur-md">
      <div className="border-b border-[var(--border-soft)] bg-[var(--ink)] text-[13px] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-6">
          <p className="hidden md:block">
            Premium bottoms collection with quick inquiry support.
          </p>
          <div className="flex items-center gap-3">
            <a href={`tel:${siteConfig.phoneNumbers[0]}`}>{siteConfig.phoneNumbers[0]}</a>
            <span className="text-white/30">|</span>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <span className="text-white/30">|</span>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--brand-gold-soft)]"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between gap-4 py-4">
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive
                      ? 'text-[var(--brand-gold-deep)]'
                      : 'text-[var(--ink)] hover:text-[var(--brand-gold-deep)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <form
              onSubmit={handleSearchSubmit}
              className="flex h-12 items-center rounded-full border border-[var(--border-soft)] bg-white px-4 shadow-sm"
            >
              <Search className="mr-2 size-4 text-[var(--muted)]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search cargo, formal, half pant..."
                className="w-72 border-0 bg-transparent text-sm outline-none"
                aria-label="Search products"
              />
            </form>
            <NavLink
              to="/cart"
              className="flex items-center gap-3 rounded-full border border-[var(--brand-gold)] bg-white px-5 py-3 text-sm font-semibold text-[var(--ink)] shadow-sm"
            >
              <ShoppingCart className="size-4 text-[var(--brand-gold-deep)]" />
              Cart
              <span className="flex size-7 items-center justify-center rounded-full bg-[var(--brand-gold)] text-xs text-white">
                {itemCount}
              </span>
            </NavLink>
            {user ? (
              <button
                type="button"
                onClick={logout}
                className="text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--ink)]"
              >
                Logout
              </button>
            ) : null}
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
        {mobileOpen ? (
          <div className="space-y-4 border-t border-[var(--border-soft)] pb-4 pt-4 lg:hidden">
            <form
              onSubmit={handleSearchSubmit}
              className="flex h-12 items-center rounded-full border border-[var(--border-soft)] bg-white px-4 shadow-sm"
            >
              <Search className="mr-2 size-4 text-[var(--muted)]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search the store"
                className="w-full border-0 bg-transparent text-sm outline-none"
                aria-label="Search products"
              />
            </form>
            <div className="grid gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMobile}
                  className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm font-semibold text-[var(--ink)]"
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/cart"
                onClick={closeMobile}
                className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm font-semibold text-[var(--ink)]"
              >
                Cart ({itemCount})
              </NavLink>
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMobile();
                  }}
                  className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-left text-sm font-semibold text-[var(--ink)]"
                >
                  Logout
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
