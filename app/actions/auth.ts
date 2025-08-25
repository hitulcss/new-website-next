import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { signup as userSignup } from "@/actions/home";
export async function signup(formData:any) {
  const getResponse = await userSignup(formData);
  console.log(getResponse, "getResponse from signup action");
  await createSession(getResponse.id);
  // 5. Redirect user
  redirect("/profile");
}
