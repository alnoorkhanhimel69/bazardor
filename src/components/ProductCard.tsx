import Link from "next/link";
import { changeMeta, formatAmount, perUnit } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const change = changeMeta(product.change);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="surface group block p-4 transition-colors hover:border-primary/50"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl"
        >
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-snug">{product.nameBn}</h3>
          <p className="text-xs text-muted">{perUnit(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-lg font-bold">
            {formatAmount(product.today)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <span
          className={`${change.className} rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap`}
        >
          {change.icon} {change.text}
        </span>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="surface p-4" aria-hidden>
      <div className="flex items-center gap-3">
        <div className="skeleton size-11 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-5 w-24" />
        </div>
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}
