"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Tables } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";
const initUsers = [{
    created_at: "",
    display_name: "",
    email: "",
    id: "",
    image_url: "",
    lab_at: 0,
    role_id: 5,
    noIdentificador: "",
    updated_at: "",
}]
export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        _optimisticResults: "optimistic",
        staleTime: 120 * 1000,
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // fetch user info
                const { data: users } = await supabase.from("users_profile").select("*");
                console.log("users", users);
                return users as Tables<"users_profile">[];
            }
            return initUsers;
        },

    })
}