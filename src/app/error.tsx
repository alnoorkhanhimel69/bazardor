"use client";

import Link from "next/link";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="page-container py-12">
      <div className="surface mx-auto flex max-w-xl flex-col items-center px-6 py-14 text-center">
        <span aria-hidden className="text-5xl">
          ⚠️
        </span>
        <h1 className="mt-4 text-xl font-bold">দামের তথ্য লোড করা যায়নি</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          সার্ভারের সাথে যোগাযোগ করতে সমস্যা হচ্ছে। কিছুক্ষণ পর আবার চেষ্টা করুন।
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn btn-primary font-semibold">
            আবার চেষ্টা করুন
          </button>
          <Link href="/" className="btn font-medium">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
