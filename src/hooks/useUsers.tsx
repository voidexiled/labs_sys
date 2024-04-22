"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Tables } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";
const initUsers: Tables<"users">[] = [{
    created_at: "",
    display_name: "",
    email: "",
    id: "",
    image_url: "",
    lab_at: 0,
    no_identificador: "",
    updated_at: "",
    role_id: 0,
}]
export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        _optimisticResults: "optimistic",
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // fetch user info
                const { data: users } = await supabase.from("users").select("*");
                return users as Tables<"users">[];
            }
            return initUsers;
        },

    })
}