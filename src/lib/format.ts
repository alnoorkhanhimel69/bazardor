import type { MarketPrice, Product, SortMode } from "./types";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Replace every English digit with its Bengali form: "1,850" -> "১,৮৫০". */
export const toBn = (value: number | string): string =>
  String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

/** Whole numbers stay whole ("৬২"), fractions get two places ("৬৩.৫০"). */
export function formatAmount(n: number): string {
  if (Number.isInteger(n)) {
    return toBn(new Intl.NumberFormat("en-US").format(n));
  }
  return toBn(
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n),
  );
}

export const formatTaka = (n: number): string => `${formatAmount(n)} টাকা`;

export const formatPercent = (pct: number): string =>
  `${toBn(Math.abs(pct).toFixed(1))}%`;

const UNIT_NAMES: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitName = (unit: string): string => UNIT_NAMES[unit] ?? unit;
export const perUnit = (unit: string): string => `প্রতি ${unitName(unit)}`;

export function changeMeta(change: Product["change"]) {
  if (change.dir === "up") {
    return { icon: "▲", text: formatPercent(change.pct), className: "badge-rise" };
  }
  if (change.dir === "down") {
    return { icon: "▼", text: formatPercent(change.pct), className: "badge-fall" };
  }
  return { icon: "—", text: "০.০%", className: "badge-flat" };
}

/** e.g. "মঙ্গলবার, ৬ অক্টোবর, ২০২৬" (Dhaka time). */
export function banglaDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`;
}

/* ---------- product helpers ---------- */

export const topRisers = (products: Product[], count = 6): Product[] =>
  products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, count);

export const topFallers = (products: Product[], count = 6): Product[] =>
  products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, count);

/** Sorts on the numeric price, never on the Bengali display string. */
export function sortProducts(products: Product[], mode: SortMode): Product[] {
  const list = [...products];
  if (mode === "price-asc") return list.sort((a, b) => a.today - b.today);
  if (mode === "price-desc") return list.sort((a, b) => b.today - a.today);
  return list;
}

export const marketAverage = (m: MarketPrice): number => (m.min + m.max) / 2;

export function summarizeMarkets(markets: MarketPrice[]) {
  if (markets.length === 0) return null;
  const min = Math.min(...markets.map((m) => m.min));
  const max = Math.max(...markets.map((m) => m.max));
  const avg = Math.round(
    markets.reduce((sum, m) => sum + marketAverage(m), 0) / markets.length,
  );
  const sorted = [...markets].sort((a, b) => marketAverage(a) - marketAverage(b));
  return { min, max, avg, sorted };
}
