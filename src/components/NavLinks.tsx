"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function NavLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="পণ্যের ধরন" className="border-t border-base-300/70">
      <ul className="page-container no-scrollbar flex items-center gap-1 overflow-x-auto py-2">
        {categories.map((c) => {
          const active = pathname === `/category/${c.slug}`;
          return (
            <li key={c.id} className="shrink-0">
              <Link
                href={`/category/${c.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary text-primary-content shadow-sm"
                    : "text-base-content hover:bg-secondary"
                }`}
              >
                <span aria-hidden className="text-base leading-none">
                  {c.icon}
                </span>
                {c.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
