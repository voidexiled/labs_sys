"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import type { Tables } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";

const initLabs: Tables<"laboratories">[] = [
	{
		capacity: 0,
		id: 0,
		label: "",
		course_id: 0,
		created_at: "",
		updated_at: "",
	},
];

export function useLaboratories() {
	return useQuery({
		queryKey: ["laboratories"],
		_optimisticResults: "optimistic",
		queryFn: async () => {
			const supabase = createSupabaseBrowser();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				// fetch labs info
				const { data: labs } = await supabase.from("laboratories").select("*");
				return labs as Tables<"laboratories">[];
			}
			return initLabs;
		},
	});
}
