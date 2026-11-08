import Link from "next/link";
import { getCategories } from "@/lib/api";
import AuthMenu from "./AuthMenu";
import BanglaDate from "./BanglaDate";
import NavLinks from "./NavLinks";

export default async function Navbar() {
  // A failed API call should not take the whole site down — show the bar without links.
  const categories = await getCategories().catch(() => []);

  return (
    <header className="bg-base-100">
      <div className="page-container flex items-center justify-between gap-3 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="বাজার দর — হোম">
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-xl shadow-sm"
          >
            🛒
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-lg font-bold">বাজার দর</span>
            <BanglaDate className="block truncate text-[11px] text-muted" />
          </span>
        </Link>
        <AuthMenu />
      </div>
      <NavLinks categories={categories} />
    </header>
  );
}
