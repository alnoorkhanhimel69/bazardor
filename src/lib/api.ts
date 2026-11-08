import type { Category, Product } from "./types";

/**
 * Public BazarDor API.
 * Endpoints used:
 *   GET /categories               -> navbar + category cards
 *   GET /categories/:id           -> category page header / slug validation
 *   GET /products                 -> home page, ticker, product lookup by slug
 *   GET /products?category=:id    -> category page list
 *   GET /products/:id             -> product detail page
 */
const API_BASE = (
  process.env.API_BASE_URL ?? "https://api.api-store.workers.dev/api/bazardor"
).replace(/\/$/, "");

/** Prices change daily, so a short cache keeps pages fast without going stale. */
const REVALIDATE_SECONDS = 300;

async function request<T>(path: string): Promise<T | null> {
  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  // Unknown ids / slugs are a normal "not found", not a crash.
  if (res.status >= 400 && res.status < 500) return null;
  if (!res.ok) throw new Error(`API request failed (${res.status}): ${path}`);

  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  const data = await request<Category[]>("/categories");
  return Array.isArray(data) ? data : [];
}

export async function getCategory(id: string): Promise<Category | null> {
  const data = await request<Category>(`/categories/${encodeURIComponent(id)}`);
  return data && typeof data.nameBn === "string" ? data : null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const data = await request<Product[]>(`/products${query}`);
  return Array.isArray(data) ? data : [];
}

export async function getProduct(id: number | string): Promise<Product | null> {
  const data = await request<Product>(`/products/${encodeURIComponent(String(id))}`);
  return data && typeof data.nameBn === "string" ? data : null;
}

/** Detail pages use readable slugs, the API looks products up by numeric id. */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  const match = all.find((p) => p.slug === slug || String(p.id) === slug);
  if (!match) return null;
  return (await getProduct(match.id)) ?? match;
}
