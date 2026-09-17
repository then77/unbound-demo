import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { ChatRoom } from "@/features/chat/components/chat-room";
import { env } from "@/lib/env";
import { getDemoUser } from "@/lib/server-session";

export const metadata: Metadata = {
  title: "Chat · Unbound Demo",
  description:
    "A protected real-time threaded chat powered by Liveblocks and Unbound OIDC.",
};

export default async function ChatPage() {
  const user = await getDemoUser();

  if (!user) {
    redirect("/?redirect_to=/chat");
  }

  return (
    <SiteShell user={user}>
      <div className="flex flex-1 flex-col py-6 pb-10 sm:py-8 sm:pb-12">
        <ChatRoom user={user} roomId={env.LIVEBLOCKS_ROOM_ID} />
      </div>
    </SiteShell>
  );
}
