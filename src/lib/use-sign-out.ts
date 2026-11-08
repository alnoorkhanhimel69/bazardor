"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "./auth-client";

/** Signs the user out, shows a toast and returns them to the home page. */
export function useSignOut() {
  const router = useRouter();

  return async function signOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };
}
