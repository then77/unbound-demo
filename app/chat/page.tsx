import { redirect } from "next/navigation";
import { getDemoUser } from "@/lib/server-session";
import { SiteShell } from "@/components/site-shell";
import { ChatClient } from "./chat-client";
import { env } from "@/lib/env";

export const metadata = {
  title: "Chat · Unbound Demo",
  description: "Real-time threaded chat powered by Liveblocks and Unbound OIDC authentication.",
};

export default async function ChatPage() {
  const user = await getDemoUser();

  if (!user) {
    redirect("/?redirect_to=/chat");
  }

  return (
    <SiteShell user={user}>
      <ChatClient user={user} roomId={env.LIVEBLOCKS_ROOM_ID} />
    </SiteShell>
  );
}
