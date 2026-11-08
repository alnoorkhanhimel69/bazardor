"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { EMAIL_PATTERN, authErrorMessage } from "@/lib/auth-helpers";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function fail(message: string) {
    setError(message);
    toast.error(message);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const name = form.name.trim();
    const email = form.email.trim();

    if (name.length < 2) return fail("আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)");
    if (!EMAIL_PATTERN.test(email)) return fail("সঠিক ইমেইল ঠিকানা দিন");
    if (form.password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (form.password !== form.confirm) return fail("দুটি পাসওয়ার্ড মিলছে না");

    setLoading(true);
    const { error: authError } = await authClient.signUp.email({
      name,
      email,
      password: form.password,
    });
    setLoading(false);

    if (authError) {
      fail(authErrorMessage(authError, "অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন"));
      return;
    }

    // BetterAuth signs new users in automatically (so a duplicate email returns a clear
    // error). The assignment sends them to the sign-in page, so end that session first.
    await authClient.signOut();

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            নাম
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="যেমন: রহিম উদ্দিন"
            value={form.name}
            onChange={update("name")}
            className="input w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={update("email")}
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
            autoComplete="new-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            value={form.password}
            onChange={update("password")}
            className="input w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="আবার লিখুন"
            value={form.confirm}
            onChange={update("confirm")}
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
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>

      <SocialButtons redirectTo="/" />

      <p className="mt-5 text-center text-sm text-muted">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}
