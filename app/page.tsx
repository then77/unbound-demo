import { getDemoUser } from "@/lib/server-session";
import { SiteShell } from "@/components/site-shell";
import { ProfileCard } from "@/components/profile-card";
import { LoginButton } from "@/components/auth-button";
import { LogoutButton } from "@/components/auth-button";
import { getSafeRedirectTo } from "@/lib/redirects";
import { MessageCircle, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Unbound Demo · OIDC Auth + Liveblocks Chat",
  description:
    "Standalone demo showcasing Unbound OIDC login with Better Auth, profile rendering, and real-time Liveblocks threads.",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_to?: string }>;
}) {
  const user = await getDemoUser();
  const params = await searchParams;
  const redirectTo = getSafeRedirectTo(params.redirect_to);

  return (
    <SiteShell user={user}>
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 sm:py-24">
        {user ? (
          /* ---- Logged In ---- */
          <div className="flex flex-col items-center gap-8">
            <ProfileCard user={user} />

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/chat"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4" />
                Open Chat
              </Link>
              <LogoutButton />
            </div>
          </div>
        ) : (
          /* ---- Logged Out ---- */
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Hero icon */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-2xl shadow-violet-600/30">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Copy */}
            <div className="max-w-md">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Unbound OIDC Demo
              </h1>
              <p className="mt-3 text-base leading-relaxed text-zinc-400">
                Sign in with your Unbound account to view your profile and access the real-time chat room powered by Liveblocks.
              </p>
            </div>

            {/* Features */}
            <div className="grid w-full max-w-sm gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left text-sm text-zinc-400">
                <Shield className="h-4 w-4 text-violet-400 shrink-0" />
                Authorization Code + PKCE (S256)
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left text-sm text-zinc-400">
                <Sparkles className="h-4 w-4 text-indigo-400 shrink-0" />
                Profile with name, email &amp; avatar
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left text-sm text-zinc-400">
                <MessageCircle className="h-4 w-4 text-violet-400 shrink-0" />
                Real-time threaded chat
              </div>
            </div>

            {/* Login */}
            <LoginButton redirectTo={redirectTo} />
          </div>
        )}
      </div>
    </SiteShell>
  );
}
