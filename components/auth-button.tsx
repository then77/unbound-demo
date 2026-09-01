"use client";

import { authClient } from "@/lib/auth-client";
import { LogIn, LogOut } from "lucide-react";

export function LoginButton({
  redirectTo,
  className,
}: {
  redirectTo?: string;
  className?: string;
}) {
  const handleLogin = () => {
    const callbackURL = redirectTo || "/";
    authClient.signIn.social({
      provider: "unbound",
      callbackURL,
    });
  };

  return (
    <button
      onClick={handleLogin}
      className={`group relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] ${className || ""}`}
    >
      <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[-2px]" />
      Sign in with Unbound
    </button>
  );
}

export function LogoutButton({ className }: { className?: string }) {
  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/20 active:scale-[0.98] ${className || ""}`}
    >
      <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" />
      Sign out
    </button>
  );
}
