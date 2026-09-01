"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
  useThreads,
} from "@liveblocks/react/suspense";
import { Thread, Composer } from "@liveblocks/react-ui";
import type { DemoUser } from "@/lib/server-session";
import { MessageCircle } from "lucide-react";

// Declare user meta types
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

    ThreadMetadata: {};
  }
}

function ThreadList() {
  const { threads } = useThreads();

  if (threads.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
          <MessageCircle className="h-7 w-7 text-zinc-500" />
        </div>
        <p className="text-sm text-zinc-500">No messages yet. Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        <p className="text-sm text-zinc-500">Loading threads…</p>
      </div>
    </div>
  );
}

export function ChatClient({
  user,
  roomId,
}: {
  user: DemoUser;
  roomId: string;
}) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const res = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({ ids: userIds }),
        });

        return res.json();
      }}>
      <RoomProvider id={roomId} initialPresence={{}}>
        <div className="flex flex-1 flex-col">
          {/* Chat header */}
          <div className="border-b border-white/5 bg-white/[0.02] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/20 to-indigo-600/20">
                <MessageCircle className="h-4 w-4 text-violet-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Demo Chat</h2>
                <p className="text-xs text-zinc-500">
                  Room: {roomId} · Signed in as {user.name}
                </p>
              </div>
            </div>
          </div>

          {/* Threads */}
          <div className="flex flex-1 flex-col overflow-y-auto">
            <ClientSideSuspense fallback={<LoadingState />}>
              <ThreadList />
            </ClientSideSuspense>
          </div>

          {/* Composer */}
          <div className="border-t border-white/5 bg-white/[0.02] p-4">
            <ClientSideSuspense fallback={null}>
              <Composer className="lb-composer" />
            </ClientSideSuspense>
          </div>
        </div>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
