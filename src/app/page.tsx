"use server"

import readUserSession from "@/lib/actions";
import createSupabaseServer from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { verifyRoleRedirect } from "./auth-server-action/actions";

export default async function Home() {

  await verifyRoleRedirect();

  return (
    <>


    </>
  );
}