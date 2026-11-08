"use client";

import { useState } from "react";
import { useSignOut } from "@/lib/use-sign-out";

export default function SignOutButton() {
  const signOut = useSignOut();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await signOut();
        setLoading(false);
      }}
      className="btn btn-sm sm:btn-md btn-outline btn-error font-semibold"
    >
      {loading ? <span className="loading loading-spinner loading-xs" /> : <span aria-hidden>↩</span>}
      সাইন আউট
    </button>
  );
}
