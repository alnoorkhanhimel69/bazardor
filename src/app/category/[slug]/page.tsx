import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategory, getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug).catch(() => null);
  return { title: category ? category.nameBn : "পৃষ্ঠাটি পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = await getCategory(slug);
  if (!category) notFound();

  const products = await getProducts(category.id);

  return (
    <div className="page-container space-y-4 py-6">
      <header className="surface flex items-center gap-4 p-5 sm:p-6">
        <span
          aria-hidden
          className="grid size-14 shrink-0 place-items-center rounded-2xl bg-base-200 text-3xl"
        >
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-muted">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      <CategoryProducts products={products} />
    </div>
  );
}
