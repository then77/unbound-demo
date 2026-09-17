"use client";

import { useState } from "react";
import { LogOut, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LoginButton({
  redirectTo = "/",
  compact = false,
  className,
}: {
  redirectTo?: string;
  compact?: boolean;
  className?: string;
}) {
  const [isPending, setIsPending] = useState(false);

  async function handleLogin() {
    setIsPending(true);
    try {
      await authClient.signIn.social({
        provider: "unbound",
        callbackURL: redirectTo,
      });
    } catch {
      setIsPending(false);
    }
  }

  return (
    <Button
      variant={compact ? "outline" : "primary"}
      size={compact ? "sm" : "default"}
      onClick={handleLogin}
      disabled={isPending}
      aria-busy={isPending}
      className={cn(
        "relative cursor-pointer overflow-hidden",
        className,
      )}
    >
      {isPending && (
        <span
          aria-hidden="true"
          className="button-shimmer absolute inset-0"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {!isPending && <UserRound aria-hidden="true" />}
        {isPending ? "Redirecting…" : "Login"}
      </span>
    </Button>
  );
}

export function LogoutButton({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    setIsPending(true);

    try {
      await authClient.signOut();
      window.location.assign("/");
    } catch {
      setIsPending(false);
    }
  }

  return (
    <Button
      variant="outline"
      size={compact ? "sm" : "default"}
      onClick={handleLogout}
      disabled={isPending}
      aria-busy={isPending}
      className={cn(
        compact && "px-3",
        "relative cursor-pointer overflow-hidden",
        className,
      )}
    >
      {isPending && (
        <span aria-hidden="true" className="button-shimmer absolute inset-0" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        <LogOut aria-hidden="true" />
        {isPending ? "Signing out…" : "Sign out"}
      </span>
    </Button>
  );
}
