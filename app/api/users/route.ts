import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getServerSession } from "@/lib/server-session";

const MAX_USER_IDS = 100;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: unknown = await req.json();
    const ids =
      typeof body === "object" && body !== null && "ids" in body
        ? body.ids
        : null;

    if (!Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid user IDs" }, { status: 400 });
    }

    if (ids.length === 0) {
      return NextResponse.json([]);
    }

    if (
      ids.length > MAX_USER_IDS ||
      !ids.every((id): id is string => typeof id === "string" && id.length > 0)
    ) {
      return NextResponse.json({ error: "Invalid user IDs" }, { status: 400 });
    }

    const placeholders = ids.map((_, index) => `$${index + 1}`).join(", ");
    const result = await pool.query(
      `SELECT id, name, email, image FROM "user" WHERE id IN (${placeholders})`,
      ids
    );

    const userMap = new Map<
      string,
      { name: string; avatar: string; email: string }
    >();
    for (const row of result.rows) {
      userMap.set(row.id, {
        name: row.name || (row.email ? row.email.split("@")[0] : "Unbound User"),
        avatar: row.image || "",
        email: row.email || "",
      });
    }

    const users = ids.map((id) =>
      userMap.get(id) || { name: id, avatar: "", email: "" }
    );

    return NextResponse.json(users);
  } catch (error) {
    console.error("Resolve users error:", error);
    return NextResponse.json([]);
  }
}
