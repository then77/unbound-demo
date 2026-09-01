import Link from "next/link";
import type { DemoUser } from "@/lib/server-session";
import { LogoutButton } from "./auth-button";
import { MessageCircle } from "lucide-react";

export function SiteShell({
  user,
  children,
}: {
  user: DemoUser | null;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-white transition-colors hover:text-violet-400"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-black">
              U
            </div>
            Unbound Demo
          </Link>

          <nav className="flex items-center gap-3">
            {user && (
              <>
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat
                </Link>
                <LogoutButton />
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
