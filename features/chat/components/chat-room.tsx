"use client";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { Composer } from "@liveblocks/react-ui";
import { MessageCircle } from "lucide-react";
import type { DemoUser } from "@/lib/server-session";
import { Avatar } from "@/components/ui/avatar";
import { ChatLoading } from "./chat-loading";
import { ThreadList } from "./thread-list";

declare global {
  interface Liveblocks {
    UserMeta: {
      id: string;
      info: {
        name: string;
        avatar: string;
        email: string;
      };
    };
    ThreadMetadata: Record<string, never>;
  }
}

export function ChatRoom({ user, roomId }: { user: DemoUser; roomId: string }) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: userIds }),
        });

        if (!response.ok) {
          throw new Error("Unable to resolve chat participants");
        }

        return response.json();
      }}
    >
      <RoomProvider id={roomId} initialPresence={{}}>
        <section className="flex min-h-136 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card">
          <header className="flex items-center gap-3 border-b border-border px-4 py-4 sm:px-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-background text-primary-foreground">
              <MessageCircle className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="text-sm font-semibold">Demo chat</h1>
              <p className="truncate text-xs text-muted-foreground">
                Room {roomId}
              </p>
            </div>
            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <Avatar name={user.name} src={user.image} className="size-7" />
              <span className="max-w-32 truncate">{user.name}</span>
            </div>
          </header>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            <ClientSideSuspense fallback={<ChatLoading />}>
              <ThreadList />
            </ClientSideSuspense>
          </div>

          <div className="border-t border-border p-3 sm:p-4">
            <ClientSideSuspense fallback={null}>
              <Composer className="lb-composer" />
            </ClientSideSuspense>
          </div>
        </section>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
