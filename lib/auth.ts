import { betterAuth } from "better-auth";
import { env } from "./env";
import { pool } from "./db";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: pool,
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "unbound",
          discoveryUrl: env.UNBOUND_OIDC_DISCOVERY_URL,
          clientId: env.UNBOUND_OIDC_CLIENT_ID,
          clientSecret: "", // Public client — no secret
          pkce: true,
          scopes: ["openid", "profile", "email"],
          redirectURI: `${env.BETTER_AUTH_URL}/api/auth/callback/unbound`,
        },
      ],
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
