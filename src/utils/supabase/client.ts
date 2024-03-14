import { createClient as cc } from "@supabase/supabase-js";

export function createClient() {
  return cc(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
