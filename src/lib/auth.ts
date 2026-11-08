import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { memoryAdapter } from "better-auth/adapters/memory";
import { MongoClient } from "mongodb";

/**
 * Database
 * - Production (Vercel / Netlify): set MONGODB_URI to a MongoDB Atlas database.
 * - Local quick-start: without MONGODB_URI an in-memory store is used so the app
 *   still runs, but accounts disappear whenever the server restarts.
 */
const globalForAuth = globalThis as unknown as {
  __mongoClient?: MongoClient;
  __memoryDb?: Record<string, unknown[]>;
};

function createDatabase() {
  const uri = process.env.MONGODB_URI;

  if (uri) {
    // Re-use one client across hot reloads and warm serverless invocations.
    globalForAuth.__mongoClient ??= new MongoClient(uri);
    const client = globalForAuth.__mongoClient;
    return mongodbAdapter(client.db(process.env.MONGODB_DB || undefined), {
      client,
    });
  }

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[auth] MONGODB_URI is not set — using an in-memory database. Users will not persist.",
    );
  }
  globalForAuth.__memoryDb ??= { user: [], session: [], account: [], verification: [] };
  return memoryAdapter(globalForAuth.__memoryDb);
}

/** Social providers are only switched on when their keys are present. */
const socialProviders = {
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {}),
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }
    : {}),
};

export const auth = betterAuth({
  database: createDatabase(),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    // Email verification and password reset are intentionally not implemented.
  },
  socialProviders,
});

export type Session = typeof auth.$Infer.Session;
