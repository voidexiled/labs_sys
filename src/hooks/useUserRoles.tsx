"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";
const initUsersRoles = [{
    id: 0,
    label: ""
}]
export function useUserRoles() {
    return useQuery({
        queryKey: ["userRoles"],
        _optimisticResults: "optimistic",
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // fetch user info
                const { data: userRoles } = await supabase.from("user_roles").select("*");
                return userRoles;
            }
            return initUsersRoles;
        }
    })
}