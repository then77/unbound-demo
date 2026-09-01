function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  get APP_ORIGIN() {
    return required("NEXT_PUBLIC_APP_ORIGIN");
  },
  get BETTER_AUTH_URL() {
    return required("BETTER_AUTH_URL");
  },
  get BETTER_AUTH_SECRET() {
    return required("BETTER_AUTH_SECRET");
  },
  get UNBOUND_OIDC_ISSUER() {
    return required("UNBOUND_OIDC_ISSUER");
  },
  get UNBOUND_OIDC_DISCOVERY_URL() {
    return required("UNBOUND_OIDC_DISCOVERY_URL");
  },
  get UNBOUND_OIDC_CLIENT_ID() {
    return required("UNBOUND_OIDC_CLIENT_ID");
  },
  get DATABASE_URL() {
    return required("DATABASE_URL");
  },
  get LIVEBLOCKS_SECRET_KEY() {
    return required("LIVEBLOCKS_SECRET_KEY");
  },
  get LIVEBLOCKS_ROOM_ID() {
    return process.env.LIVEBLOCKS_ROOM_ID || "unbound-demo-chat";
  },
} as const;
