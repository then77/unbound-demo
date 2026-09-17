import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { AuthHero } from "@/features/auth/components/auth-hero";
import { AuthenticatedHome } from "@/features/auth/components/authenticated-home";
import { getSafeRedirectTo } from "@/lib/redirects";
import { getDemoUser } from "@/lib/server-session";

export const metadata: Metadata = {
  title: "Unbound OIDC + Liveblocks Demo",
  description:
    "A focused demo of Unbound OIDC authentication and a protected Liveblocks chat room.",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_to?: string }>;
}) {
  const [user, params] = await Promise.all([getDemoUser(), searchParams]);
  const redirectTo = getSafeRedirectTo(params.redirect_to);

  return (
    <SiteShell user={user}>
      {user ? (
        <AuthenticatedHome user={user} />
      ) : (
        <AuthHero redirectTo={redirectTo} />
      )}
    </SiteShell>
  );
}
