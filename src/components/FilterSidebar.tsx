import { RotateCcw } from 'lucide-react';

type FilterSidebarProps = {
  categories: string[];
  subcategories: string[];
  activeCategory: string;
  activeSubcategory: string;
  onCategoryChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
  onReset: () => void;
};

export function FilterSidebar({
  categories,
  subcategories,
  activeCategory,
  activeSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  onReset,
}: FilterSidebarProps) {
  return (
    <aside className="rounded-[28px] border border-[var(--border-soft)] bg-white p-6 shadow-[0_20px_60px_rgba(25,23,18,0.05)]">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-4xl text-[var(--ink)]">Filters</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Browse by category and product type.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-soft)] px-4 py-3 text-sm font-semibold text-[var(--brand-gold-deep)]"
        >
          <RotateCcw className="size-4" />
          Reset
        </button>
      </div>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Categories
          </h3>
          <div className="mt-4 grid gap-3">
            <FilterChoice
              label="All Categories"
              active={!activeCategory}
              onClick={() => onCategoryChange('')}
            />
            {categories.map((category) => (
              <FilterChoice
                key={category}
                label={category}
                active={activeCategory === category}
                onClick={() => onCategoryChange(category)}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Subcategories
          </h3>
          <div className="mt-4 grid gap-3">
            <FilterChoice
              label="All Subcategories"
              active={!activeSubcategory}
              onClick={() => onSubcategoryChange('')}
            />
            {subcategories.map((subcategory) => (
              <FilterChoice
                key={subcategory}
                label={subcategory}
                active={activeSubcategory === subcategory}
                onClick={() => onSubcategoryChange(subcategory)}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

type FilterChoiceProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterChoice({ label, active, onClick }: FilterChoiceProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
        active
          ? 'border-[var(--brand-gold)] bg-[var(--paper)] text-[var(--ink)]'
          : 'border-[var(--border-soft)] bg-white text-[var(--muted)] hover:border-[var(--brand-gold)]'
      }`}
    >
      <span
        className={`size-3 rounded-full ${active ? 'bg-[var(--brand-gold)]' : 'bg-[var(--border-soft)]'}`}
      />
      {label}
    </button>
  );
}
