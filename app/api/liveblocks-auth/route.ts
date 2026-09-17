import { NextResponse } from "next/server";
import { liveblocks } from "@/lib/liveblocks";
import { getServerSession } from "@/lib/server-session";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = session.user;

    const name =
      user.name ||
      (user.email ? user.email.split("@")[0] : "Unbound User");

    const body: unknown = await req.json();
    const room =
      typeof body === "object" && body !== null && "room" in body
        ? body.room
        : null;

    if (room !== env.LIVEBLOCKS_ROOM_ID) {
      return NextResponse.json({ error: "Invalid room" }, { status: 403 });
    }

    const liveblocksSession = liveblocks.prepareSession(
      user.id,
      {
        userInfo: {
          name,
          avatar: user.image || "",
          email: user.email || "",
        },
      }
    );

    liveblocksSession.allow(room, liveblocksSession.FULL_ACCESS);

    const { status, body: responseBody } = await liveblocksSession.authorize();

    return new NextResponse(responseBody, { status });
  } catch (error) {
    console.error("Liveblocks auth error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}