import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { DemoUser } from "@/lib/server-session";
import { Avatar } from "@/components/ui/avatar";
import { Brand } from "@/components/ui/brand";
import { buttonVariants } from "@/components/ui/button";
import {
  LoginButton,
  LogoutButton,
} from "@/features/auth/components/auth-buttons";

export function SiteShell({
  user,
  children,
}: {
  user: DemoUser | null;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-5 sm:px-8">
      <header className="flex min-h-24 items-center justify-between py-6 sm:min-h-28">
        <Brand />

        <nav aria-label="Primary navigation" className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden items-center gap-2 px-2 text-sm text-muted-foreground sm:flex">
                <Avatar name={user.name} src={user.image} className="size-6" />
                <span className="max-w-28 truncate">{user.name}</span>
              </div>
              <LogoutButton compact />
            </>
          ) : null}
        </nav>
      </header>

      <main className="flex flex-1 flex-col">{children}</main>

      <footer className="flex flex-col gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <p className="sm:flex-1">
          © {new Date().getFullYear()} Project Unbound. Quick AI-assisted demo.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/then77/unbound-demo"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <span>OIDC + Liveblocks</span>
        </div>
      </footer>
    </div>
  );
}
