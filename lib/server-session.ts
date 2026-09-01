import { headers } from "next/headers";
import { auth } from "./auth";

export type DemoUser = {
  id: string;
  name: string;
  email?: string | null;
  image?: string | null;
};

export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function getDemoUser(): Promise<DemoUser | null> {
  const session = await getServerSession();
  if (!session?.user) return null;

  const user = session.user;
  return {
    id: user.id,
    name: user.name || (user.email ? user.email.split("@")[0] : "Unbound User"),
    email: user.email,
    image: user.image,
  };
}
