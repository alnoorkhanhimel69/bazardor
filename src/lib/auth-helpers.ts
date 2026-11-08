/** Only allow same-site relative paths as a post-login destination. */
export function safeRedirect(path: string | null | undefined, fallback = "/"): string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return fallback;
  return path;
}

type AuthError = { code?: string; message?: string; status?: number } | null | undefined;

/** Turns BetterAuth error codes into messages the user can act on. */
export function authErrorMessage(error: AuthError, fallback: string): string {
  const code = error?.code ?? "";
  if (code.includes("INVALID_EMAIL_OR_PASSWORD")) return "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
  if (code.includes("USER_ALREADY_EXISTS")) {
    return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে। সাইন ইন করুন।";
  }
  if (code.includes("PASSWORD_TOO_SHORT")) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
  if (code.includes("INVALID_EMAIL")) return "সঠিক ইমেইল ঠিকানা দিন";
  if (code.includes("PROVIDER_NOT_FOUND")) {
    return "এই সোশ্যাল লগইনটি এখনো চালু করা হয়নি";
  }
  if (error?.status === 401) return "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
  return error?.message || fallback;
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
