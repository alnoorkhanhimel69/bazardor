import Link from "next/link";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="page-container py-10 sm:py-14">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
      </div>
      <div className="surface mx-auto mt-6 max-w-md p-5 sm:p-6">{children}</div>
      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/" className="hover:text-primary">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
