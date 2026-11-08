"use client";

import { useMemo, useState } from "react";
import EmptyState from "./EmptyState";
import ProductGrid from "./ProductGrid";
import { sortProducts, toBn } from "@/lib/format";
import type { Product, SortMode } from "@/lib/types";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortMode>("default");
  // Sorting uses the numeric `today` price, so Bengali display digits never matter.
  const visible = useMemo(() => sortProducts(products, sort), [products, sort]);

  if (products.length === 0) {
    return (
      <EmptyState
        code="০"
        title="এই ধরনে কোনো পণ্য নেই"
        message="এখনো এই বিভাগে কোনো পণ্যের দাম যোগ করা হয়নি। অন্য বিভাগ দেখুন বা হোম পেজে ফিরে যান।"
      />
    );
  }

  return (
    <>
      <div className="surface flex items-center justify-end gap-3 px-4 py-3 sm:px-6">
        <label htmlFor="sort" className="text-sm text-muted">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortMode)}
          className="select select-sm w-auto min-w-40 font-medium"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-muted" aria-live="polite">
        মোট {toBn(visible.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <ProductGrid products={visible} />
    </>
  );
}
