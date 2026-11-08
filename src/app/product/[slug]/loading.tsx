export default function ProductLoading() {
  return (
    <div className="page-container space-y-5 py-6" role="status" aria-label="লোড হচ্ছে">
      <div className="skeleton h-4 w-56" />
      <div className="surface flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="skeleton size-20 rounded-2xl" />
          <div className="space-y-3">
            <div className="skeleton h-8 w-52" />
            <div className="skeleton h-4 w-40" />
          </div>
        </div>
        <div className="skeleton h-28 w-44 rounded-2xl" />
      </div>
      <div className="surface space-y-4 p-6">
        <div className="skeleton h-5 w-36" />
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-24 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="surface space-y-3 p-6">
        <div className="skeleton h-5 w-48" />
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="skeleton h-8 w-full" />
        ))}
      </div>
    </div>
  );
}
