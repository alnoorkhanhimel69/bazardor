import { getProducts } from "@/lib/api";
import { changeMeta, formatAmount, unitName } from "@/lib/format";
import type { Product } from "@/lib/types";

function TickerItem({ product }: { product: Product }) {
  const change = changeMeta(product.change);
  const tone =
    product.change.dir === "up"
      ? "text-rise"
      : product.change.dir === "down"
        ? "text-fall"
        : "text-flat";

  return (
    <li className="flex shrink-0 items-center gap-2 border-r border-base-300 px-5 py-2.5 text-sm whitespace-nowrap">
      <span aria-hidden>{product.image}</span>
      <span className="font-semibold">{product.nameBn}</span>
      <span className="text-muted">
        {formatAmount(product.today)} টাকা/{unitName(product.unit)}
      </span>
      <span className={`font-bold ${tone}`}>
        {change.icon} {change.text}
      </span>
    </li>
  );
}

/** Infinite price strip: the list is rendered twice and slid by exactly half its width. */
export default async function PriceTicker() {
  const products = await getProducts().catch(() => []);
  if (products.length === 0) return null;

  return (
    <section
      aria-label="আজকের দামের তালিকা"
      className="ticker overflow-hidden border-y border-base-300 bg-base-100"
    >
      <div className="ticker-track">
        <ul className="flex">
          {products.map((p) => (
            <TickerItem key={p.id} product={p} />
          ))}
        </ul>
        <ul className="flex" aria-hidden>
          {products.map((p) => (
            <TickerItem key={`copy-${p.id}`} product={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PriceTickerSkeleton() {
  return (
    <div className="border-y border-base-300 bg-base-100 py-2.5" aria-hidden>
      <div className="skeleton mx-4 h-5 rounded-md" />
    </div>
  );
}
