import type { Metadata } from "next";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");

  return (
    <div className="page-container py-8">
      <div className="mx-auto max-w-2xl space-y-4">
        <header>
          <h1 className="text-2xl font-extrabold">আমার প্রোফাইল</h1>
          <p className="text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </header>

        <section className="surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar name={user.name} image={user.image} className="size-16" />
            <div className="min-w-0">
              <p className="truncate text-xl font-semibold">{user.name}</p>
              <p className="truncate text-sm text-muted">{user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </section>

        <section className="surface space-y-4 p-5">
          <h2 className="font-bold">তথ্য</h2>

          <div>
            <label htmlFor="profile-name" className="mb-1.5 block text-sm font-medium">
              নাম
            </label>
            <input id="profile-name" readOnly value={user.name} className="input w-full" />
          </div>
          <div>
            <label htmlFor="profile-email" className="mb-1.5 block text-sm font-medium">
              ইমেইল
            </label>
            <input id="profile-email" readOnly value={user.email} className="input w-full" />
          </div>

          <Link href="/profile/update" className="btn btn-primary w-full font-semibold shadow-md">
            আপডেট
          </Link>
        </section>
      </div>
    </div>
  );
}
