"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-helpers";

type Provider = "google" | "github";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.8V6.5H1.4a12 12 0 0 0 0 11l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.5l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

/** Google / GitHub sign-in. The same call signs in existing users and registers new ones. */
export default function SocialButtons({ redirectTo = "/" }: { redirectTo?: string }) {
  const [pending, setPending] = useState<Provider | null>(null);

  async function handleSocial(provider: Provider) {
    setPending(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: redirectTo,
      newUserCallbackURL: redirectTo,
    });
    // On success the browser is redirected to the provider, so we only handle failures here.
    if (error) {
      toast.error(authErrorMessage(error, "সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন"));
      setPending(null);
    }
  }

  return (
    <>
      <div className="divider my-5 text-xs text-muted">অথবা</div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSocial("google")}
          disabled={pending !== null}
          className="btn btn-sm sm:btn-md bg-base-100 font-medium"
        >
          {pending === "google" ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <GoogleIcon />
          )}
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          onClick={() => handleSocial("github")}
          disabled={pending !== null}
          className="btn btn-sm sm:btn-md bg-base-100 font-medium"
        >
          {pending === "github" ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <GitHubIcon />
          )}
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </>
  );
}
