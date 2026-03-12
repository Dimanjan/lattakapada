import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { useCatalog } from './hooks/useCatalog';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { CartPage } from './pages/CartPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage';
import { ShopPage } from './pages/ShopPage';

function App() {
  const { products, loading, error } = useCatalog();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--canvas)] px-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-gold-deep)]">
            Loading catalog
          </p>
          <h1 className="mt-4 font-display text-5xl text-[var(--ink)]">Preparing the store</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--canvas)] px-4 text-center">
        <div className="rounded-[28px] border border-[var(--border-soft)] bg-white p-8">
          <h1 className="font-display text-4xl text-[var(--ink)]">Catalog unavailable</h1>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage products={products} />} />
        <Route path="/shop" element={<ShopPage products={products} />} />
        <Route path="/product/:slug" element={<ProductPage products={products} />} />
        <Route path="/cart" element={<CartPage products={products} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
