import { removeItem } from "@/lib/storage";
import { removeAllCookies, removeCookie } from "./cookies";

export async function logout() {
  removeItem("authToken");
  removeItem("userProfile");
  await removeAllCookies();
  window.location.href = "/";
}
