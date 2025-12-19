"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginResponse = {
  token: string;
  role: "admin" | "agent" | "customer";
};

type RegisterResponse = {
  token: string;
  role: "admin" | "agent" | "customer";
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerAction(values: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Registration failed");
  }

  const data: RegisterResponse = await res.json();

  const cookieStore = await cookies();

  cookieStore.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("role", data.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return { role: data.role, token: data.token };
}

export async function loginAction(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");

  const data: LoginResponse = await res.json();
  const cookieStore = await cookies();

  cookieStore.set("token", data.token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("role", data.role, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return { role: data.role, token: data.token };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("role");
  redirect("/");
}
