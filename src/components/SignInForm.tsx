"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { EMAIL_PATTERN, authErrorMessage, safeRedirect } from "@/lib/auth-helpers";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sent here by the route guard: explain why.
  useEffect(() => {
    if (params.get("reason") === "auth") {
      toast.error("এই পৃষ্ঠা দেখতে আগে সাইন ইন করুন", { id: "auth-required" });
    }
  }, [params]);

  // Already signed in? Nothing to do on this page.
  useEffect(() => {
    if (session) router.replace(redirectTo);
  }, [session, router, redirectTo]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      const message = "সঠিক ইমেইল ঠিকানা দিন";
      setError(message);
      toast.error(message);
      return;
    }
    if (password.length < 8) {
      const message = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    const { error: authError } = await authClient.signIn.email({
      email: trimmedEmail,
      password,
    });
    setLoading(false);

    if (authError) {
      const message = authErrorMessage(authError, "সাইন ইন করা যায়নি, আবার চেষ্টা করুন");
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          সাইন ইন
        </button>
      </form>

      <SocialButtons redirectTo={redirectTo} />

      <p className="mt-5 text-center text-sm text-muted">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
