import { cookies } from "next/headers";

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}

export async function getUserRole() {
  const cookieStore = await cookies();
  return cookieStore.get("role")?.value || null;
}
