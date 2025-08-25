"use server";

import { cookies } from "next/headers";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.

export async function getCookie(key: string) {
  return (await cookies()).get(key)?.value || null;
}

export async function setCookie(key: string, value: any) {
  (await cookies()).set(key, JSON.stringify(value));
}

export async function removeCookie(key: string) {
  (await cookies()).delete(key);
}

export async function removeAllCookies() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  for (const cookie of allCookies) {
    cookieStore.delete(cookie.name);
  }
}
