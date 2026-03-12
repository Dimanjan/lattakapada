import { useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { Seo } from '../components/Seo';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { isLoggedIn, login } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const redirect = params.get('redirect') ?? '/shop';
  const productHint = params.get('product');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (isLoggedIn) {
    return <Navigate to={redirect} replace />;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login(name, email);
    navigate(redirect, { replace: true });
  }

  return (
    <>
      <Seo
        title="Login | Latta Kapada"
        description="Login before adding items to the cart in the Latta Kapada storefront."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 rounded-[36px] border border-[var(--border-soft)] bg-white p-6 shadow-[0_30px_90px_rgba(25,23,18,0.06)] md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div className="rounded-[28px] bg-[var(--ink)] p-8 text-white">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-gold-soft)]">
              Secure Cart Access
            </p>
            <h1 className="mt-4 font-display text-5xl">
              Login before adding items to the cart.
            </h1>
            <p className="mt-5 text-sm leading-7 text-white/70">
              This sample store uses a frontend-only login state so cart actions
              remain gated until the customer signs in.
            </p>
            {productHint ? (
              <p className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/80">
                You were trying to add <span className="font-semibold">{productHint}</span>.
              </p>
            ) : null}
          </div>
          <form onSubmit={handleSubmit} className="rounded-[28px] bg-[var(--paper)] p-6 md:p-8">
            <h2 className="font-display text-4xl text-[var(--ink)]">Customer Login</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Use any sample name and email to unlock cart actions in this demo.
            </p>
            <div className="mt-8 grid gap-4">
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="h-16 rounded-2xl border border-[var(--border-soft)] bg-white px-5 text-lg outline-none transition focus:border-[var(--brand-gold)]"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="h-16 rounded-2xl border border-[var(--border-soft)] bg-white px-5 text-lg outline-none transition focus:border-[var(--brand-gold)]"
              />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--brand-gold)] px-6 py-5 text-lg font-semibold text-white"
            >
              Login and Continue
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
