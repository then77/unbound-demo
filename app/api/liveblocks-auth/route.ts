import { NextResponse } from "next/server";
import { liveblocks } from "@/lib/liveblocks";
import { getServerSession } from "@/lib/server-session";

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

    const { room } = await req.json();

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

    // grant access to this room
    liveblocksSession.allow(
      room,
      liveblocksSession.FULL_ACCESS
    );

    const { status, body } =
      await liveblocksSession.authorize();

    return new NextResponse(body, { status });
  } catch (error) {
    console.error("Liveblocks auth error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}