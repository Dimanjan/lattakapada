export type Variant = {
  id: string;
  name: string;
  color: string;
  images: string[];
  swatch: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  featured: boolean;
  hero: boolean;
  searchTerms: string[];
  tags: string[];
  overview: string;
  description: string;
  details: string[];
  variants: Variant[];
};

export type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type CatalogState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

export type AuthUser = {
  name: string;
  email: string;
};
