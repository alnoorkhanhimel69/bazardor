"use client";

import { createAuthClient } from "better-auth/react";

/** Same-origin client: talks to /api/auth/* on whatever domain the app is served from. */
export const authClient = createAuthClient();
