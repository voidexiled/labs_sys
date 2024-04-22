"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Tables } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";
const initUsersRoles: Tables<"roles">[] = [{
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
                const { data: userRoles } = await supabase.from("roles").select("*");
                return userRoles;
            }
            return initUsersRoles;
        }
    })
}