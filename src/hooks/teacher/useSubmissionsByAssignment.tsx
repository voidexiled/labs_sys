"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import type { Tables } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";
const initSubmissions: Tables<"submissions">[] = [
	{
		id: 0,
		assignment_id: 0,
		created_at: "",
		description: "",
		feedback: "",
		feedback_score: 0,
		file_name: "",
		submitted_at: "",
		submitted_by: "",
		updated_at: "",
	},
];
export function useSubmissionsByAssignment({
	assignment_id,
}: { assignment_id?: number }) {
	return useQuery({
		queryKey: ["submissions", assignment_id || 0],
		_optimisticResults: "optimistic",
		queryFn: async () => {
			const supabase = createSupabaseBrowser();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user && assignment_id) {
				const { data: submissions } = await supabase
					.from("submissions")
					.select("*")
					.eq("assignment_id", assignment_id);
				return submissions;
			}
			return initSubmissions;
		},
	});
}
