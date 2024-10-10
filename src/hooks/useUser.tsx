"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import type { Tables } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";
const initUser: Tables<"users"> = {
	created_at: "",
	display_name: "",
	email: "",
	id: "",
	image_url: "",
	no_identificador: "",
	updated_at: "",
	role_id: 0,
};
export function useUser() {
	return useQuery({
		queryKey: ["user"],
		_optimisticResults: "optimistic",
		queryFn: async () => {
			const supabase = createSupabaseBrowser();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				// fetch user info
				const { data: _user } = await supabase
					.from("users")
					.select("*")
					.eq("id", user.id)
					.single();
				return _user;
			}
			return initUser;
		},
	});
}
