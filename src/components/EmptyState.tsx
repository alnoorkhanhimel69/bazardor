import Link from "next/link";

type EmptyStateProps = {
  code?: string;
  title: string;
  message: string;
};

/** 404-style message used for unknown routes, invalid slugs and empty categories. */
export default function EmptyState({ code = "৪০৪", title, message }: EmptyStateProps) {
  return (
    <div className="surface mx-auto flex max-w-xl flex-col items-center px-6 py-14 text-center">
      <span aria-hidden className="text-5xl">
        🧺
      </span>
      <p className="mt-4 text-5xl font-extrabold text-primary">{code}</p>
      <h1 className="mt-3 text-xl font-bold">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">{message}</p>
      <Link href="/" className="btn btn-primary mt-6 font-semibold shadow-md">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
