import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { DemoUser } from "@/lib/server-session";
import { buttonVariants } from "@/components/ui/button";
import { LogoutButton } from "./auth-buttons";
import { ProfileCard } from "./profile-card";

export function AuthenticatedHome({ user }: { user: DemoUser }) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center py-14 text-center sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-success-foreground">
        Connected
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Your Unbound identity
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
        Continue to the shared room or end the current session.
      </p>

      <div className="mt-8 w-full max-w-lg text-left">
        <ProfileCard user={user} />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <Link
                  href="/chat"
                  className={buttonVariants({
                    variant: "primary",
                    className: "button-shimmer-hover",
                  })}
                >
          <MessageCircle aria-hidden="true" />
          Open chat
        </Link>
        <LogoutButton />
      </div>
    </section>
  );
}
