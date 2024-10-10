"use server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";

import type { Database } from "@/lib/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export default async function createSupabaseServer() {
	const cookieStore = cookies();

	return createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL || "",
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						for (const { name, value, options } of cookiesToSet) {
							cookieStore.set(name, value, options);
						}
					} catch {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		},
	);
}

export async function createSupabaseAdmin() {
	return createClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_ADMIN_SUPABASE!,
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		},
	);
}
