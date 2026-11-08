import type { Metadata } from "next";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "পৃষ্ঠাটি পাওয়া যায়নি" };

export default function NotFound() {
  return (
    <div className="page-container py-12">
      <EmptyState
        title="পৃষ্ঠাটি খুঁজে পাওয়া যায়নি"
        message="আপনি যে পৃষ্ঠা বা পণ্যটি খুঁজছেন সেটি নেই, অথবা ঠিকানাটি ভুল হতে পারে।"
      />
    </div>
  );
}
