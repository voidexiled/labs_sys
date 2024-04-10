import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../types/supabase";

export function createSupabaseBrowser() {
  // console.log(process.env.NEXT_PUBLIC_ADMIN_SUPABASE)
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}


