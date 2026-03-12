import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link
      className="inline-flex items-center gap-3"
      to="/"
      aria-label="Latta Kapada home"
    >
      <div className="rounded-2xl border border-[var(--border-soft)] bg-white px-3 py-2 shadow-sm">
        <div className="font-display text-2xl leading-none tracking-tight text-[var(--ink)]">
          लत्ता
        </div>
        <div className="-mt-1 font-display text-2xl leading-none tracking-tight text-[var(--brand-gold)]">
          कपडा
        </div>
      </div>
      <div>
        <div className="font-display text-xl text-[var(--ink)]">Latta Kapada</div>
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
          Everyday Menswear Store
        </div>
      </div>
    </Link>
  );
}
