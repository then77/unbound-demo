import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getServerSession } from "@/lib/server-session";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json([]);
    }

    // Query Better Auth user table
    const placeholders = ids.map((_: string, i: number) => `$${i + 1}`).join(", ");
    const result = await pool.query(
      `SELECT id, name, email, image FROM "user" WHERE id IN (${placeholders})`,
      ids
    );

    // Build a map for quick lookup
    const userMap = new Map<string, { name: string; avatar: string; email: string }>();
    for (const row of result.rows) {
      userMap.set(row.id, {
        name: row.name || (row.email ? row.email.split("@")[0] : "Unbound User"),
        avatar: row.image || "",
        email: row.email || "",
      });
    }

    // Return in same order as requested userIds
    const users = ids.map((id: string) =>
      userMap.get(id) || { name: id, avatar: "", email: "" }
    );

    return NextResponse.json(users);
  } catch (error) {
    console.error("Resolve users error:", error);
    return NextResponse.json([]);
  }
}
