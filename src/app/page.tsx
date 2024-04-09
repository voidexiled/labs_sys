"use server"

import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Home() {

  const { data: { user } } = await readUserSession();

  if (user) {
    return redirect("/dashboard/panel");
  } else {
    return redirect("/login");
  }

  return (
    <>


    </>
  );
}
