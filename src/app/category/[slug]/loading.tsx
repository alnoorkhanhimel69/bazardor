import { ProductGridSkeleton } from "@/components/ProductGrid";

export default function CategoryLoading() {
  return (
    <div className="page-container space-y-4 py-6" role="status" aria-label="লোড হচ্ছে">
      <div className="surface flex items-center gap-4 p-5 sm:p-6">
        <div className="skeleton size-14 rounded-2xl" />
        <div className="space-y-2">
          <div className="skeleton h-6 w-32" />
          <div className="skeleton h-4 w-48" />
        </div>
      </div>
      <div className="surface flex items-center justify-end px-4 py-3">
        <div className="skeleton h-8 w-44 rounded-lg" />
      </div>
      <ProductGridSkeleton count={6} />
    </div>
  );
}
