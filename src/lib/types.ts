export type ChangeDirection = "up" | "down" | "flat";

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: ChangeDirection; pct: number };
  markets: MarketPrice[];
}

export type SortMode = "default" | "price-asc" | "price-desc";
