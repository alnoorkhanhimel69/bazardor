"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-helpers";

export default function UpdateProfileForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const trimmed = name.trim();
    if (trimmed.length < 2) {
      const message = "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
      setError(message);
      toast.error(message);
      return;
    }
    if (trimmed === currentName) {
      toast("নামে কোনো পরিবর্তন করা হয়নি");
      return;
    }

    setLoading(true);
    // BetterAuth: https://better-auth.com/docs/concepts/users-accounts#update-user
    const { error: updateError } = await authClient.updateUser({ name: trimmed });
    setLoading(false);

    if (updateError) {
      const message = authErrorMessage(updateError, "তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          নাম
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম লিখুন"
          className="input w-full"
          required
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn btn-primary w-full font-semibold shadow-md">
        {loading && <span className="loading loading-spinner loading-sm" />}
        তথ্য আপডেট করুন
      </button>
      <Link href="/profile" className="btn btn-ghost w-full font-medium">
        বাতিল করুন
      </Link>
    </form>
  );
}
