import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Seo } from '../components/Seo';
import { useCart } from '../context/CartContext';
import type { CartItem, Product, Variant } from '../types';

type CartPageProps = {
  products: Product[];
};

type CheckoutState = {
  customerName: string;
  phoneNumber: string;
  email: string;
  address: string;
  notes: string;
};

type DetailedCartItem = CartItem & {
  product: Product;
  variant: Variant;
};

export function CartPage({ products }: CartPageProps) {
  const { items, setQuantity, removeItem, clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);
  const [checkout, setCheckout] = useState<CheckoutState>({
    customerName: '',
    phoneNumber: '',
    email: '',
    address: '',
    notes: '',
  });

  const detailedItems = items
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      const variant = product?.variants.find((entry) => entry.id === item.variantId);
      if (!product || !variant) {
        return null;
      }

      return {
        ...item,
        product,
        variant,
      };
    })
    .filter((item): item is DetailedCartItem => item !== null);

  function handleFieldChange(
    key: keyof CheckoutState,
    value: string,
  ) {
    setCheckout((current) => ({ ...current, [key]: value }));
  }

  function handleOrderSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!detailedItems.length) {
      return;
    }
    setOrdered(true);
    clearCart();
  }

  return (
    <>
      <Seo
        title="Cart | Latta Kapada"
        description="Review your cart, update quantities, and place an order through the frontend checkout form."
      />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-gold-deep)]">
              Checkout
            </p>
            <h1 className="mt-3 font-display text-6xl text-[var(--ink)]">Your Cart</h1>
          </div>
          <Link
            to="/shop"
            className="inline-flex rounded-2xl border border-[var(--border-soft)] bg-white px-6 py-4 text-sm font-semibold text-[var(--ink)]"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.9fr]">
          <div className="min-h-[520px] rounded-[30px] border border-[var(--border-soft)] bg-white p-6 shadow-[0_20px_60px_rgba(25,23,18,0.05)] md:p-8">
            {detailedItems.length ? (
              <div className="space-y-5">
                {detailedItems.map((item) => (
                  <article
                    key={`${item.product.id}-${item.variant.id}`}
                    className="grid gap-4 rounded-[24px] border border-[var(--border-soft)] bg-[var(--paper)] p-4 md:grid-cols-[140px_1fr]"
                  >
                    <img
                      src={item.variant.images[0]}
                      alt={item.product.name}
                      className="aspect-square w-full rounded-[22px] bg-white object-contain p-4"
                    />
                    <div className="flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h2 className="font-display text-3xl text-[var(--ink)]">
                              {item.product.name}
                            </h2>
                            <p className="mt-1 text-sm text-[var(--muted)]">
                              {item.variant.name}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                          {item.product.overview}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(
                              item.product.id,
                              item.variant.id,
                              Math.max(0, item.quantity - 1),
                            )
                          }
                          className="flex size-11 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-white text-lg font-semibold"
                        >
                          -
                        </button>
                        <div className="flex h-11 min-w-14 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-white px-4 font-semibold">
                          {item.quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(item.product.id, item.variant.id, item.quantity + 1)
                          }
                          className="flex size-11 items-center justify-center rounded-2xl bg-[var(--brand-gold)] text-lg font-semibold text-white"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id, item.variant.id)}
                          className="ml-auto rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm font-semibold text-[var(--muted)]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex h-full min-h-[420px] flex-col justify-center rounded-[24px] border border-dashed border-[var(--border-soft)] px-8 text-left">
                <p className="text-2xl text-[var(--muted)]">Your cart is currently empty.</p>
                <p className="mt-3 max-w-lg text-sm leading-7 text-[var(--muted)]">
                  Browse the collection, open any product page, and add items to build your order.
                </p>
              </div>
            )}
          </div>

          <form
            onSubmit={handleOrderSubmit}
            className="rounded-[30px] border border-[var(--border-soft)] bg-white p-6 shadow-[0_20px_60px_rgba(25,23,18,0.05)] md:p-8"
          >
            <h2 className="font-display text-4xl text-[var(--ink)]">Checkout Details</h2>
            <p className="mt-4 text-xl text-[var(--muted)]">
              Items in order: <span className="font-semibold text-[var(--ink)]">{detailedItems.length}</span>
            </p>
            <div className="mt-6 grid gap-4">
              <Field
                placeholder="Customer Name *"
                value={checkout.customerName}
                onChange={(value) => handleFieldChange('customerName', value)}
                required
              />
              <Field
                placeholder="Phone Number *"
                value={checkout.phoneNumber}
                onChange={(value) => handleFieldChange('phoneNumber', value)}
                required
              />
              <Field
                placeholder="Email (optional)"
                value={checkout.email}
                onChange={(value) => handleFieldChange('email', value)}
              />
              <TextAreaField
                placeholder="Delivery Address *"
                value={checkout.address}
                onChange={(value) => handleFieldChange('address', value)}
                required
              />
              <TextAreaField
                placeholder="Notes (optional)"
                value={checkout.notes}
                onChange={(value) => handleFieldChange('notes', value)}
              />
            </div>
            <button
              type="submit"
              disabled={!detailedItems.length}
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--brand-gold)] px-6 py-5 text-lg font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Place Order
            </button>
            {ordered ? (
              <p className="mt-4 rounded-2xl bg-[var(--paper)] px-4 py-4 text-sm leading-7 text-[var(--ink)]">
                Order placed in the sample frontend flow. Connect this form to your
                backend or WhatsApp handler when you are ready.
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </>
  );
}

type FieldProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

function Field({ placeholder, value, onChange, required }: FieldProps) {
  return (
    <input
      required={required}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-16 rounded-2xl border border-[var(--border-soft)] bg-[var(--paper)] px-5 text-lg outline-none transition focus:border-[var(--brand-gold)]"
    />
  );
}

function TextAreaField({ placeholder, value, onChange, required }: FieldProps) {
  return (
    <textarea
      required={required}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={4}
      className="rounded-2xl border border-[var(--border-soft)] bg-[var(--paper)] px-5 py-4 text-lg outline-none transition focus:border-[var(--brand-gold)]"
    />
  );
}
