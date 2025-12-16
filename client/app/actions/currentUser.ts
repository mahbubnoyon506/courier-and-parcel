import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  return {
    token: cookieStore.get("token")?.value,
    role: cookieStore.get("role")?.value,
  };
}
