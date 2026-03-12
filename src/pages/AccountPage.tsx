import { Seo } from '../components/Seo';
import { useAuth } from '../context/AuthContext';

export function AccountPage() {
  const { user } = useAuth();

  return (
    <>
      <Seo
        title="Account | Latta Kapada"
        description="View the current sample login state for the Latta Kapada storefront."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-3xl rounded-[34px] border border-[var(--border-soft)] bg-white p-8 shadow-[0_20px_60px_rgba(25,23,18,0.05)]">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-gold-deep)]">
            Account
          </p>
          <h1 className="mt-4 font-display text-5xl text-[var(--ink)]">Logged-in customer</h1>
          <div className="mt-6 space-y-3 rounded-[24px] bg-[var(--paper)] p-6">
            <p className="text-lg text-[var(--muted)]">
              Name: <span className="font-semibold text-[var(--ink)]">{user?.name ?? 'Guest'}</span>
            </p>
            <p className="text-lg text-[var(--muted)]">
              Email: <span className="font-semibold text-[var(--ink)]">{user?.email ?? 'Not logged in'}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
