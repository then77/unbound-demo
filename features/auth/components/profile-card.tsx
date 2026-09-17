import { Hash, Mail, ShieldCheck } from "lucide-react";
import type { DemoUser } from "@/lib/server-session";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export function ProfileCard({ user }: { user: DemoUser }) {
  return (
    <Card className="w-full max-w-lg p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Avatar name={user.name} src={user.image} className="size-16" />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-lg font-semibold">{user.name}</h2>
            <ShieldCheck
              className="size-4 shrink-0 text-success-foreground"
              aria-label="Authenticated"
            />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Authenticated with Unbound OIDC
          </p>
        </div>
      </div>

      <dl className="mt-6 grid gap-3 text-sm">
        {user.email && (
          <div className="flex min-w-0 items-center gap-3 border-t border-border pt-3">
            <Mail className="size-4 shrink-0 text-primary-foreground" aria-hidden="true" />
            <dt className="sr-only">Email</dt>
            <dd className="truncate text-muted-foreground">{user.email}</dd>
          </div>
        )}
        <div className="flex min-w-0 items-center gap-3 border-t border-border pt-3">
          <Hash className="size-4 shrink-0 text-primary-foreground" aria-hidden="true" />
          <dt className="sr-only">User ID</dt>
          <dd className="truncate font-mono text-xs text-muted-foreground">
            {user.id}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
