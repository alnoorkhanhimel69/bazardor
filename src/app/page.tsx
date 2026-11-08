import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductGrid, { ProductGridSkeleton } from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { toBn, topFallers, topRisers } from "@/lib/format";

function SectionHeading({
  title,
  subtitle,
  marker,
  markerClass,
}: {
  title: string;
  subtitle?: string;
  marker?: string;
  markerClass?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        {marker && (
          <span aria-hidden className={`text-sm ${markerClass}`}>
            {marker}
          </span>
        )}
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}

async function HomeSections() {
  const products = await getProducts();
  const risers = topRisers(products);
  const fallers = topFallers(products);

  return (
    <>
      <section>
        <SectionHeading title="আজ দাম বেড়েছে" marker="▲" markerClass="text-rise" />
        <ProductGrid products={risers} />
      </section>

      <section>
        <SectionHeading title="আজ দাম কমেছে" marker="▼" markerClass="text-fall" />
        <ProductGrid products={fallers} />
      </section>

      <section id="সব-পণ্য" className="scroll-mt-4">
        <SectionHeading
          title="সব পণ্য"
          subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        />
        <ProductGrid products={products} />
      </section>
    </>
  );
}

function HomeSkeleton() {
  return (
    <>
      {["আজ দাম বেড়েছে", "আজ দাম কমেছে"].map((t) => (
        <section key={t}>
          <h2 className="mb-4 text-xl font-bold">{t}</h2>
          <ProductGridSkeleton />
        </section>
      ))}
      <section id="সব-পণ্য" className="scroll-mt-4">
        <h2 className="mb-4 text-xl font-bold">সব পণ্য</h2>
        <ProductGridSkeleton count={9} />
      </section>
    </>
  );
}

export default function HomePage() {
  return (
    <div className="page-container space-y-10 py-6">
      <Hero />
      <Suspense fallback={<HomeSkeleton />}>
        <HomeSections />
      </Suspense>
    </div>
  );
}
