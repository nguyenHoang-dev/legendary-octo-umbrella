import { auth } from "@/lib/auth";
import { headers } from "next/headers";


async function getAccountRole() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return ""

  return session.user.role;
}

export default getAccountRole;