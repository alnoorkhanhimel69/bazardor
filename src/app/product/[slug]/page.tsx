import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import {
  changeMeta,
  formatAmount,
  formatTaka,
  marketAverage,
  perUnit,
  summarizeMarkets,
  unitName,
} from "@/lib/format";
import { requireSession } from "@/lib/session";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  return { title: product ? product.nameBn : "পৃষ্ঠাটি পাওয়া যায়নি" };
}

function changeSentence(dir: "up" | "down" | "flat", diff: number) {
  if (dir === "flat") {
    return (
      <>
        গতকালের তুলনায় আজ দাম <strong>অপরিবর্তিত</strong>
      </>
    );
  }
  return (
    <>
      গতকালের তুলনায় আজ দাম <strong>{dir === "up" ? "বেড়েছে" : "কমেছে"}</strong> ·{" "}
      {formatAmount(diff)} টাকা
    </>
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Protected route: price details are for signed-in users only.
  await requireSession(`/product/${slug}`);

  const change = changeMeta(product.change);
  const summary = summarizeMarkets(product.markets);
  const diff = Math.abs(product.today - product.yesterday);

  const history = [
    { label: "আজ", value: product.today },
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="page-container space-y-5 py-6">
      <nav aria-label="breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary">
              হোম
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li>
            <Link href={`/category/${product.category}`} className="hover:text-primary">
              {product.categoryNameBn}
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li aria-current="page" className="font-medium text-base-content">
            {product.nameBn}
          </li>
        </ol>
      </nav>

      {/* Top summary */}
      <section className="surface flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4">
          <span
            aria-hidden
            className="grid size-16 shrink-0 place-items-center rounded-2xl bg-base-200 text-4xl sm:size-20 sm:text-5xl"
          >
            {product.image}
          </span>
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">{product.nameBn}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <Link
                href={`/category/${product.category}`}
                className="rounded-full bg-secondary px-2.5 py-1 font-semibold text-secondary-content hover:bg-primary/15"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
              <span className="rounded-full bg-base-200 px-2.5 py-1 font-medium text-muted">
                {perUnit(product.unit)}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">{changeSentence(product.change.dir, diff)}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-base-200 px-8 py-4 text-center sm:min-w-44">
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-4xl font-extrabold">{formatAmount(product.today)}</p>
          <p className="text-sm text-muted">টাকা / {unitName(product.unit)}</p>
          <span
            className={`${change.className} mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-bold`}
          >
            {change.icon} {change.text}
          </span>
        </div>
      </section>

      {/* Price summary */}
      {summary && (
        <section className="surface p-5 sm:p-6">
          <h2 className="text-lg font-bold">দামের সারসংক্ষেপ</h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-base-300 p-4">
              <p className="text-xs text-muted">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-2xl font-extrabold text-fall">
                {formatAmount(summary.min)}{" "}
                <span className="text-sm font-semibold">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-muted">সবচেয়ে কম দামের বাজার</p>
            </div>
            <div className="rounded-xl border border-base-300 p-4">
              <p className="text-xs text-muted">সর্বাধিক দাম</p>
              <p className="mt-1 text-2xl font-extrabold text-rise">
                {formatAmount(summary.max)}{" "}
                <span className="text-sm font-semibold">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-muted">সবচেয়ে বেশি দামের বাজার</p>
            </div>
            <div className="rounded-xl border border-base-300 p-4">
              <p className="text-xs text-muted">গড় দাম</p>
              <p className="mt-1 text-2xl font-extrabold">
                {formatAmount(summary.avg)}{" "}
                <span className="text-sm font-semibold">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-muted">{perUnit(product.unit)}-এর হিসাব</p>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-base-300 pt-4 text-sm sm:grid-cols-4">
            {history.map((h) => (
              <div key={h.label}>
                <dt className="text-xs text-muted">{h.label}</dt>
                <dd className="font-semibold">{formatTaka(h.value)}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Market-wise prices */}
      {summary && (
        <section className="surface p-5 sm:p-6">
          <h2 className="text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-base-300">
            <table className="table min-w-[34rem]">
              <thead>
                <tr className="text-muted">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বাধিক</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {summary.sorted.map((m) => (
                  <tr key={`${m.market}-${m.division}`} className="border-base-300">
                    <td className="font-medium">{m.market}</td>
                    <td className="text-muted">{m.division}</td>
                    <td className="text-right">{formatTaka(m.min)}</td>
                    <td className="text-right">{formatTaka(m.max)}</td>
                    <td className="text-right font-bold">{formatTaka(marketAverage(m))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
