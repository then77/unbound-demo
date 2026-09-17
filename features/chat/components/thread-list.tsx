"use client";

import { MessageCircle } from "lucide-react";
import { useThreads } from "@liveblocks/react/suspense";
import { Thread } from "@liveblocks/react-ui";

export function ThreadList() {
  const { threads } = useThreads();

  if (threads.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-20 text-center">
        <span className="flex size-12 items-center justify-center rounded-full border border-border bg-muted/30">
          <MessageCircle className="size-5 text-muted-foreground" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-medium">No messages yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Start the first thread below.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-3 sm:p-5">
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
