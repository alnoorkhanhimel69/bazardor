"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#17261c",
          color: "#f3f7f2",
          borderRadius: "12px",
          fontSize: "14px",
        },
        success: { iconTheme: { primary: "#34c27a", secondary: "#17261c" } },
        error: { iconTheme: { primary: "#ff6b6b", secondary: "#17261c" } },
      }}
    />
  );
}
