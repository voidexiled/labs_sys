"use server";

import createSupabaseServer from "../supabase/server";
import createSupabaseServerClient from "../supabase/server";

export default async function readUserSession() {
  const supabase = await createSupabaseServer();

  return supabase.auth.getUser();
}
