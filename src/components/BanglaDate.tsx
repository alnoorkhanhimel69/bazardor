"use client";

import { useSyncExternalStore } from "react";
import { banglaDate } from "@/lib/format";

const subscribe = () => () => {};

/**
 * Today's date in Bangla. It is read in the browser so a cached page never
 * shows yesterday's date; the server render leaves a blank placeholder.
 */
export default function BanglaDate({ className }: { className?: string }) {
  const text = useSyncExternalStore(subscribe, () => banglaDate(), () => "");
  return (
    <span className={className} suppressHydrationWarning>
      {text || "\u00A0"}
    </span>
  );
}
