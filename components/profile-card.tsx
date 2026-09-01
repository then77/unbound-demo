import Image from "next/image";
import type { DemoUser } from "@/lib/server-session";
import { Mail, Hash } from "lucide-react";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ProfileCard({ user }: { user: DemoUser }) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl shadow-black/20">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 opacity-75 blur" />
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={80}
              height={80}
              className="relative h-20 w-20 rounded-full object-cover ring-2 ring-white/20"
              unoptimized
            />
          ) : (
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-xl font-bold text-white ring-2 ring-white/20">
              {getInitials(user.name)}
            </div>
          )}
        </div>

        {/* Name */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white">{user.name}</h2>
          <p className="mt-0.5 text-sm text-zinc-400">Authenticated via Unbound</p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 space-y-3">
        {user.email && (
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm">
            <Mail className="h-4 w-4 text-violet-400 shrink-0" />
            <span className="text-zinc-300 truncate">{user.email}</span>
          </div>
        )}
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm">
          <Hash className="h-4 w-4 text-violet-400 shrink-0" />
          <span className="text-zinc-400 truncate font-mono text-xs">{user.id}</span>
        </div>
      </div>
    </div>
  );
}
