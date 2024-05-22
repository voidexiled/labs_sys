"use client";

import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { formatDate } from "@/lib/utils";

export default async function updateUserById({ id }: { id: string }) {
	const supabase = createSupabaseBrowser();
	const updatedAt = formatDate(new Date());
	return await supabase
		.from("users")
		.update({ updated_at: updatedAt })
		.eq("id", id)
		.select("*");
}
